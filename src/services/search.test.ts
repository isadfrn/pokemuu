import { describe, it, expect } from 'vitest'
import Fuse from 'fuse.js'
import { createSearchIndex, searchCards } from './search'
import type { Card } from '@/domain/card'

describe('Search functions', () => {
  const mockCards: Card[] = [
    { id: 1, name: 'Biceps', category: 'muscles', animal: 'cattle' },
    { id: 2, name: 'Triceps', category: 'muscles', animal: 'cattle' },
    { id: 3, name: 'Ombro', category: 'joints', animal: 'cattle' },
  ]

  it('creates search index correctly', () => {
    const index = createSearchIndex(mockCards)
    expect(index).toBeInstanceOf(Fuse)
  })

  it('searches cards correctly', () => {
    const index = createSearchIndex(mockCards)
    const results = searchCards(index, 'Biceps')
    // The search is fuzzy, so it might match both Biceps and Triceps (since Triceps contains Biceps)
    expect(results).toHaveLength(2)
    expect(results[0].name).toBe('Biceps')
  })

  it('returns empty array for empty query', () => {
    const index = createSearchIndex(mockCards)
    const results = searchCards(index, '')
    expect(results).toHaveLength(0)
  })

  it('returns empty array for non-matching query', () => {
    const index = createSearchIndex(mockCards)
    const results = searchCards(index, 'NonExistent')
    expect(results).toHaveLength(0)
  })

  it('handles whitespace-only queries', () => {
    const index = createSearchIndex(mockCards)
    const results = searchCards(index, '   ')
    expect(results).toHaveLength(0)
  })
})

describe('Search behaviour', () => {
  const cards: Card[] = [
    { id: 1, name: 'Músculo Bíceps Femoral', category: 'muscles', animal: 'cattle' },
    { id: 2, name: 'Articulação Femorotibial', category: 'joints', animal: 'cattle' },
    { id: 3, name: 'Osso Fêmur', category: 'bones', animal: 'cattle' },
    { id: 4, name: 'Músculo Cardíaco', category: 'special', animal: 'cattle' },
  ]

  it('ignores case differences', () => {
    const index = createSearchIndex(cards)

    const lower = searchCards(index, 'femur').map((card) => card.id)
    const upper = searchCards(index, 'FEMUR').map((card) => card.id)

    expect(lower).toEqual(upper)
    expect(lower).toContain(3)
  })

  it('returns the closest match first', () => {
    const index = createSearchIndex(cards)
    const results = searchCards(index, 'Músculo Cardíaco')

    expect(results[0].id).toBe(4)
  })

  it('tolerates accented characters in both directions', () => {
    const index = createSearchIndex(cards)

    expect(searchCards(index, 'musculo').map((card) => card.id)).toContain(1)
    expect(searchCards(index, 'Músculo').map((card) => card.id)).toContain(1)
  })

  it('ignores queries shorter than the configured match length', () => {
    const index = createSearchIndex(cards)

    expect(searchCards(index, 'a')).toEqual([])
  })

  it('returns an empty list for an empty index', () => {
    const index = createSearchIndex([])

    expect(searchCards(index, 'Bíceps')).toEqual([])
  })

  it('exposes fuse scores through the created index', () => {
    const index = createSearchIndex(cards)
    const results = index.search('Fêmur')

    expect(results.length).toBeGreaterThan(0)
    expect(results[0].score).toBeTypeOf('number')
  })
})
