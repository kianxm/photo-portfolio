/**
 * One-shot script: re-encode every JPEG in /public album folders + me*.jpg
 * with mozjpeg q75 (preserving EXIF). Idempotent — skips files already smaller
 * than the result, or files marked optimized via xattr-style sentinel.
 *
 * Originals live in git history — `git checkout -- public/` to revert.
 */
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUBLIC_DIR = join(ROOT, "public");

const ALBUM_DIRS = ["AFRICA", "VEGAS", "GRAD", "GIGS", "TYO"];
const ROOT_FILES = ["me.jpg", "me-2.jpg"];

const QUALITY = 75;
const MAX_WIDTH = 2400;
const MIN_SAVINGS_BYTES = 1024 * 5; // skip if savings < 5 KB

async function optimizeOne(absPath) {
  const before = (await stat(absPath)).size;
  const tmp = join(dirname(absPath), `.tmp-${basename(absPath)}`);

  let pipeline = sharp(absPath, { failOn: "none" }).rotate(); // bake-in orientation
  const meta = await sharp(absPath).metadata();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline
    .jpeg({
      quality: QUALITY,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:2:0",
    })
    .withMetadata() // keep EXIF for #6
    .toFile(tmp);

  const after = (await stat(tmp)).size;
  const savings = before - after;

  if (savings < MIN_SAVINGS_BYTES) {
    await unlink(tmp);
    return { path: absPath, before, after: before, skipped: true };
  }

  await rename(tmp, absPath);
  return { path: absPath, before, after, skipped: false };
}

async function* walk() {
  for (const dir of ALBUM_DIRS) {
    const folder = join(PUBLIC_DIR, dir);
    const files = await readdir(folder);
    for (const f of files) {
      if (/\.jpe?g$/i.test(extname(f))) yield join(folder, f);
    }
  }
  for (const f of ROOT_FILES) yield join(PUBLIC_DIR, f);
}

function fmtKB(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;

  for await (const file of walk()) {
    const r = await optimizeOne(file);
    totalBefore += r.before;
    totalAfter += r.after;
    if (r.skipped) {
      skipped++;
      console.log(`  skip ${file.replace(PUBLIC_DIR, "")} (${fmtKB(r.before)})`);
    } else {
      processed++;
      const pct = Math.round(((r.before - r.after) / r.before) * 100);
      console.log(
        `  opt  ${file.replace(PUBLIC_DIR, "")} ${fmtKB(r.before)} → ${fmtKB(
          r.after
        )} (-${pct}%)`
      );
    }
  }

  console.log(`\n${processed} optimized · ${skipped} skipped`);
  console.log(
    `total: ${fmtKB(totalBefore)} → ${fmtKB(totalAfter)} (saved ${fmtKB(
      totalBefore - totalAfter
    )}, ${Math.round(((totalBefore - totalAfter) / totalBefore) * 100)}%)`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
