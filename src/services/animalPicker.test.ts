import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Animal } from '@/domain/animal'
import type { Card } from '@/domain/card'
import { buildAnimalPickerItems, type AnimalPickerContext } from './animalPicker'
import { getAnimals } from './animalService'
import { getCards } from './cardService'
import { countRoadmapsForAnimal } from './roadmapService'

// Mock the services
vi.mock('./animalService')
vi.mock('./cardService')
vi.mock('./roadmapService')

describe('AnimalPicker', () => {
  const mockAnimals: Animal[] = [
    {
      id: 'cattle',
      name: 'Bovinos',
      singular: 'Bovino',
      emoji: '🐄',
      description: 'Anatomia bovina: músculos, articulações, ossos e especiais.',
      available: true,
    },
    {
      id: 'dog',
      name: 'Cachorro',
      singular: 'Cachorro',
      emoji: '🐕',
      description: 'Anatomia canina.',
      available: false,
    },
  ]

  const mockCards: Card[] = [
    { id: 1, name: 'Test Card 1', category: 'muscles', animal: 'cattle' },
    { id: 2, name: 'Test Card 2', category: 'joints', animal: 'cattle' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getAnimals).mockReturnValue(mockAnimals)
    vi.mocked(getCards).mockReturnValue(mockCards)
    vi.mocked(countRoadmapsForAnimal).mockReturnValue(2)
  })

  it('builds animal picker items for atlas context', () => {
    const context: AnimalPickerContext = 'atlas'
    const items = buildAnimalPickerItems(context)

    expect(items).toHaveLength(2)

    // First item should be available
    expect(items[0].id).toBe('cattle')
    expect(items[0].available).toBe(true)
    expect(items[0].href).toBe('/atlas/cattle')
    expect(items[0].meta).toBe('2 cards')

    // Second item should be unavailable
    expect(items[1].id).toBe('dog')
    expect(items[1].available).toBe(false)
    expect(items[1].href).toBe(null)
    expect(items[1].meta).toBe('')
  })

  it('builds animal picker items for roadmaps context', () => {
    const context: AnimalPickerContext = 'roadmaps'
    const items = buildAnimalPickerItems(context)

    expect(items).toHaveLength(2)

    // First item should be available
    expect(items[0].id).toBe('cattle')
    expect(items[0].available).toBe(true)
    expect(items[0].href).toBe('/roteiros/cattle')
    expect(items[0].meta).toBe('2 roteiros')

    // Second item should be unavailable
    expect(items[1].id).toBe('dog')
    expect(items[1].available).toBe(false)
    expect(items[1].href).toBe(null)
    expect(items[1].meta).toBe('')
  })

  it('handles empty cards for preview images', () => {
    vi.mocked(getCards).mockReturnValue([])
    const items = buildAnimalPickerItems('atlas')

    expect(items[0].previewImages).toEqual([])
  })

  it('generates preview images correctly', () => {
    const items = buildAnimalPickerItems('atlas')
    expect(items[0].previewImages).toHaveLength(2) // Should have 2 preview images
  })
})
