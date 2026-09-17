export type AnimalId = 'cattle' | 'dog' | 'cat' | 'chicken' | 'horses' | 'goats'

export interface Animal {
  id: AnimalId
  name: string
  singular: string
  emoji: string
  description: string
  available: boolean
}
