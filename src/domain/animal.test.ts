import { describe, it, expect } from 'vitest'
import type { Animal, AnimalId } from './animal'

describe('Animal types', () => {
  it('defines AnimalId type correctly', () => {
    const validIds: AnimalId[] = ['cattle', 'dog', 'cat', 'chicken', 'horses', 'goats']
    expect(validIds).toEqual(['cattle', 'dog', 'cat', 'chicken', 'horses', 'goats'])
  })

  it('defines Animal interface correctly', () => {
    const animal: Animal = {
      id: 'cattle',
      name: 'Bovinos',
      singular: 'Bovino',
      emoji: '🐄',
      description: 'Anatomia bovina: músculos, articulações, ossos e especiais.',
      available: true,
    }
    expect(animal).toEqual({
      id: 'cattle',
      name: 'Bovinos',
      singular: 'Bovino',
      emoji: '🐄',
      description: 'Anatomia bovina: músculos, articulações, ossos e especiais.',
      available: true,
    })
  })
})
