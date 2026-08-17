export type KitchenStatus = 'yes' | 'no' | 'unclear'
export type FitRating = 'good' | 'warn' | 'bad'
export type FreeOrPaid = 'free' | 'paid'
export type RetreatStatus = 'candidate' | 'saved' | 'starred' | 'archived'
export type AddedBy = 'watson' | 'manual'

export interface Retreat {
  id: string
  name: string
  location: string | null
  distance_miles: number | null
  drive_time: string | null
  price: string | null
  capacity: string | null
  beds: string | null
  baths: string | null
  amenities: string[]
  kitchen_status: KitchenStatus | null
  kitchen_detail: string | null
  fit_rating: FitRating | null
  fit_label: string | null
  notes: string | null
  phone: string | null
  website: string | null
  email: string | null
  source_url: string | null
  free_or_paid: FreeOrPaid | null
  date_added: string
  status: RetreatStatus
  added_by: AddedBy
}

export interface RetreatInput {
  name: string
  location?: string | null
  distance_miles?: number | null
  drive_time?: string | null
  price?: string | null
  capacity?: string | null
  beds?: string | null
  baths?: string | null
  amenities?: string[]
  kitchen_status?: KitchenStatus | null
  kitchen_detail?: string | null
  fit_rating?: FitRating | null
  fit_label?: string | null
  notes?: string | null
  phone?: string | null
  website?: string | null
  email?: string | null
  source_url?: string | null
  free_or_paid?: FreeOrPaid | null
  status?: RetreatStatus
}

export const STATUS_VALUES: RetreatStatus[] = ['candidate', 'saved', 'starred', 'archived']
export const FIT_RATING_VALUES: FitRating[] = ['good', 'warn', 'bad']
