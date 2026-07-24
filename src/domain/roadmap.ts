/**
 * Roadmap (roteiro de estudo) domain model.
 *
 * A roadmap is an ordered study selection of cards. Because a roadmap may span
 * more than one animal, each card is referenced as an (animal, cardId) pair
 * rather than a bare id. The list of animals a roadmap belongs to is *derived*
 * from its card references — there is a single source of truth.
 */

import type { AnimalId } from './animal'
import type { Card } from './card'

/** Points at one card within a specific animal's dataset. */
export interface RoadmapCardRef {
  animal: AnimalId
  cardId: number
}

/** Authored roadmap definition. */
export interface Roadmap {
  slug: string
  title: string
  description: string
  cards: RoadmapCardRef[]
}

/** Roadmap with its references resolved into concrete cards. */
export interface ResolvedRoadmap extends Roadmap {
  /** Distinct animals referenced by this roadmap, in first-seen order. */
  animals: AnimalId[]
  /** The resolved cards, in authoring order (missing refs dropped). */
  resolvedCards: Card[]
}

/**
 * Authoring helper: build card references for a single animal from a list of
 * ids. Compose calls to span multiple animals, e.g.
 *
 * ```ts
 * cards: [...cardsOf('bovinos', 1, 2, 3), ...cardsOf('equinos', 4, 5)]
 * ```
 */
export function cardsOf(animal: AnimalId, ...cardIds: number[]): RoadmapCardRef[] {
  return cardIds.map((cardId) => ({ animal, cardId }))
}

/** Distinct animals of a roadmap, in first-seen order. */
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
