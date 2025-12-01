'use client'

import FontSwap from '@/components/FontSwap'
import RightSidebar from '@/components/RightSidebar'
import Sidebar from '@/components/Sidebar'
import ThemeSwap from '@/components/ThemeSwap'
import { WPMenu } from '@/types'

interface LayoutProviderProps {
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
  menus: { title: string; menu: WPMenu }[]
}

export const LayoutProvider = ({
  children,
  header,
  footer,
  menus,
}: LayoutProviderProps) => {
  return (
    <div id="home-layout" className="layout">
      <ThemeSwap />
      <FontSwap />
      {header}
      <Sidebar menus={menus} />
      <main className="[grid-area:main] bg-surface border-2 border-border border-t-0 leading-1.5 pt-24 w-full overflow-y-auto p-8">
        {children}
      </main>
      <RightSidebar />
      {footer}
    </div>
  )
}
