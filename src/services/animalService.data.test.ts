import { describe, it, expect } from 'vitest'
import { getAnimals, getAvailableAnimals, getAnimal, getAvailableAnimal } from './animalService'

describe('animalService against the real registry', () => {
  it('returns every registered animal in order', () => {
    expect(getAnimals().map((animal) => animal.id)).toEqual([
      'cattle',
      'dog',
      'cat',
      'chicken',
      'horses',
      'goats',
    ])
  })

  it('narrows down to the animals that are available', () => {
    expect(getAvailableAnimals().map((animal) => animal.id)).toEqual(['cattle'])
  })

  it('looks an animal up by id', () => {
    expect(getAnimal('horses')?.name).toBe('Equinos')
    expect(getAnimal('goats')?.emoji).toBe('🐐')
  })

  it('returns undefined for an id that is not registered', () => {
    expect(getAnimal('unicorn')).toBeUndefined()
    expect(getAvailableAnimal('unicorn')).toBeUndefined()
  })

  it('rejects animals that are registered but not available', () => {
    expect(getAvailableAnimal('cat')).toBeUndefined()
    expect(getAvailableAnimal('dog')).toBeUndefined()
  })

  it('returns the animal itself when it is available', () => {
    expect(getAvailableAnimal('cattle')).toMatchObject({ id: 'cattle', available: true })
  })
})
