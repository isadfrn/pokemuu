'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Card } from '@/types/card'
import { CATEGORY_META } from '@/types/card'
import Badge from '@/components/ui/Badge'
import { downloadSingle } from '@/lib/download'

interface CardItemProps {
  card: Card
  selected: boolean
  selectMode: boolean
  onSelect: (id: number) => void
  onOpen: (card: Card) => void
  index: number
}

export default function CardItem({
  card,
  selected,
  selectMode,
  onSelect,
  onOpen,
  index,
}: CardItemProps) {
  const meta = CATEGORY_META[card.category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.6) }}
      layout
      className={`group relative rounded-xl overflow-hidden bg-dark-800 border transition-all duration-200 cursor-pointer card-hover-${card.category} ${
        selected
          ? `${meta.borderColor} ring-2 ring-offset-1 ring-offset-dark-900`
          : 'border-white/10 hover:border-white/20'
      }`}
      style={selected ? { '--tw-ring-color': meta.glowColor } as React.CSSProperties : undefined}
    >
      {/* Image */}
      <div className="relative aspect-[5/7] overflow-hidden" onClick={() => onOpen(card)}>
        <Image
          src={`/cards/${card.id}.webp`}
          alt={card.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Selection overlay */}
        {(selectMode || selected) && (
          <div
            className={`absolute inset-0 transition-colors ${selected ? 'bg-gold-500/10' : 'bg-transparent hover:bg-white/5'}`}
            onClick={(e) => { e.stopPropagation(); onSelect(card.id) }}
          />
        )}

        {/* Checkbox */}
        {(selectMode || selected) && (
          <div
            className="absolute top-2 left-2 z-10"
            onClick={(e) => { e.stopPropagation(); onSelect(card.id) }}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
              selected ? 'bg-gold-500 border-gold-500' : 'bg-dark-900/70 border-white/40 hover:border-gold-400'
            }`}>
              {selected && (
                <svg className="w-3 h-3 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        )}

        {/* Download button on hover */}
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-dark-900/80 text-white/60 hover:text-gold-400 hover:bg-dark-900 opacity-0 group-hover:opacity-100 transition-all"
          onClick={(e) => { e.stopPropagation(); downloadSingle(card) }}
          title="Baixar card"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </motion.button>

        {/* Card number */}
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white/30 bg-dark-900/60 px-1.5 py-0.5 rounded">
          #{card.id}
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 space-y-1">
        <p className="text-white/90 text-xs font-medium leading-tight line-clamp-2">{card.name}</p>
        <Badge category={card.category} />
      </div>
    </motion.div>
  )
}
