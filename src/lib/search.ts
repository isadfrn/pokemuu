import Fuse from 'fuse.js'
import type { Card } from '@/types/card'

export function createSearchIndex(cards: Card[]): Fuse<Card> {
  return new Fuse(cards, {
    keys: ['name'],
    threshold: 0.35,
    distance: 100,
    includeScore: true,
    minMatchCharLength: 2,
  })
}

export function searchCards(fuse: Fuse<Card>, query: string): Card[] {
  if (!query.trim()) return []
  return fuse.search(query).map((r) => r.item)
}
