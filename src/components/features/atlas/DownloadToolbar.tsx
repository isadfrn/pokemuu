'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import type { Card } from '@/types/card'
import { downloadMultiple } from '@/lib/download'

interface DownloadToolbarProps {
  filteredCards: Card[]
  selectedIds: Set<number>
  selectMode: boolean
  onToggleSelectMode: () => void
  onClearSelection: () => void
  allCards: Card[]
}

export default function DownloadToolbar({
  filteredCards,
  selectedIds,
  selectMode,
  onToggleSelectMode,
  onClearSelection,
  allCards,
}: DownloadToolbarProps) {
  const [progress, setProgress] = useState<number | null>(null)

  async function handleDownload(cards: Card[], zipName: string) {
    setProgress(0)
    try {
      await downloadMultiple(cards, zipName, setProgress)
    } finally {
      setProgress(null)
    }
  }

  const selectedCards = allCards.filter((c) => selectedIds.has(c.id))

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Select mode toggle */}
      <Button
        variant={selectMode ? 'outline' : 'ghost'}
        size="sm"
        onClick={onToggleSelectMode}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Selecionar
        {selectMode && selectedIds.size > 0 && (
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-gold-500 text-dark-900 text-[10px] font-bold">
            {selectedIds.size}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {selectMode && selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="outline"
              size="sm"
              loading={progress !== null}
              onClick={() => handleDownload(selectedCards, `atlas-selecionados-${selectedIds.size}.zip`)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Baixar {selectedIds.size} selecionados
            </Button>
            <button
              onClick={onClearSelection}
              className="text-gray-500 dark:text-white/55 hover:text-gray-800 dark:hover:text-white/80 text-xs underline transition-colors"
            >
              Limpar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-white/10" />

      {/* Download all filtered */}
      <Button
        variant="ghost"
        size="sm"
        loading={progress !== null && !selectMode}
        onClick={() => handleDownload(filteredCards, `atlas-${filteredCards.length}-cards.zip`)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        Baixar todos ({filteredCards.length})
      </Button>

      {/* Progress indicator */}
      <AnimatePresence>
        {progress !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-gold-400"
          >
            Comprimindo… {progress}%
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
