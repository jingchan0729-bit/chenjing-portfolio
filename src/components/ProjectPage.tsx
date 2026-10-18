import { useEffect } from "react";
import { getNeighbour, type Project } from "../data/projects";
import { site } from "../data/site";
import { Link } from "../lib/router";
import { ArrowIcon } from "./Icons";
import { FadeImg } from "./FadeImg";
import { cn } from "../lib/cn";

export function ProjectPage({ project }: { project: Project }) {
  const { prev, next } = getNeighbour(project.slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = `${project.title} — ${site.role}`;
  }, [project.slug, project.title]);

  return (
    <main>
      <article>
        <div className="mx-auto max-w-[1400px] px-4 pt-6 lg:px-6 lg:pt-10">
          <Link
            to="/#works"
            className="group inline-flex items-center gap-2 font-mono text-[11px] leading-none tracking-[0.01em] text-soft transition-colors duration-300 hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-x-1"
            >
              ←
            </span>
            All works
          </Link>

          <div className="mt-9 flex flex-col gap-6 border-b border-line pb-7 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <h1 className="max-w-[820px] font-display text-[30px] leading-[1.12] tracking-[-0.03em] text-ink sm:text-[36px] lg:text-[44px]">
              {project.title}
            </h1>

            <dl className="flex shrink-0 flex-wrap gap-x-10 gap-y-3">
              <div>
                <dt className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">Index</dt>
                <dd className="mt-1.5 font-mono text-[13px] leading-none text-body">{project.index}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">Year</dt>
                <dd className="mt-1.5 font-mono text-[13px] leading-none text-body">{project.year}</dd>
              </div>
              <div className="max-w-[240px]">
                <dt className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">Category</dt>
                <dd className="mt-1.5 font-mono text-[13px] leading-[1.4] text-body">
                  {project.categories.join(" · ")}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-[1400px] px-4 lg:px-6">
          <FadeImg
            src={project.image}
            alt={project.alt}
            fetchPriority="high"
            decoding="async"
            style={{ objectPosition: project.focus ?? "50% 50%" }}
            className="aspect-[16/10] w-full bg-[#f1f1f1] object-cover"
          />
        </div>

        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-14 lg:grid-cols-12 lg:gap-8 lg:px-6 lg:py-20">
          <p className="max-w-[320px] font-mono text-[13px] leading-[1.6] text-soft lg:col-span-4">
            {project.description}
          </p>
          <div className="max-w-[620px] space-y-5 lg:col-span-8">
            {(project.body ?? []).map((paragraph) => (
              <p key={paragraph} className="text-[16px] leading-[1.75] text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <nav aria-label="项目切换" className="mx-auto max-w-[1400px] border-t border-line px-4 lg:px-6">
          <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <NeighbourLink project={prev} dir="prev" />
            <NeighbourLink project={next} dir="next" />
          </div>
        </nav>
      </article>
    </main>
  );
}

function NeighbourLink({
  project,
  dir,
}: {
  project: Project | undefined;
  dir: "prev" | "next";
}) {
  if (!project) return <div />;

  return (
    <Link
      to={`/work/${project.slug}`}
      className={cn(
        "group flex flex-col gap-2 py-8 transition-opacity duration-300 hover:opacity-55",
        dir === "next" ? "sm:items-end sm:pl-8 sm:text-right" : "sm:pr-8",
      )}
    >
      <span className="font-mono text-[11px] leading-none tracking-[0.01em] text-soft">
        {dir === "prev" ? "← Previous" : "Next →"}
      </span>
      <span className="flex items-center gap-2 font-display text-[22px] leading-tight tracking-[-0.02em] text-ink lg:text-[26px]">
        {project.title}
        <ArrowIcon
          className={cn(
            "size-3.5 shrink-0 text-soft transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
            dir === "prev" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1",
          )}
        />
      </span>
    </Link>
  );
}
