import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { Animal } from '@/domain/animal'
import type { Card } from '@/domain/card'
import type { ResolvedRoadmap } from '@/domain/roadmap'
import { cardsOf } from '@/domain/roadmap'
import RoadmapsList from './RoadmapsList'

const cattle: Animal = {
  id: 'cattle',
  name: 'Bovinos',
  singular: 'Bovino',
  emoji: '🐄',
  description: 'Anatomia bovina.',
  available: true,
}

const makeCard = (id: number): Card => ({
  id,
  name: `Card ${id}`,
  category: 'muscles',
  animal: 'cattle',
})

const roadmap: ResolvedRoadmap = {
  slug: 'prova-de-miologia',
  title: 'Prova de Miologia',
  description: 'Músculos do pescoço ao tronco.',
  cards: cardsOf('cattle', 1, 2, 3, 4),
  animals: ['cattle'],
  resolvedCards: [1, 2, 3, 4].map(makeCard),
}

describe('RoadmapsList empty state', () => {
  it('tells the user when there is nothing to study yet', () => {
    render(<RoadmapsList animal={cattle} roadmaps={[]} />)

    expect(screen.getByText(/Nenhum roteiro disponível para Bovinos ainda/)).toBeInTheDocument()
    expect(screen.queryByRole('link')).toBeNull()
  })
})

describe('RoadmapsList entries', () => {
  it('links to the roadmap detail page', () => {
    render(<RoadmapsList animal={cattle} roadmaps={[roadmap]} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/roteiros/cattle/prova-de-miologia')
  })

  it('shows the title, description and card count', () => {
    render(<RoadmapsList animal={cattle} roadmaps={[roadmap]} />)

    expect(screen.getByRole('heading', { name: 'Prova de Miologia' })).toBeInTheDocument()
    expect(screen.getByText('Músculos do pescoço ao tronco.')).toBeInTheDocument()
    expect(screen.getByText('4 cards')).toBeInTheDocument()
  })

  it('renders at most three previews and counts the remainder', () => {
    const { container } = render(<RoadmapsList animal={cattle} roadmaps={[roadmap]} />)

    expect(container.querySelectorAll('img')).toHaveLength(3)
    expect(screen.getByText('+1')).toBeInTheDocument()
  })

  it('omits the overflow counter for short roadmaps', () => {
    const short: ResolvedRoadmap = {
      ...roadmap,
      cards: cardsOf('cattle', 1, 2),
      resolvedCards: [makeCard(1), makeCard(2)],
    }
    const { container } = render(<RoadmapsList animal={cattle} roadmaps={[short]} />)

    expect(container.querySelectorAll('img')).toHaveLength(2)
    expect(screen.queryByText(/^\+\d+$/)).toBeNull()
  })

  it('flags roadmaps that span more than one animal', () => {
    const multi: ResolvedRoadmap = { ...roadmap, animals: ['cattle', 'horses'] }
    render(<RoadmapsList animal={cattle} roadmaps={[multi]} />)

    expect(screen.getByTitle('Roteiro com mais de um animal')).toHaveTextContent('🐎')
  })

  it('does not flag roadmaps limited to the current animal', () => {
    render(<RoadmapsList animal={cattle} roadmaps={[roadmap]} />)

    expect(screen.queryByTitle('Roteiro com mais de um animal')).toBeNull()
  })

  it('lists every roadmap it receives', () => {
    const second: ResolvedRoadmap = { ...roadmap, slug: 'segundo', title: 'Segundo Roteiro' }
    render(<RoadmapsList animal={cattle} roadmaps={[roadmap, second]} />)

    expect(screen.getAllByRole('link')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'Segundo Roteiro' })).toBeInTheDocument()
  })
})
