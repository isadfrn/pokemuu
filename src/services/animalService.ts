/**
 * Animal queries. Thin read-only accessors over the animal registry.
 */

import type { Animal, AnimalId } from '@/domain/animal'
import { ANIMAL_REGISTRY, ANIMAL_REGISTRY_BY_ID } from '@/data/animals/registry'

/** Every animal, available or not (available first). */
export function getAnimals(): Animal[] {
  return ANIMAL_REGISTRY.map((e) => e.animal)
}

/** Only animals whose atlas is browsable. */
export function getAvailableAnimals(): Animal[] {
  return getAnimals().filter((a) => a.available)
}

/** Look up an animal by id (accepts a raw string route param). */
export function getAnimal(id: string): Animal | undefined {
  return ANIMAL_REGISTRY_BY_ID[id as AnimalId]?.animal
}

/** An animal that exists *and* is browsable, or undefined. */
export function getAvailableAnimal(id: string): Animal | undefined {
  const animal = getAnimal(id)
  return animal?.available ? animal : undefined
}
