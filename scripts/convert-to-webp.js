/**
 * Convert large PNGs to WebP and compress to under 200KB each.
 * Run: node scripts/convert-to-webp.js
 */
import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')
const MAX_KB = 200
const MAX_BYTES = MAX_KB * 1024

function* walk(dir) {
  const files = readdirSync(dir)
  for (const name of files) {
    const full = join(dir, name)
    const stat = statSync(full)
    if (stat.isDirectory()) yield* walk(full)
    else if (stat.isFile() && /\.(png|jpg|jpeg)$/i.test(name)) yield full
  }
}

async function convert(filePath) {
  const ext = extname(filePath)
  const webpPath = filePath.replace(new RegExp(ext + '$', 'i'), '.webp')
  const stat = statSync(filePath)
  if (stat.size <= MAX_BYTES && ext.toLowerCase() === '.webp') return
  // Only convert large images (saves time, avoids unsupported formats)
  if (stat.size < 100 * 1024) return

  let quality = 82
  let output = await sharp(filePath)
    .webp({ quality })
    .toBuffer()

  while (output.length > MAX_BYTES && quality > 20) {
    quality -= 10
    output = await sharp(filePath)
      .webp({ quality })
      .toBuffer()
  }

  if (output.length > MAX_BYTES) {
    const meta = await sharp(filePath).metadata()
    const w = meta.width || 1200
    const h = meta.height || 630
    let scale = 0.8
    while (output.length > MAX_BYTES && scale > 0.3) {
      output = await sharp(filePath)
        .resize(Math.round(w * scale), Math.round(h * scale), { fit: 'inside' })
        .webp({ quality: 75 })
        .toBuffer()
      scale -= 0.1
    }
  }

  await sharp(output).toFile(webpPath)
  const outStat = statSync(webpPath)
  console.log(`${filePath.replace(PUBLIC, 'public')} → ${webpPath.replace(PUBLIC, 'public')} (${(outStat.size / 1024).toFixed(1)} KB)`)
}

async function main() {
  for (const file of walk(PUBLIC)) {
    try {
      await convert(file)
    } catch (e) {
      console.warn('Skip', file.replace(PUBLIC, 'public'), e.message)
    }
  }
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
