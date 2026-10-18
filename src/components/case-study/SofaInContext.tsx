import { useEffect } from "react";
import { getNeighbour, type Project } from "../../data/projects";
import { site } from "../../data/site";
import { sofa } from "../../data/sofa";
import { cn } from "../../lib/cn";
import { Link } from "../../lib/router";
import { ArrowIcon } from "../Icons";
import { FadeImg } from "../FadeImg";
import { Plate } from "../Plate";
import { Reveal } from "../Reveal";

/**
 * 项目 02 的详情页。
 * 与 01 共用同一套版式语言（1400 容器、等宽小字、衬线大标题、2px 图距），
 * 但叙事是纵向的：一件产品 → 三种空间 → 材质近看，
 * 所以主视觉用竖幅、空间组用大小不等的一对，避免和 01 长成同一个模板。
 */
export function SofaInContext({ project }: { project: Project }) {
  const { prev, next } = getNeighbour(project.slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = `${sofa.title} — ${site.name} ${site.brand}`;

    const meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "SOFA IN CONTEXT — AI interior visuals for a single cloud sofa: three interiors, material studies and a white-background iteration.",
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
              {sofa.label}
            </p>

            <h1
              id="project-title"
              className="mt-5 font-display text-[clamp(46px,9.2vw,126px)] font-normal leading-[0.86] tracking-[-0.045em] text-ink"
            >
              {sofa.title}
            </h1>

            <div className="mt-9 grid gap-6 border-t border-line pt-6 lg:mt-12 lg:grid-cols-12 lg:gap-8 lg:pt-7">
              <div className="lg:col-span-6">
                <p className="text-[17px] leading-[1.35] tracking-[-0.02em] text-ink lg:text-[19px]">
                  {sofa.subtitle}
                </p>
                <p className="mt-3 font-mono text-[10.5px] leading-[1.8] tracking-[0.02em] text-soft">
                  {project.categories.join("  ·  ")}
                </p>
              </div>

              <p className="text-[15px] leading-[1.8] text-muted lg:col-span-5 lg:col-start-8">
                {sofa.intro}
              </p>
            </div>
          </header>
        </div>

        {/* ------------------------------------------------------------ hero */}
        <section aria-label="项目主视觉" className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <Reveal>
            {/* 竖幅主视觉靠左占五栏，右侧整片留白——与 01 的方形右移正好相反 */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <Plate
                {...sofa.hero}
                priority
                ratio="3 / 4"
                className="md:col-span-6 md:col-start-4"
              />
            </div>
          </Reveal>
        </section>

        {/* -------------------------------------------------------- overview */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase leading-none tracking-[0.06em] text-soft">
              02 / Project
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-6 md:grid-cols-4 lg:gap-x-8 lg:pt-8">
              {sofa.overview.map((item) => (
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

        {/* ---------------------------------------------------------- object */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <SectionHead
              label={sofa.object.label}
              title={sofa.object.title}
              note={sofa.object.body}
            />
          </Reveal>

          <Reveal>
            {/* 正面大图居中，侧与背在下方左右分开：三个机位读作一个整体 */}
            <div className="mt-9 grid grid-cols-12 items-start gap-2 lg:mt-12">
              <Plate {...sofa.object.front} className="col-span-12 md:col-span-8 md:col-start-3" />
              <Plate
                {...sofa.object.side}
                className="col-span-12 sm:col-span-6 md:col-span-4 md:col-start-2"
              />
              <Plate
                {...sofa.object.rear}
                className="col-span-12 sm:col-span-6 md:col-span-4 md:col-start-7"
              />
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------- iteration */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <SectionHead
              label={sofa.iteration.label}
              title={sofa.iteration.title}
              note={sofa.iteration.body}
            />
          </Reveal>

          <Reveal>
            {/* 五张小图并排：差异只有几个百分点，只有缩小并置时递进才看得出来 */}
            <div className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:mt-12 lg:grid-cols-5">
              {sofa.iteration.steps.map((step) => (
                <figure key={step.src + step.index} className="group">
                  <div className="overflow-hidden bg-[#f3f3f1]">
                    <FadeImg
                      src={step.src}
                      alt={step.alt}
                      width={step.w}
                      height={step.h}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2.5 flex items-baseline gap-2 font-mono text-[11px] leading-[1.5] tracking-[0.01em] text-soft">
                    <span className="text-soft/60">{step.index}</span>
                    <span>{step.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------- interiors */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <SectionHead label={sofa.interiors.label} title={sofa.interiors.title} />
          </Reveal>

          {sofa.interiors.groups.map((group) => (
            <div key={group.title} className="mt-12 lg:mt-16">
              <Reveal>
                <div className="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">
                      {group.index}
                    </span>
                    <h3 className="font-display text-[22px] leading-none tracking-[-0.02em] text-ink lg:text-[26px]">
                      {group.title}
                    </h3>
                  </div>
                  <p className="max-w-[430px] text-[13px] leading-[1.6] text-soft">{group.note}</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-5 grid grid-cols-12 gap-2">
                  {group.images.map((image, i) => (
                    <Plate
                      key={image.src}
                      {...image}
                      className={cn("col-span-12", interiorClass(group.layout, i))}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          ))}

          <Reveal>
            <p className="mt-12 max-w-[560px] border-t border-line pt-5 font-mono text-[10.5px] leading-[1.7] tracking-[0.01em] text-soft lg:mt-16">
              {sofa.interiors.footnote}
            </p>
          </Reveal>
        </section>

        {/* -------------------------------------------------------- material */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <SectionHead
              label={sofa.material.label}
              title={sofa.material.title}
              note={sofa.material.body}
            />
          </Reveal>

          <Reveal>
            {/* Z 字递进：左 → 右 → 居中收尾，和 01 的 6+4 上排不是同一套节奏 */}
            <div className="mt-9 grid grid-cols-12 items-start gap-2 lg:mt-12">
              <Plate {...sofa.material.images[0]} className="col-span-12 sm:col-span-7 md:col-span-5" />
              <Plate
                {...sofa.material.images[1]}
                className="col-span-12 sm:col-span-5 md:col-span-5 md:col-start-8"
              />
              <Plate
                {...sofa.material.images[2]}
                className="col-span-12 md:col-span-6 md:col-start-4"
              />
            </div>
          </Reveal>
        </section>

        {/* -------------------------------------------------------- approach */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <SectionHead label={sofa.approach.label} title={sofa.approach.title} />
          </Reveal>

          <Reveal>
            <div className="mt-9 grid gap-9 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
              {sofa.approach.items.map((item) => (
                <div key={item.index} className="border-t border-line pt-4">
                  <p className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">
                    {item.index}
                  </p>
                  <h3 className="mt-4 font-mono text-[12px] uppercase leading-none tracking-[0.06em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[340px] text-[14px] leading-[1.75] text-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------ project nav */}
        <nav
          aria-label="项目切换"
          className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6"
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
            ) : null}
          </div>
        </nav>
      </article>
    </main>
  );
}

/**
 * 空间组三种节奏：一大一小下沉、一小一大上提、单张居中收尾。
 * 与 01 的三组生活场景节奏错开，两个案例页才不会像同一个模板换皮。
 */
function interiorClass(layout: (typeof sofa.interiors.groups)[number]["layout"], i: number) {
  switch (layout) {
    case "wide-narrow":
      return i === 1 ? "sm:col-span-4 sm:col-start-9 lg:mt-24" : "sm:col-span-7";
    case "narrow-wide":
      // 场景图在右、特写小图在左，与 Cream 组左右镜像；尺寸同样遵循「场景大、特写小」。
      // 必须显式 row-start-1：grid 的自动放置只向后推游标、不会回头填前面的空位，
      // 否则特写会被挤到第二行、场景图独自占一行。
      return i === 0
        ? "sm:col-span-7 sm:col-start-6"
        : "sm:col-span-4 sm:col-start-1 sm:row-start-1 lg:mt-16";
    case "single":
      return "sm:col-span-10 sm:col-start-2 md:col-span-9 md:col-start-2";
    default:
      return "";
  }
}

function SectionHead({
  label,
  title,
  note,
}: {
  label: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="border-t border-line pt-5 lg:pt-6">
      <p className="font-mono text-[11px] uppercase leading-none tracking-[0.06em] text-soft">
        {label}
      </p>

      <div className="mt-7 grid gap-5 lg:grid-cols-12 lg:gap-8">
        <h2 className="font-display text-[32px] leading-[1.05] tracking-[-0.035em] text-ink sm:text-[40px] lg:col-span-7 lg:text-[52px]">
          {title}
        </h2>
        {note ? (
          <p className="max-w-[400px] self-end text-[14px] leading-[1.7] text-muted lg:col-span-4 lg:col-start-9">
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
}
