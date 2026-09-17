import Link from 'next/link'
import AnimalPicker from '@/components/features/animals/AnimalPicker'
import type { AnimalPickerItem } from '@/services/animalPicker'
import { atlasHubHref } from '@/domain/assets'

interface AnimalSectionProps {
  items: AnimalPickerItem[]
}

export default function AnimalSection({ items }: AnimalSectionProps) {
  return (
    <section id="animais" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-gray-500 dark:text-white/55 text-xs font-medium tracking-[0.18em] uppercase">
              Escolha um animal
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">
              Atlas por animal
            </h2>
          </div>
          <Link
            href={atlasHubHref}
            className="text-gold-400 text-sm font-medium hover:text-gold-300 transition-colors inline-flex items-center gap-1.5 flex-shrink-0"
          >
            Ver atlas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <AnimalPicker items={items} />
      </div>
    </section>
  )
}
