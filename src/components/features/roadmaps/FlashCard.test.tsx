import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Card } from '@/domain/card'
import FlashCard from './FlashCard'

const card: Card = { id: 5, name: 'Osso Rádio', category: 'bones', animal: 'cattle' }

const backName = 'Card virado para baixo, ativar para revelar'
const flippedName = `Card ${card.name}, virado`
const openName = `Ver card ${card.name} em tamanho maior`

function renderCard(onOpen = vi.fn()) {
  const utils = render(<FlashCard card={card} index={0} onOpen={onOpen} />)
  return { ...utils, onOpen }
}

describe('FlashCard face', () => {
  it('starts face down', () => {
    renderCard()

    expect(screen.getByRole('button', { name: backName })).toHaveAttribute('aria-pressed', 'false')
  })

  it('renders the card back as well as the hidden card image', () => {
    const { container } = renderCard()
    const sources = Array.from(container.querySelectorAll('img')).map((img) =>
      img.getAttribute('src'),
    )

    expect(sources).toEqual(['/background.webp', '/cards/cattle/5.webp'])
  })

  it('keeps the card name hidden until it is flipped', () => {
    renderCard()

    expect(screen.getByText(card.name).parentElement).toHaveClass('opacity-0')
  })

  it('renders flat while face down', () => {
    const { container } = renderCard()

    expect((container.querySelector('.aspect-\\[5\\/7\\]') as HTMLElement).style.transform).toBe(
      'rotateY(0deg)',
    )
  })
})

describe('FlashCard flipping', () => {
  it('flips on click and reveals the name', async () => {
    renderCard()

    await userEvent.click(screen.getByRole('button', { name: backName }))

    expect(screen.getByRole('button', { name: flippedName })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText(card.name).parentElement).toHaveClass('opacity-100')
  })

  it('rotates the inner face while flipped', async () => {
    const { container } = renderCard()

    await userEvent.click(screen.getByRole('button', { name: backName }))

    const inner = container.querySelector('.aspect-\\[5\\/7\\]') as HTMLElement
    expect(inner.style.transform).toBe('rotateY(180deg)')
  })

  it('flips back on a second click', async () => {
    renderCard()

    await userEvent.click(screen.getByRole('button', { name: backName }))
    await userEvent.click(screen.getByRole('button', { name: flippedName }))

    expect(screen.getByRole('button', { name: backName })).toHaveAttribute('aria-pressed', 'false')
  })

  it('flips with Enter', async () => {
    renderCard()
    screen.getByRole('button', { name: backName }).focus()

    await userEvent.keyboard('{Enter}')

    expect(screen.getByRole('button', { name: flippedName })).toBeInTheDocument()
  })

  it('flips with the space bar', () => {
    renderCard()
    // The raw keydown contract is asserted directly: userEvent emulates
    // role=button activation on keyup, which would toggle the state a second time.
    fireEvent.keyDown(screen.getByRole('button', { name: backName }), { key: ' ' })

    expect(screen.getByRole('button', { name: flippedName })).toBeInTheDocument()
  })

  it('ignores unrelated keys', () => {
    renderCard()
    screen.getByRole('button', { name: backName }).focus()

    fireEvent.keyDown(screen.getByRole('button', { name: backName }), { key: 'a' })

    expect(screen.getByRole('button', { name: backName })).toHaveAttribute('aria-pressed', 'false')
  })
})

describe('FlashCard enlarged view', () => {
  it('opens the enlarged view without flipping the card', async () => {
    const { onOpen } = renderCard()

    await userEvent.click(screen.getByRole('button', { name: openName }))

    expect(onOpen).toHaveBeenCalledWith(card)
    expect(screen.getByRole('button', { name: backName })).toHaveAttribute('aria-pressed', 'false')
  })
})
