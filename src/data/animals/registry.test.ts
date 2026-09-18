import { describe, it, expect } from 'vitest'
import { ANIMAL_REGISTRY, ANIMAL_REGISTRY_BY_ID } from './registry'
import type { AnimalId } from '@/domain/animal'

const REGISTERED_ANIMALS: AnimalId[] = ['cattle', 'dog', 'cat', 'chicken', 'horses', 'goats']
const VALID_CATEGORIES = ['muscles', 'joints', 'bones', 'special']

describe('ANIMAL_REGISTRY', () => {
  it('registers every supported animal in a stable order', () => {
    expect(ANIMAL_REGISTRY.map((entry) => entry.animal.id)).toEqual(REGISTERED_ANIMALS)
  })

  it('gives every animal a non-empty name, singular, emoji and description', () => {
    for (const { animal } of ANIMAL_REGISTRY) {
      expect(animal.name.trim()).not.toBe('')
      expect(animal.singular.trim()).not.toBe('')
      expect(animal.emoji.trim()).not.toBe('')
      expect(animal.description.trim()).not.toBe('')
    }
  })

  it('only marks cattle as available for now', () => {
    const available = ANIMAL_REGISTRY.filter((entry) => entry.animal.available)

    expect(available.map((entry) => entry.animal.id)).toEqual(['cattle'])
  })

  it('ships no cards for animals that are not available yet', () => {
    for (const entry of ANIMAL_REGISTRY) {
      if (!entry.animal.available) expect(entry.cards).toEqual([])
    }
  })

  it('gives every available animal at least one card', () => {
    for (const entry of ANIMAL_REGISTRY) {
      if (entry.animal.available) expect(entry.cards.length).toBeGreaterThan(0)
    }
  })
})

describe('ANIMAL_REGISTRY_BY_ID', () => {
  it('indexes every registered entry by its animal id', () => {
    for (const entry of ANIMAL_REGISTRY) {
      expect(ANIMAL_REGISTRY_BY_ID[entry.animal.id]).toBe(entry)
    }
  })

  it('exposes exactly the registered animals', () => {
    expect(Object.keys(ANIMAL_REGISTRY_BY_ID).sort()).toEqual([...REGISTERED_ANIMALS].sort())
  })
})

describe('cattle card dataset', () => {
  const cattle = ANIMAL_REGISTRY.find((entry) => entry.animal.id === 'cattle')

  it('contains the expected number of cards', () => {
    expect(cattle?.cards).toHaveLength(330)
  })

  it('numbers cards sequentially from 1 without gaps or duplicates', () => {
    const ids = cattle?.cards.map((card) => card.id) ?? []
    expect(ids).toEqual(Array.from({ length: 330 }, (_, i) => i + 1))
  })

  it('uses only known categories', () => {
    for (const card of cattle?.cards ?? []) {
      expect(VALID_CATEGORIES).toContain(card.category)
    }
  })

  it('gives every card a non-empty name', () => {
    for (const card of cattle?.cards ?? []) {
      expect(typeof card.name).toBe('string')
      expect(card.name.trim()).not.toBe('')
    }
  })

  it('covers all four categories', () => {
    const used = new Set(cattle?.cards.map((card) => card.category))
    expect(Array.from(used).sort()).toEqual(Array.from(VALID_CATEGORIES).sort())
  })
})
