'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'

type Toast = {
  id: string
  title?: string
  message: string
  type?: 'info' | 'success' | 'error'
  duration?: number
}

type ToastContextValue = {
  addToast: (toast: Omit<Toast, 'id'>) => string
}

type LoggerFn = (
  level: 'error' | 'warn' | 'info',
  message: string,
  meta?: Record<string, unknown> | undefined
) => void

let globalLogger: LoggerFn | null = null

export const setLogger = (fn: LoggerFn | null) => {
  globalLogger = fn
}

export const log = (
  level: 'error' | 'warn' | 'info',
  message: string,
  meta?: Record<string, unknown>
) => {
  if (globalLogger) {
    try {
      globalLogger(level, message, meta)
    } catch (e) {
      // fallback to console
      // eslint-disable-next-line no-console
      console.error('Logger failed', e)
      // eslint-disable-next-line no-console
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
        message,
        meta
      )
    }
  } else {
    // eslint-disable-next-line no-console
    console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
      message,
      meta
    )
  }
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timersRef = useRef<Map<string, number>>(new Map())

  const removeToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id))
    const to = timersRef.current.get(id)
    if (to) {
      clearTimeout(to)
      timersRef.current.delete(id)
    }
  }, [])

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).slice(2, 9)
      const full: Toast = { id, duration: 4000, type: 'info', ...toast }
      setToasts((t) => [full, ...t])
      if (full.duration && full.duration > 0) {
        const to = window.setTimeout(() => removeToast(id), full.duration)
        timersRef.current.set(id, to)
      }
      return id
    },
    [removeToast]
  )

  // expose addToast via context
  const value = { addToast }

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast container with basic animations and progress bar */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed top-4 right-4 z-99999999 flex flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto max-w-xs rounded-md border px-3 py-2 shadow-md transition-transform transform-gpu animate-toast-in ${
              t.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-900'
                : t.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-900'
                  : 'bg-white border-gray-200 text-gray-900'
            }`}
            style={{ animationDuration: '240ms' }}
          >
            <div className="flex items-start gap-2">
              <div className="flex-1">
                {t.title ? (
                  <div className="font-semibold">{t.title}</div>
                ) : null}
                <div className="text-sm">{t.message}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Dismiss notification"
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => removeToast(t.id)}
                >
                  ×
                </button>
              </div>
            </div>

            {/* progress bar */}
            <div className="relative h-1 bg-transparent mt-2 overflow-hidden rounded">
              <div
                className="absolute left-0 top-0 bottom-0 bg-current"
                style={{
                  width: '100%',
                  opacity: 0.2,
                  animation: `toast-progress ${Math.max((t.duration ?? 4000) / 1000, 0.1)}s linear forwards`,
                }}
              />
            </div>
          </div>
        ))}

        <style>{`
          @keyframes toast-progress { from { width: 100%; } to { width: 0%; } }
          @keyframes toast-in { from { opacity: 0; transform: translateY(-6px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
          .animate-toast-in { animation-name: toast-in; }
        `}</style>
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
