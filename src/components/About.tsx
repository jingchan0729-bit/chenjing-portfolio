import { site } from "../data/site";
import { Reveal } from "./Reveal";

export function About() {
  const { about } = site;

  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-[54px] border-t border-line md:scroll-mt-[61px]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-20 lg:grid-cols-12 lg:gap-8 lg:px-6 lg:py-32">
        <div className="lg:col-span-3">
          <h2
            id="about-heading"
            className="font-mono text-[12px] leading-none tracking-[-0.02em] text-soft"
          >
            {about.eyebrow}
          </h2>
        </div>

        <div className="lg:col-span-9">
          <Reveal>
            <p className="max-w-[880px] font-display text-[28px] leading-[1.18] tracking-[-0.03em] text-ink sm:text-[34px] lg:text-[40px]">
              {about.statement}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 grid max-w-[760px] gap-5 sm:grid-cols-2 sm:gap-8">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-[1.7] text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-16 max-w-[760px] border-t border-line">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[84px_1fr] items-baseline gap-4 border-b border-line py-3.5 sm:grid-cols-[120px_1fr]"
                >
                  <dt className="font-mono text-[11px] leading-[1.5] tracking-[0.01em] text-soft">
                    {fact.label}
                  </dt>
                  <dd className="text-[14px] leading-[1.5] text-body">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
