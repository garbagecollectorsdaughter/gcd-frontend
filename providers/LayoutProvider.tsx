'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

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
  const pathname = usePathname()

  const indexPaths = ['/']
  const pagePaths = [
    '/colophon',
    '/colophon/',
    '/about',
    '/about/',
    '/start-here',
    '/start-here/',
    '/sitemap',
    '/sitemap/',
  ]
  const slugPaths = ['category']

  const useSlugPath = slugPaths.includes(pathname.split('/')[1])

  useEffect(() => {
    if (indexPaths.includes(pathname)) {
      document.body.setAttribute('class', '')
      document.body.classList.add('index')
    }

    if (pagePaths.includes(pathname)) {
      document.body.setAttribute('class', '')
      document.body.classList.add('page')
    }

    if (useSlugPath) {
      document.body.setAttribute('class', '')
      document.body.classList.add('page')
    }
  })

  if (indexPaths.includes(pathname)) {
    return (
      <div id="home-layout" className="layout">
        <ThemeSwap />
        <FontSwap />
        {header}
        <Sidebar menus={menus} />
        <main className="[grid-area:main] bg-surface border-2 border-border border-t-0 p-8 w-full md:pt-30 md:overflow-y-auto">
          {children}
        </main>
        <RightSidebar />
        {footer}
      </div>
    )
  }

  if (useSlugPath) {
    return (
      <div id="slug-layout" className="layout">
        <ThemeSwap />
        <FontSwap />
        {header}
        <main className="[grid-area:main] bg-surface border-2 border-border border-t-0 p-8 w-full md:overflow-y-auto md:pt-30">
          {children}
        </main>
        {footer}
      </div>
    )
  }

  if (pagePaths.includes(pathname)) {
    return (
      <div id="page-layout" className="layout">
        <ThemeSwap />
        <FontSwap />
        {header}
        <Sidebar menus={menus} />
        <main className="[grid-area:main] bg-surface border-2 border-border border-t-0 p-8 w-full md:overflow-y-auto md:pt-30">
          {children}
        </main>
        {footer}
      </div>
    )
  }
}
