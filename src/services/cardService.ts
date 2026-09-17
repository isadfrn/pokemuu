import type { AnimalId } from '@/domain/animal'
import type { Card, CardCategory } from '@/domain/card'
import { ANIMAL_REGISTRY_BY_ID } from '@/data/animals/registry'

export function getCards(animalId: AnimalId): Card[] {
  const entry = ANIMAL_REGISTRY_BY_ID[animalId]
  if (!entry) return []
  return entry.cards.map((raw) => ({ ...raw, animal: animalId }))
}

export function getCard(animalId: AnimalId, id: number): Card | undefined {
  return getCards(animalId).find((c) => c.id === id)
}

export function countByCategory(animalId: AnimalId): Record<CardCategory, number> {
  return getCards(animalId).reduce(
    (acc, card) => {
      acc[card.category] = (acc[card.category] ?? 0) + 1
      return acc
    },
    {} as Record<CardCategory, number>,
  )
}
