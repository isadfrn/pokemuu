'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Card } from '@/types/card'

interface FlashCardProps {
  card: Card
  index: number
  onOpen: (card: Card) => void
}

export default function FlashCard({ card, index, onOpen }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.8) }}
      className="group cursor-pointer select-none"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped((p) => !p)}
    >
      <div
        className="relative aspect-[5/7] transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Back face – background.webp */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src="/background.webp"
            alt="Card virado"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 text-base font-bold shadow">
              ?
            </div>
          </div>
        </div>

        {/* Front face – muscle card */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Image
            src={`/cards/${card.id}.webp`}
            alt={card.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
          <button
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white/80 hover:text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-all z-10"
            onClick={(e) => { e.stopPropagation(); onOpen(card) }}
            title="Ver em tamanho maior"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Name – only visible when flipped */}
      <div className={`mt-2 px-1 transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <p className="text-gray-900 dark:text-white/90 text-xs font-medium leading-tight text-center line-clamp-2">
          {card.name}
        </p>
      </div>
    </motion.div>
  )
}
