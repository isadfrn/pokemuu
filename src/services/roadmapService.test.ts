import { describe, it, expect } from 'vitest'
import { getRoadmap, getRoadmaps } from './roadmapService'

describe('roadmap resolution', () => {
  it('returns undefined for an unknown slug', () => {
    expect(getRoadmap('does-not-exist')).toBeUndefined()
  })

  it('drops references to cards that do not exist', () => {
    const roadmaps = getRoadmaps()
    for (const roadmap of roadmaps) {
      expect(roadmap.resolvedCards.length).toBeLessThanOrEqual(roadmap.cards.length)
      for (const card of roadmap.resolvedCards) {
        expect(roadmap.animals).toContain(card.animal)
      }
    }
  })
})
