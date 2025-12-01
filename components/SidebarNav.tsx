import Link from 'next/link'
import type { WPMenu, WPMenuItem } from '@/types'

interface SidebarNavParams {
  menu: WPMenu
}

export default function SidebarNav(params: SidebarNavParams) {
  return (
    <nav>
      {params.menu &&
        params.menu.nodes.map((item: WPMenuItem) => (
          <span key={item.key} className="nav-link">
            <Link href={item.path}>{item.title}</Link>
          </span>
        ))}
    </nav>
  )
}
