'use client'

import { PropsWithChildren, useContext, useEffect } from 'react'

import { FontContext } from '@/context/FontContext'
import { ThemeContext } from '@/context/ThemeContext'

export default function ClientThemeWrapper({ children }: PropsWithChildren) {
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    if (!theme) return
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const { fontClass } = useContext(FontContext)

  return (
    <div data-theme={theme} data-font={fontClass}>
      {children}
    </div>
  )
}
