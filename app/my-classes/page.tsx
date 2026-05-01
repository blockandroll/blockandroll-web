import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default async function MyClassesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: enrollments }, { data: notes }] = await Promise.all([
    supabase
      .from('enrollments')
      .select('id, status, enrolled_at, class:classes(id, title, level, location, starts_at, description)')
      .eq('player_id', user.id)
      .order('enrolled_at', { ascending: false }),
    supabase
      .from('coach_notes')
      .select('id, content, created_at, class:classes(title), coach:profiles!coach_id(full_name)')
      .eq('player_id', user.id)
      .order('created_at', { ascending: false }),
  ])

  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }

  const statusColors: Record<string, string> = {
    active: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Classes</h1>

      {/* Enrolled Classes */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Enrollments</h2>
        {!enrollments || enrollments.length === 0 ? (
          <p className="text-muted-foreground">You are not enrolled in any classes yet.</p>
        ) : (
          <div className="space-y-4">
            {enrollments.map((e) => {
              const cls = Array.isArray(e.class) ? e.class[0] : e.class
              if (!cls) return null
              const c = cls as { id: string; title: string; level: string; location: string | null; starts_at: string | null; description: string | null }
              return (
                <Card key={e.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <CardTitle className="text-lg">{c.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={levelColors[c.level] ?? ''}>{c.level}</Badge>
                        <Badge className={statusColors[e.status] ?? ''}>{e.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    {c.description && <p>{c.description}</p>}
                    {c.location && <p>📍 {c.location}</p>}
                    {c.starts_at && (
                      <p>📅 {new Date(c.starts_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      <Separator className="my-8" />

      {/* Coach Notes */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Coach Notes</h2>
        {!notes || notes.length === 0 ? (
          <p className="text-muted-foreground">No coach notes yet.</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => {
              const cls = Array.isArray(note.class) ? note.class[0] : note.class
              const coach = Array.isArray(note.coach) ? note.coach[0] : note.coach
              return (
                <Card key={note.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-4">
                    <p className="text-sm mb-3">{note.content}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {coach && !Array.isArray(coach) ? `Coach: ${(coach as { full_name: string }).full_name}` : ''}
                        {cls && !Array.isArray(cls) ? ` · ${(cls as { title: string }).title}` : ''}
                      </span>
                      <span>{new Date(note.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
