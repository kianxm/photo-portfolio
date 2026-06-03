import Link from "next/link";

const links = [
  { label: "Instagram", href: "https://www.instagram.com/shotbykian" },
  { label: "Email", href: "mailto:kianjmalakooti@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kianmalakooti" },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink border-t border-line px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-muted">
              03 — Contact
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
              Let&apos;s make
              <span className="italic text-muted"> something</span>.
            </h2>
            <a
              href="mailto:kianjmalakooti@gmail.com"
              className="mt-6 inline-block underline-reveal text-bone/90"
            >
              kianjmalakooti@gmail.com
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-bone/70">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  className="underline-reveal"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hairline" />

        <div className="font-display text-[clamp(3rem,16vw,12rem)] leading-[0.85] tracking-tight whitespace-nowrap overflow-hidden">
          shotby<span className="italic text-muted">kian</span>
        </div>

        <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-muted">
          <span>© {new Date().getFullYear()} Kian Malakooti</span>
          <span>All photographs original</span>
        </div>
      </div>
    </footer>
  );
}
