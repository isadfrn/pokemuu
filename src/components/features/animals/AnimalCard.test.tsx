import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { AnimalPickerItem } from '@/services/animalPicker'
import AnimalCard from './AnimalCard'

const available: AnimalPickerItem = {
  id: 'cattle',
  name: 'Bovinos',
  emoji: '🐄',
  description: 'Anatomia bovina.',
  available: true,
  href: '/atlas/cattle',
  meta: '330 cards',
  previewImages: ['/cards/cattle/1.webp', '/cards/cattle/166.webp', '/cards/cattle/330.webp'],
}

const comingSoon: AnimalPickerItem = {
  id: 'dog',
  name: 'Cachorro',
  emoji: '🐕',
  description: 'Anatomia canina.',
  available: false,
  href: null,
  meta: '',
  previewImages: [],
}

describe('AnimalCard when available', () => {
  it('links to the animal atlas', () => {
    render(<AnimalCard item={available} index={0} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/atlas/cattle')
  })

  it('shows the name, description, meta and call to action', () => {
    render(<AnimalCard item={available} index={0} />)

    expect(screen.getByText('Bovinos')).toBeInTheDocument()
    expect(screen.getByText('Anatomia bovina.')).toBeInTheDocument()
    expect(screen.getByText('330 cards')).toBeInTheDocument()
    expect(screen.getByText('Explorar')).toBeInTheDocument()
  })

  it('prefers the preview images over the emoji', () => {
    const { container } = render(<AnimalCard item={available} index={0} />)
    const sources = Array.from(container.querySelectorAll('img')).map((img) =>
      img.getAttribute('src'),
    )

    expect(sources).toEqual(available.previewImages)
    expect(screen.getAllByText('🐄')).toHaveLength(1)
  })

  it('falls back to the emoji when there are no previews', () => {
    const { container } = render(
      <AnimalCard item={{ ...available, previewImages: [] }} index={0} />,
    )

    expect(container.querySelectorAll('img')).toHaveLength(0)
    expect(screen.getAllByText('🐄').length).toBeGreaterThan(0)
  })

  it('does not show the coming-soon badge', () => {
    render(<AnimalCard item={available} index={0} />)

    expect(screen.queryByText('Em breve')).toBeNull()
  })
})

describe('AnimalCard when unavailable', () => {
  it('renders a disabled card without a link', () => {
    render(<AnimalCard item={comingSoon} index={1} />)

    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText('Em breve')).toBeInTheDocument()
    expect(screen.getByTitle('Em breve')).toHaveAttribute('aria-disabled', 'true')
  })

  it('shows the animal details but no call to action', () => {
    render(<AnimalCard item={comingSoon} index={1} />)

    expect(screen.getByText('Cachorro')).toBeInTheDocument()
    expect(screen.getByText('Anatomia canina.')).toBeInTheDocument()
    expect(screen.queryByText('Explorar')).toBeNull()
  })

  it('renders the emoji placeholder', () => {
    render(<AnimalCard item={comingSoon} index={1} />)

    expect(screen.getAllByText('🐕').length).toBeGreaterThan(0)
  })
})
