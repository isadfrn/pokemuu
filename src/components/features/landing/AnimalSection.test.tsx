import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { AnimalPickerItem } from '@/services/animalPicker'
import AnimalSection from './AnimalSection'

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
]

describe('AnimalSection', () => {
  it('renders the section heading', () => {
    render(<AnimalSection items={items} />)

    expect(screen.getByRole('heading', { name: 'Atlas por animal' })).toBeInTheDocument()
    expect(screen.getByText('Escolha um animal')).toBeInTheDocument()
  })

  it('links to the atlas hub', () => {
    render(<AnimalSection items={items} />)

    expect(screen.getByRole('link', { name: /Ver atlas/ })).toHaveAttribute('href', '/atlas')
  })

  it('delegates the cards to the animal picker', () => {
    render(<AnimalSection items={items} />)

    expect(screen.getByRole('link', { name: /Bovinos/ })).toHaveAttribute('href', '/atlas/cattle')
    expect(screen.getByText('330 cards')).toBeInTheDocument()
  })
})
