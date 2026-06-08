import type { CardCategory } from '@/types/card'
import { CATEGORY_META } from '@/types/card'

interface BadgeProps {
  category: CardCategory
  size?: 'sm' | 'md'
}

export default function Badge({ category, size = 'sm' }: BadgeProps) {
  const meta = CATEGORY_META[category]
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wider border ${meta.color} ${meta.bgColor} ${meta.borderColor} ${sizeClass}`}
    >
      <span>{meta.icon}</span>
      {meta.label}
    </span>
  )
}
