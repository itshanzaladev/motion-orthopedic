// Prepares website images from the /images folder.
//
//   node scripts/prepare-images.mjs            -> public build (approved images only)
//   node scripts/prepare-images.mjs --preview  -> private preview (all usable images)
//
// Output: public/media/<name>.webp (original quality, unchanged when the
// source is already WebP) and public/media/<name>-480.webp, plus review
// screenshots in public/media/reviews/. Images that are not approved for the
// public site are not copied, so they cannot leak through the build output.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { photos, photoWidths } from '../src/config/assets.js';
import { isPhotoAllowed, isScreenshotAllowed } from '../src/config/publication.js';
import { reviews } from '../src/content/reviews.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'images');
// Review screenshots may live in images/reviews or a top-level Reviews folder.
const reviewsDir = [path.join(imagesDir, 'reviews'), path.join(root, 'reviews')]
  .find((dir) => fs.existsSync(dir)) ?? path.join(imagesDir, 'reviews');
const outDir = path.join(root, 'public', 'media');
const generatedFile = path.join(root, 'src', 'generated', 'media.json');
const preview = process.argv.includes('--preview');
const IMAGE_EXT = /\.(webp|jpe?g|png|avif|heic|heif|tiff?)$/i;

function indexFolder(dir) {
  if (!fs.existsSync(dir)) return new Map();
  const map = new Map();
  for (const file of fs.readdirSync(dir)) {
    if (!IMAGE_EXT.test(file)) continue;
    map.set(path.parse(file).name.trim().toLowerCase(), path.join(dir, file));
  }
  return map;
}

async function writeVariants(src, name, targetDir, { maxWidth = Infinity, quality = 82 } = {}) {
  const meta = await sharp(src).metadata();
  const sizes = {};
  const full = path.join(targetDir, `${name}.webp`);
  if (/\.webp$/i.test(src) && meta.width <= maxWidth) {
    fs.copyFileSync(src, full); // keep original quality
    sizes.full = { width: meta.width, height: meta.height };
  } else {
    const info = await sharp(src).rotate().resize({ width: Math.min(meta.width, maxWidth), withoutEnlargement: true })
      // Screenshots (PNG) stay lossless so small text remains sharp.
      .webp(/\.png$/i.test(src) ? { lossless: true } : { quality: 88 }).toFile(full);
    sizes.full = { width: info.width, height: info.height };
  }
  return { meta, sizes, quality };
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(path.join(outDir, 'reviews'), { recursive: true });
fs.mkdirSync(path.dirname(generatedFile), { recursive: true });

const files = indexFolder(imagesDir);
// Stock placeholder photos live in images/placeholders ("placeholders/<name>").
for (const [base, file] of indexFolder(path.join(imagesDir, 'placeholders'))) files.set(`placeholders/${base}`, file);
const used = new Set();
const generated = { photos: {}, reviews: {} };
const warnings = [];

for (const [name, photo] of Object.entries(photos)) {
  const src = files.get(photo.source.toLowerCase());
  if (src) used.add(photo.source.toLowerCase());
  if (!isPhotoAllowed(photo, preview)) continue;
  if (!src) {
    warnings.push(`Missing image for "${name}" (expected a file named "${photo.source}" in /images)`);
    continue;
  }
  const { meta, sizes } = await writeVariants(src, name, outDir);
  if (meta.width !== photo.width || meta.height !== photo.height) {
    warnings.push(`"${name}" is ${meta.width}x${meta.height}; update width/height in src/config/assets.js`);
  }
  for (const w of photoWidths) {
    if (w >= meta.width) continue;
    const info = await sharp(src).rotate().resize({ width: w }).webp({ quality: 80 })
      .toFile(path.join(outDir, `${name}-${w}.webp`));
    sizes[w] = { width: info.width, height: info.height };
  }
  generated.photos[name] = sizes;
}

const reviewFiles = indexFolder(reviewsDir);
for (const review of reviews) {
  if (!review.screenshot) continue;
  const src = reviewFiles.get(review.screenshot.toLowerCase());
  if (!src) {
    warnings.push(`Missing review screenshot "${review.screenshot}" in ${path.relative(root, reviewsDir)}`);
    continue;
  }
  if (!isScreenshotAllowed(review, preview)) continue;
  const { sizes } = await writeVariants(src, review.id, path.join(outDir, 'reviews'), { maxWidth: 1200 });
  generated.reviews[review.id] = sizes.full;
}
const referenced = new Set(reviews.map((r) => (r.screenshot || '').toLowerCase()));
for (const [base] of reviewFiles) {
  if (!referenced.has(base)) warnings.push(`Review screenshot "${base}" is not transcribed in src/content/reviews.js yet`);
}
for (const [base, file] of files) {
  if (!used.has(base)) warnings.push(`Image "${path.basename(file)}" is not in the asset manifest`);
}

fs.writeFileSync(generatedFile, JSON.stringify(generated, null, 2) + '\n');
console.log(`Images prepared for ${preview ? 'PRIVATE PREVIEW' : 'PUBLIC'} build: ` +
  `${Object.keys(generated.photos).length} photos, ${Object.keys(generated.reviews).length} review screenshots.`);
for (const w of warnings) console.warn(`  ! ${w}`);
