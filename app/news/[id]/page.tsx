import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function NewsPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('news_posts')
    .select('id, title, content, external_url, published_at')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (error || !post) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Button asChild variant="ghost" className="mb-6 -ml-4">
        <Link href="/news">← Back to News</Link>
      </Button>

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {post.published_at && (
        <p className="text-sm text-muted-foreground mb-8">
          {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      )}

      {post.external_url && (
        <div className="mb-6 p-4 bg-slate-50 rounded-lg border">
          <p className="text-sm text-muted-foreground mb-2">This post links to an external source:</p>
          <a href={post.external_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
            {post.external_url}
          </a>
        </div>
      )}

      {post.content && (
        <div className="space-y-4">
          {post.content.split('\n').map((paragraph, i) => (
            <p key={i} className="text-muted-foreground">{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  )
}
