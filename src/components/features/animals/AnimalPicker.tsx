'use client'

import type { AnimalPickerItem } from '@/services/animalPicker'
import AnimalCard from './AnimalCard'

interface AnimalPickerProps {
  items: AnimalPickerItem[]
}

/** Responsive grid of animal tiles used by the home, atlas and roteiros hubs. */
export default function AnimalPicker({ items }: AnimalPickerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {items.map((item, i) => (
        <AnimalCard key={item.id} item={item} index={i} />
      ))}
    </div>
  )
}
