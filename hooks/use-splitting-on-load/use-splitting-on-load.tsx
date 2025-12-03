'use client'

import { useEffect } from 'react'

import 'splitting/dist/splitting-cells.css'
import 'splitting/dist/splitting.css'

export const useSplittingOnLoad = (className: string, delay: number = 3600) => {
  // delay in ms
  useEffect(() => {
    // Initialize Splitting.js for text animation
    if (typeof window !== 'undefined') {
      window.Splitting = require('splitting')
    }

    window.Splitting()

    // Apply the animation class after a short delay
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(className)
      elements.forEach((element) => {
        element.classList.add('animate-on-load')
      })
    }, delay)

    return () => {
      clearTimeout(timeoutId) // Clear the timeout if the component unmounts
    }
  }, [className, delay])
}
