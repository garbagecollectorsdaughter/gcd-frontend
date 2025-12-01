'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Loading from '@/components/Loading'

type FontContextType = {
  fontClass?: string
  changeFontClass: (nextFontClass: string) => void
}

export const FontContext = createContext<FontContextType>({
  fontClass: '',
  changeFontClass: () => {},
})

type FontProviderProps = {
  children: ReactNode
}

export const FontProvider: React.FC<FontProviderProps> = ({
  children,
}: FontProviderProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [fontClass, setFontClass] = useState<string>('')

  const changeFontClass = (nextFont: string) => {
    setFontClass(nextFont)
    localStorage.setItem('font', nextFont)
  }

  // #region -- Load Font
  const loadFont = useCallback(() => {
    const storedFont = localStorage.getItem('font') || ''
    setFontClass(storedFont)
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const id = setTimeout(loadFont, 300)
    return () => clearTimeout(id)
  }, [loadFont])

  // #endregion -- Load Font
  if (!isMounted) {
    return <Loading />
  }

  return (
    <FontContext.Provider value={{ fontClass, changeFontClass }}>
      {children}
    </FontContext.Provider>
  )
}
