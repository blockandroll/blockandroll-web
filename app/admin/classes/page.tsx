import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { revalidatePath } from 'next/cache'

export default async function AdminClassesPage() {
  const supabase = await createClient()

  const { data: classes } = await supabase
    .from('classes')
    .select('id, title, level, location, capacity, status, starts_at')
    .order('created_at', { ascending: false })

  async function createClass(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const capacityRaw = formData.get('capacity') as string
    await supabase.from('classes').insert({
      title: formData.get('title') as string,
      description: (formData.get('description') as string) || null,
      level: formData.get('level') as string,
      location: (formData.get('location') as string) || null,
      capacity: capacityRaw ? parseInt(capacityRaw) : null,
      instructor_id: user.id,
    })
    revalidatePath('/admin/classes')
  }

  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }

  const statusColors: Record<string, string> = {
    active: 'bg-blue-100 text-blue-800',
    full: 'bg-orange-100 text-orange-800',
    finished: 'bg-gray-100 text-gray-800',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Classes</h1>

      <div className="space-y-3 mb-8">
        {!classes || classes.length === 0 ? (
          <p className="text-muted-foreground text-sm">No classes yet.</p>
        ) : (
          classes.map((cls) => (
            <Card key={cls.id}>
              <CardContent className="py-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-medium">{cls.title}</p>
                  <p className="text-sm text-muted-foreground">{cls.location ?? 'No location'}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={levelColors[cls.level] ?? ''}>{cls.level}</Badge>
                  <Badge className={statusColors[cls.status] ?? ''}>{cls.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Separator className="my-6" />

      <Card>
        <CardHeader><CardTitle>Create a new class</CardTitle></CardHeader>
        <CardContent>
          <form action={createClass} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Beginners – Summer 2025" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <select name="level" id="level" required
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="Beach court name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Max capacity</Label>
                <Input id="capacity" name="capacity" type="number" min="1" placeholder="12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={2} />
            </div>
            <Button type="submit">Create class</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
