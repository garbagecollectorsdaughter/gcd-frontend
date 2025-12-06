'use client'

import { useEffect } from 'react'

import 'splitting/dist/splitting-cells.css'
import 'splitting/dist/splitting.css'
declare global {
  interface Window {
    Splitting?: (...args: unknown[]) => unknown
  }
}

export const useSplittingOnLoad = (className: string, delay: number = 3600) => {
  // delay in ms
  useEffect(() => {
    let mounted = true

    const loadSplitting = async () => {
      if (typeof window === 'undefined' || !mounted) return

      try {
        const mod = await import('splitting')
        // handle both ESM default and CommonJS exports
        const maybeDefault = (
          mod as { default?: (...args: unknown[]) => unknown }
        ).default
        const Splitting =
          maybeDefault ?? (mod as unknown as (...args: unknown[]) => unknown)
        window.Splitting = Splitting as (...args: unknown[]) => unknown

        if (typeof window.Splitting === 'function') {
          ;(window.Splitting as (...args: unknown[]) => unknown)()
        }
      } catch (err) {
        // fail silently if Splitting can't be loaded
        // eslint-disable-next-line no-console
        console.error('Failed to load Splitting:', err)
      }
    }

    loadSplitting()

    // Apply the animation class after a short delay
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(className)
      elements.forEach((element) => {
        element.classList.add('animate-on-load')
      })
    }, delay)

    return () => {
      mounted = false
      clearTimeout(timeoutId) // Clear the timeout if the component unmounts
    }
  }, [className, delay])
}
