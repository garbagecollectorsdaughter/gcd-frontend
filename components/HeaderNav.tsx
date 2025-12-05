'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { MenuItem } from '@/types'

type Menu = MenuItem[]

function renderMenuItem(item: MenuItem) {
  return (
    <li key={item.key}>
      <Link
        href={
          item.path && item.path.startsWith('http')
            ? item.url
            : `${item.path || ''}`
        }
        className="menu-item"
      >
        {item.title}
      </Link>
    </li>
  )
}

function AccordionMenu({
  item,
  isMobile,
}: {
  item: MenuItem
  isMobile: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="dropdown" key={item.key}>
      <button
        type="button"
        className={`dropdown__title ${isOpen ? 'open' : ''}`}
        onClick={() => isMobile && setIsOpen(!isOpen)} // Only toggle on mobile
        aria-expanded={isMobile ? isOpen : undefined}
        aria-controls={`${item.title.toLowerCase().replace(/\s+/g, '-')}-dropdown`}
      >
        {item.title}
        {item.children.length > 0 && (
          <span className="arrow">{isMobile ? (isOpen ? '▲' : '▼') : ''}</span>
        )}
      </button>

      {(isMobile && isOpen) || !isMobile ? (
        <ul className={`dropdown__menu ${isMobile && isOpen ? 'open' : ''}`}>
          {item.children.map((child) =>
            child.children.length > 0 ? (
              <AccordionMenu key={child.key} item={child} isMobile={isMobile} />
            ) : (
              renderMenuItem(child)
            )
          )}
        </ul>
      ) : null}
    </li>
  )
}

export function HeaderNav({ menu }: { menu: Menu }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsMenuVisible(!(window.innerWidth < 768))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!menu || menu.length === 0) {
    return null
  }

  return (
    <nav aria-label="Main navigation">
      {isMobile && (
        <button
          type="button"
          className="nav-toggle"
          aria-controls="header-nav-menu"
          aria-expanded={isMenuVisible}
          onClick={() => setIsMenuVisible((prev) => !prev)}
        >
          {isMenuVisible ? 'Hide menu' : 'Show menu'}
        </button>
      )}
      <ul
        id="header-nav-menu"
        className={`menu-list ${isMobile && !isMenuVisible ? 'is-collapsed' : ''}`}
      >
        {menu.map((item) =>
          item.children.length > 0 ? (
            <AccordionMenu key={item.key} item={item} isMobile={isMobile} />
          ) : (
            renderMenuItem(item)
          )
        )}
      </ul>
    </nav>
  )
}
