'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Loading from '@/components/Loading'

type ThemeContextType = {
  theme?: string
  changeTheme: (nextTheme: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'pixel-princess',
  changeTheme: () => {},
})

type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState<string>('pixel-princess')

  const changeTheme = (nextTheme: string) => {
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  // #region -- Load Theme
  const loadTheme = useCallback(() => {
    const storedTheme = localStorage.getItem('theme') || 'pixel-princess'
    setTheme(storedTheme)
    setIsMounted(true)
  }, [])

  //

  /* Simulate asynchronous loading to ensure the component mounts after
   * the initial render
   */
  useEffect(() => {
    const id = setTimeout(loadTheme, 300)
    return () => clearTimeout(id)
  }, [loadTheme])
  // #endregion -- Load Theme
  if (!isMounted) {
    return <Loading />
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
