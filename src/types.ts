export type NoteType = 'vendor' | 'trip' | 'company'

export type SegmentType = 'air' | 'hotel' | 'car' | 'rail' | 'all'

export interface NoteFilter {
  id: string
  label: string
  color: string
}

export interface Note {
  id: string
  type: NoteType
  title: string
  description: string
  enabled: boolean
  vendor?: string
  filters: string[]
  createdAt: string
  updatedAt: string
}

export const FILTER_OPTIONS: NoteFilter[] = [
  { id: 'all-itineraries', label: 'All itineraries', color: '#e5e7eb' },
  { id: 'all-segments', label: 'All segments', color: '#e5e7eb' },
  { id: 'international', label: 'International', color: '#dbeafe' },
  { id: 'domestic', label: 'Domestic', color: '#dcfce7' },
  { id: 'itineraries-with-hotel', label: 'Itineraries with a hotel', color: '#fef3c7' },
  { id: 'itineraries-with-car', label: 'Itineraries with a car', color: '#fee2e2' },
  { id: 'itineraries-with-air', label: 'Itineraries with air', color: '#f3e8ff' },
  { id: 'itineraries-with-rail', label: 'Itineraries with rail', color: '#cffafe' },
  { id: 'direct-bill', label: 'Direct bill', color: '#e0e7ff' },
  { id: 'rate-assurance', label: 'Rate assurance', color: '#fce7f3' },
  { id: 'virtual-payments', label: 'Virtual payments', color: '#dbeafe' },
]

export const DISPLAY_ON_OPTIONS = [
  { id: 'every-itinerary', label: 'Every itinerary' },
  { id: 'air-segments', label: 'Itineraries that have Air segments' },
  { id: 'car', label: 'Car' },
  { id: 'hotel', label: 'Hotel' },
  { id: 'rail', label: 'Rail' },
]

export const TRIP_TYPE_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'domestic', label: 'Domestic' },
  { id: 'international', label: 'International' },
]

export const VENDOR_OPTIONS = [
  'Hertz',
  'Air China',
  'Delta',
  'Alaska Airlines',
  'Alaskan Airlines',
  'United',
  'American Airlines',
  'Southwest',
  'Marriott',
  'Hilton',
  'Hyatt',
  'Enterprise',
  'National',
  'Avis',
  'Budget',
]
