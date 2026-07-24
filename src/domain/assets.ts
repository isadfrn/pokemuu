/**
 * Centralised URL/path helpers.
 *
 * Every reference to a card image and every animal-scoped route goes through
 * here, so the storage layout (`public/cards/<animal>/<id>.webp`) and the URL
 * shape live in exactly one place.
 */

import type { AnimalId } from './animal'
import type { Card } from './card'

/** Public path of a card image for a given animal + card id. */
export function cardImagePath(animal: AnimalId, id: number): string {
  return `/cards/${animal}/${id}.webp`
}

/** Convenience overload for an already-resolved {@link Card}. */
export function cardImage(card: Card): string {
  return cardImagePath(card.animal, card.id)
}

/** Shared card-back image used by the roadmap flash cards. */
export const CARD_BACK_IMAGE = '/background.webp'

/* ---- Route helpers -------------------------------------------------- */

export const atlasHubHref = '/atlas'
export const roteirosHubHref = '/roteiros'

export function atlasHref(animal: AnimalId): string {
  return `/atlas/${animal}`
}

export function atlasCategoryHref(animal: AnimalId, category: string): string {
  return `/atlas/${animal}?category=${category}`
}

export function roteirosHref(animal: AnimalId): string {
  return `/roteiros/${animal}`
}

export function roteiroHref(animal: AnimalId, slug: string): string {
  return `/roteiros/${animal}/${slug}`
}
