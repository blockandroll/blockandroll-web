'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const supabase = createClient()

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
            redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
            localization={{
              variables: {
                sign_in: { email_label: 'Email', password_label: 'Password', button_label: 'Sign in' },
                sign_up: { email_label: 'Email', password_label: 'Password', button_label: 'Create account' },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
