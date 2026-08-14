import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/supabase/require-role'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Player = { full_name: string }

type RosterEntry = {
  id: string
  status: string
  player: Player | Player[] | null
}

type TaughtClass = {
  id: string
  title: string
  description: string | null
  level: string
  location: string | null
  capacity: number | null
  starts_at: string | null
  enrollments: RosterEntry[] | null
}

export default async function MyClassesPage() {
  // Portal is admin/coach only for now — see dashboard/page.tsx.
  const { user, role } = await requireRole(['admin', 'coach'])
  const supabase = await createClient()

  // Admins manage the full roster of classes from the admin panel — send them there
  // instead of a personal "classes I teach" view that would be empty for most admins.
  if (role === 'admin') {
    redirect('/admin/classes')
  }

  const { data: classes } = await supabase
    .from('classes')
    .select('id, title, description, level, location, capacity, starts_at, enrollments(id, status, player:profiles(full_name))')
    .eq('instructor_id', user.id)
    .order('starts_at', { ascending: true })
    .returns<TaughtClass[]>()

  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Classes I Teach</h1>
      <p className="text-muted-foreground mb-8">
        Your upcoming sessions and who&apos;s enrolled in each, for planning trainings.
      </p>

      {!classes || classes.length === 0 ? (
        <p className="text-muted-foreground">You are not assigned as instructor for any classes yet.</p>
      ) : (
        <div className="space-y-6">
          {classes.map((cls) => {
            const roster = (cls.enrollments ?? []).filter((e) => e.status === 'active')
            return (
              <Card key={cls.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <CardTitle className="text-lg">{cls.title}</CardTitle>
                    <Badge className={levelColors[cls.level] ?? ''}>{cls.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-4">
                  <div className="space-y-1">
                    {cls.description && <p>{cls.description}</p>}
                    {cls.location && <p>📍 {cls.location}</p>}
                    {cls.starts_at && (
                      <p>📅 {new Date(cls.starts_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    )}
                    {cls.capacity && <p>👥 Up to {cls.capacity} players</p>}
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Roster ({roster.length}{cls.capacity ? `/${cls.capacity}` : ''})
                    </p>
                    {roster.length === 0 ? (
                      <p>No players enrolled yet.</p>
                    ) : (
                      <ul className="list-disc list-inside space-y-0.5">
                        {roster.map((e) => {
                          const player = Array.isArray(e.player) ? e.player[0] : e.player
                          return <li key={e.id}>{player?.full_name ?? 'Unknown player'}</li>
                        })}
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
