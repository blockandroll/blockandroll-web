import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default async function NewsPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('news_posts')
    .select('id, title, content, external_url, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">News</h1>
      <p className="text-muted-foreground mb-8">
        Latest from the beach volleyball world and Block &amp; Roll.
      </p>

      {error || !posts || posts.length === 0 ? (
        <p className="text-muted-foreground">No news yet. Check back soon!</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <Link
                href={post.external_url ?? `/news/${post.id}`}
                target={post.external_url ? '_blank' : undefined}
                rel={post.external_url ? 'noopener noreferrer' : undefined}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg hover:underline">{post.title}</CardTitle>
                    {post.external_url && (
                      <Badge variant="outline" className="shrink-0">External ↗</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    {post.content && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                    )}
                    {post.published_at && (
                      <p className="text-xs text-muted-foreground shrink-0 ml-4">
                        {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
