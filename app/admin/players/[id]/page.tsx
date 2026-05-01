import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

export default async function AdminPlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: player }, { data: notes }, { data: enrollments }] = await Promise.all([
    supabase.from('profiles').select('id, full_name, role, phone, bio, created_at').eq('id', id).single(),
    supabase
      .from('coach_notes')
      .select('id, content, created_at, class:classes(title)')
      .eq('player_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('enrollments')
      .select('id, status, class:classes(title, level)')
      .eq('player_id', id),
  ])

  if (!player) notFound()

  async function addNote(formData: FormData) {
    'use server'
    const content = formData.get('content') as string
    if (!content?.trim()) return
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('coach_notes').insert({
      player_id: id,
      coach_id: user.id,
      content: content.trim(),
    })
    revalidatePath(`/admin/players/${id}`)
  }

  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="-ml-3 mb-4">
        <Link href="/admin/players">← Back to Players</Link>
      </Button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{player.full_name}</h1>
        <Badge variant="outline" className="capitalize">{player.role}</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {player.phone && <p><span className="text-muted-foreground">Phone:</span> {player.phone}</p>}
            {player.bio && <p><span className="text-muted-foreground">Bio:</span> {player.bio}</p>}
            <p>
              <span className="text-muted-foreground">Member since:</span>{' '}
              {new Date(player.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Classes</CardTitle></CardHeader>
          <CardContent>
            {!enrollments || enrollments.length === 0 ? (
              <p className="text-sm text-muted-foreground">Not enrolled in any classes.</p>
            ) : (
              <ul className="space-y-2">
                {enrollments.map((e) => {
                  const cls = Array.isArray(e.class) ? e.class[0] : e.class
                  if (!cls) return null
                  const c = cls as { title: string; level: string }
                  return (
                    <li key={e.id} className="flex items-center justify-between text-sm">
                      <span>{c.title}</span>
                      <Badge className={levelColors[c.level] ?? ''}>{c.level}</Badge>
                    </li>
                  )
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Coach Notes</h2>

        <Card>
          <CardHeader><CardTitle className="text-base">Add a note</CardTitle></CardHeader>
          <CardContent>
            <form action={addNote} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="content">Note</Label>
                <Textarea id="content" name="content" rows={3} placeholder="Write your observation..." required />
              </div>
              <Button type="submit" size="sm">Save note</Button>
            </form>
          </CardContent>
        </Card>

        {notes && notes.length > 0 && (
          <div className="space-y-3">
            {notes.map((note) => {
              const cls = Array.isArray(note.class) ? note.class[0] : note.class
              const className = cls && typeof cls === 'object' && 'title' in cls ? (cls as { title: string }).title : null
              return (
                <Card key={note.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-4">
                    <p className="text-sm mb-2">{note.content}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{className ?? 'General'}</span>
                      <span>{new Date(note.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
