import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/supabase/require-role'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  // The portal is admin/coach only for now — no player self-service exists,
  // so anyone else gets sent to the public site instead of an empty portal.
  const { user } = await requireRole(['admin', 'coach'])
  const supabase = await createClient()

  const [{ data: profile }, { data: taughtClasses }, { data: news }] = await Promise.all([
    supabase.from('profiles').select('full_name, role').eq('id', user.id).single(),
    supabase
      .from('classes')
      .select('id, title, level, location, starts_at')
      .eq('instructor_id', user.id)
      .eq('status', 'active')
      .order('starts_at', { ascending: true })
      .limit(5),
    supabase
      .from('news_posts')
      .select('id, title, published_at, external_url')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3),
  ])

  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">
        Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}
      </h1>
      <p className="text-muted-foreground mb-8">Here&apos;s your overview for running the club.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Classes I Teach */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Classes I Teach</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/my-classes">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {!taughtClasses || taughtClasses.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                You don&apos;t have any classes assigned to teach yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {taughtClasses.map((c) => (
                  <li key={c.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{c.title}</p>
                      {c.location && <p className="text-xs text-muted-foreground">{c.location}</p>}
                    </div>
                    <Badge className={levelColors[c.level] ?? ''}>{c.level}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Latest News</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/news">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {!news || news.length === 0 ? (
              <p className="text-sm text-muted-foreground">No news yet.</p>
            ) : (
              <ul className="space-y-3">
                {news.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={post.external_url ?? `/news/${post.id}`}
                      target={post.external_url ? '_blank' : undefined}
                      rel={post.external_url ? 'noopener noreferrer' : undefined}
                      className="text-sm font-medium hover:underline"
                    >
                      {post.title}
                    </Link>
                    {post.published_at && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
