'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).slice(2, 9)
      const full: Toast = { id, duration: 4000, type: 'info', ...toast }
      setToasts((t) => [full, ...t])
      if (full.duration && full.duration > 0) {
        window.setTimeout(() => removeToast(id), full.duration)
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

      {/* Toast container */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed top-4 right-4 z-50 flex flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto max-w-xs rounded-md border px-3 py-2 shadow-md transition transform ${
              t.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-900'
                : t.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-900'
                  : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            {t.title ? <div className="font-semibold">{t.title}</div> : null}
            <div className="text-sm">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
