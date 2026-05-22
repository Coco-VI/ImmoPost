import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ImmoPost — Automatisation réseaux sociaux',
  description: 'Publiez vos annonces immobilières automatiquement sur tous vos réseaux',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
