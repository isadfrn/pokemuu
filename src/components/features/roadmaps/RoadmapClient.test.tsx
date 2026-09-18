import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Card } from '@/domain/card'
import RoadmapClient from './RoadmapClient'

const cards: Card[] = [
  { id: 1, name: 'Bíceps', category: 'muscles', animal: 'cattle' },
  { id: 2, name: 'Joelho', category: 'joints', animal: 'cattle' },
  { id: 3, name: 'Fêmur', category: 'bones', animal: 'cattle' },
]

describe('RoadmapClient', () => {
  it('renders one flash card per card', () => {
    render(<RoadmapClient cards={cards} />)

    expect(screen.getAllByRole('button', { name: /virado para baixo/ })).toHaveLength(cards.length)
  })

  it('renders an empty grid for an empty roadmap', () => {
    const { container } = render(<RoadmapClient cards={[]} />)

    expect(container.querySelectorAll('[role="button"]')).toHaveLength(0)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('opens the modal for the enlarged card', async () => {
    render(<RoadmapClient cards={cards} />)

    expect(screen.queryByRole('dialog')).toBeNull()

    await userEvent.click(
      screen.getByRole('button', { name: `Ver card ${cards[1].name} em tamanho maior` }),
    )

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', `Card ${cards[1].name}`)
  })

  it('closes the modal with Escape', async () => {
    render(<RoadmapClient cards={cards} />)

    await userEvent.click(
      screen.getByRole('button', { name: `Ver card ${cards[0].name} em tamanho maior` }),
    )
    await userEvent.keyboard('{Escape}')

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })
})
