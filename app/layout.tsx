import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import Link from 'next/link'
import Loading from '@/components/Loading'
import { CONFIG } from '@/config'
import ClientThemeWrapper from '@/context/ClientThemeWrapper'
import { FontProvider } from '@/context/FontContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { LayoutProvider, MotionProvider } from '@/providers'
import { fetchMenu } from '@/services/graphql'
import { MenuLocationEnum } from '@/types'

const basiicFont = localFont({
  src: [
    {
      path: '../public/fonts/basiic.woff',
      style: 'normal',
    },
    {
      path: '../public/fonts/basiic.woff2',
    },
  ],
  display: 'swap',
  variable: '--font-basiic',
})

const veniceClassicFont = localFont({
  src: '../public/fonts/VeniceClassic.ttf',
  display: 'swap',
  variable: '--font-venice_classic',
})

const romanceAFont = localFont({
  src: [
    {
      path: '../public/fonts/RomanceA.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/RomanceA.woff',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-romance_a',
})

const gothicpixelsFont = localFont({
  src: [
    {
      path: '../public/fonts/gothicpixels-webfont.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/gothicpixels-webfont.woff',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-gothicpixels',
})

const papernotesFont = localFont({
  src: [
    {
      path: '../public/fonts/papernotes-webfont.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/papernotes-webfont.woff',
      style: 'normal',
    },
    {
      path: '../public/fonts/papernotes_bold-webfont.woff2',
      style: 'bold',
    },
    {
      path: '../public/fonts/papernotes_bold-webfont.woff',
      style: 'bold',
    },
  ],
  display: 'swap',
  variable: '--font-papernotes',
})

const rainyheartsFont = localFont({
  src: [
    {
      path: '../public/fonts/rainyhearts.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/rainyhearts.woff',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-rainyhearts',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm_plex_sans',
  display: 'swap',
  weight: ['400', '700'],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm_plex_mono',
  display: 'swap',
  weight: ['400', '700'],
})

import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: CONFIG.url
    ? new URL(CONFIG.url)
    : new URL(`http://localhost:3000`),
  title: {
    template: `%s - ${CONFIG.siteName}`,
    default: CONFIG.siteName,
  },
  description: CONFIG.siteDescription,
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: {
      default: CONFIG.siteName,
      template: `%s - ${CONFIG.siteName}`,
    },
    description: CONFIG.siteDescription,
    siteName: CONFIG.siteName,
    locale: 'en_US',
    type: 'website',
    url: CONFIG.url,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
}

export default async function RootLayout({
  children,
  header,
  footer,
}: RootLayoutProps) {
  const fetchedSidebarMenu = await fetchMenu(MenuLocationEnum.Sidebar)
  if (!fetchedSidebarMenu) {
    return <Loading />
  }

  if (!fetchedSidebarMenu.nodes) {
    return <Loading />
  }

  const menus = [{ title: 'Info', menu: fetchedSidebarMenu }]
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${basiicFont.variable} ${veniceClassicFont.variable} ${romanceAFont.variable} ${gothicpixelsFont.variable} ${papernotesFont.variable} ${rainyheartsFont.variable}`}
    >
      <body>
        <noscript id="no-js-warning">
          Please enable JavaScript to be able to use all features of the site.
        </noscript>
        <MotionProvider>
          <ThemeProvider>
            <FontProvider>
              <ClientThemeWrapper>
                <Link href="#main" id="skip-to-content-link">
                  Skip to content
                </Link>
                <Link href="/sitemap" id="skip-to-sitemap-link">
                  Go to Sitemap
                </Link>
                <LayoutProvider menus={menus} header={header} footer={footer}>
                  {children}
                </LayoutProvider>
              </ClientThemeWrapper>
            </FontProvider>
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
