import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AtlasClient from '@/components/features/atlas/AtlasClient'
import cardsData from '@/data/cards.json'
import type { Card } from '@/types/card'

const cards = cardsData as Card[]

export const metadata = {
  title: 'Atlas · Cards Anatômicos Veterinários',
  description: '328 cards de anatomia bovina: músculos, articulações, ossos e especiais.',
}

export default function AtlasPage() {
  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen">
        <div className="px-4 sm:px-6 pb-12">
          {/* Page header */}
          <div className="max-w-7xl mx-auto py-8 space-y-1">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient">
              Atlas Anatômico
            </h1>
            <p className="text-white/40 text-sm">
              {cards.length} cards · Bovinos · Série Pokémon
            </p>
          </div>

          <Suspense>
            <AtlasClient cards={cards} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
