import type { AnimalId } from '@/domain/animal'
import { cardImagePath, atlasHref, roadmapsHref } from '@/domain/assets'
import { getAnimals } from './animalService'
import { getCards } from './cardService'
import { countRoadmapsForAnimal } from './roadmapService'

export interface AnimalPickerItem {
  id: AnimalId
  name: string
  emoji: string
  description: string
  available: boolean
  href: string | null
  meta: string
  previewImages: string[]
}

export type AnimalPickerContext = 'atlas' | 'roadmaps'

function previewImagesFor(animalId: AnimalId): string[] {
  const cards = getCards(animalId)
  if (cards.length === 0) return []
  const picks =
    cards.length <= 3
      ? cards
      : [cards[0], cards[Math.floor(cards.length / 2)], cards[cards.length - 1]]
  return picks.map((c) => cardImagePath(c.animal, c.id))
}

export function buildAnimalPickerItems(context: AnimalPickerContext): AnimalPickerItem[] {
  return getAnimals().map((animal) => {
    if (!animal.available) {
      return {
        id: animal.id,
        name: animal.name,
        emoji: animal.emoji,
        description: animal.description,
        available: false,
        href: null,
        meta: '',
        previewImages: [],
      }
    }

    const href = context === 'atlas' ? atlasHref(animal.id) : roadmapsHref(animal.id)
    const meta =
      context === 'atlas'
        ? `${getCards(animal.id).length} cards`
        : pluralRoadmaps(countRoadmapsForAnimal(animal.id))

    return {
      id: animal.id,
      name: animal.name,
      emoji: animal.emoji,
      description: animal.description,
      available: true,
      href,
      meta,
      previewImages: previewImagesFor(animal.id),
    }
  })
}

function pluralRoadmaps(n: number): string {
  return `${n} roteiro${n === 1 ? '' : 's'}`
}
