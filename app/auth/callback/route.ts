import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'

  const supabase = await createClient()

  // Supabase sends different link shapes depending on the flow: normal
  // OAuth/PKCE confirmations carry `code`, but admin-issued invite and
  // recovery emails carry `token_hash` + `type` instead (there's no PKCE
  // verifier on this device for those, since the flow was started server-side
  // by an admin, not by this browser) — handle both.
  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : token_hash && type
      ? await supabase.auth.verifyOtp({ token_hash, type })
      : { error: new Error('Missing auth code/token in callback URL') }

  if (!error) {
    // Invite/recovery links log the user in, but their account has no
    // password set (or needs a new one) — send them to set one instead of
    // straight into the app.
    if (type === 'invite' || type === 'recovery') {
      return NextResponse.redirect(`${origin}/auth/set-password`)
    }
    return NextResponse.redirect(`${origin}${next}`)
  }

  return NextResponse.redirect(`${origin}/login?error=auth_error`)
}
