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

  const normalizePathname = (path?: string) => {
    if (!path) return '/'
    if (path === '/') return '/'
    return path.replace(/\/$/, '')
  }

  const normalizedPathname = normalizePathname(pathname)
  const pagePaths = new Set(['/colophon', '/about', '/start-here', '/sitemap'])
  const slugPaths = ['category', 'post']
  const baseSegment = pathname?.split('/')[1] ?? ''

  const layoutType =
    normalizedPathname === '/'
      ? 'home'
      : pagePaths.has(normalizedPathname)
        ? 'page'
        : slugPaths.includes(baseSegment)
          ? 'slug'
          : 'default'

  const layoutClass = layoutType === 'home' ? 'index' : 'page'

  useEffect(() => {
    document.body.classList.remove('index', 'page')
    document.body.classList.add(layoutClass)

    return () => {
      document.body.classList.remove('index', 'page')
    }
  })

  if (layoutType === 'home') {
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

  if (layoutType === 'slug') {
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
