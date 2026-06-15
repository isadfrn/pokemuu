import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RoteiroClient from '@/components/features/roteiros/RoteiroClient'
import { roadmaps } from '@/data/roadmaps'
import cardsData from '@/data/cards.json'
import type { Card } from '@/types/card'

const allCards = cardsData as Card[]

export function generateStaticParams() {
  return roadmaps.map((r) => ({ slug: r.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const roadmap = roadmaps.find((r) => r.slug === params.slug)
  if (!roadmap) return {}
  return {
    title: `${roadmap.title} · Roteiro · Pokémuu`,
    description: roadmap.description,
  }
}

export default function RoteiroPage({ params }: { params: { slug: string } }) {
  const roadmap = roadmaps.find((r) => r.slug === params.slug)
  if (!roadmap) notFound()

  const cards = roadmap.cardIds
    .map((id) => allCards.find((c) => c.id === id))
    .filter(Boolean) as Card[]

  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen">
        <div className="px-4 sm:px-6 pb-12">
          {/* Breadcrumb + header */}
          <div className="max-w-7xl mx-auto py-8 space-y-3">
            <nav className="text-xs text-gray-400 dark:text-white/40 flex items-center gap-1.5">
              <Link href="/roteiros" className="hover:text-gold-400 transition-colors">
                Roteiros
              </Link>
              <span>/</span>
              <span className="text-gray-600 dark:text-white/60">{roadmap.title}</span>
            </nav>
            <div className="space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient">
                {roadmap.title}
              </h1>
              <p className="text-gray-500 dark:text-white/60 text-sm">
                {roadmap.description} · {cards.length} cards
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <RoteiroClient roadmap={roadmap} cards={cards} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
