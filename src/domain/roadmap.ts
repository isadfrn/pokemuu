import type { AnimalId } from './animal'
import type { Card } from './card'

export interface RoadmapCardRef {
  animal: AnimalId
  cardId: number
}

export interface Roadmap {
  slug: string
  title: string
  description: string
  cards: RoadmapCardRef[]
}

export interface ResolvedRoadmap extends Roadmap {
  animals: AnimalId[]
  resolvedCards: Card[]
}

export function cardsOf(animal: AnimalId, ...cardIds: number[]): RoadmapCardRef[] {
  return cardIds.map((cardId) => ({ animal, cardId }))
}

export function roadmapAnimals(roadmap: Roadmap): AnimalId[] {
  const seen = new Set<AnimalId>()
  const ordered: AnimalId[] = []
  for (const ref of roadmap.cards) {
    if (!seen.has(ref.animal)) {
      seen.add(ref.animal)
      ordered.push(ref.animal)
    }
  }
  return ordered
}
