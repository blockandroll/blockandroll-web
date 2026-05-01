import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const typeIcons: Record<string, string> = {
  video: '🎥',
  pdf: '📄',
  link: '🔗',
  image: '🖼️',
}

const levelColors: Record<string, string> = {
  all: 'bg-slate-100 text-slate-800',
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
}

type Resource = {
  id: string
  title: string
  description: string | null
  type: string
  url: string
  category: string | null
  level: string
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block group">
      <Card className="h-full hover:shadow-md transition-shadow group-hover:border-primary/50">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base group-hover:underline">
              {typeIcons[resource.type] ?? '📎'} {resource.title}
            </CardTitle>
            <Badge className={`${levelColors[resource.level] ?? ''} shrink-0`}>
              {resource.level}
            </Badge>
          </div>
        </CardHeader>
        {resource.description && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
          </CardContent>
        )}
      </Card>
    </a>
  )
}

export default async function ResourcesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: resources } = await supabase
    .from('resources')
    .select('id, title, description, type, url, category, level')
    .order('created_at', { ascending: false })

  const categories = [...new Set((resources ?? []).map((r) => r.category).filter((c): c is string => c !== null))]

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Resources</h1>
      <p className="text-muted-foreground mb-8">Guides, videos, and materials to improve your game.</p>

      {!resources || resources.length === 0 ? (
        <p className="text-muted-foreground">No resources available yet. Check back soon!</p>
      ) : categories.length > 0 ? (
        <div className="space-y-10">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="text-lg font-semibold capitalize mb-4">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.filter((r) => r.category === category).map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      )}
    </div>
  )
}
