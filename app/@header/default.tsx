import Link from 'next/link'

import { HeaderNav } from '@/components/HeaderNav'
import { convertMenuToHierarchal, fetchMenu } from '@/services/graphql'
import { MenuLocationEnum, WPMenu } from '@/types'

export default async function Header() {
  const headerMenu: WPMenu = await fetchMenu(MenuLocationEnum.Header)
  const converted = convertMenuToHierarchal(headerMenu.nodes)

  return (
    <>
      <header className="layout-header">
        <div className="header-title">
          <Link href="/">Garbage Collector&apos;s Daughter</Link>
        </div>
      </header>
      <HeaderNav menu={converted} />
    </>
  )
}
