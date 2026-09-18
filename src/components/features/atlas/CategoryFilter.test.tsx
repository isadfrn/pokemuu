import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { CardFilter } from '@/domain/card'
import { CATEGORY_FILTERS, CATEGORY_META } from '@/domain/card'
import CategoryFilter from './CategoryFilter'

const COUNTS: Record<CardFilter, number> = {
  all: 330,
  muscles: 120,
  joints: 90,
  bones: 100,
  special: 20,
}

function renderFilter(active: CardFilter = 'all', onChange = vi.fn()) {
  const utils = render(<CategoryFilter active={active} onChange={onChange} counts={COUNTS} />)
  return { ...utils, onChange }
}

describe('CategoryFilter', () => {
  it('renders one button per filter', () => {
    renderFilter()

    expect(screen.getAllByRole('button')).toHaveLength(CATEGORY_FILTERS.length)
  })

  it('shows the label, icon and count of every filter', () => {
    renderFilter()

    for (const filter of CATEGORY_FILTERS) {
      expect(screen.getByText(CATEGORY_META[filter].label)).toBeInTheDocument()
      expect(screen.getByText(CATEGORY_META[filter].icon)).toBeInTheDocument()
      expect(screen.getByText(String(COUNTS[filter]))).toBeInTheDocument()
    }
  })

  it('marks the active filter with its colour tokens', () => {
    renderFilter('bones')

    const active = screen.getByRole('button', { name: /Ossos/ })
    const inactive = screen.getByRole('button', { name: /Músculos/ })

    expect(active).toHaveClass(CATEGORY_META.bones.color)
    expect(active).toHaveClass(CATEGORY_META.bones.bgColor)
    expect(inactive).not.toHaveClass(CATEGORY_META.muscles.color)
  })

  it('reports the clicked filter', async () => {
    const { onChange } = renderFilter()

    await userEvent.click(screen.getByRole('button', { name: /Articulações/ }))

    expect(onChange).toHaveBeenCalledWith('joints')
  })

  it('reports "all" when the pseudo filter is clicked', async () => {
    const { onChange } = renderFilter('bones')

    await userEvent.click(screen.getByRole('button', { name: /Todos/ }))

    expect(onChange).toHaveBeenCalledWith('all')
  })

  it('renders zero counts without crashing', () => {
    render(
      <CategoryFilter
        active="all"
        onChange={vi.fn()}
        counts={{ all: 0, muscles: 0, joints: 0, bones: 0, special: 0 }}
      />,
    )

    expect(screen.getAllByText('0')).toHaveLength(CATEGORY_FILTERS.length)
  })
})
