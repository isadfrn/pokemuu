'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { AnimalPickerItem } from '@/services/animalPicker'

interface AnimalCardProps {
  item: AnimalPickerItem
  index: number
}

export default function AnimalCard({ item, index }: AnimalCardProps) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.06, 0.4), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={item.available ? { y: -4 } : undefined}
      className={`relative h-full rounded-2xl border overflow-hidden transition-all duration-300 ${
        item.available
          ? 'bg-white dark:bg-dark-800 border-gray-200 dark:border-white/10 hover:border-gold-500/40 hover:shadow-lg hover:shadow-gold-500/5'
          : 'bg-gray-50 dark:bg-dark-800/50 border-dashed border-gray-200 dark:border-white/10'
      }`}
    >
      <div className="relative h-32 flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,_rgba(212,175,55,0.10)_0%,_transparent_65%)]" />
        {item.available && item.previewImages.length > 0 ? (
          <div className="relative flex items-end justify-center pt-4">
            {item.previewImages.map((src, j) => (
              <div
                key={src}
                className="relative rounded-lg overflow-hidden shadow-xl flex-shrink-0"
                style={{
                  width: j === 1 ? 56 : 44,
                  zIndex: j === 1 ? 3 : j === 0 ? 1 : 2,
                  marginBottom: j === 1 ? 0 : -10,
                  transform: `rotate(${j === 0 ? -9 : j === 2 ? 9 : 0}deg)`,
                  marginLeft: j !== 0 ? -8 : 0,
                }}
              >
                <Image src={src} alt="" width={80} height={112} className="w-full h-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`flex items-center justify-center h-full text-5xl ${
              item.available ? '' : 'opacity-40 grayscale'
            }`}
          >
            {item.emoji}
          </div>
        )}

        {!item.available && (
          <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white/60">
            Em breve
          </span>
        )}
      </div>

      <div className="p-4 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`font-display font-semibold text-base ${
              item.available ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-white/40'
            }`}
          >
            <span className="mr-1.5">{item.emoji}</span>
            {item.name}
          </span>
          <span className="text-gray-500 dark:text-white/55 text-xs tabular-nums flex-shrink-0">
            {item.meta}
          </span>
        </div>
        <p
          className={`text-xs leading-snug ${
            item.available ? 'text-gray-500 dark:text-white/55' : 'text-gray-400 dark:text-white/35'
          }`}
        >
          {item.description}
        </p>
        {item.available && (
          <div className="flex items-center gap-1 pt-1 text-gold-500 dark:text-gold-400 text-xs font-medium">
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
        )}
      </div>
    </motion.div>
  )

  if (item.available && item.href) {
    return (
      <Link href={item.href} className="group block h-full">
        {inner}
      </Link>
    )
  }

  return (
    <div className="h-full cursor-not-allowed" aria-disabled title="Em breve">
      {inner}
    </div>
  )
}
