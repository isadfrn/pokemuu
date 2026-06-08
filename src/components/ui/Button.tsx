'use client'

import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'gold' | 'ghost' | 'danger' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variants: Record<Variant, string> = {
  gold: 'bg-gold-gradient text-dark-900 font-bold shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40',
  ghost: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
  danger: 'bg-red-900/40 text-red-300 border border-red-500/30 hover:bg-red-900/60',
  outline: 'bg-transparent text-gold-400 border border-gold-500/50 hover:bg-gold-500/10 hover:border-gold-500',
}

const sizes: Record<string, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
  md: 'text-sm px-4 py-2 rounded-lg gap-2',
  lg: 'text-base px-6 py-3 rounded-xl gap-2.5',
}

export default function Button({
  variant = 'ghost',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...(props as object)}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  )
}
