import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { roadmaps } from '@/data/roadmaps'
import cardsData from '@/data/cards.json'
import type { Card } from '@/types/card'

const cards = cardsData as Card[]

export const metadata = {
  title: 'Roteiros · Pokémuu',
  description: 'Roteiros de estudo com cards anatômicos selecionados por tema.',
}

export default function RoteirosPage() {
  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen">
        <div className="px-4 sm:px-6 pb-12">
          <div className="max-w-7xl mx-auto py-8 space-y-1">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient">
              Roteiros de Estudo
            </h1>
            <p className="text-gray-500 dark:text-white/60 text-sm">
              {roadmaps.length} roteiro{roadmaps.length !== 1 ? 's' : ''} disponível{roadmaps.length !== 1 ? 'is' : ''}
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmaps.map((roadmap) => {
              const roadmapCards = roadmap.cardIds
                .map((id) => cards.find((c) => c.id === id))
                .filter(Boolean) as Card[]

              const previewIds = roadmap.cardIds.slice(0, 3)

              return (
                <Link
                  key={roadmap.slug}
                  href={`/roteiros/${roadmap.slug}`}
                  className="group relative bg-white dark:bg-dark-800 border border-gray-200 dark:border-white/10 hover:border-gold-500/40 rounded-2xl p-5 transition-all hover:shadow-lg hover:shadow-gold-500/5 flex flex-col gap-4"
                >
                  {/* Preview thumbnails */}
                  <div className="flex gap-2 items-end">
                    {previewIds.map((id, i) => (
                      <div
                        key={id}
                        className="relative rounded-lg overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-md transition-transform group-hover:scale-105"
                        style={{
                          width: i === 0 ? 64 : 52,
                          height: i === 0 ? 90 : 73,
                          zIndex: previewIds.length - i,
                          marginLeft: i > 0 ? -12 : 0,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/cards/${id}.webp`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {roadmap.cardIds.length > 3 && (
                      <div
                        className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-dark-700 ring-1 ring-black/10 dark:ring-white/10 text-gray-500 dark:text-white/50 text-xs font-medium ml-1"
                        style={{ width: 44, height: 62 }}
                      >
                        +{roadmap.cardIds.length - 3}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h2 className="font-cinzel text-base font-bold text-gray-900 dark:text-white group-hover:text-gold-400 transition-colors">
                      {roadmap.title}
                    </h2>
                    <p className="text-gray-500 dark:text-white/55 text-sm leading-snug">
                      {roadmap.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-100 dark:border-white/5">
                    <span className="text-gray-400 dark:text-white/40 text-xs">
                      {roadmapCards.length} cards
                    </span>
                    <span className="text-gold-400 text-xs font-medium group-hover:translate-x-0.5 transition-transform">
                      Ver roteiro →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
