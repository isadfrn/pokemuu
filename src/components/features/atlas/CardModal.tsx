'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { Card } from '@/types/card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { downloadSingle } from '@/lib/download'

interface CardModalProps {
  card: Card | null
  allCards: Card[]
  onClose: () => void
  onNavigate: (card: Card) => void
}

export default function CardModal({ card, allCards, onClose, onNavigate }: CardModalProps) {
  const idx = card ? allCards.findIndex((c) => c.id === card.id) : -1
  const prev = idx > 0 ? allCards[idx - 1] : null
  const next = idx < allCards.length - 1 ? allCards[idx + 1] : null

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && prev) onNavigate(prev)
      if (e.key === 'ArrowRight' && next) onNavigate(next)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose, prev, next, onNavigate])

  useEffect(() => {
    document.body.style.overflow = card ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [card])

  return (
    <AnimatePresence>
      {card && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-dark-900/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, y: 32 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 32 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="relative flex flex-col sm:flex-row gap-6 bg-white dark:bg-dark-800 border border-gold-500/20 rounded-2xl p-5 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/90 hover:bg-gray-100 dark:hover:bg-white/10 transition-all z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Card image */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="relative w-48 sm:w-56 rounded-xl overflow-hidden ring-1 ring-gold-500/30 shadow-xl">
                <Image
                  src={`/cards/${card.id}.webp`}
                  alt={card.name}
                  width={280}
                  height={392}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between gap-4 flex-1 min-w-0">
              <div className="space-y-3 pt-1">
                <Badge category={card.category} size="md" />
                <h2 className="font-cinzel text-xl font-bold text-gray-900 dark:text-white leading-tight">
                  {card.name}
                </h2>
                <p className="text-gray-500 dark:text-white/55 text-xs font-mono">Card #{card.id} de 328</p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="gold"
                  size="md"
                  className="w-full"
                  onClick={() => downloadSingle(card)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Baixar imagem
                </Button>

                {/* Navigation */}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    disabled={!prev}
                    onClick={() => prev && onNavigate(prev)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Anterior
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    disabled={!next}
                    onClick={() => next && onNavigate(next)}
                  >
                    Próximo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
