// Cuts a tall screenshot into viewable slices.
import sharp from 'sharp'
const [file, step = '1800', width = '1000'] = process.argv.slice(2)
const m = await sharp(file).metadata()
let i = 0
for (let top = 0; top < m.height; top += +step) {
  const h = Math.min(+step, m.height - top)
  await sharp(file).extract({ left: 0, top, width: m.width, height: h }).resize({ width: Math.min(+width, m.width) }).jpeg({ quality: 70 }).toFile(file.replace('.png', `-s${i++}.jpg`))
}
console.log('slices', i)
