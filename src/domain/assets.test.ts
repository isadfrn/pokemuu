import { describe, it, expect } from 'vitest'
import type { Card } from './card'
import {
  cardImagePath,
  cardImage,
  CARD_BACK_IMAGE,
  atlasHubHref,
  roadmapsHubHref,
  atlasHref,
  atlasCategoryHref,
  roadmapsHref,
  roadmapHref,
} from './assets'

describe('Assets functions', () => {
  it('generates card image path correctly', () => {
    expect(cardImagePath('cattle', 1)).toBe('/cards/cattle/1.webp')
    expect(cardImagePath('dog', 42)).toBe('/cards/dog/42.webp')
  })

  it('generates card image URL correctly', () => {
    const mockCard: Card = { animal: 'cattle', id: 1, name: 'Test', category: 'muscles' }
    expect(cardImage(mockCard)).toBe('/cards/cattle/1.webp')
  })

  it('defines CARD_BACK_IMAGE correctly', () => {
    expect(CARD_BACK_IMAGE).toBe('/background.webp')
  })

  it('defines atlasHubHref correctly', () => {
    expect(atlasHubHref).toBe('/atlas')
  })

  it('defines roadmapsHubHref correctly', () => {
    expect(roadmapsHubHref).toBe('/roteiros')
  })

  it('generates atlas href correctly', () => {
    expect(atlasHref('cattle')).toBe('/atlas/cattle')
    expect(atlasHref('dog')).toBe('/atlas/dog')
  })

  it('generates atlas category href correctly', () => {
    expect(atlasCategoryHref('cattle', 'muscles')).toBe('/atlas/cattle?category=muscles')
  })

  it('generates roadmaps href correctly', () => {
    expect(roadmapsHref('cattle')).toBe('/roteiros/cattle')
  })

  it('generates roadmap href correctly', () => {
    expect(roadmapHref('cattle', 'test-slug')).toBe('/roteiros/cattle/test-slug')
  })
})
