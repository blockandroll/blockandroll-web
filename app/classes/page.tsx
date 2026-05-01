import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const levelColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
}

export default async function ClassesPage() {
  const supabase = await createClient()

  const { data: classes, error } = await supabase
    .from('classes')
    .select('id, title, description, level, location, capacity, status, starts_at, instructor_id')
    .eq('status', 'active')
    .order('starts_at', { ascending: true })

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Our Classes</h1>
      <p className="text-muted-foreground mb-8">
        Beach volleyball for all levels — find the class that&apos;s right for you.
      </p>

      {error ? (
        <p className="text-muted-foreground">No classes available at the moment. Check back soon!</p>
      ) : !classes || classes.length === 0 ? (
        <p className="text-muted-foreground">No classes available at the moment. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Card key={cls.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{cls.title}</CardTitle>
                  <Badge className={levelColors[cls.level] ?? ''}>
                    {cls.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-3">
                {cls.description && (
                  <p className="text-sm text-muted-foreground">{cls.description}</p>
                )}
                <div className="text-sm space-y-1 text-muted-foreground mt-auto">
                  {cls.location && <p>📍 {cls.location}</p>}
                  {cls.starts_at && (
                    <p>📅 {new Date(cls.starts_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  )}
                  {cls.capacity && <p>👥 Up to {cls.capacity} players</p>}
                </div>
                <Button asChild className="mt-2">
                  <Link href="/login">Sign up for this class</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
