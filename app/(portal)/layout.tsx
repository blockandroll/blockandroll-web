import { PortalHeader } from '@/components/layout/portal-header'

// Internal admin/coach portal — kept visually and structurally separate
// from the public marketing site (see app/(marketing)/layout.tsx). No
// marketing nav, language switcher, or footer here.
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PortalHeader />
      <main className="flex-1">{children}</main>
    </>
  )
}
