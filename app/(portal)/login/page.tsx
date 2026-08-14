'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // A successful email/password sign-in just resolves a promise client-side
    // — it doesn't navigate anywhere on its own. Without this, the form sits
    // on /login looking like it did nothing until something else (e.g. a
    // manual refresh) makes proxy.ts notice the new session cookie.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.replace('/dashboard')
        router.refresh()
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome to Block &amp; Roll</CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            view="sign_in"
            showLinks={false}
            redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
            localization={{
              variables: {
                sign_in: { email_label: 'Email', password_label: 'Password', button_label: 'Sign in' },
              },
            }}
          />
          <p className="mt-4 text-center text-sm text-slate-500">
            Internal access only. Need an account? Ask a club admin to create one for you.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
