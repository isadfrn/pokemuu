import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import type { Card } from '@/domain/card'
import { CATEGORY_META } from '@/domain/card'
import { downloadSingle } from '@/lib/download'
import CardItem from './CardItem'

vi.mock('@/lib/download', () => ({ downloadSingle: vi.fn(), downloadMultiple: vi.fn() }))

const card: Card = { id: 12, name: 'Músculo Masseter', category: 'muscles', animal: 'cattle' }

const previewName = `Abrir card ${card.name}`
const downloadName = `Baixar card ${card.name}`
const checkboxName = `Selecionar card ${card.name}`

function renderCard(overrides: Partial<ComponentProps<typeof CardItem>> = {}) {
  const onSelect = vi.fn()
  const onOpen = vi.fn()
  const utils = render(
    <CardItem
      card={card}
      selected={false}
      selectMode={false}
      onSelect={onSelect}
      onOpen={onOpen}
      index={0}
      {...overrides}
    />,
  )
  return { ...utils, onSelect, onOpen }
}

describe('CardItem rendering', () => {
  it('shows the name, card number and category badge', () => {
    renderCard()

    expect(screen.getByText(card.name)).toBeInTheDocument()
    expect(screen.getByText('#12')).toBeInTheDocument()
    expect(screen.getByText(CATEGORY_META.muscles.label)).toBeInTheDocument()
  })

  it('resolves the image from the animal assets', () => {
    const { container } = renderCard()
    const image = container.querySelector('img')

    expect(image).toHaveAttribute('src', '/cards/cattle/12.webp')
    expect(image).toHaveAttribute('alt', card.name)
  })

  it('applies the per-category hover class', () => {
    const { container } = renderCard()

    expect(container.firstElementChild).toHaveClass('card-hover-muscles')
  })

  it('highlights a selected card with its category glow', () => {
    const { container } = renderCard({ selected: true })
    const root = container.firstElementChild as HTMLElement

    expect(root).toHaveClass('ring-2')
    expect(root.style.getPropertyValue('--tw-ring-color')).toBe(CATEGORY_META.muscles.glowColor)
  })
})

describe('CardItem interactions', () => {
  it('opens the card when the preview is clicked', async () => {
    const { onOpen } = renderCard()

    await userEvent.click(screen.getByRole('button', { name: previewName }))

    expect(onOpen).toHaveBeenCalledWith(card)
  })

  it('opens the card with Enter and with Space', async () => {
    const { onOpen } = renderCard()
    const preview = screen.getByRole('button', { name: previewName })
    preview.focus()

    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')

    expect(onOpen).toHaveBeenCalledTimes(2)
    expect(onOpen).toHaveBeenCalledWith(card)
  })

  it('ignores unrelated keys on the preview', async () => {
    const { onOpen } = renderCard()
    const preview = screen.getByRole('button', { name: previewName })
    preview.focus()

    await userEvent.keyboard('a')

    expect(onOpen).not.toHaveBeenCalled()
  })

  it('downloads the card through the action button', async () => {
    renderCard()

    await userEvent.click(screen.getByRole('button', { name: downloadName }))

    expect(downloadSingle).toHaveBeenCalledWith(card)
  })

  it('does not render a checkbox outside select mode', () => {
    renderCard()

    expect(screen.queryByRole('checkbox')).toBeNull()
  })

  it('renders a checkbox in select mode and toggles selection with it', async () => {
    const { onSelect, onOpen } = renderCard({ selectMode: true })

    await userEvent.click(screen.getByRole('checkbox', { name: checkboxName }))

    expect(onSelect).toHaveBeenCalledWith(card.id)
    expect(onOpen).not.toHaveBeenCalled()
  })

  it('supports selecting with the keyboard', async () => {
    const { onSelect } = renderCard({ selectMode: true })
    const checkbox = screen.getByRole('checkbox', { name: checkboxName })
    checkbox.focus()

    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')

    expect(onSelect).toHaveBeenCalledTimes(2)
  })

  it('exposes the checked state through aria-checked', () => {
    renderCard({ selected: true })

    expect(screen.getByRole('checkbox', { name: checkboxName })).toHaveAttribute(
      'aria-checked',
      'true',
    )
  })

  it('selects through the translucent overlay', async () => {
    const { onSelect, onOpen, container } = renderCard({ selectMode: true })
    const overlay = container.querySelector('div.absolute.inset-0') as HTMLElement

    await userEvent.click(overlay)

    expect(onSelect).toHaveBeenCalledWith(card.id)
    expect(onOpen).not.toHaveBeenCalled()
  })
})
