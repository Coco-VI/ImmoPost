'use client'
import { useState } from 'react'
import { Plus, Home, Calendar, BarChart2, Settings, Plug, LayoutDashboard, Eye, Edit, Sparkles, Building, Building2 } from 'lucide-react'
import NetworkBadge from '@/components/NetworkBadge'
import StatusPill from '@/components/StatusPill'
import NewAnnonceModal from '@/components/NewAnnonceModal'
import { mockAnnonces } from '@/lib/data'
import { Annonce, NetworkStatus } from '@/lib/types'

const navItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', active: true },
  { icon: Home, label: 'Mes annonces' },
  { icon: Calendar, label: 'Planification' },
  { icon: BarChart2, label: 'Statistiques' },
]

const bottomNav = [
  { icon: Settings, label: 'Paramètres' },
  { icon: Plug, label: 'Connexions API' },
]

function getGlobalStatus(networks: Annonce['networks']): 'published' | 'pending' | 'scheduled' {
  const vals = Object.values(networks).filter(v => v !== 'disabled') as NetworkStatus[]
  if (vals.every(v => v === 'published')) return 'published'
  if (vals.some(v => v === 'scheduled')) return 'scheduled'
  return 'pending'
}

function AnnonceIcon({ type }: { type: string }) {
  const cls = "w-14 h-11 rounded-lg bg-[#E1F5EE] flex items-center justify-center flex-shrink-0"
  if (type === 'Maison') return <div className={cls}><Building2 size={22} className="text-[#1D9E75]" /></div>
  if (type === 'Studio') return <div className={cls}><Building size={22} className="text-[#1D9E75]" /></div>
  return <div className={cls}><Home size={22} className="text-[#1D9E75]" /></div>
}

export default function Dashboard() {
  const [annonces, setAnnonces] = useState<Annonce[]>(mockAnnonces)
  const [showModal, setShowModal] = useState(false)

  const totalViews = annonces.reduce((s, a) => s + (a.views || 0), 0)
  const published = annonces.filter(a => getGlobalStatus(a.networks) === 'published').length
  const pending = annonces.filter(a => getGlobalStatus(a.networks) === 'pending').length

  return (
    <div className="flex h-screen bg-[#F7F6F3] overflow-hidden">

      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col py-4">
        <div className="px-4 pb-4 border-b border-gray-100 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#1D9E75] rounded-lg flex items-center justify-center">
              <Home size={14} className="text-white" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-gray-900 leading-none">ImmoPost</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Réseaux sociaux</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors ${
                item.active
                  ? 'bg-[#E1F5EE] text-[#0F6E56] font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-2 space-y-0.5 border-t border-gray-100 pt-3 mt-2">
          {bottomNav.map(item => (
            <button key={item.label} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <h1 className="text-[15px] font-medium text-gray-900">Tableau de bord</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1D9E75] text-white rounded-lg text-[13px] font-medium hover:bg-[#0F6E56] transition-colors"
          >
            <Plus size={15} />
            Nouvelle annonce
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Annonces actives', value: annonces.length, sub: '+2 ce mois', icon: Home },
              { label: 'Posts publiés', value: published * 3, sub: 'ce mois', icon: BarChart2 },
              { label: 'En attente', value: pending, sub: 'à valider', icon: Calendar },
              { label: 'Vues totales', value: totalViews.toLocaleString('fr-FR'), sub: '+18% vs mois dernier', icon: Eye },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <s.icon size={13} className="text-gray-400" />
                  <p className="text-[12px] text-gray-400">{s.label}</p>
                </div>
                <p className="text-[22px] font-semibold text-gray-900 leading-none">{s.value}</p>
                <p className="text-[11px] text-gray-400 mt-1.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Annonces */}
          <p className="text-[13px] font-medium text-gray-700 mb-3">Annonces récentes</p>
          <div className="space-y-2.5">
            {annonces.map(annonce => {
              const status = getGlobalStatus(annonce.networks)
              return (
                <div key={annonce.id} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-4 items-start hover:border-gray-200 transition-colors">
                  <AnnonceIcon type={annonce.type} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[13px] font-medium text-gray-900 truncate">{annonce.titre} — {annonce.ville}</p>
                      <StatusPill status={status} extra={annonce.scheduledAt} />
                    </div>
                    <p className="text-[12px] text-gray-400 mb-2.5">
                      {annonce.surface} m²{annonce.chambres > 0 ? ` · ${annonce.chambres} chambres` : ' · Studio'}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13px] font-semibold text-[#1D9E75]">
                        {annonce.prix.toLocaleString('fr-FR')} €
                      </span>
                      <span className="text-gray-200">·</span>
                      {Object.entries(annonce.networks).map(([net, stat]) => (
                        <NetworkBadge key={net} network={net} status={stat as any} />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0 items-end">
                    {status === 'pending' && (
                      <button className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-[#E1F5EE] text-[#0F6E56] border border-[#9FE1CB] rounded-lg hover:bg-[#c5eedd] transition-colors">
                        <Sparkles size={11} />
                        Optimiser
                      </button>
                    )}
                    <button className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-gray-400 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Edit size={11} />
                      Modifier
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {showModal && (
        <NewAnnonceModal
          onClose={() => setShowModal(false)}
          onSave={(a) => setAnnonces(prev => [a, ...prev])}
        />
      )}
    </div>
  )
}
