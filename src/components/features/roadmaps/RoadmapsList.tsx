import Link from 'next/link'
import type { Animal } from '@/domain/animal'
import type { ResolvedRoadmap } from '@/domain/roadmap'
import { cardImage, roadmapHref } from '@/domain/assets'
import { getAnimal } from '@/services/animalService'

interface RoadmapsListProps {
  animal: Animal
  roadmaps: ResolvedRoadmap[]
}

export default function RoadmapsList({ animal, roadmaps }: RoadmapsListProps) {
  if (roadmaps.length === 0) {
    return (
      <div className="text-center py-24 space-y-3">
        <p className="text-4xl">🗺️</p>
        <p className="text-gray-600 dark:text-white/75 text-sm">
          Nenhum roteiro disponível para {animal.name} ainda.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {roadmaps.map((roadmap) => {
        const previews = roadmap.resolvedCards.slice(0, 3)
        const extraAnimals = roadmap.animals.filter((id) => id !== animal.id)

        return (
          <Link
            key={roadmap.slug}
            href={roadmapHref(animal.id, roadmap.slug)}
            className="group relative bg-white dark:bg-dark-800 border border-gray-200 dark:border-white/10 hover:border-gold-500/40 rounded-2xl p-5 transition-all hover:shadow-lg hover:shadow-gold-500/5 flex flex-col gap-4"
          >
            <div className="flex gap-2 items-end">
              {previews.map((card, i) => (
                <div
                  key={`${card.animal}-${card.id}`}
                  className="relative rounded-lg overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-md transition-transform group-hover:scale-105"
                  style={{
                    width: i === 0 ? 64 : 52,
                    height: i === 0 ? 90 : 73,
                    zIndex: previews.length - i,
                    marginLeft: i > 0 ? -12 : 0,
                  }}
                >
                  <img src={cardImage(card)} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              {roadmap.resolvedCards.length > 3 && (
                <div
                  className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-dark-700 ring-1 ring-black/10 dark:ring-white/10 text-gray-500 dark:text-white/50 text-xs font-medium ml-1"
                  style={{ width: 44, height: 62 }}
                >
                  +{roadmap.resolvedCards.length - 3}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h2 className="font-cinzel text-base font-bold text-gray-900 dark:text-white group-hover:text-gold-400 transition-colors">
                {roadmap.title}
              </h2>
              <p className="text-gray-500 dark:text-white/55 text-sm leading-snug">
                {roadmap.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-100 dark:border-white/5">
              <span className="text-gray-400 dark:text-white/40 text-xs flex items-center gap-1.5">
                {roadmap.resolvedCards.length} cards
                {extraAnimals.length > 0 && (
                  <span title="Roteiro com mais de um animal">
                    · {extraAnimals.map((id) => getAnimal(id)?.emoji ?? '').join('')}
                  </span>
                )}
              </span>
              <span className="text-gold-400 text-xs font-medium group-hover:translate-x-0.5 transition-transform">
                Ver roteiro →
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
