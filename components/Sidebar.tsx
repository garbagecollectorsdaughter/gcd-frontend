import Image from 'next/image'
import Link from 'next/link'

import SidebarNav from '@/components/SidebarNav'
import { WPMenu } from '@/types'
import pinksparkle from '~/images/bullets/pinksparkle.gif'

interface SidebarParams {
  menus: { title: string; menu: WPMenu }[]
}

export default function Sidebar({ menus }: SidebarParams) {
  return (
    <div
      id="sidebar"
      className="relative bg-surface bg-(image:--sidebar-bg) py-2.5 px-3.5"
    >
      <div className="sidebar-inner">
        {menus.map((section) => (
          <div key={section.title}>
            <div className="section-tab">
              <Image src={pinksparkle} alt="" className="section-icon" />
              <div className="section-title">{section.title}</div>
            </div>
            <SidebarNav menu={section.menu} />
          </div>
        ))}

        <>
          <div className="section-tab">
            <Image src={pinksparkle} alt="" className="section-icon" />
            <div className="section-title">Around</div>
          </div>

          <nav>
            <span className="nav-link">
              <Link
                className="block w-full"
                href="https://app.thestorygraph.com/profile/itsonmyholdlist"
                target="_blank"
              >
                Story Graph
              </Link>
            </span>
            <span className="nav-link">
              <Link
                className="block w-full"
                href="https://github.com/meaganewaller"
              >
                GitHub
              </Link>
            </span>
          </nav>
        </>
      </div>
    </div>
  )
}
