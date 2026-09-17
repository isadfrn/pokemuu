'use client'

import { useState, useCallback } from 'react'
import type { Card } from '@/domain/card'
import FlashCard from './FlashCard'
import CardModal from '@/components/features/atlas/CardModal'

interface RoadmapClientProps {
  cards: Card[]
}

export default function RoadmapClient({ cards }: RoadmapClientProps) {
  const [modalCard, setModalCard] = useState<Card | null>(null)

  const handleOpen = useCallback((card: Card) => setModalCard(card), [])
  const handleClose = useCallback(() => setModalCard(null), [])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {cards.map((card, i) => (
          <FlashCard key={`${card.animal}-${card.id}`} card={card} index={i} onOpen={handleOpen} />
        ))}
      </div>

      <CardModal
        card={modalCard}
        allCards={cards}
        onClose={handleClose}
        onNavigate={setModalCard}
      />
    </>
  )
}
