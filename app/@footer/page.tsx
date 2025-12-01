import Link from 'next/link'

import AccessCounter from '@/components/AccessCounter'
import { fetchMenu } from '@/services/graphql'
import { MenuLocationEnum } from '@/types'

export default async function Footer() {
  const footerMenu = await fetchMenu(MenuLocationEnum.Footer)

  if (footerMenu.nodes && footerMenu.nodes.length > 0) {
    return (
      <footer className="layout-footer">
        <section>
          <p>
            &copy; 2025-{new Date().getFullYear()} - Garbage Collector&apos;s
            Daughter
          </p>
          <AccessCounter />

          {footerMenu.nodes.length > 0 && (
            <ul className="footer-menu">
              {footerMenu.nodes.map((item) => (
                <li key={item.key}>
                  <Link
                    href={
                      item.path.startsWith('http')
                        ? item.url
                        : `${item.path || ''}`
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </footer>
    )
  }
}
