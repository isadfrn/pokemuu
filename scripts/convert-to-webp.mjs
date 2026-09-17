import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join } from 'path'

const QUALITY = 85

const animal = process.argv[2]
if (!animal) {
  console.error('Uso: node scripts/convert-to-webp.mjs <animal>  (ex.: bovinos)')
  process.exit(1)
}

const CARDS_DIR = `./public/cards/${animal}`

const files = (await readdir(CARDS_DIR)).filter((f) => f.endsWith('.png'))

if (files.length === 0) {
  console.log(`Nenhum PNG encontrado em ${CARDS_DIR}.`)
  process.exit(0)
}

console.log(`Convertendo ${files.length} arquivos PNG → WebP (${animal}, qualidade ${QUALITY})...`)

let done = 0
await Promise.all(
  files.map(async (file) => {
    const input = join(CARDS_DIR, file)
    const output = join(CARDS_DIR, file.replace('.png', '.webp'))

    await sharp(input).webp({ quality: QUALITY }).toFile(output)
    await unlink(input)

    done++
    if (done % 50 === 0 || done === files.length) {
      console.log(`  ${done}/${files.length}`)
    }
  }),
)

console.log('✅ Conversão concluída.')
