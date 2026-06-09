'use client'

import { useRef } from 'react'

interface SearchInputProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar peça anatômica…',
  className = '',
}: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div className={`relative flex items-center ${className}`}>
      <svg
        className="absolute left-3 w-4 h-4 text-gold-500/60 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-gold-500/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/50 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 text-gray-400 dark:text-white/60 hover:text-gray-700 dark:hover:text-white/90 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
