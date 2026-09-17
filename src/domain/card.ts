import type { AnimalId } from './animal'

export type CardCategory = 'muscles' | 'joints' | 'bones' | 'special'

export type CardFilter = CardCategory | 'all'

export interface RawCard {
  id: number
  name: string
  category: CardCategory
}

export interface Card extends RawCard {
  animal: AnimalId
}

export interface CategoryMeta {
  id: CardFilter
  label: string
  color: string
  bgColor: string
  borderColor: string
  glowColor: string
  icon: string
}

export const CATEGORY_META: Record<CardFilter, CategoryMeta> = {
  all: {
    id: 'all',
    label: 'Todos',
    color: 'text-gold-400',
    bgColor: 'bg-dark-600',
    borderColor: 'border-gold-500/40',
    glowColor: 'rgba(212,175,55,0.3)',
    icon: '⚡',
  },
  muscles: {
    id: 'muscles',
    label: 'Músculos',
    color: 'text-muscles-light',
    bgColor: 'bg-muscles-dark',
    borderColor: 'border-muscles/40',
    glowColor: 'rgba(220,38,38,0.4)',
    icon: '💪',
  },
  joints: {
    id: 'joints',
    label: 'Articulações',
    color: 'text-joints-light',
    bgColor: 'bg-joints-dark',
    borderColor: 'border-joints/40',
    glowColor: 'rgba(5,150,105,0.4)',
    icon: '🔗',
  },
  bones: {
    id: 'bones',
    label: 'Ossos',
    color: 'text-bones-light',
    bgColor: 'bg-bones-dark',
    borderColor: 'border-bones/40',
    glowColor: 'rgba(147,51,234,0.4)',
    icon: '🦴',
  },
  special: {
    id: 'special',
    label: 'Especiais',
    color: 'text-special-light',
    bgColor: 'bg-special-dark',
    borderColor: 'border-special/40',
    glowColor: 'rgba(217,119,6,0.4)',
    icon: '⭐',
  },
}

export const CATEGORY_FILTERS: CardFilter[] = ['all', 'muscles', 'joints', 'bones', 'special']
