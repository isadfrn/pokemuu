import { describe, it, expect } from 'vitest'
import type { CardCategory, CardFilter, CategoryMeta } from './card'
import { CATEGORY_META, CATEGORY_FILTERS } from './card'

describe('Card types and constants', () => {
  it('defines CardCategory type correctly', () => {
    const categories: CardCategory[] = ['muscles', 'joints', 'bones', 'special']
    expect(categories).toEqual(['muscles', 'joints', 'bones', 'special'])
  })

  it('defines CardFilter type correctly', () => {
    const filters: CardFilter[] = ['all', 'muscles', 'joints', 'bones', 'special']
    expect(filters).toEqual(['all', 'muscles', 'joints', 'bones', 'special'])
  })

  it('defines CATEGORY_META correctly', () => {
    expect(CATEGORY_META).toBeDefined()
    expect(CATEGORY_META.all).toBeDefined()
    expect(CATEGORY_META.muscles).toBeDefined()
    expect(CATEGORY_META.joints).toBeDefined()
    expect(CATEGORY_META.bones).toBeDefined()
    expect(CATEGORY_META.special).toBeDefined()
  })

  it('defines CATEGORY_FILTERS correctly', () => {
    expect(CATEGORY_FILTERS).toEqual(['all', 'muscles', 'joints', 'bones', 'special'])
  })
})

describe('CATEGORY_META invariants', () => {
  it('keys every entry by its own id', () => {
    for (const filter of CATEGORY_FILTERS) {
      expect(CATEGORY_META[filter].id).toBe(filter)
    }
  })

  it('declares exactly the same keys as CATEGORY_FILTERS', () => {
    expect(Object.keys(CATEGORY_META).sort()).toEqual([...CATEGORY_FILTERS].sort())
  })

  it('gives every entry a label, icon and full tailwind colour set', () => {
    for (const filter of CATEGORY_FILTERS) {
      const meta: CategoryMeta = CATEGORY_META[filter]

      expect(meta.label.trim()).not.toBe('')
      expect(meta.icon.trim()).not.toBe('')
      expect(meta.color).toMatch(/^text-/)
      expect(meta.bgColor).toMatch(/^bg-/)
      expect(meta.borderColor).toMatch(/^border-/)
      expect(meta.glowColor).toMatch(/^rgba\(/)
    }
  })

  it('covers every concrete card category plus the "all" pseudo filter', () => {
    const concrete: CardCategory[] = ['muscles', 'joints', 'bones', 'special']

    for (const category of concrete) {
      expect(CATEGORY_FILTERS).toContain(category)
      expect(CATEGORY_META[category].label).not.toBe('')
    }
    expect(CATEGORY_FILTERS).toContain('all')
  })

  it('uses unique labels and glow colours', () => {
    const labels = CATEGORY_FILTERS.map((filter) => CATEGORY_META[filter].label)
    const glows = CATEGORY_FILTERS.map((filter) => CATEGORY_META[filter].glowColor)

    expect(new Set(labels).size).toBe(labels.length)
    expect(new Set(glows).size).toBe(glows.length)
  })
})
