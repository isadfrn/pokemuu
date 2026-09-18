import { describe, it, expect } from 'vitest'
import { getCards, getCard, countByCategory } from './cardService'
import type { CardCategory } from '@/domain/card'
import type { AnimalId } from '@/domain/animal'

describe('getCards', () => {
  it('tags every card with its owning animal', () => {
    const cards = getCards('cattle')
    expect(cards.length).toBeGreaterThan(0)
    expect(cards.every((c) => c.animal === 'cattle')).toBe(true)
  })

  it('returns an empty array for an animal with no dataset', () => {
    expect(getCards('cat')).toEqual([])
  })
})

describe('getCard', () => {
  it('finds a card by id within an animal', () => {
    const first = getCards('cattle')[0]
    expect(getCard('cattle', first.id)).toEqual(first)
  })

  it('returns undefined for an unknown id', () => {
    expect(getCard('cattle', -1)).toBeUndefined()
  })
})

describe('countByCategory', () => {
  it('sums back to the total number of cards', () => {
    const counts = countByCategory('cattle')
    const total = Object.values(counts).reduce((a, b) => a + b, 0)
    expect(total).toBe(getCards('cattle').length)
  })
})

describe('cardService edge cases', () => {
  it('returns an empty list for an unregistered animal', () => {
    expect(getCards('unknown' as AnimalId)).toEqual([])
  })

  it('returns an empty category breakdown for an animal without cards', () => {
    expect(countByCategory('cat')).toEqual({})
  })

  it('never counts cards that belong to another animal', () => {
    const counts = countByCategory('cattle')
    const categories = Object.keys(counts) as CardCategory[]

    expect(categories.every((category) => counts[category] > 0)).toBe(true)
    expect(categories.length).toBeLessThanOrEqual(4)
  })

  it('returns a fresh array so callers cannot mutate the registry', () => {
    const first = getCards('cattle')
    const second = getCards('cattle')

    expect(first).not.toBe(second)
    first.pop()
    expect(getCards('cattle')).toHaveLength(second.length)
  })

  it('tags cards with the animal they were requested under', () => {
    expect(getCard('cattle', 1)).toEqual({
      id: 1,
      name: expect.any(String),
      category: expect.any(String),
      animal: 'cattle',
    })
  })
})
