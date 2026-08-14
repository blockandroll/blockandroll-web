import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function AdminPage() {
  const supabase = await createClient()

  const [
    { count: playerCount },
    { count: classCount },
    { count: newsCount },
    { count: resourceCount },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'player'),
    supabase.from('classes').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('resources').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Players', value: playerCount ?? 0, href: '/admin/players' },
    { label: 'Active Classes', value: classCount ?? 0, href: '/admin/classes' },
    { label: 'Published News', value: newsCount ?? 0, href: '/admin/news' },
    { label: 'Resources', value: resourceCount ?? 0, href: '/admin/resources' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, href }) => (
          <Link key={label} href={href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
