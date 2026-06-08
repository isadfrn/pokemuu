export type CardCategory = 'musculos' | 'articulacoes' | 'ossos' | 'especiais'

export interface Card {
  id: number
  name: string
  category: CardCategory
}

export interface CategoryMeta {
  id: CardCategory | 'todos'
  label: string
  color: string
  bgColor: string
  borderColor: string
  glowColor: string
  icon: string
}

export const CATEGORY_META: Record<CardCategory | 'todos', CategoryMeta> = {
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
