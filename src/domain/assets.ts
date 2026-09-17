import type { AnimalId } from './animal'
import type { Card } from './card'

export function cardImagePath(animal: AnimalId, id: number): string {
  return `/cards/${animal}/${id}.webp`
}

export function cardImage(card: Card): string {
  return cardImagePath(card.animal, card.id)
}

export const CARD_BACK_IMAGE = '/background.webp'

export const atlasHubHref = '/atlas'
export const roadmapsHubHref = '/roteiros'

export function atlasHref(animal: AnimalId): string {
  return `/atlas/${animal}`
}

export function atlasCategoryHref(animal: AnimalId, category: string): string {
  return `/atlas/${animal}?category=${category}`
}

export function roadmapsHref(animal: AnimalId): string {
  return `/roteiros/${animal}`
}

export function roadmapHref(animal: AnimalId, slug: string): string {
  return `/roteiros/${animal}/${slug}`
}
