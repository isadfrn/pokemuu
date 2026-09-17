import type { Animal, AnimalId } from '@/domain/animal'
import { ANIMAL_REGISTRY, ANIMAL_REGISTRY_BY_ID } from '@/data/animals/registry'

export function getAnimals(): Animal[] {
  return ANIMAL_REGISTRY.map((e) => e.animal)
}

export function getAvailableAnimals(): Animal[] {
  return getAnimals().filter((a) => a.available)
}

export function getAnimal(id: string): Animal | undefined {
  return ANIMAL_REGISTRY_BY_ID[id as AnimalId]?.animal
}

export function getAvailableAnimal(id: string): Animal | undefined {
  const animal = getAnimal(id)
  return animal?.available ? animal : undefined
}
