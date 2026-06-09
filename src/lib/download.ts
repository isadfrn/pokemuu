import type { Card } from '@/types/card'

function toFilename(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function downloadSingle(card: Card): void {
  const link = document.createElement('a')
  link.href = `/cards/${card.id}.webp`
  link.download = `${card.id}-${toFilename(card.name)}.webp`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function downloadMultiple(
  cards: Card[],
  zipName = 'atlas-anatomico-bovino.zip',
  onProgress?: (pct: number) => void,
): Promise<void> {
  const { default: JSZip } = await import('jszip')

  const zip = new JSZip()
  const folder = zip.folder('atlas-anatomico')!

  let done = 0
  await Promise.all(
    cards.map(async (card) => {
      const res = await fetch(`/cards/${card.id}.webp`)
      const blob = await res.blob()
      folder.file(`${card.id}-${toFilename(card.name)}.webp`, blob)
      done++
      onProgress?.(Math.round((done / cards.length) * 100))
    }),
  )

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = zipName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
