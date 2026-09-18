import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import type { Card } from '@/domain/card'
import { downloadSingle } from '@/lib/download'
import CardModal from './CardModal'

vi.mock('@/lib/download', () => ({ downloadSingle: vi.fn(), downloadMultiple: vi.fn() }))

const cards: Card[] = [
  { id: 1, name: 'Bíceps', category: 'muscles', animal: 'cattle' },
  { id: 2, name: 'Articulação do Joelho', category: 'joints', animal: 'cattle' },
  { id: 3, name: 'Fêmur', category: 'bones', animal: 'cattle' },
]

function renderModal(card: Card | null, overrides: Partial<ComponentProps<typeof CardModal>> = {}) {
  const onClose = vi.fn()
  const onNavigate = vi.fn()
  const utils = render(
    <CardModal
      card={card}
      allCards={cards}
      onClose={onClose}
      onNavigate={onNavigate}
      {...overrides}
    />,
  )
  return { ...utils, onClose, onNavigate }
}

describe('CardModal visibility', () => {
  it('renders nothing while no card is selected', () => {
    const { container } = renderModal(null)

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders the card details', () => {
    renderModal(cards[1])

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Card Articulação do Joelho')
    expect(screen.getByRole('heading', { name: 'Articulação do Joelho' })).toBeInTheDocument()
    expect(screen.getByText('Card #2')).toBeInTheDocument()
  })

  it('locks body scrolling while open and restores it on unmount', () => {
    const { unmount } = renderModal(cards[0])

    expect(document.body.style.overflow).toBe('hidden')

    unmount()

    expect(document.body.style.overflow).toBe('')
  })

  it('moves focus into the dialog', () => {
    renderModal(cards[0])

    expect(screen.getByRole('dialog')).toHaveFocus()
  })
})

describe('CardModal dismissal', () => {
  it('closes with the close button', async () => {
    const { onClose } = renderModal(cards[0])

    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes when the backdrop is clicked', async () => {
    const { onClose, container } = renderModal(cards[0])
    const backdrop = container.firstElementChild as HTMLElement

    await userEvent.click(backdrop)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not close when the dialog itself is clicked', async () => {
    const { onClose } = renderModal(cards[0])

    await userEvent.click(screen.getByRole('dialog'))

    expect(onClose).not.toHaveBeenCalled()
  })

  it('closes on Escape', async () => {
    const { onClose } = renderModal(cards[0])

    await userEvent.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

describe('CardModal navigation', () => {
  it('navigates with the previous and next buttons', async () => {
    const { onNavigate } = renderModal(cards[1])

    await userEvent.click(screen.getByRole('button', { name: /Anterior/ }))
    await userEvent.click(screen.getByRole('button', { name: /Próximo/ }))

    expect(onNavigate).toHaveBeenNthCalledWith(1, cards[0])
    expect(onNavigate).toHaveBeenNthCalledWith(2, cards[2])
  })

  it('navigates with the arrow keys', async () => {
    const { onNavigate } = renderModal(cards[1])

    await userEvent.keyboard('{ArrowLeft}')
    await userEvent.keyboard('{ArrowRight}')

    expect(onNavigate).toHaveBeenNthCalledWith(1, cards[0])
    expect(onNavigate).toHaveBeenNthCalledWith(2, cards[2])
  })

  it('disables the previous button on the first card', () => {
    renderModal(cards[0])

    expect(screen.getByRole('button', { name: /Anterior/ })).toBeDisabled()
    expect(screen.getByRole('button', { name: /Próximo/ })).toBeEnabled()
  })

  it('disables the next button on the last card', () => {
    renderModal(cards[2])

    expect(screen.getByRole('button', { name: /Próximo/ })).toBeDisabled()
    expect(screen.getByRole('button', { name: /Anterior/ })).toBeEnabled()
  })

  it('ignores arrow keys at the edges', async () => {
    const { onNavigate, unmount } = renderModal(cards[0])

    await userEvent.keyboard('{ArrowLeft}')
    expect(onNavigate).not.toHaveBeenCalled()

    unmount()
    const last = renderModal(cards[2])
    await userEvent.keyboard('{ArrowRight}')

    expect(last.onNavigate).not.toHaveBeenCalled()
  })

  it('treats a card outside the list as having no previous card', async () => {
    const orphan: Card = { id: 99, name: 'Órfão', category: 'special', animal: 'cattle' }
    const { onNavigate } = renderModal(orphan)

    expect(screen.getByRole('button', { name: /Anterior/ })).toBeDisabled()

    await userEvent.keyboard('{ArrowLeft}')

    expect(onNavigate).not.toHaveBeenCalled()
  })
})

describe('CardModal focus trap', () => {
  it('wraps focus from the last control to the first', async () => {
    renderModal(cards[1])
    const buttons = screen.getAllByRole('button')
    const first = buttons[0]
    const last = buttons[buttons.length - 1]
    last.focus()

    await userEvent.keyboard('{Tab}')

    expect(document.activeElement).toBe(first)
  })

  it('wraps focus backwards from the first control to the last', async () => {
    renderModal(cards[1])
    const buttons = screen.getAllByRole('button')
    const first = buttons[0]
    const last = buttons[buttons.length - 1]
    first.focus()

    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')

    expect(document.activeElement).toBe(last)
  })
})

describe('CardModal download', () => {
  it('downloads the displayed card', async () => {
    renderModal(cards[1])

    await userEvent.click(screen.getByRole('button', { name: /Baixar imagem/ }))

    expect(downloadSingle).toHaveBeenCalledWith(cards[1])
  })
})
