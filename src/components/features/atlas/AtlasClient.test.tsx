import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Animal } from '@/domain/animal'
import type { Card } from '@/domain/card'
import { CATEGORY_META } from '@/domain/card'
import { downloadMultiple } from '@/lib/download'
import { navigationState } from '@/test/stubs/next-navigation'
import AtlasClient from './AtlasClient'

vi.mock('@/lib/download', () => ({ downloadSingle: vi.fn(), downloadMultiple: vi.fn() }))

const mockDownloadMultiple = vi.mocked(downloadMultiple)

const animal: Animal = {
  id: 'cattle',
  name: 'Bovinos',
  singular: 'Bovino',
  emoji: '🐄',
  description: 'Anatomia bovina.',
  available: true,
}

const cards: Card[] = [
  { id: 1, name: 'Músculo Bíceps', category: 'muscles', animal: 'cattle' },
  { id: 2, name: 'Articulação do Joelho', category: 'joints', animal: 'cattle' },
  { id: 3, name: 'Osso Fêmur', category: 'bones', animal: 'cattle' },
  { id: 4, name: 'Card Especial', category: 'special', animal: 'cattle' },
]

const previewButtons = () => screen.queryAllByRole('button', { name: /^Abrir card / })

beforeEach(() => {
  mockDownloadMultiple.mockResolvedValue({ total: 0, succeeded: 0, failed: [] })
})

describe('AtlasClient list rendering', () => {
  it('renders the whole card list by default', () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    expect(previewButtons()).toHaveLength(cards.length)
    expect(screen.getByText('4 de 4 cards')).toBeInTheDocument()
  })

  it('counts each category for the filter chips', () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    for (const category of ['all', 'muscles', 'joints', 'bones', 'special'] as const) {
      const expected =
        category === 'all'
          ? cards.length
          : cards.filter((card) => card.category === category).length
      const chip = screen.getByRole('button', {
        name: new RegExp(CATEGORY_META[category].label),
      })
      expect(chip).toHaveTextContent(String(expected))
    }
  })
})

describe('AtlasClient categories', () => {
  it('starts on the category provided in the URL', () => {
    navigationState.searchParams = new URLSearchParams('category=bones')

    render(<AtlasClient animal={animal} cards={cards} />)

    expect(previewButtons()).toHaveLength(1)
    expect(screen.getByText('1 de 4 cards')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ossos/ })).toHaveClass(CATEGORY_META.bones.color)
  })

  it('filters the grid and syncs the URL when a category is chosen', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    await userEvent.click(screen.getByRole('button', { name: /Articulações/ }))

    expect(previewButtons()).toHaveLength(1)
    expect(screen.getByText('1 de 4 cards')).toBeInTheDocument()
    expect(navigationState.router.replace).toHaveBeenCalledWith('/atlas/cattle?category=joints', {
      scroll: false,
    })
  })

  it('drops the query string when going back to all', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    await userEvent.click(screen.getByRole('button', { name: /Ossos/ }))
    await userEvent.click(screen.getByRole('button', { name: /Todos/ }))

    expect(navigationState.router.replace).toHaveBeenLastCalledWith('/atlas/cattle', {
      scroll: false,
    })
    expect(previewButtons()).toHaveLength(cards.length)
  })
})

describe('AtlasClient search', () => {
  it('keeps the full list while the query is too short', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    await userEvent.type(screen.getByRole('searchbox'), 'o')

    expect(previewButtons()).toHaveLength(cards.length)
  })

  it('narrows the list down as the query grows', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    await userEvent.type(screen.getByRole('searchbox'), 'Fêmur')

    expect(screen.getByText('1 de 4 cards')).toBeInTheDocument()
    expect(screen.getByText('Osso Fêmur')).toBeInTheDocument()
    expect(previewButtons()).toHaveLength(1)
  })

  it('combines the query with the active category', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    await userEvent.click(screen.getByRole('button', { name: /Ossos/ }))
    await userEvent.type(screen.getByRole('searchbox'), 'Especial')

    expect(previewButtons()).toHaveLength(0)
    expect(screen.getByText(/Nenhum card encontrado/)).toBeInTheDocument()
  })

  it('offers a way out of an empty result set', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    await userEvent.type(screen.getByRole('searchbox'), 'zzzz')

    expect(previewButtons()).toHaveLength(0)

    await userEvent.click(screen.getByRole('button', { name: 'Limpar busca' }))

    expect(previewButtons()).toHaveLength(cards.length)
    expect(screen.getByRole('searchbox')).toHaveValue('')
  })
})

describe('AtlasClient selection', () => {
  it('reveals a checkbox per card in select mode', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)

    await userEvent.click(screen.getByRole('button', { name: /Selecionar/ }))

    expect(screen.getAllByRole('checkbox')).toHaveLength(cards.length)
  })

  it('downloads only the selected cards', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    await userEvent.click(screen.getByRole('button', { name: /Selecionar/ }))
    await userEvent.click(screen.getAllByRole('checkbox')[0])
    expect(screen.getByRole('button', { name: /Selecionar/ })).toHaveTextContent('1')

    await userEvent.click(screen.getAllByRole('checkbox')[2])
    expect(screen.getByRole('button', { name: /Selecionar/ })).toHaveTextContent('2')

    await userEvent.click(screen.getByRole('button', { name: /Baixar 2 selecionados/ }))

    expect(mockDownloadMultiple).toHaveBeenCalledWith(
      [cards[0], cards[2]],
      'cattle-selecionados-2.zip',
      expect.any(Function),
    )
  })

  it('clears the selection explicitly', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    await userEvent.click(screen.getByRole('button', { name: /Selecionar/ }))
    await userEvent.click(screen.getAllByRole('checkbox')[0])
    await userEvent.click(screen.getByRole('button', { name: 'Limpar' }))

    expect(screen.queryByRole('button', { name: /selecionado/ })).toBeNull()
  })

  it('drops the selection when select mode is turned off and on again', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)
    const toggle = () => screen.getByRole('button', { name: /Selecionar/ })

    await userEvent.click(toggle())
    await userEvent.click(screen.getAllByRole('checkbox')[0])
    expect(toggle()).toHaveTextContent('1')

    await userEvent.click(toggle())
    await userEvent.click(toggle())

    expect(toggle()).not.toHaveTextContent('1')
  })

  it('downloads the whole filtered list', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    await userEvent.click(screen.getByRole('button', { name: /Baixar todos \(4\)/ }))

    expect(mockDownloadMultiple).toHaveBeenCalledWith(
      cards,
      'cattle-4-cards.zip',
      expect.any(Function),
    )
  })
})

describe('AtlasClient modal', () => {
  it('opens the modal for the clicked card', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    expect(screen.queryByRole('dialog')).toBeNull()

    await userEvent.click(screen.getByRole('button', { name: `Abrir card ${cards[1].name}` }))

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', `Card ${cards[1].name}`)
  })

  it('closes the modal again', async () => {
    render(<AtlasClient animal={animal} cards={cards} />)

    await userEvent.click(screen.getByRole('button', { name: `Abrir card ${cards[0].name}` }))
    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })
})
