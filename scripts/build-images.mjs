import { readdir, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import exifr from "exifr";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUBLIC_DIR = join(ROOT, "public");
const OUT_DIR = join(ROOT, "lib");
const OUT_FILE = join(OUT_DIR, "album-images.json");

const ALBUMS = [
  { id: "africa", dir: "AFRICA" },
  { id: "las-vegas", dir: "VEGAS" },
  { id: "graduation", dir: "GRAD" },
  { id: "commercial", dir: "GIGS" },
  { id: "concerts", dir: "TYO" },
];

const EXIF_PICK = [
  "Make",
  "Model",
  "LensModel",
  "FNumber",
  "ExposureTime",
  "ISO",
  "FocalLength",
  "FocalLengthIn35mmFormat",
  "DateTimeOriginal",
];

const naturalCompare = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

async function blurDataURL(filePath) {
  const buf = await sharp(filePath)
    .resize(16, 16, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

function formatShutter(seconds) {
  if (!seconds || typeof seconds !== "number") return undefined;
  if (seconds >= 1) return `${seconds}s`;
  const denom = Math.round(1 / seconds);
  return `1/${denom}s`;
}

function formatAperture(f) {
  if (!f || typeof f !== "number") return undefined;
  return `f/${f.toFixed(f >= 10 ? 0 : 1)}`;
}

function formatFocal(mm) {
  if (!mm || typeof mm !== "number") return undefined;
  return `${Math.round(mm)}mm`;
}

function shapeExif(raw) {
  if (!raw) return undefined;
  const camera = [raw.Make, raw.Model].filter(Boolean).join(" ").trim() || undefined;
  const exif = {
    camera,
    lens: raw.LensModel || undefined,
    aperture: formatAperture(raw.FNumber),
    shutter: formatShutter(raw.ExposureTime),
    iso: raw.ISO || undefined,
    focal: formatFocal(raw.FocalLength),
    takenAt: raw.DateTimeOriginal ? new Date(raw.DateTimeOriginal).toISOString() : undefined,
  };
  // strip undefined keys
  const cleaned = Object.fromEntries(Object.entries(exif).filter(([, v]) => v !== undefined));
  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

async function processImage(albumDir, fileName) {
  const filePath = join(PUBLIC_DIR, albumDir, fileName);
  const meta = await sharp(filePath).metadata();
  const blur = await blurDataURL(filePath);
  let exif;
  try {
    const raw = await exifr.parse(filePath, { pick: EXIF_PICK });
    exif = shapeExif(raw);
  } catch {
    /* ignore — exif extraction is best-effort */
  }
  return {
    src: `/${albumDir}/${fileName}`,
    width: meta.width ?? 0,
    height: meta.height ?? 0,
    blurDataURL: blur,
    ...(exif ? { exif } : {}),
  };
}

async function processAlbum({ id, dir }) {
  const albumPath = join(PUBLIC_DIR, dir);
  const files = (await readdir(albumPath))
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(extname(f)))
    .sort(naturalCompare);

  const photos = [];
  for (const file of files) {
    try {
      photos.push(await processImage(dir, file));
    } catch (err) {
      console.warn(`skip ${dir}/${file}: ${err.message}`);
    }
  }
  return [id, photos];
}

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  const manifest = {};
  let exifCount = 0;
  for (const album of ALBUMS) {
    const [id, photos] = await processAlbum(album);
    manifest[id] = photos;
    const withExif = photos.filter((p) => p.exif).length;
    exifCount += withExif;
    console.log(`${album.dir}: ${photos.length} images${withExif > 0 ? ` (${withExif} with EXIF)` : ""}`);
  }

  await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`wrote ${OUT_FILE}${exifCount > 0 ? ` · EXIF on ${exifCount} photos` : " · no EXIF found"}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
