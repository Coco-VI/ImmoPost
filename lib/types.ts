export type NetworkStatus = 'published' | 'pending' | 'scheduled' | 'disabled'

export interface NetworkState {
  facebook: NetworkStatus
  instagram: NetworkStatus
  linkedin: NetworkStatus
}

export interface Annonce {
  id: string
  titre: string
  type: string
  surface: number
  chambres: number
  ville: string
  prix: number
  description: string
  networks: NetworkState
  createdAt: string
  scheduledAt?: string
  views?: number
}
