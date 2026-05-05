'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { User } from '@supabase/supabase-js'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

type Profile = {
  full_name: string
  role: 'admin' | 'coach' | 'player'
}

const SPA_KEYS = ['about', 'offer', 'schedules', 'prices', 'location', 'contact'] as const

function SpaNavAndLang() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const lang = (searchParams.get('lang') ?? 'es') as Lang
  const nav = t(lang).nav
  const isHome = pathname === '/'

  return (
    <>
      {/* SPA anchor links — desktop, home page only */}
      {isHome && (
        <nav className="hidden lg:flex items-center gap-5 flex-1 justify-center">
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
      )}

      {/* Language switcher — always visible */}
      <div className="flex items-center gap-1 border-l border-white/10 pl-4">
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
    </>
  )
}

export function Header() {
  const pathname = usePathname()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        supabase
          .from('profiles')
          .select('full_name, role')
          .eq('id', user.id)
          .single()
          .then(({ data }) => setProfile(data))
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        if (!session?.user) setProfile(null)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  const initials =
    profile?.full_name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? '?'

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="border-b bg-[#0F0A1A] border-[#2D1060] sticky top-0 z-50">
      <div className="mx-auto max-w-6xl flex h-16 items-center gap-4 px-4">

        {/* Logo */}
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

        {/* App nav for logged-in users on non-home pages */}
        {pathname !== '/' && user && (
          <nav className="hidden md:flex items-center gap-5 flex-1">
            <Link
              href="/resources"
              className="font-display text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              Resources
            </Link>
          </nav>
        )}

        {/* Spacer when not showing app nav */}
        {(pathname === '/' || !user) && <div className="flex-1" />}

        {/* SPA nav + language switcher — reads ?lang from URL */}
        <Suspense>
          <SpaNavAndLang />
        </Suspense>

        {/* Auth */}
        <div className="shrink-0">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-orange-500/20 text-orange-400 font-display">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                {(profile?.role === 'admin' || profile?.role === 'coach') && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Log in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
