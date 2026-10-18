import { useEffect } from "react";
import { getNeighbour, type Project } from "../../data/projects";
import { site } from "../../data/site";
import { pac } from "../../data/pac";
import { Link } from "../../lib/router";
import { cn } from "../../lib/cn";
import { ArrowIcon } from "../Icons";
import { Plate } from "../Plate";
import { Reveal } from "../Reveal";

/**
 * 项目 03 — P.A.C.
 *
 * 版式与 01 / 02 刻意不同：
 *  - 画廊跳出内容容器，满幅铺开，图块之间只留 4–6px 的缝（画册拼版的手感）；
 *  - 图量从 34 张收到 14 张，每张都放大到接近整屏，靠尺寸而不是数量说话；
 *  - 图流中间插一段纯文字呼吸页，把连续图片断开，页面才有起伏。
 */
export function PacIdentity({ project }: { project: Project }) {
  const { prev, next } = getNeighbour(project.slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = `${pac.title} — ${site.name} ${site.brand}`;

    const meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "P.A.C. — a bakery visual identity built on typography, refreshed by illustration, and open to interpretation.",
    );

    return () => meta?.setAttribute("content", previous);
  }, []);

  return (
    <main>
      <article>
        {/* ---------------------------------------------------------- title */}
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="pt-5 lg:pt-7">
            <Link
              to="/#works"
              className="group inline-flex items-center gap-2 font-mono text-[11px] leading-none tracking-[0.01em] text-soft transition-colors duration-300 hover:text-ink"
            >
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-x-1"
              >
                ←
              </span>{" "}
              All works
            </Link>
          </div>

          <header className="pb-8 pt-10 lg:pb-12 lg:pt-16">
            <p className="font-mono text-[11px] uppercase leading-none tracking-[0.06em] text-soft">
              {pac.label}
            </p>

            <h1
              id="project-title"
              className="mt-5 font-display text-[clamp(46px,9.2vw,126px)] font-normal leading-[0.86] tracking-[-0.045em] text-ink"
            >
              {pac.title}
            </h1>

            <div className="mt-9 grid gap-6 border-t border-line pt-6 lg:mt-12 lg:grid-cols-12 lg:gap-8 lg:pt-7">
              <div className="lg:col-span-6">
                <p className="text-[17px] leading-[1.35] tracking-[-0.02em] text-ink lg:text-[19px]">
                  {pac.subtitle}
                </p>
                <p className="mt-3 font-mono text-[10.5px] leading-[1.8] tracking-[0.02em] text-soft">
                  {project.categories.join("  ·  ")}
                </p>
              </div>

              <p className="text-[15px] leading-[1.8] text-muted lg:col-span-5 lg:col-start-8">
                {pac.intro}
              </p>
            </div>
          </header>
        </div>

        {/* -------------------------------------------------------- overview */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-6 md:grid-cols-4 lg:gap-x-8 lg:pt-8">
              {pac.overview.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">
                    {item.label}
                  </dt>
                  <dd className="mt-2.5 text-[14px] leading-[1.55] text-body">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* --------------------------------------------------------- gallery */}
        <section className="mt-[72px] md:mt-[104px] lg:mt-[140px]">
          <Reveal>
            <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
              <div className="border-t border-line pt-5 lg:pt-6">
                <p className="font-mono text-[11px] uppercase leading-none tracking-[0.06em] text-soft">
                  {pac.gallery.label}
                </p>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <h2 className="font-display text-[32px] leading-[1.05] tracking-[-0.035em] text-ink sm:text-[40px] lg:text-[52px]">
                    {pac.gallery.title}
                  </h2>
                  <p className="font-mono text-[10.5px] leading-[1.7] tracking-[0.01em] text-soft">
                    {pac.gallery.note}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/*
            满幅拼版：外侧只留 0–6px，图与图之间 4–6px。
            桌面上容器到 1600px（常见 1440 视口下即为满屏），图不被边距包起来，
            观感更接近画册跨页。12 栏在 md 以上生效，移动端自然堆成一列。
          */}
          <div className="mx-auto mt-8 w-full max-w-[1600px] px-0 md:mt-11 md:px-1.5">
            <div className="grid grid-cols-1 gap-[4px] md:grid-cols-12 md:gap-[6px]">
              {pac.gallery.blocks.map((block) => {
                if (block.kind === "note") {
                  return (
                    <Reveal
                      key="note"
                      className={cn(
                        "flex min-h-[58vh] items-center justify-center bg-[#e9e6e0] px-6 py-24",
                        "md:py-28 lg:min-h-[68vh]",
                        block.cls,
                      )}
                    >
                      <div className="mx-auto max-w-[600px] text-center">
                        <h2 className="font-display text-[clamp(30px,4.4vw,60px)] leading-[1.02] tracking-[-0.04em] text-ink">
                          {pac.statement.title}
                        </h2>
                        <p className="mx-auto mt-6 max-w-[480px] text-[14.5px] leading-[1.85] text-muted">
                          {pac.statement.body}
                        </p>
                      </div>
                    </Reveal>
                  );
                }

                const { cls, kind: _kind, ratio, priority, ...img } = block;
                return (
                  <Reveal key={block.src} className={cls}>
                    <Plate
                      {...img}
                      {...(ratio ? { ratio } : {})}
                      priority={priority}
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ project nav */}
        <nav
          aria-label="项目切换"
          className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[140px] lg:px-6"
        >
          <div className="grid gap-10 border-t border-line py-9 sm:grid-cols-2 lg:py-12">
            {prev ? (
              <Link
                to={`/work/${prev.slug}`}
                className="group flex flex-col gap-3 transition-opacity duration-300 hover:opacity-55"
              >
                <span className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-x-1"
                  >
                    ←
                  </span>{" "}
                  Previous project — {prev.index}
                </span>
                <span className="font-display text-[26px] leading-none tracking-[-0.03em] text-ink lg:text-[30px]">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <Link
                to="/#works"
                className="group flex flex-col gap-3 transition-opacity duration-300 hover:opacity-55"
              >
                <span className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-x-1"
                  >
                    ←
                  </span>{" "}
                  Back to works
                </span>
                <span className="font-display text-[26px] leading-none tracking-[-0.03em] text-ink lg:text-[30px]">
                  All projects
                </span>
              </Link>
            )}

            {next ? (
              <Link
                to={`/work/${next.slug}`}
                className="group flex flex-col gap-3 transition-opacity duration-300 hover:opacity-55 sm:items-end sm:text-right"
              >
                <span className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">
                  Next project — {next.index}
                </span>
                <span className="flex items-center gap-3 font-display text-[26px] leading-none tracking-[-0.03em] text-ink lg:text-[30px]">
                  {next.title}
                  <ArrowIcon className="size-3.5 shrink-0 text-soft transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1" />
                </span>
              </Link>
            ) : (
              <Link
                to="/#works"
                className="group flex flex-col gap-3 transition-opacity duration-300 hover:opacity-55 sm:items-end sm:text-right"
              >
                <span className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">
                  All works
                </span>
                <span className="flex items-center gap-3 font-display text-[26px] leading-none tracking-[-0.03em] text-ink lg:text-[30px]">
                  Back to the index
                  <ArrowIcon className="size-3.5 shrink-0 text-soft transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1" />
                </span>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </main>
  );
}
