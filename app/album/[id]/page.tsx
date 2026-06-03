import { notFound } from "next/navigation";
import PhotoGrid from "@/components/PhotoGrid";
import Footer from "@/components/Footer";
import TransitionLink from "@/components/TransitionLink";
import { albums, getAlbum } from "@/lib/albums";
import type { Metadata } from "next";

type Params = { params: { id: string } };

export function generateStaticParams() {
  return albums.map((a) => ({ id: a.id }));
}

const BASE = "https://shotbykian.com";

export function generateMetadata({ params }: Params): Metadata {
  const album = getAlbum(params.id);
  if (!album) return { title: "Album not found" };
  const description = `${album.blurb} — ${album.photos.length} photographs by Kian Malakooti, ${album.year}.`;
  const url = `/album/${album.id}`;
  return {
    title: album.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${album.name} | shotbykian`,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${album.name} | shotbykian`,
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": albumUrl,
        url: albumUrl,
        name: album.name,
        description: album.blurb,
        dateCreated: album.year,
        author: {
          "@type": "Person",
          name: "Kian Malakooti",
          url: BASE,
        },
        image: album.photos.slice(0, 12).map((p) => `${BASE}${p.src}`),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Work", item: `${BASE}/#work` },
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
