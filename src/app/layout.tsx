//Imports
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

//Define charset
const inter = Inter({ subsets: ['latin'] })

//Set metadata
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

//Render RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {/** Add Providers */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
