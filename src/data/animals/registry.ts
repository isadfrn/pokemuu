/**
 * Animal registry — the single source of truth for which animals exist, their
 * metadata, and their card datasets.
 *
 * ─── To add a new animal ────────────────────────────────────────────────────
 *  1. Drop its card images in `public/cards/<id>/<cardId>.webp`.
 *  2. Create `src/data/animals/<id>/cards.json` (array of { id, name, category }).
 *  3. Add its id to `AnimalId` in `src/domain/animal.ts`.
 *  4. Import the dataset and add an entry below with `available: true`.
 *
 * No component or page needs to change.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { Animal, AnimalId } from '@/domain/animal'
import type { RawCard } from '@/domain/card'

import bovinosCards from './bovinos/cards.json'

export interface AnimalRegistryEntry {
  animal: Animal
  /** Raw dataset for the animal. Empty while the animal is still "Em breve". */
  cards: RawCard[]
}

export const ANIMAL_REGISTRY: AnimalRegistryEntry[] = [
  {
    animal: {
      id: 'bovinos',
      name: 'Bovinos',
      singular: 'Bovino',
      emoji: '🐄',
      description: 'Anatomia bovina: músculos, articulações, ossos e especiais.',
      available: true,
    },
    cards: bovinosCards as RawCard[],
  },
  {
    animal: {
      id: 'cachorro',
      name: 'Cachorro',
      singular: 'Cachorro',
      emoji: '🐕',
      description: 'Anatomia canina.',
      available: false,
    },
    cards: [],
  },
  {
    animal: {
      id: 'gato',
      name: 'Gato',
      singular: 'Gato',
      emoji: '🐈',
      description: 'Anatomia felina.',
      available: false,
    },
    cards: [],
  },
  {
    animal: {
      id: 'galinha',
      name: 'Galinha',
      singular: 'Galinha',
      emoji: '🐔',
      description: 'Anatomia aviária.',
      available: false,
    },
    cards: [],
  },
  {
    animal: {
      id: 'equinos',
      name: 'Equinos',
      singular: 'Equino',
      emoji: '🐎',
      description: 'Anatomia equina.',
      available: false,
    },
    cards: [],
  },
  {
    animal: {
      id: 'caprinos',
      name: 'Caprinos',
      singular: 'Caprino',
      emoji: '🐐',
      description: 'Anatomia caprina.',
      available: false,
    },
    cards: [],
  },
]

/** Index for O(1) lookups by id. */
export const ANIMAL_REGISTRY_BY_ID: Record<AnimalId, AnimalRegistryEntry> =
  ANIMAL_REGISTRY.reduce(
    (acc, entry) => {
      acc[entry.animal.id] = entry
      return acc
    },
    {} as Record<AnimalId, AnimalRegistryEntry>,
  )
