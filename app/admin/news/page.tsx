import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { revalidatePath } from 'next/cache'

export default async function AdminNewsPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('news_posts')
    .select('id, title, is_published, published_at, external_url')
    .order('created_at', { ascending: false })

  async function createPost(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const publish = formData.get('publish') === 'true'
    await supabase.from('news_posts').insert({
      title: formData.get('title') as string,
      content: (formData.get('content') as string) || null,
      external_url: (formData.get('external_url') as string) || null,
      author_id: user.id,
      is_published: publish,
      published_at: publish ? new Date().toISOString() : null,
    })
    revalidatePath('/admin/news')
  }

  async function togglePublish(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const id = formData.get('id') as string
    const current = formData.get('current') === 'true'
    await supabase.from('news_posts').update({
      is_published: !current,
      published_at: !current ? new Date().toISOString() : null,
    }).eq('id', id)
    revalidatePath('/admin/news')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">News</h1>

      <div className="space-y-3 mb-8">
        {!posts || posts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="py-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-medium">{post.title}</p>
                  {post.external_url && (
                    <p className="text-xs text-muted-foreground truncate max-w-xs">{post.external_url}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={post.is_published ? 'default' : 'outline'}>
                    {post.is_published ? 'Published' : 'Draft'}
                  </Badge>
                  <form action={togglePublish}>
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="current" value={String(post.is_published)} />
                    <Button type="submit" variant="ghost" size="sm">
                      {post.is_published ? 'Unpublish' : 'Publish'}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Separator className="my-6" />

      <Card>
        <CardContent className="pt-6">
          <h2 className="font-semibold mb-4">Create a post</h2>
          <form action={createPost} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="external_url">External URL <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input id="external_url" name="external_url" type="url" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Textarea id="content" name="content" rows={4} />
            </div>
            <div className="flex gap-3">
              <Button type="submit" name="publish" value="false" variant="outline">Save as draft</Button>
              <Button type="submit" name="publish" value="true">Publish now</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
