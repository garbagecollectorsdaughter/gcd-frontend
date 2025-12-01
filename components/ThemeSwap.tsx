'use client'

import { useChangeTheme } from '@/hooks'

const ThemeSwap = () => {
  const { changeTheme, theme } = useChangeTheme()

  if (!changeTheme) {
    return null
  }

  const themes = [
    { id: 'pixel-princess', label: 'Pixel Princess' },
    { id: 'rainbow', label: 'Rainbow' },
  ]

  return (
    <div id="theme-swap" className="absolute top-[7px] z-9999999">
      <label htmlFor="theme-select" className="sr-only">
        pick theme:
      </label>
      <select
        className="flex align-center border border-solid border-border rounded-md p-1"
        id="theme-select"
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
      >
        {themes.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ThemeSwap
