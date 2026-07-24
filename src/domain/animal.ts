/**
 * Animal domain model.
 *
 * An "animal" is the top-level axis of the platform: the user picks an animal
 * and then explores its atlas and study roadmaps. Adding a new animal is a
 * data-only change (see {@link file://../data/animals/registry.ts}); no
 * component needs to be touched.
 */

/** Stable identifier for an animal. Also used as the URL segment and the
 * `public/cards/<id>/` image folder name, so keep it slug-safe. */
export type AnimalId =
  | 'bovinos'
  | 'cachorro'
  | 'gato'
  | 'galinha'
  | 'equinos'
  | 'caprinos'

export interface Animal {
  id: AnimalId
  /** Plural display name, e.g. "Bovinos". */
  name: string
  /** Singular display name, e.g. "Bovino". */
  singular: string
  /** Emoji used as a lightweight visual token in pickers and badges. */
  emoji: string
  /** Short description shown on the animal picker. */
  description: string
  /**
   * Whether the animal's atlas is browsable yet. Upcoming animals are shown
   * in the picker as "Em breve" but are not navigable and 404 if visited.
   */
  available: boolean
}
