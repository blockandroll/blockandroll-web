import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#1E0A3C] to-[#0F0F0F] text-white py-24 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-5xl font-bold mb-4 uppercase tracking-wide">Block &amp; Roll</h1>
          <p className="text-xl text-slate-300 mb-8">
            Beach volleyball classes for all levels in Barcelona.
            Join our community and take your game to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/classes">View Classes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-center mb-12 uppercase">Why Join Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'All Levels Welcome',
                description: 'From complete beginners to competitive players, we have the right class for you.',
              },
              {
                title: 'Expert Coaches',
                description: 'Learn from experienced coaches who track your progress and give personal feedback.',
              },
              {
                title: 'Beach Community',
                description: 'Join a vibrant community of beach volleyball enthusiasts who share your passion.',
              },
            ].map(({ title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-100 py-16 px-4">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-bold mb-4 uppercase">Ready to play?</h2>
          <p className="text-muted-foreground mb-6">
            Browse our upcoming classes and sign up today.
          </p>
          <Button asChild size="lg">
            <Link href="/classes">See All Classes</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
