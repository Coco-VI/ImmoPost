import { Annonce } from './types'

export const mockAnnonces: Annonce[] = [
  {
    id: '1',
    titre: 'Appartement T3 lumineux',
    type: 'Appartement',
    surface: 72,
    chambres: 2,
    ville: 'Montluçon centre',
    prix: 149000,
    description: 'Bel appartement traversant au 3e étage avec vue dégagée.',
    networks: { facebook: 'published', instagram: 'published', linkedin: 'published' },
    createdAt: '2024-05-18',
    views: 312,
  },
  {
    id: '2',
    titre: 'Maison 4 pièces avec jardin',
    type: 'Maison',
    surface: 105,
    chambres: 3,
    ville: 'Domérat',
    prix: 215000,
    description: 'Maison de plain-pied avec jardin arboré de 480 m².',
    networks: { facebook: 'published', instagram: 'pending', linkedin: 'disabled' },
    createdAt: '2024-05-20',
    views: 187,
  },
  {
    id: '3',
    titre: 'Studio meublé hyper-centre',
    type: 'Studio',
    surface: 28,
    chambres: 0,
    ville: 'Montluçon',
    prix: 52000,
    description: 'Studio entièrement meublé, idéal investisseur. Loyer 430€/mois.',
    networks: { facebook: 'scheduled', instagram: 'scheduled', linkedin: 'scheduled' },
    createdAt: '2024-05-21',
    scheduledAt: 'lun. 9h00',
    views: 0,
  },
]

export function generateFacebookPost(a: Annonce): string {
  return `🏠 Nouvelle annonce ! ${a.titre} à ${a.ville}\n\n✅ ${a.surface} m² · ${a.chambres > 0 ? a.chambres + ' chambres' : 'Studio'}\n💶 ${a.prix.toLocaleString('fr-FR')} €\n\nContactez-moi pour organiser une visite ! 👇\n\n#immobilier #${a.ville.replace(/\s/g, '').toLowerCase()} #achat #mandataire`
}

export function generateInstagramPost(a: Annonce): string {
  return `✨ ${a.titre.toUpperCase()}\n\n📍 ${a.ville}\n📐 ${a.surface} m²${a.chambres > 0 ? ` · ${a.chambres} chambres` : ''}\n💰 ${a.prix.toLocaleString('fr-FR')} €\n\nCoup de cœur assuré 🤍 Glissez en DM pour une visite !\n\n#immo #immobilier #bienimmobilier #achatimmo #${a.type.toLowerCase()} #investissement`
}

export function generateLinkedInPost(a: Annonce): string {
  return `Je viens de mettre en vente : ${a.titre} à ${a.ville}.\n\n${a.description}\n\n📐 ${a.surface} m² · ${a.prix.toLocaleString('fr-FR')} €\n\nN'hésitez pas à partager autour de vous !\n\n#immobilier #investissement #patrimoine #mandataire`
}
