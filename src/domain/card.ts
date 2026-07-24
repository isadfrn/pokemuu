/**
 * Card domain model.
 *
 * A card is a single Pokémon-style anatomical card. Cards are authored per
 * animal (see `src/data/animals/<id>/cards.json`) without repeating the animal
 * on every entry — the raw shape is {@link RawCard}. The services layer tags
 * each raw card with its owning animal to produce a fully-resolved {@link Card}.
 */

import type { AnimalId } from './animal'

/** Anatomical category shared by every animal. */
export type CardCategory = 'musculos' | 'articulacoes' | 'ossos' | 'especiais'

/** Filter that also includes the "all" pseudo-category. */
export type CardFilter = CardCategory | 'todos'

/** Raw card as stored in each animal's `cards.json` — animal is implicit. */
export interface RawCard {
  id: number
  name: string
  category: CardCategory
}

/** Fully-resolved card, tagged with the animal it belongs to. */
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
  todos: {
    id: 'todos',
    label: 'Todos',
    color: 'text-gold-400',
    bgColor: 'bg-dark-600',
    borderColor: 'border-gold-500/40',
    glowColor: 'rgba(212,175,55,0.3)',
    icon: '⚡',
  },
  musculos: {
    id: 'musculos',
    label: 'Músculos',
    color: 'text-musculos-light',
    bgColor: 'bg-musculos-dark',
    borderColor: 'border-musculos/40',
    glowColor: 'rgba(220,38,38,0.4)',
    icon: '💪',
  },
  articulacoes: {
    id: 'articulacoes',
    label: 'Articulações',
    color: 'text-articulacoes-light',
    bgColor: 'bg-articulacoes-dark',
    borderColor: 'border-articulacoes/40',
    glowColor: 'rgba(5,150,105,0.4)',
    icon: '🔗',
  },
  ossos: {
    id: 'ossos',
    label: 'Ossos',
    color: 'text-ossos-light',
    bgColor: 'bg-ossos-dark',
    borderColor: 'border-ossos/40',
    glowColor: 'rgba(147,51,234,0.4)',
    icon: '🦴',
  },
  especiais: {
    id: 'especiais',
    label: 'Especiais',
    color: 'text-especiais-light',
    bgColor: 'bg-especiais-dark',
    borderColor: 'border-especiais/40',
    glowColor: 'rgba(217,119,6,0.4)',
    icon: '⭐',
  },
}

/** Ordered list of category filters for the atlas filter bar. */
export const CATEGORY_FILTERS: CardFilter[] = [
  'todos',
  'musculos',
  'articulacoes',
  'ossos',
  'especiais',
]
