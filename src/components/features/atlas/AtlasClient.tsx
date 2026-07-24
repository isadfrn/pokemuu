'use client'

import { useState, useMemo, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import type { Animal } from '@/domain/animal'
import type { Card, CardFilter } from '@/domain/card'
import { atlasHref } from '@/domain/assets'
import { createSearchIndex } from '@/services/search'
import SearchInput from '@/components/ui/SearchInput'
import CategoryFilter from './CategoryFilter'
import CardItem from './CardItem'
import CardModal from './CardModal'
import DownloadToolbar from './DownloadToolbar'

interface AtlasClientProps {
  animal: Animal
  cards: Card[]
}

export default function AtlasClient({ animal, cards }: AtlasClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initCategory = (searchParams.get('category') as CardFilter) ?? 'todos'

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<CardFilter>(initCategory)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [selectMode, setSelectMode] = useState(false)
  const [modalCard, setModalCard] = useState<Card | null>(null)

  const fuse = useMemo(() => createSearchIndex(cards), [cards])

  const filteredCards = useMemo(() => {
    let result: Card[]
    if (query.trim().length >= 2) {
      result = fuse.search(query).map((r) => r.item)
    } else {
      result = cards
    }
    if (activeCategory !== 'todos') {
      result = result.filter((c) => c.category === activeCategory)
    }
    return result
  }, [query, activeCategory, cards, fuse])

  const counts = useMemo(() => {
    const filtered = query.trim().length >= 2
      ? fuse.search(query).map((r) => r.item)
      : cards
    const filteredByQuery = filtered.reduce(
      (acc, c) => { acc[c.category] = (acc[c.category] ?? 0) + 1; return acc },
      {} as Record<string, number>,
    )
    return {
      todos: filtered.length,
      musculos: filteredByQuery.musculos ?? 0,
      articulacoes: filteredByQuery.articulacoes ?? 0,
      ossos: filteredByQuery.ossos ?? 0,
      especiais: filteredByQuery.especiais ?? 0,
    } as Record<CardFilter, number>
  }, [cards, fuse, query])

  const handleCategoryChange = useCallback((cat: CardFilter) => {
    setActiveCategory(cat)
    const params = cat !== 'todos' ? `?category=${cat}` : ''
    router.replace(`${atlasHref(animal.id)}${params}`, { scroll: false })
  }, [router, animal.id])

  const handleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  const handleToggleSelectMode = useCallback(() => {
    setSelectMode((p) => !p)
    if (selectMode) setSelectedIds(new Set())
  }, [selectMode])

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="sticky top-14 z-30 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border-b border-gray-200 dark:border-white/5 py-3 -mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <SearchInput
              value={query}
              onChange={setQuery}
              className="w-full sm:max-w-xs"
            />
            <span className="text-gray-500 dark:text-white/60 text-xs hidden sm:block">
              {filteredCards.length} de {cards.length} cards
            </span>
          </div>
          <CategoryFilter
            active={activeCategory}
            onChange={handleCategoryChange}
            counts={counts}
          />
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-gray-200 dark:border-white/5">
            <span className="text-gray-500 dark:text-white/60 text-xs sm:hidden">
              {filteredCards.length} cards
            </span>
            <DownloadToolbar
              animal={animal}
              filteredCards={filteredCards}
              selectedIds={selectedIds}
              selectMode={selectMode}
              onToggleSelectMode={handleToggleSelectMode}
              onClearSelection={() => setSelectedIds(new Set())}
              allCards={cards}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredCards.length > 0 ? (
            <motion.div
              key="grid"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
            >
              {filteredCards.map((card, i) => (
                <CardItem
                  key={card.id}
                  card={card}
                  selected={selectedIds.has(card.id)}
                  selectMode={selectMode}
                  onSelect={handleSelect}
                  onOpen={setModalCard}
                  index={i}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 space-y-3"
            >
              <p className="text-4xl">🔍</p>
              <p className="text-gray-600 dark:text-white/75 text-sm">Nenhum card encontrado para &ldquo;{query}&rdquo;</p>
              <button onClick={() => setQuery('')} className="text-gold-400 text-xs underline">
                Limpar busca
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <CardModal
        card={modalCard}
        allCards={filteredCards}
        onClose={() => setModalCard(null)}
        onNavigate={setModalCard}
      />
    </div>
  )
}
