import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { revalidatePath } from 'next/cache'

const typeIcons: Record<string, string> = {
  video: '🎥', pdf: '📄', link: '🔗', image: '🖼️',
}

const levelColors: Record<string, string> = {
  all: 'bg-slate-100 text-slate-800',
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
}

export default async function AdminResourcesPage() {
  const supabase = await createClient()

  const { data: resources } = await supabase
    .from('resources')
    .select('id, title, type, url, category, level')
    .order('created_at', { ascending: false })

  async function addResource(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('resources').insert({
      title: formData.get('title') as string,
      description: (formData.get('description') as string) || null,
      type: formData.get('type') as string,
      url: formData.get('url') as string,
      category: (formData.get('category') as string) || null,
      level: formData.get('level') as string,
      created_by: user.id,
    })
    revalidatePath('/admin/resources')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Resources</h1>

      <div className="space-y-3 mb-8">
        {!resources || resources.length === 0 ? (
          <p className="text-muted-foreground text-sm">No resources yet.</p>
        ) : (
          resources.map((r) => (
            <Card key={r.id}>
              <CardContent className="py-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-medium">{typeIcons[r.type] ?? '📎'} {r.title}</p>
                  {r.category && <p className="text-xs text-muted-foreground capitalize">{r.category}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={levelColors[r.level] ?? ''}>{r.level}</Badge>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm">Open ↗</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Separator className="my-6" />

      <Card>
        <CardContent className="pt-6">
          <h2 className="font-semibold mb-4">Add a resource</h2>
          <form action={addResource} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" name="url" type="url" placeholder="https://..." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select name="type" id="type" required
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                  <option value="">Select type</option>
                  <option value="video">Video</option>
                  <option value="pdf">PDF</option>
                  <option value="link">Link</option>
                  <option value="image">Image</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <select name="level" id="level" required
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                  <option value="all">All levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input id="category" name="category" placeholder="technique, rules, tactics..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Textarea id="description" name="description" rows={2} />
            </div>
            <Button type="submit">Add resource</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
