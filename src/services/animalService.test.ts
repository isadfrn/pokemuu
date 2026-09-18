import { describe, it, expect, vi } from 'vitest'
import { getAnimals, getAvailableAnimals, getAnimal, getAvailableAnimal } from './animalService'
import { ANIMAL_REGISTRY, ANIMAL_REGISTRY_BY_ID } from '@/data/animals/registry'

// Mock the registry data
vi.mock('@/data/animals/registry', () => ({
  ANIMAL_REGISTRY: [
    {
      animal: {
        id: 'cattle',
        name: 'Bovinos',
        singular: 'Bovino',
        emoji: '🐄',
        description: 'Anatomia bovina: músculos, articulações, ossos e especiais.',
        available: true,
      },
      cards: [],
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
  ],
  ANIMAL_REGISTRY_BY_ID: {
    cattle: {
      animal: {
        id: 'cattle',
        name: 'Bovinos',
        singular: 'Bovino',
        emoji: '🐄',
        description: 'Anatomia bovina: músculos, articulações, ossos e especiais.',
        available: true,
      },
      cards: [],
    },
    dog: {
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
  },
}))

describe('AnimalService', () => {
  it('getAnimals returns all animals', () => {
    const animals = getAnimals()
    expect(animals).toHaveLength(2)
    expect(animals[0].id).toBe('cattle')
    expect(animals[1].id).toBe('dog')
  })

  it('getAvailableAnimals returns only available animals', () => {
    const animals = getAvailableAnimals()
    expect(animals).toHaveLength(1)
    expect(animals[0].id).toBe('cattle')
    expect(animals[0].available).toBe(true)
  })

  it('getAnimal returns animal by id', () => {
    const animal = getAnimal('cattle')
    expect(animal).toBeDefined()
    expect(animal?.id).toBe('cattle')

    const nonExistent = getAnimal('non-existent')
    expect(nonExistent).toBeUndefined()
  })

  it('getAvailableAnimal returns available animal by id', () => {
    const animal = getAvailableAnimal('cattle')
    expect(animal).toBeDefined()
    expect(animal?.id).toBe('cattle')
    expect(animal?.available).toBe(true)

    const unavailable = getAvailableAnimal('dog')
    expect(unavailable).toBeUndefined()

    const nonExistent = getAvailableAnimal('non-existent')
    expect(nonExistent).toBeUndefined()
  })
})
