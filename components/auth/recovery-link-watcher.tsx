'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Headless — no UI. Mounted once in the root layout so it catches Supabase's
// invite/recovery redirect regardless of which section (marketing or portal)
// the configured Site URL happens to point at.
//
// Supabase's own hosted /auth/v1/verify redirect (used by the dashboard's
// "reset password" / invite actions) lands the session in a #access_token
// hash fragment on whatever `redirect_to` is configured — often just the
// site root — not through our /auth/callback route at all.
export function RecoveryLinkWatcher() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (/type=(recovery|invite)/.test(hash)) {
        router.replace('/auth/set-password')
      } else if (/error=/.test(hash)) {
        // Expired/already-used links redirect with #error=...&error_description=...
        // instead — surface that instead of silently landing wherever redirect_to points.
        const params = new URLSearchParams(hash.slice(1))
        const description = params.get('error_description') ?? 'This link is invalid or has expired.'
        router.replace(`/auth/set-password?error=${encodeURIComponent(description)}`)
      }
    }

    // Fallback in case the hash was already cleared before the check above ran.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        router.replace('/auth/set-password')
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return null
}
