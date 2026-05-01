import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const adminNav = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/players', label: 'Players' },
  { href: '/admin/classes', label: 'Classes' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/resources', label: 'Resources' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !['admin', 'coach'].includes(profile.role)) {
    redirect('/dashboard')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex gap-8">
        <aside className="w-48 shrink-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Admin</p>
          <Separator className="mb-3" />
          <nav className="flex flex-col gap-1">
            {adminNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm px-3 py-2 rounded-md hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
