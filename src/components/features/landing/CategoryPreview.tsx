'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { CardCategory } from '@/types/card'
import { CATEGORY_META } from '@/types/card'
import cardsData from '@/data/cards.json'
import type { Card } from '@/types/card'

const cards = cardsData as Card[]

const PREVIEW_IMAGES: Record<CardCategory, number[]> = {
  musculos:     [25, 154, 200],
  articulacoes: [73, 75, 300],
  ossos:        [46, 50, 54],
  especiais:    [1, 85, 88],
}

const CATEGORIES: CardCategory[] = ['musculos', 'articulacoes', 'ossos', 'especiais']

export default function CategoryPreview() {
  const counts = CATEGORIES.reduce(
    (acc, cat) => ({ ...acc, [cat]: cards.filter((c) => c.category === cat).length }),
    {} as Record<CardCategory, number>,
  )

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div className="space-y-1.5">
            <p className="text-white/30 text-xs font-medium tracking-[0.18em] uppercase">Navegar por categoria</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              328 cards organizados
            </h2>
          </div>
          <Link
            href="/atlas"
            className="text-gold-400 text-sm font-medium hover:text-gold-300 transition-colors inline-flex items-center gap-1.5 flex-shrink-0"
          >
            Ver todos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => {
            const meta = CATEGORY_META[cat]
            const previews = PREVIEW_IMAGES[cat]

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/atlas?category=${cat}`} className="block group">
                  <div className={`rounded-2xl border bg-dark-800 overflow-hidden transition-all duration-300 ${meta.borderColor} hover:shadow-lg`}
                    style={{ '--hover-shadow': `0 8px 30px ${meta.glowColor}` } as React.CSSProperties}
                  >
                    {/* Preview images */}
                    <div className="relative h-32 flex items-end justify-center pt-4 overflow-hidden">
                      <div
                        className="absolute inset-0"
                        style={{ background: `radial-gradient(ellipse at 50% 20%, ${meta.glowColor} 0%, transparent 65%)` }}
                      />
                      {previews.map((id, j) => (
                        <div
                          key={id}
                          className="relative rounded-lg overflow-hidden shadow-xl flex-shrink-0"
                          style={{
                            width: j === 1 ? 56 : 44,
                            zIndex: j === 1 ? 3 : j === 0 ? 1 : 2,
                            marginBottom: j === 1 ? 0 : -10,
                            transform: `rotate(${j === 0 ? -9 : j === 2 ? 9 : 0}deg)`,
                            marginLeft: j !== 0 ? -8 : 0,
                          }}
                        >
                          <Image
                            src={`/cards/${id}.png`}
                            alt=""
                            width={80}
                            height={112}
                            className="w-full h-auto"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Info */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`font-display font-semibold text-sm ${meta.color}`}>
                          {meta.icon} {meta.label}
                        </span>
                        <span className="text-white/25 text-xs tabular-nums">{counts[cat]}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/30 text-xs group-hover:text-white/55 transition-colors">
                        <span>Explorar</span>
                        <svg
                          className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
