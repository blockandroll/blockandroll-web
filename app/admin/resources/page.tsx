import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { revalidatePath } from 'next/cache'
import { requireRole } from '@/lib/supabase/require-role'
import { cn } from '@/lib/utils'

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
    .select('id, title, description, type, url, category, level')
    .order('created_at', { ascending: false })

  async function addResource(formData: FormData) {
    'use server'
    const { user } = await requireRole(['admin', 'coach'])
    const supabase = await createClient()

    // TODO: file upload for resource url would plug in here
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

  async function updateResource(formData: FormData) {
    'use server'
    await requireRole(['admin', 'coach'])
    const supabase = await createClient()

    const id = formData.get('id') as string
    // TODO: file upload for resource url would plug in here
    await supabase.from('resources').update({
      title: formData.get('title') as string,
      description: (formData.get('description') as string) || null,
      type: formData.get('type') as string,
      url: formData.get('url') as string,
      category: (formData.get('category') as string) || null,
      level: formData.get('level') as string,
    }).eq('id', id)
    revalidatePath('/admin/resources')
  }

  async function deleteResource(formData: FormData) {
    'use server'
    // resources_delete RLS policy is admin-only
    await requireRole(['admin'])
    const supabase = await createClient()

    const id = formData.get('id') as string
    await supabase.from('resources').delete().eq('id', id)
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
              <CardContent className="py-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-medium">{typeIcons[r.type] ?? '📎'} {r.title}</p>
                    {r.category && <p className="text-xs text-muted-foreground capitalize">{r.category}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={levelColors[r.level] ?? ''}>{r.level}</Badge>
                    <a href={r.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm">Open ↗</Button>
                    </a>
                    <form action={deleteResource}>
                      <input type="hidden" name="id" value={r.id} />
                      <Button type="submit" variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>

                <details className="mt-3">
                  <summary className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-fit cursor-pointer list-none')}>
                    Edit
                  </summary>
                  <form action={updateResource} className="space-y-4 pt-4">
                    <input type="hidden" name="id" value={r.id} />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${r.id}`}>Title</Label>
                        <Input id={`title-${r.id}`} name="title" defaultValue={r.title} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`url-${r.id}`}>URL</Label>
                        <Input id={`url-${r.id}`} name="url" type="url" placeholder="https://..." defaultValue={r.url} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`type-${r.id}`}>Type</Label>
                        <select name="type" id={`type-${r.id}`} defaultValue={r.type} required
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                          <option value="video">Video</option>
                          <option value="pdf">PDF</option>
                          <option value="link">Link</option>
                          <option value="image">Image</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`level-${r.id}`}>Level</Label>
                        <select name="level" id={`level-${r.id}`} defaultValue={r.level} required
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                          <option value="all">All levels</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`category-${r.id}`}>Category <span className="text-muted-foreground text-xs">(optional)</span></Label>
                        <Input id={`category-${r.id}`} name="category" defaultValue={r.category ?? ''} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`description-${r.id}`}>Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
                      <Textarea id={`description-${r.id}`} name="description" rows={2} defaultValue={r.description ?? ''} />
                    </div>
                    <Button type="submit" size="sm">Save changes</Button>
                  </form>
                </details>
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
