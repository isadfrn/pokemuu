import { describe, it, expect } from 'vitest'
import { getCards, getCard, countByCategory } from './cardService'

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
