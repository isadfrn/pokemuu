/**
 * Roadmap queries. Resolves authored roadmaps (which reference cards as
 * (animal, cardId) pairs) into concrete cards and derives the animals each
 * roadmap belongs to.
 */

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

/** Every roadmap, resolved. */
export function getRoadmaps(): ResolvedRoadmap[] {
  return roadmaps.map(resolve)
}

/** Roadmaps associated with a given animal, resolved. */
export function getRoadmapsForAnimal(animalId: AnimalId): ResolvedRoadmap[] {
  return getRoadmaps().filter((r) => r.animals.includes(animalId))
}

/** How many roadmaps reference a given animal. */
export function countRoadmapsForAnimal(animalId: AnimalId): number {
  return getRoadmapsForAnimal(animalId).length
}

/** A single resolved roadmap by slug, or undefined. */
export function getRoadmap(slug: string): ResolvedRoadmap | undefined {
  const roadmap = roadmaps.find((r) => r.slug === slug)
  return roadmap ? resolve(roadmap) : undefined
}
