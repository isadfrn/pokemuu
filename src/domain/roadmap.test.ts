import { describe, it, expect } from 'vitest'
import { cardsOf, roadmapAnimals } from './roadmap'
import type { Roadmap } from './roadmap'

describe('cardsOf', () => {
  it('builds one ref per id, all tagged with the same animal', () => {
    expect(cardsOf('cattle', 1, 2, 3)).toEqual([
      { animal: 'cattle', cardId: 1 },
      { animal: 'cattle', cardId: 2 },
      { animal: 'cattle', cardId: 3 },
    ])
  })

  it('returns an empty array when given no ids', () => {
    expect(cardsOf('cat')).toEqual([])
  })
})

describe('roadmapAnimals', () => {
  it('returns distinct animals in first-seen order', () => {
    const roadmap: Roadmap = {
      slug: 's',
      title: 't',
      description: 'd',
      cards: [...cardsOf('horses', 1), ...cardsOf('cattle', 2), ...cardsOf('horses', 3)],
    }
    expect(roadmapAnimals(roadmap)).toEqual(['horses', 'cattle'])
  })

  it('returns an empty array for a roadmap with no cards', () => {
    const roadmap: Roadmap = { slug: 's', title: 't', description: 'd', cards: [] }
    expect(roadmapAnimals(roadmap)).toEqual([])
  })
})
