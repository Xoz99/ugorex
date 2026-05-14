import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Bungee } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk'
})

const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bungee',
})

export const metadata: Metadata = {
  title: 'UGOREX - Premium Screen Protection',
  description: 'Lindungi layar smartphone Anda dengan anti gores premium UGOREX. Kualitas terbaik untuk berbagai merek HP.',
  keywords: ['anti gores', 'screen protector', 'tempered glass', 'HP', 'smartphone', 'UGOREX'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable} ${bungee.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
