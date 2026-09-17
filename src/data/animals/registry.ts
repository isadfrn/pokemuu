import type { Animal, AnimalId } from '@/domain/animal'
import type { RawCard } from '@/domain/card'

import cattleCards from './cattle/cards.json'

export interface AnimalRegistryEntry {
  animal: Animal
  cards: RawCard[]
}

export const ANIMAL_REGISTRY: AnimalRegistryEntry[] = [
  {
    animal: {
      id: 'cattle',
      name: 'Bovinos',
      singular: 'Bovino',
      emoji: '🐄',
      description: 'Anatomia bovina: músculos, articulações, ossos e especiais.',
      available: true,
    },
    cards: cattleCards as RawCard[],
  },
  {
    animal: {
      id: 'dog',
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
      id: 'cat',
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
      id: 'chicken',
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
      id: 'horses',
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
      id: 'goats',
      name: 'Caprinos',
      singular: 'Caprino',
      emoji: '🐐',
      description: 'Anatomia caprina.',
      available: false,
    },
    cards: [],
  },
]

export const ANIMAL_REGISTRY_BY_ID: Record<AnimalId, AnimalRegistryEntry> = ANIMAL_REGISTRY.reduce(
  (acc, entry) => {
    acc[entry.animal.id] = entry
    return acc
  },
  {} as Record<AnimalId, AnimalRegistryEntry>,
)
