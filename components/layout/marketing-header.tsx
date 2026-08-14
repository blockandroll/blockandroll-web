'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

// Public marketing site header. Deliberately has no idea whether anyone is
// logged in — the admin/coach portal is a separate section (see
// components/layout/portal-header.tsx) and must never bleed into what a
// public visitor sees here, regardless of auth state.

const SPA_KEYS = ['about', 'offer', 'schedules', 'prices', 'location', 'contact'] as const

// Center nav — SPA anchors on home, nothing elsewhere
function CenterNav() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const lang = (searchParams.get('lang') ?? 'es') as Lang
  const nav = t(lang).nav
  const isHome = pathname === '/'

  if (!isHome) return null

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {SPA_KEYS.map((key) => (
        <a
          key={key}
          href={`#${key}`}
          className="font-display text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          {nav[key]}
        </a>
      ))}
    </nav>
  )
}

// Language switcher — reads ?lang from URL
function LangSwitcher() {
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang') ?? 'es'

  return (
    <div className="flex items-center gap-1 border-l border-white/10 pl-3">
      {(['es', 'en', 'ca'] as const).map((l) => (
        <a
          key={l}
          href={`/?lang=${l}`}
          className={`px-2 py-0.5 rounded font-display text-xs uppercase tracking-wider transition-colors ${
            lang === l ? 'text-orange-500' : 'text-slate-500 hover:text-white'
          }`}
        >
          {l}
        </a>
      ))}
    </div>
  )
}

export function MarketingHeader() {
  return (
    <header className="border-b bg-[#0F0A1A] border-[#2D1060] sticky top-0 z-50">
      <div className="mx-auto max-w-6xl flex h-16 items-center px-4">

        {/* LEFT — Logo */}
        <Link href="/" className="flex items-center gap-1 group shrink-0">
          <span className="font-display text-2xl uppercase tracking-wider text-white group-hover:text-orange-400 transition-colors">
            Block
          </span>
          <span className="font-display text-2xl uppercase tracking-wider text-orange-500">
            N&apos;
          </span>
          <span className="font-display text-2xl uppercase tracking-wider text-white group-hover:text-orange-400 transition-colors">
            Roll
          </span>
        </Link>

        {/* CENTER — flex-1 so it takes all available space and centres its child */}
        <div className="flex-1 flex justify-center">
          <Suspense>
            <CenterNav />
          </Suspense>
        </div>

        {/* RIGHT — language switcher only, no auth UI on the public site */}
        <div className="flex items-center gap-3 shrink-0">
          <Suspense>
            <LangSwitcher />
          </Suspense>
        </div>

      </div>
    </header>
  )
}
