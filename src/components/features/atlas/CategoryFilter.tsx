'use client'

import { motion } from 'framer-motion'
import type { CardCategory } from '@/types/card'
import { CATEGORY_META } from '@/types/card'

type FilterValue = CardCategory | 'todos'

interface CategoryFilterProps {
  active: FilterValue
  onChange: (v: FilterValue) => void
  counts: Record<FilterValue, number>
}

const ALL: FilterValue[] = ['todos', 'musculos', 'articulacoes', 'ossos', 'especiais']

export default function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ALL.map((cat) => {
        const meta = CATEGORY_META[cat]
        const isActive = active === cat
        return (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(cat)}
            className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
              isActive
                ? `${meta.color} ${meta.bgColor} ${meta.borderColor} shadow-lg`
                : 'text-gray-600 dark:text-white/70 bg-gray-100 dark:bg-dark-700 border-gray-200 dark:border-white/10 hover:text-gray-900 dark:hover:text-white/95 hover:border-gray-300 dark:hover:border-white/30'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className={`absolute inset-0 rounded-xl ${meta.bgColor} opacity-60`}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{meta.icon}</span>
            <span className="relative">{meta.label}</span>
            <span className={`relative text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-200 dark:bg-white/10'}`}>
              {counts[cat]}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
