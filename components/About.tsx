import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="bg-ink px-6 py-24 md:px-10 md:py-32 border-t border-line"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/me-2.jpg"
              alt="Kian Malakooti"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              quality={75}
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.25em] text-muted">
            02 — About
          </span>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02]">
            A photographer working between
            <span className="italic text-muted"> documentary </span>
            and
            <span className="italic text-muted"> commercial</span>.
          </h2>
          <div className="space-y-4 text-bone/70 text-pretty max-w-xl">
            <p>
              I&apos;m Kian. I started taking photographs in 2019 on a trip to
              East Africa and never stopped. Today my work spans travel
              documentation, live music, portraiture, and commissioned
              commercial work.
            </p>
            <p>
              I&apos;m drawn to natural light, real moments, and the small
              stories inside larger places. If you&apos;d like to work together
              — or just talk about photographs — get in touch.
            </p>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-6 max-w-md">
            <Stat value="140+" label="Photographs" />
            <Stat value="32" label="Countries" />
            <Stat value="3" label="Continents" />
            <Stat value="2019" label="Started" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-line pt-3">
      <div className="font-display text-2xl">{value}</div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted mt-1">
        {label}
      </div>
    </div>
  );
}
