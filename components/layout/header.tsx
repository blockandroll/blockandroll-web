'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

type Profile = {
  full_name: string
  role: 'admin' | 'coach' | 'player'
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

  const navLinks = [
    { href: '/classes', label: 'Classes' },
    { href: '/news', label: 'News' },
    ...(user ? [{ href: '/resources', label: 'Resources' }] : []),
  ]

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const initials = profile?.full_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?'

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Block &amp; Roll
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith(href) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                }
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  render={<Link href="/dashboard" />}
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={<Link href="/profile" />}
                >
                  My Profile
                </DropdownMenuItem>
                {(profile?.role === 'admin' || profile?.role === 'coach') && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      render={<Link href="/admin" />}
                    >
                      Admin Panel
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
            <Button
              size="sm"
              render={<Link href="/login" />}
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
