import type { Roadmap } from '@/domain/roadmap'
import { cardsOf } from '@/domain/roadmap'

export const roadmaps: Roadmap[] = [
  {
    slug: 'prova-de-miologia',
    title: 'Prova de Miologia (15/06/2026)',
    description: 'Músculos cutâneos, faciais e do pescoço ao tronco.',
    cards: cardsOf('cattle', 329, 330, 111, 115, 118, 119, 181, 186, 187, 60, 201),
  },
]
