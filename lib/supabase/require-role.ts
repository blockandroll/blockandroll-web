import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type Role = 'admin' | 'coach' | 'player'

export async function requireRole(allowedRoles: Role[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !allowedRoles.includes(profile.role as Role)) {
    redirect('/dashboard')
  }

  return { user, role: profile.role as Role }
}

export async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, role, phone, bio')
    .eq('id', user.id)
    .single()

  return profile
}
