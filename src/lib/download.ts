import type { Card } from '@/domain/card'
import { cardImage } from '@/domain/assets'

export function toFilename(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function downloadSingle(card: Card): void {
  const link = document.createElement('a')
  link.href = cardImage(card)
  link.download = `${card.id}-${toFilename(card.name)}.webp`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export interface DownloadResult {
  total: number
  succeeded: number
  failed: Card[]
}

export async function downloadMultiple(
  cards: Card[],
  zipName = 'pokemuu-cards.zip',
  onProgress?: (pct: number) => void,
): Promise<DownloadResult> {
  const { default: JSZip } = await import('jszip')

  const zip = new JSZip()
  const folder = zip.folder('pokemuu')!

  let done = 0
  const failed: Card[] = []

  const results = await Promise.allSettled(
    cards.map(async (card) => {
      const res = await fetch(cardImage(card))
      if (!res.ok) throw new Error(`HTTP ${res.status} for card ${card.id}`)
      const blob = await res.blob()
      folder.file(`${card.id}-${toFilename(card.name)}.webp`, blob)
    }),
  )

  results.forEach((result, i) => {
    if (result.status === 'rejected') failed.push(cards[i])
    done++
    onProgress?.(Math.round((done / cards.length) * 100))
  })

  const succeeded = cards.length - failed.length

  if (succeeded === 0) {
    throw new Error('Nenhum card pôde ser baixado.')
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = zipName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  return { total: cards.length, succeeded, failed }
}
