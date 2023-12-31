/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="esnext" />

// This is required because bun-types currently removes the libs defined in the tsconfig
// https://github.com/oven-sh/bun/issues/5134

import React from 'react'
import type { Metadata } from 'next'
import Providers from './providers'
import { RouteProgressBar, Navbar } from './components'
import { cookies } from 'next/headers'
import { initialTheme } from '../styles'
import { Open_Sans } from 'next/font/google'
import '../styles/global.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/virtual'

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

const title = 'Crossify Trends'
const { description, applicationName, images } = {
  applicationName: `${title} | Dapp`,
  description: 'Snipe the market seamlessly.',
  images: [
    {
      url: 'crossifyxyz/assets/main/dark-social-banner.png',
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://raw.githubusercontent.com/'),
  title,
  applicationName,
  description,
  openGraph: {
    type: 'website',
    title,
    siteName: applicationName,
    description,
    images,
  },
  twitter: {
    card: 'summary_large_image',
    title: applicationName,
    description,
    images,
  },
}

function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get('theme')?.value ?? initialTheme
  return (
    <html lang="en" data-theme={theme} className={openSans.className}>
      {/* PWA config */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Crossify PWA" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta
        name="viewport"
        content="width=device-width height=device-height initial-scale=1"
      />
      <link rel="icon" href="/icon-512x512.png" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <body>
        <Providers theme={theme}>
          <RouteProgressBar />
          {/* CONTENT */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
