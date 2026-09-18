import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

function renderHero(previewImages: string[] = []) {
  return render(<Hero previewImages={previewImages} totalCards={330} animalCount={1} />)
}

describe('Hero', () => {
  it('renders one floating card per preview image', () => {
    const { container } = renderHero(['/a.webp', '/b.webp', '/c.webp'])

    expect(container.querySelectorAll('img')).toHaveLength(3)
    expect(screen.getByAltText('Card 1')).toBeInTheDocument()
    expect(screen.getByAltText('Card 3')).toBeInTheDocument()
  })

  it('keeps rendering when more images than transforms are given', () => {
    const many = Array.from({ length: 7 }, (_, i) => `/p${i}.webp`)
    const { container } = renderHero(many)

    expect(container.querySelectorAll('img')).toHaveLength(7)
    expect(screen.getByAltText('Card 7')).toBeInTheDocument()
  })

  it('renders without preview images', () => {
    const { container } = renderHero()

    expect(container.querySelectorAll('img')).toHaveLength(0)
  })

  it('announces the size of the collection', () => {
    renderHero()

    expect(screen.getByText('330 cards · Estilo Pokémon')).toBeInTheDocument()
  })

  it('renders the headline', () => {
    renderHero()

    expect(
      screen.getByRole('heading', { level: 1, name: /Atlas Anatômico Veterinário/ }),
    ).toBeInTheDocument()
  })

  it('links to the atlas hub and to the about section', () => {
    renderHero()

    expect(screen.getByRole('link', { name: /Escolher um animal/ })).toHaveAttribute(
      'href',
      '/atlas',
    )
    expect(screen.getByRole('link', { name: /Sobre o projeto/ })).toHaveAttribute('href', '#sobre')
  })
})
