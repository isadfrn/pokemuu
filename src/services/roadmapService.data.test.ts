import { describe, it, expect } from 'vitest'
import {
  countRoadmapsForAnimal,
  getRoadmap,
  getRoadmaps,
  getRoadmapsForAnimal,
} from './roadmapService'
import { roadmaps } from '@/data/roadmaps'

describe('roadmapService against the real dataset', () => {
  it('resolves every card reference of every roadmap', () => {
    for (const roadmap of getRoadmaps()) {
      expect(roadmap.resolvedCards).toHaveLength(roadmap.cards.length)
    }
  })

  it('resolves cards in the order they are declared', () => {
    for (const roadmap of getRoadmaps()) {
      expect(roadmap.resolvedCards.map((card) => card.id)).toEqual(
        roadmap.cards.map((ref) => ref.cardId),
      )
    }
  })

  it('derives the animal list from the card references', () => {
    for (const roadmap of getRoadmaps()) {
      expect(Array.from(new Set(roadmap.cards.map((ref) => ref.animal)))).toEqual(roadmap.animals)
    }
  })

  it('keeps the roadmap metadata untouched', () => {
    for (const roadmap of getRoadmaps()) {
      const source = roadmaps.find((r) => r.slug === roadmap.slug)
      expect(roadmap.title).toBe(source?.title)
      expect(roadmap.description).toBe(source?.description)
    }
  })

  it('finds a roadmap by slug', () => {
    expect(getRoadmap('prova-de-miologia')?.title).toBe('Prova de Miologia (15/06/2026)')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getRoadmap('does-not-exist')).toBeUndefined()
  })

  it('filters roadmaps by animal', () => {
    expect(getRoadmapsForAnimal('cattle').map((roadmap) => roadmap.slug)).toEqual([
      'prova-de-miologia',
    ])
    expect(getRoadmapsForAnimal('dog')).toEqual([])
  })

  it('counts roadmaps per animal', () => {
    expect(countRoadmapsForAnimal('cattle')).toBe(roadmaps.length)
    expect(countRoadmapsForAnimal('goats')).toBe(0)
  })
})
