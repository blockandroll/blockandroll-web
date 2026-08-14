'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
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

// Header for the internal admin/coach portal — a separate section from the
// public marketing site (components/layout/marketing-header.tsx). Being
// logged in here has no effect on what a public visitor sees.

type Profile = {
  full_name: string
  role: 'admin' | 'coach' | 'player'
}

export function PortalHeader() {
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) setProfile(null)
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
    window.location.href = '/login'
  }

  return (
    <header className="border-b bg-[#0F0A1A] border-[#2D1060] sticky top-0 z-50">
      <div className="mx-auto max-w-6xl flex h-16 items-center px-4">

        {/* LEFT — Logo, links back into the portal, not the public site */}
        <Link href="/dashboard" className="flex items-center gap-1 group shrink-0">
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

        <div className="flex-1 flex justify-center">
          {user && (
            <nav className="hidden md:flex items-center gap-5">
              <Link
                href="/resources"
                className="font-display text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
              >
                Resources
              </Link>
            </nav>
          )}
        </div>

        {/* RIGHT — account menu */}
        <div className="flex items-center gap-3 shrink-0">
          {user && (
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
          )}
        </div>

      </div>
    </header>
  )
}
