import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join } from 'path'

const CARDS_DIR = './public/cards'
const QUALITY = 85

const files = (await readdir(CARDS_DIR)).filter(f => f.endsWith('.png'))

console.log(`Convertendo ${files.length} arquivos PNG → WebP (qualidade ${QUALITY})...`)

let done = 0
await Promise.all(files.map(async (file) => {
  const input  = join(CARDS_DIR, file)
  const output = join(CARDS_DIR, file.replace('.png', '.webp'))

  await sharp(input).webp({ quality: QUALITY }).toFile(output)
  await unlink(input)

  done++
  if (done % 50 === 0 || done === files.length) {
    console.log(`  ${done}/${files.length}`)
  }
}))

console.log('✅ Conversão concluída.')
