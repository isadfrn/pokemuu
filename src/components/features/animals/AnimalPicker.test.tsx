import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { AnimalPickerItem } from '@/services/animalPicker'
import AnimalPicker from './AnimalPicker'

const items: AnimalPickerItem[] = [
  {
    id: 'cattle',
    name: 'Bovinos',
    emoji: '🐄',
    description: 'Anatomia bovina.',
    available: true,
    href: '/atlas/cattle',
    meta: '330 cards',
    previewImages: [],
  },
  {
    id: 'dog',
    name: 'Cachorro',
    emoji: '',
    description: 'Anatomia canina.',
    available: false,
    href: null,
    meta: '',
    previewImages: [],
  },
]

describe('AnimalPicker', () => {
  it('renders one card per item', () => {
    render(<AnimalPicker items={items} />)

    expect(screen.getByText('Bovinos')).toBeInTheDocument()
    expect(screen.getByText('Cachorro')).toBeInTheDocument()
  })

  it('only links the available animals', () => {
    render(<AnimalPicker items={items} />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', '/atlas/cattle')
  })

  it('renders an empty grid without items', () => {
    const { container } = render(<AnimalPicker items={[]} />)

    expect(container.firstElementChild).not.toBeNull()
    expect(container.firstElementChild?.childElementCount).toBe(0)
  })
})
