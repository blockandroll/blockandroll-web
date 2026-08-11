'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
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

// Center nav — SPA anchors on home, app links elsewhere
function CenterNav({ user }: { user: User | null }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const lang = (searchParams.get('lang') ?? 'es') as Lang
  const nav = t(lang).nav
  const isHome = pathname === '/'

  if (isHome) {
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

  if (user) {
    return (
      <nav className="hidden md:flex items-center gap-5">
        <Link
          href="/resources"
          className="font-display text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          Resources
        </Link>
      </nav>
    )
  }

  return null
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

export function Header() {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    // Supabase's own hosted /auth/v1/verify redirect (used by the dashboard's
    // "reset password" / invite actions) lands the session in a #access_token
    // hash fragment on whatever `redirect_to` is configured — often just the
    // site root, not our /auth/callback route — so it can land on any page.
    // Catch it here since Header mounts everywhere, before supabase-js
    // finishes parsing/clearing the hash.
    if (typeof window !== 'undefined' && /type=(recovery|invite)/.test(window.location.hash)) {
      router.replace('/auth/set-password')
    }

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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) setProfile(null)
      // Fallback in case the hash was already cleared before the check above ran.
      if (event === 'PASSWORD_RECOVERY') {
        router.replace('/auth/set-password')
      }
    })
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
            <CenterNav user={user} />
          </Suspense>
        </div>

        {/* RIGHT — language switcher + auth */}
        <div className="flex items-center gap-3 shrink-0">
          <Suspense>
            <LangSwitcher />
          </Suspense>

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
          ) : null}
        </div>

      </div>
    </header>
  )
}
