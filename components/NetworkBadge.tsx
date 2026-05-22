'use client'
import { NetworkStatus } from '@/lib/types'

const configs: Record<NetworkStatus, { dot: string; bg: string; text: string; border: string }> = {
  published: { dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
  pending:   { dot: 'bg-amber-400',   bg: 'bg-amber-50',   text: 'text-amber-800',   border: 'border-amber-200' },
  scheduled: { dot: 'bg-blue-400',    bg: 'bg-blue-50',    text: 'text-blue-800',     border: 'border-blue-200' },
  disabled:  { dot: 'bg-gray-300',    bg: 'bg-gray-50',    text: 'text-gray-400',     border: 'border-gray-200' },
}

const labels: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
}

interface Props {
  network: string
  status: NetworkStatus
}

export default function NetworkBadge({ network, status }: Props) {
  const c = configs[status]
  if (status === 'disabled') return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border ${c.bg} ${c.text} ${c.border}`}>
      {labels[network]} —
    </span>
  )
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {labels[network]}
    </span>
  )
}
