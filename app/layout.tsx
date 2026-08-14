import type { Metadata } from 'next'
import { Inter, Anton } from 'next/font/google'
import './globals.css'
import { RecoveryLinkWatcher } from '@/components/auth/recovery-link-watcher'

const inter = Inter({ subsets: ['latin'] })
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
})

export const metadata: Metadata = {
  title: 'Block N\' Roll — Beach Volleyball Club',
  description: 'Beach volleyball classes for all levels in Barcelona.',
}

// Shared shell only — the marketing site and the admin/coach portal each
// define their own header/footer in their own route group layout, so that
// being logged into the portal never shows up on the public site.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${anton.variable} min-h-screen flex flex-col bg-slate-50`}>
        <RecoveryLinkWatcher />
        {children}
      </body>
    </html>
  )
}
