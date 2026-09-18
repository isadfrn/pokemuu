import { describe, it, expect } from 'vitest'
import { roadmaps } from './roadmaps'
import { getCard } from '@/services/cardService'
import { roadmapAnimals } from '@/domain/roadmap'

describe('roadmaps dataset', () => {
  it('ships at least one roadmap', () => {
    expect(roadmaps.length).toBeGreaterThan(0)
  })

  it('uses unique, slug-shaped identifiers', () => {
    const slugs = roadmaps.map((r) => r.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  })

  it('gives every roadmap a non-empty title, description and card list', () => {
    for (const roadmap of roadmaps) {
      expect(roadmap.title.trim()).not.toBe('')
      expect(roadmap.description.trim()).not.toBe('')
      expect(roadmap.cards.length).toBeGreaterThan(0)
    }
  })

  it('references only cards that exist in the registry', () => {
    for (const roadmap of roadmaps) {
      for (const ref of roadmap.cards) {
        expect(getCard(ref.animal, ref.cardId)).toBeDefined()
      }
    }
  })

  it('never repeats the same card reference twice', () => {
    for (const roadmap of roadmaps) {
      const keys = roadmap.cards.map((ref) => `${ref.animal}:${ref.cardId}`)
      expect(new Set(keys).size).toBe(keys.length)
    }
  })

  it('keeps every reference consistent with the derived animal list', () => {
    for (const roadmap of roadmaps) {
      const animals = roadmapAnimals(roadmap)
      for (const ref of roadmap.cards) expect(animals).toContain(ref.animal)
    }
  })

  it('describes the cattle myology exam with its expected cards', () => {
    const roadmap = roadmaps.find((r) => r.slug === 'prova-de-miologia')

    expect(roadmap).toBeDefined()
    expect(roadmap?.cards).toHaveLength(11)
    expect(roadmap?.cards.every((ref) => ref.animal === 'cattle')).toBe(true)
  })
})
