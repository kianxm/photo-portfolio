import { notFound } from "next/navigation";
import PhotoGrid from "@/components/PhotoGrid";
import Footer from "@/components/Footer";
import TransitionLink from "@/components/TransitionLink";
import { albums, getAlbum } from "@/lib/albums";
import type { Metadata } from "next";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

type Params = { params: { id: string } };

// Only the known albums exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return albums.map((a) => ({ id: a.id }));
}

const BASE = SITE_URL;

/** "2019 / 2024" → "2019", "2023 — 2025" → "2023" (schema.org wants ISO dates). */
const firstYear = (y: string) => y.match(/\d{4}/)?.[0];

export function generateMetadata({ params }: Params): Metadata {
  const album = getAlbum(params.id);
  if (!album) return { title: "Album not found", robots: { index: false } };
  const description = album.seoDescription;
  const url = `/album/${album.id}`;
  const title = `${album.seoTitle} | ${SITE_NAME}`;
  return {
    title: album.seoTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function AlbumPage({ params }: Params) {
  const album = getAlbum(params.id);
  if (!album) notFound();

  const idx = albums.findIndex((a) => a.id === album.id);
  const next = albums[(idx + 1) % albums.length];

  const albumUrl = `${BASE}/album/${album.id}`;
  const author = { "@type": "Person", "@id": `${BASE}/#person`, name: AUTHOR, url: BASE };
  const year = firstYear(album.year);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": albumUrl,
        url: albumUrl,
        name: album.name,
        headline: album.seoTitle,
        description: album.seoDescription,
        ...(year ? { dateCreated: year } : {}),
        inLanguage: "en-US",
        isPartOf: { "@id": `${BASE}/#website` },
        author,
        primaryImageOfPage: `${BASE}${album.cover}`,
        image: album.photos.map((p, i) => ({
          "@type": "ImageObject",
          contentUrl: `${BASE}${p.src}`,
          width: p.width,
          height: p.height,
          caption: `${album.name} — photograph ${i + 1} by ${AUTHOR}`,
          creator: author,
          creditText: AUTHOR,
          copyrightNotice: `© ${AUTHOR}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: album.name, item: albumUrl },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="px-6 md:px-10 pt-8 md:pt-10 pb-12 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <TransitionLink
            href="/#work"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted hover:text-bone transition-colors mb-12 md:mb-20 group"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span>Back to work</span>
          </TransitionLink>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="md:col-span-8">
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                Album · {album.year}
              </span>
              <h1
                className="mt-3 font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-tight"
                style={{ viewTransitionName: `album-title-${album.id}` }}
              >
                {album.name}
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-4 flex flex-col gap-3">
              <p className="text-sm text-bone/70 text-pretty max-w-sm">
                {album.blurb}
              </p>
              <div className="text-xs uppercase tracking-[0.2em] text-muted tabular-nums">
                {album.photos.length} photographs
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-3 md:px-6 pb-24">
        <div className="mx-auto max-w-[1600px]">
          <PhotoGrid photos={album.photos} albumName={album.name} />
        </div>
      </div>

      <NextAlbum to={next} />
      <Footer />
    </main>
  );
}

function NextAlbum({ to }: { to: ReturnType<typeof getAlbum> }) {
  if (!to) return null;
  return (
    <section className="border-t border-line">
      <TransitionLink
        href={`/album/${to.id}`}
        className="group block px-6 md:px-10 py-12 md:py-20"
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-muted">
              Next album
            </span>
            <div className="mt-2 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none transition-transform duration-500 group-hover:translate-x-3">
              {to.name} <span className="italic text-muted">→</span>
            </div>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            {to.photos.length} photographs · {to.year}
          </span>
        </div>
      </TransitionLink>
    </section>
  );
}
