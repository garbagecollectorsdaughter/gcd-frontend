'use client'

import { useSplittingOnLoad } from '@/hooks'

function RainbowHeaderTitle() {
  useSplittingOnLoad('rainbow')
  return (
    <h1
      data-splitting
      className="rainbow animated title theme-pixel-princess:hidden"
    >
      garbage collector&apos;s daughter
    </h1>
  )
}

export default RainbowHeaderTitle
