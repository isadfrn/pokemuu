/**
 * Card queries. Reads raw datasets from the registry and tags every card with
 * its owning animal so the rest of the app works with fully-resolved cards.
 */

import type { AnimalId } from '@/domain/animal'
import type { Card, CardCategory } from '@/domain/card'
import { ANIMAL_REGISTRY_BY_ID } from '@/data/animals/registry'

/** Resolved cards for an animal (tagged with the animal id), in file order. */
export function getCards(animalId: AnimalId): Card[] {
  const entry = ANIMAL_REGISTRY_BY_ID[animalId]
  if (!entry) return []
  return entry.cards.map((raw) => ({ ...raw, animal: animalId }))
}

/** A single resolved card, or undefined. */
export function getCard(animalId: AnimalId, id: number): Card | undefined {
  return getCards(animalId).find((c) => c.id === id)
}

/** Count of cards per category for an animal. */
export function countByCategory(animalId: AnimalId): Record<CardCategory, number> {
  return getCards(animalId).reduce(
    (acc, card) => {
      acc[card.category] = (acc[card.category] ?? 0) + 1
      return acc
    },
    {} as Record<CardCategory, number>,
  )
}
