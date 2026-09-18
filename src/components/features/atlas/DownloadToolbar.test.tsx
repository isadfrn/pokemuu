import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Animal } from '@/domain/animal'
import type { Card } from '@/domain/card'
import { downloadMultiple, type DownloadResult } from '@/lib/download'
import DownloadToolbar from './DownloadToolbar'

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
  { id: 1, name: 'Bíceps', category: 'muscles', animal: 'cattle' },
  { id: 2, name: 'Joelho', category: 'joints', animal: 'cattle' },
  { id: 3, name: 'Fêmur', category: 'bones', animal: 'cattle' },
]

interface Overrides {
  filteredCards?: Card[]
  allCards?: Card[]
  selectedIds?: Set<number>
  selectMode?: boolean
}

function renderToolbar(overrides: Overrides = {}) {
  const onToggleSelectMode = vi.fn()
  const onClearSelection = vi.fn()
  const utils = render(
    <DownloadToolbar
      animal={animal}
      filteredCards={overrides.filteredCards ?? cards}
      selectedIds={overrides.selectedIds ?? new Set<number>()}
      selectMode={overrides.selectMode ?? false}
      onToggleSelectMode={onToggleSelectMode}
      onClearSelection={onClearSelection}
      allCards={overrides.allCards ?? cards}
    />,
  )
  return { ...utils, onToggleSelectMode, onClearSelection }
}

beforeEach(() => {
  mockDownloadMultiple.mockResolvedValue({ total: 0, succeeded: 0, failed: [] })
})

describe('DownloadToolbar basics', () => {
  it('shows how many cards would be downloaded', () => {
    renderToolbar()

    expect(screen.getByRole('button', { name: /Baixar todos \(3\)/ })).toBeInTheDocument()
  })

  it('reflects the filtered card count', () => {
    renderToolbar({ filteredCards: [cards[0]] })

    expect(screen.getByRole('button', { name: /Baixar todos \(1\)/ })).toBeInTheDocument()
  })

  it('requests select mode when the toggle is pressed', async () => {
    const { onToggleSelectMode } = renderToolbar()

    await userEvent.click(screen.getByRole('button', { name: /Selecionar/ }))

    expect(onToggleSelectMode).toHaveBeenCalledTimes(1)
  })

  it('hides the bulk actions while nothing is selected', () => {
    renderToolbar({ selectMode: true })

    expect(screen.queryByRole('button', { name: /selecionados/ })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Limpar' })).toBeNull()
  })

  it('shows the selection count in select mode', () => {
    renderToolbar({ selectMode: true, selectedIds: new Set([1, 2]) })

    expect(screen.getByRole('button', { name: /Selecionar/ })).toHaveTextContent('2')
    expect(screen.getByRole('button', { name: /Baixar 2 selecionados/ })).toBeInTheDocument()
  })
})

describe('DownloadToolbar downloads', () => {
  it('downloads every filtered card', async () => {
    renderToolbar()

    await userEvent.click(screen.getByRole('button', { name: /Baixar todos/ }))

    expect(mockDownloadMultiple).toHaveBeenCalledWith(
      cards,
      'cattle-3-cards.zip',
      expect.any(Function),
    )
  })

  it('downloads only the selected cards', async () => {
    renderToolbar({
      selectMode: true,
      selectedIds: new Set([1, 3]),
      allCards: cards,
      filteredCards: [cards[1]],
    })

    await userEvent.click(screen.getByRole('button', { name: /Baixar 2 selecionados/ }))

    expect(mockDownloadMultiple).toHaveBeenCalledWith(
      [cards[0], cards[2]],
      'cattle-selecionados-2.zip',
      expect.any(Function),
    )
  })

  it('clears the selection when asked', async () => {
    const { onClearSelection } = renderToolbar({ selectMode: true, selectedIds: new Set([1]) })

    await userEvent.click(screen.getByRole('button', { name: 'Limpar' }))

    expect(onClearSelection).toHaveBeenCalledTimes(1)
  })

  it('shows progress while the archive is being built', async () => {
    let resolveDownload!: (result: DownloadResult) => void
    mockDownloadMultiple.mockImplementation(
      () =>
        new Promise<DownloadResult>((resolve) => {
          resolveDownload = resolve
        }),
    )
    renderToolbar()

    await userEvent.click(screen.getByRole('button', { name: /Baixar todos/ }))

    expect(screen.getByText(/Comprimindo/)).toBeInTheDocument()

    resolveDownload({ total: 3, succeeded: 3, failed: [] })

    await waitFor(() => expect(screen.queryByText(/Comprimindo/)).toBeNull())
  })

  it('reports the cards that could not be downloaded', async () => {
    mockDownloadMultiple.mockResolvedValue({ total: 3, succeeded: 2, failed: [cards[2]] })
    renderToolbar()

    await userEvent.click(screen.getByRole('button', { name: /Baixar todos/ }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      '1 de 3 cards falharam e ficaram de fora.',
    )
  })

  it('reports a hard failure', async () => {
    mockDownloadMultiple.mockRejectedValue(new Error('boom'))
    renderToolbar()

    await userEvent.click(screen.getByRole('button', { name: /Baixar todos/ }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível gerar o download. Tente novamente.',
    )
  })

  it('does not warn when everything succeeds', async () => {
    renderToolbar()

    await userEvent.click(screen.getByRole('button', { name: /Baixar todos/ }))

    await waitFor(() => expect(screen.queryByText(/Comprimindo/)).toBeNull())
    expect(screen.queryByRole('alert')).toBeNull()
  })
})
