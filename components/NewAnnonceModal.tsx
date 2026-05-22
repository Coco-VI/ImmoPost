'use client'
import { useState } from 'react'
import { X, Send, Home } from 'lucide-react'
import { generateFacebookPost, generateInstagramPost, generateLinkedInPost } from '@/lib/data'
import { Annonce } from '@/lib/types'

interface Props {
  onClose: () => void
  onSave: (a: Annonce) => void
}

export default function NewAnnonceModal({ onClose, onSave }: Props) {
  const [titre, setTitre] = useState('')
  const [prix, setPrix] = useState('')
  const [surface, setSurface] = useState('')
  const [chambres, setChambres] = useState('')
  const [ville, setVille] = useState('')
  const [description, setDescription] = useState('')
  const [fb, setFb] = useState(true)
  const [ig, setIg] = useState(true)
  const [li, setLi] = useState(true)

  const draft: Annonce = {
    id: Date.now().toString(),
    titre: titre || 'Votre annonce',
    type: 'Bien',
    surface: parseInt(surface) || 0,
    chambres: parseInt(chambres) || 0,
    ville: ville || 'votre ville',
    prix: parseInt(prix.replace(/\s/g, '')) || 0,
    description: description || '',
    networks: {
      facebook: fb ? 'published' : 'disabled',
      instagram: ig ? 'published' : 'disabled',
      linkedin: li ? 'published' : 'disabled',
    },
    createdAt: new Date().toISOString().split('T')[0],
    views: 0,
  }

  const hasContent = titre.length > 0

  const handleSubmit = () => {
    if (!titre) return
    onSave(draft)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Home size={18} className="text-[#1D9E75]" />
            <h2 className="text-[15px] font-medium text-gray-900">Nouvelle annonce</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Titre de l'annonce *</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20"
              placeholder="Ex : Appartement T3 lumineux — Montluçon centre"
              value={titre}
              onChange={e => setTitre(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Prix (€)</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20"
                placeholder="Ex : 149000"
                value={prix}
                onChange={e => setPrix(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Surface (m²)</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20"
                placeholder="Ex : 72"
                value={surface}
                onChange={e => setSurface(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Chambres</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20"
                placeholder="Ex : 2"
                value={chambres}
                onChange={e => setChambres(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Ville</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20"
                placeholder="Ex : Montluçon"
                value={ville}
                onChange={e => setVille(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Description courte</label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 resize-none"
              rows={2}
              placeholder="Décrivez brièvement le bien..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Publier sur</label>
            <div className="flex gap-4">
              {[
                { key: 'fb', label: 'Facebook', val: fb, set: setFb },
                { key: 'ig', label: 'Instagram', val: ig, set: setIg },
                { key: 'li', label: 'LinkedIn', val: li, set: setLi },
              ].map(n => (
                <label key={n.key} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={n.val}
                    onChange={e => n.set(e.target.checked)}
                    className="accent-[#1D9E75] w-4 h-4"
                  />
                  {n.label}
                </label>
              ))}
            </div>
          </div>

          {hasContent && (
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
              <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">Aperçu des posts générés</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Facebook', content: generateFacebookPost(draft), show: fb },
                  { label: 'Instagram', content: generateInstagramPost(draft), show: ig },
                  { label: 'LinkedIn', content: generateLinkedInPost(draft), show: li },
                ].map(p => (
                  <div key={p.label} className={`bg-white rounded-lg border p-3 ${p.show ? 'border-gray-200' : 'border-gray-100 opacity-40'}`}>
                    <p className="text-[10px] font-medium text-gray-400 mb-2">{p.label}</p>
                    <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-line line-clamp-6">{p.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!titre}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#1D9E75] rounded-lg hover:bg-[#0F6E56] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
            Publier maintenant
          </button>
        </div>
      </div>
    </div>
  )
}
