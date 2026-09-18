import { describe, it, expect, vi, beforeEach } from 'vitest'
import { toFilename, downloadSingle, downloadMultiple } from './download'
import type { Card } from '@/domain/card'

function cattleCard(id: number, name: string): Card {
  return { id, name, category: 'muscles', animal: 'cattle' }
}

function okResponse(): Response {
  return {
    ok: true,
    status: 200,
    blob: async () => new Blob(['card-bytes']),
  } as unknown as Response
}

function failResponse(status = 404): Response {
  return { ok: false, status, blob: async () => new Blob([]) } as unknown as Response
}

describe('toFilename', () => {
  it('lowercases and slugifies spaces', () => {
    expect(toFilename('Músculo Bíceps')).toBe('musculo-biceps')
  })

  it('strips accents (NFD normalization)', () => {
    expect(toFilename('Coração')).toBe('coracao')
  })

  it('collapses runs of non-alphanumerics into a single dash', () => {
    expect(toFilename('a  --  b')).toBe('a-b')
  })

  it('trims leading and trailing dashes', () => {
    expect(toFilename('  (especial)  ')).toBe('especial')
  })

  it('handles an all-symbol name without leaving stray dashes', () => {
    expect(toFilename('!!!')).toBe('')
  })
})

describe('downloadSingle', () => {
  let clicked: HTMLAnchorElement[]

  beforeEach(() => {
    clicked = []
    vi.spyOn(HTMLElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      clicked.push(this)
    })
  })

  it('downloads the card image with a slugified filename', () => {
    downloadSingle(cattleCard(42, 'Músculo Bíceps'))

    expect(clicked).toHaveLength(1)
    expect(clicked[0].getAttribute('href')).toBe('/cards/cattle/42.webp')
    expect(clicked[0].download).toBe('42-musculo-biceps.webp')
  })

  it('removes the temporary link from the document', () => {
    downloadSingle(cattleCard(1, 'Coluna'))

    expect(document.body.querySelectorAll('a')).toHaveLength(0)
  })

  it('does not leave the link attached while the click is in flight', () => {
    let attachedDuringClick = false
    vi.spyOn(HTMLElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      attachedDuringClick = document.body.contains(this)
    })

    downloadSingle(cattleCard(7, 'Ossos do Crânio'))

    expect(attachedDuringClick).toBe(true)
    expect(document.body.querySelectorAll('a')).toHaveLength(0)
  })
})

describe('downloadMultiple', () => {
  let clicked: HTMLAnchorElement[]

  beforeEach(() => {
    clicked = []
    vi.spyOn(HTMLElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      clicked.push(this)
    })
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:zipped')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
  })

  it('zips every card, reports progress and downloads the archive', async () => {
    const fetchMock = vi.fn(async () => okResponse())
    vi.stubGlobal('fetch', fetchMock)
    const progress: number[] = []
    const cards = [cattleCard(1, 'Bíceps'), cattleCard(2, 'Tríceps')]

    const result = await downloadMultiple(cards, 'meu-zip.zip', (pct) => progress.push(pct))

    expect(result).toEqual({ total: 2, succeeded: 2, failed: [] })
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock).toHaveBeenCalledWith('/cards/cattle/1.webp')
    expect(fetchMock).toHaveBeenCalledWith('/cards/cattle/2.webp')
    expect(progress).toEqual([50, 100])
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob))
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:zipped')
    expect(clicked).toHaveLength(1)
    expect(clicked[0].download).toBe('meu-zip.zip')
    expect(clicked[0].getAttribute('href')).toBe('blob:zipped')
    expect(document.body.querySelectorAll('a')).toHaveLength(0)
  })

  it('falls back to the default archive name', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => okResponse()),
    )

    await downloadMultiple([cattleCard(1, 'Coluna')])

    expect(clicked[0].download).toBe('pokemuu-cards.zip')
  })

  it('keeps going when some cards fail and reports them', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => (url.includes('/2.webp') ? failResponse() : okResponse())),
    )
    const cards = [cattleCard(1, 'Ok'), cattleCard(2, 'Falha'), cattleCard(3, 'Ok de novo')]

    const result = await downloadMultiple(cards)

    expect(result.total).toBe(3)
    expect(result.succeeded).toBe(2)
    expect(result.failed).toEqual([cards[1]])
    expect(clicked).toHaveLength(1)
  })

  it('throws when every card fails and never builds an archive', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => failResponse(500)),
    )

    await expect(downloadMultiple([cattleCard(1, 'A')])).rejects.toThrow(
      'Nenhum card pôde ser baixado.',
    )

    expect(URL.createObjectURL).not.toHaveBeenCalled()
    expect(clicked).toHaveLength(0)
  })

  it('throws for an empty selection', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => okResponse()),
    )

    await expect(downloadMultiple([])).rejects.toThrow('Nenhum card pôde ser baixado.')
  })

  it('works without a progress callback', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => okResponse()),
    )

    await expect(downloadMultiple([cattleCard(9, 'Rins')])).resolves.toMatchObject({ succeeded: 1 })
  })
})
