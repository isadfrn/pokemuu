import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'
import { CATEGORY_META } from '@/domain/card'

describe('Badge', () => {
  it('renders the category label and icon', () => {
    render(<Badge category="muscles" />)

    expect(screen.getByText(CATEGORY_META.muscles.label)).toBeInTheDocument()
    expect(screen.getByText(CATEGORY_META.muscles.icon)).toBeInTheDocument()
  })

  it('defaults to the small size', () => {
    const { container } = render(<Badge category="bones" />)

    expect(container.firstElementChild).toHaveClass('text-[10px]', 'px-2')
  })

  it('applies the medium size classes', () => {
    const { container } = render(<Badge category="bones" size="md" />)

    expect(container.firstElementChild).toHaveClass('text-xs', 'px-3')
    expect(container.firstElementChild).not.toHaveClass('text-[10px]')
  })

  it('uses the colour tokens of the given category', () => {
    const { container } = render(<Badge category="joints" />)

    expect(container.firstElementChild).toHaveClass(
      CATEGORY_META.joints.color,
      CATEGORY_META.joints.bgColor,
      CATEGORY_META.joints.borderColor,
    )
  })

  it('labels every supported category', () => {
    for (const category of ['muscles', 'joints', 'bones', 'special'] as const) {
      const { unmount } = render(<Badge category={category} />)
      expect(screen.getByText(CATEGORY_META[category].label)).toBeInTheDocument()
      unmount()
    }
  })
})
