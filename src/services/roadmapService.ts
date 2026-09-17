import type { AnimalId } from '@/domain/animal'
import type { Card } from '@/domain/card'
import type { ResolvedRoadmap, Roadmap } from '@/domain/roadmap'
import { roadmapAnimals } from '@/domain/roadmap'
import { roadmaps } from '@/data/roadmaps'
import { getCard } from './cardService'

function resolve(roadmap: Roadmap): ResolvedRoadmap {
  const resolvedCards = roadmap.cards
    .map((ref) => getCard(ref.animal, ref.cardId))
    .filter((card): card is Card => card !== undefined)

  return {
    ...roadmap,
    animals: roadmapAnimals(roadmap),
    resolvedCards,
  }
}

export function getRoadmaps(): ResolvedRoadmap[] {
  return roadmaps.map(resolve)
}

export function getRoadmapsForAnimal(animalId: AnimalId): ResolvedRoadmap[] {
  return getRoadmaps().filter((r) => r.animals.includes(animalId))
}

export function countRoadmapsForAnimal(animalId: AnimalId): number {
  return getRoadmapsForAnimal(animalId).length
}

export function getRoadmap(slug: string): ResolvedRoadmap | undefined {
  const roadmap = roadmaps.find((r) => r.slug === slug)
  return roadmap ? resolve(roadmap) : undefined
}
