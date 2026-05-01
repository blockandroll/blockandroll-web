import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

export default async function AdminPlayersPage() {
  const supabase = await createClient()

  const { data: players } = await supabase
    .from('profiles')
    .select('id, full_name, role, phone, created_at')
    .order('created_at', { ascending: false })

  const roleColors: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-800',
    coach: 'bg-blue-100 text-blue-800',
    player: 'bg-slate-100 text-slate-800',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Players</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!players || players.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No players yet.
                </TableCell>
              </TableRow>
            ) : (
              players.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.full_name}</TableCell>
                  <TableCell>
                    <Badge className={roleColors[p.role] ?? ''}>{p.role}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.phone ?? '—'}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(p.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/players/${p.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
