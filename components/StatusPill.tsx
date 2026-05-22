'use client'

type Status = 'published' | 'pending' | 'scheduled'

const styles: Record<Status, string> = {
  published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending:   'bg-amber-50 text-amber-700 border-amber-200',
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
}

const labels: Record<Status, string> = {
  published: 'Publié',
  pending:   'En attente',
  scheduled: 'Planifié',
}

export default function StatusPill({ status, extra }: { status: Status; extra?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}{extra ? ` · ${extra}` : ''}
    </span>
  )
}
