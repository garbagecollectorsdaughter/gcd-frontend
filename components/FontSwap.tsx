'use client'

import { useChangeFont } from '@/hooks'

const FontSwap = () => {
  const { fontClass, changeFontClass } = useChangeFont()

  if (!changeFontClass) {
    return null
  }

  return (
    <div id="font-swap">
      <button
        type="button"
        onClick={(e) => {
          if (fontClass === '') {
            changeFontClass('readable-font')
          }
          if (fontClass === 'readable-font') {
            changeFontClass('')
          }
        }}
      >
        <span>toggle font</span>
      </button>
    </div>
  )
}

export default FontSwap
