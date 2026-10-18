import { useEffect } from "react";
import { getNeighbour, type Project } from "../../data/projects";
import { sneaker } from "../../data/sneaker";
import { site } from "../../data/site";
import { cn } from "../../lib/cn";
import { Link } from "../../lib/router";
import { ArrowIcon } from "../Icons";
import { Plate } from "../Plate";
import { Reveal } from "../Reveal";

/**
 * 项目 01 的详情页。
 * 版式沿用站点既有的语言：1400 容器、等宽小字标签、衬线大标题、
 * 极紧的图片间距（2px / 2.5），不引入卡片、圆角与阴影。
 */
export function SneakerVisuals({ project }: { project: Project }) {
  const { prev, next } = getNeighbour(project.slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = `${sneaker.title} — ${site.name} ${site.brand}`;

    const meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "SNEAKER VISUALS — AI product visuals and art direction for a single canvas sneaker: colourways, detail studies and lifestyle scenes.",
    );

    // 离开这个页面时把描述恢复，避免首页沿用项目页的 meta
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
              {sneaker.label}
            </p>

            <h1
              id="project-title"
              className="mt-5 font-display text-[clamp(46px,9.2vw,126px)] font-normal leading-[0.86] tracking-[-0.045em] text-ink"
            >
              {sneaker.title}
            </h1>

            <div className="mt-9 grid gap-6 border-t border-line pt-6 lg:mt-12 lg:grid-cols-12 lg:gap-8 lg:pt-7">
              <div className="lg:col-span-6">
                <p className="text-[17px] leading-[1.35] tracking-[-0.02em] text-ink lg:text-[19px]">
                  {sneaker.subtitle}
                </p>
                <p className="mt-3 font-mono text-[10.5px] leading-[1.8] tracking-[0.02em] text-soft">
                  {project.categories.join("  ·  ")}
                </p>
              </div>

              <p className="text-[15px] leading-[1.8] text-muted lg:col-span-5 lg:col-start-8">
                {sneaker.intro}
              </p>
            </div>
          </header>
        </div>

        {/* ------------------------------------------------------------ hero */}
        <section aria-label="项目主视觉" className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <Reveal>
            {/* 单张主视觉右移四栏，留白本身就是版式；方形原图不裁切 */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <Plate {...sneaker.hero} priority className="md:col-span-8 md:col-start-5" />
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
              {sneaker.overview.map((item) => (
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

        {/* ---------------------------------------------- product & colorways */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <SectionHead
              label={sneaker.product.label}
              title={sneaker.product.title}
              note={sneaker.product.body}
            />
          </Reveal>

          <Reveal>
            <div className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:mt-12 lg:grid-cols-5">
              {sneaker.product.tiles.map((tile, i) => (
                <Plate
                  key={tile.src}
                  {...tile}
                  caption={`0${i + 1} — ${tile.caption}`}
                  // 素材高度在 305–314 之间浮动，统一成同一比例，
                  // 五条说明才会落在同一条基线上
                  ratio="539 / 309"
                  // 两列时最后一张单独占一行会留下半格空白，让它铺满整行收尾
                  className={i === sneaker.product.tiles.length - 1 ? "col-span-2 sm:col-span-1" : undefined}
                />
              ))}
            </div>
          </Reveal>

          {/* 影棚白底在左、沥青地面在右：两条边等高，读作同一次拍摄的两种光 */}
          <Reveal>
            <div className="mt-10 grid grid-cols-12 items-start gap-2 lg:mt-12">
              <Plate {...sneaker.product.pair.studio} className="col-span-12 sm:col-span-7 md:col-span-6" />
              <Plate
                {...sneaker.product.pair.field}
                className="col-span-12 sm:col-span-5 md:col-span-4 md:col-start-9"
              />
            </div>
          </Reveal>
        </section>

        {/* --------------------------------------------------------- details */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <SectionHead
              label={sneaker.details.label}
              title={sneaker.details.title}
              note={sneaker.details.body}
            />
          </Reveal>

          <Reveal>
            {/* 上排一张方图 + 一张竖图，下排一张横图居中收尾：
                两侧留白对称，不再出现单张图挂在右边、左下大片空白的断层 */}
            <div className="mt-9 grid grid-cols-12 items-start gap-2 lg:mt-12">
              <Plate {...sneaker.details.images.top} className="col-span-12 md:col-span-6" />
              <Plate
                {...sneaker.details.images.profiles}
                className="col-span-12 md:col-span-4 md:col-start-9"
              />
              <Plate
                {...sneaker.details.images.sole}
                className="col-span-12 md:col-span-6 md:col-start-4"
              />
            </div>
          </Reveal>
        </section>

        {/* -------------------------------------------------- product information */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <SectionHead
              label={sneaker.info.label}
              title={sneaker.info.title}
              note={sneaker.info.body}
            />
          </Reveal>

          <Reveal>
            {/* 两张信息图沿对角线排：宽表在左，试穿表右移一档，避免并排等比后字太小 */}
            <div className="mt-9 grid grid-cols-12 items-start gap-2 lg:mt-12">
              <Plate {...sneaker.info.size} scroll className="col-span-12 md:col-span-9" />
              <Plate
                {...sneaker.info.fit}
                scroll
                scrollWidth={760}
                className="col-span-12 md:col-span-8 md:col-start-5"
              />
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------- lifestyle */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <SectionHead label={sneaker.lifestyle.label} title={sneaker.lifestyle.title} />
          </Reveal>

          {sneaker.lifestyle.groups.map((group) => (
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
                  <p className="max-w-[400px] text-[13px] leading-[1.6] text-soft">{group.note}</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-5 grid grid-cols-12 gap-2">
                  {group.images.map((image, i) => (
                    <Plate
                      key={image.src}
                      {...image}
                      className={cn("col-span-12", layoutClass(group.layout, i))}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          ))}

          <Reveal>
            <p className="mt-12 max-w-[560px] border-t border-line pt-5 font-mono text-[10.5px] leading-[1.7] tracking-[0.01em] text-soft lg:mt-16">
              {sneaker.lifestyle.footnote}
            </p>
          </Reveal>
        </section>

        {/* --------------------------------------------------------- approach */}
        <section className="mx-auto mt-[72px] max-w-[1400px] px-4 md:mt-[104px] lg:mt-[132px] lg:px-6">
          <Reveal>
            <SectionHead label={sneaker.approach.label} title={sneaker.approach.title} />
          </Reveal>

          <Reveal>
            <div className="mt-9 grid gap-9 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
              {sneaker.approach.items.map((item) => (
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
 * 三组生活场景各用一种图片节奏，避免三组都长成同一排：
 * wide-narrow 主图配下沉副图；narrow-wide 反过来；offset-duo 两张都错开。
 */
function layoutClass(layout: (typeof sneaker.lifestyle.groups)[number]["layout"], i: number) {
  switch (layout) {
    case "wide-narrow":
      return i === 1 ? "sm:col-span-4 sm:col-start-9 lg:mt-24" : "sm:col-span-7";
    case "narrow-wide":
      return i === 1 ? "sm:col-span-6 sm:col-start-7 lg:mt-16" : "sm:col-span-5";
    case "offset-duo":
      return i === 1 ? "sm:col-span-5 sm:col-start-8 lg:mt-28" : "sm:col-span-6";
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
