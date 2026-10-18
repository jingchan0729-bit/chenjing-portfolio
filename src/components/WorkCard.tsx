import type { Project } from "../data/projects";
import { Link } from "../lib/router";
import { cn } from "../lib/cn";
import { FadeImg } from "./FadeImg";

type Props = {
  project: Project;
  eager?: boolean;
  className?: string;
  /** 供横向循环条里复制出来的那一份使用：不进无障碍树、不占 Tab 焦点 */
  decorative?: boolean;
};

/**
 * 作品卡片：接近 1:1 的封面 + 图上分类胶囊 + 图下标题/短说明。
 * 比例 380 × 373 取自参考站实际尺寸，换图时请保持同一比例。
 */
export function WorkCard({ project, eager = false, className, decorative = false }: Props) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className={cn("group block", className)}
      aria-label={decorative ? undefined : `${project.title} — 查看项目`}
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
    >
      <div className="relative aspect-[380/373] w-full overflow-hidden bg-[#f1f1f1]">
        <FadeImg
          src={project.image}
          alt={project.alt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          style={{ objectPosition: project.focus ?? "50% 50%" }}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.02]"
        />

        {project.badge ? (
          <span className="pill-light absolute left-3 top-3 flex h-[25px] items-center rounded-[4px] px-[11px] font-mono text-[11px] leading-none text-body">
            {project.badge}
          </span>
        ) : null}

        <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-2.5">
          {/* 卡片上只保留两个短分类：多于此会换成两行，破坏参考站的单行节奏。
              完整分类见项目详情页标题区。 */}
          {(project.cardCategories ?? project.categories).slice(0, 2).map((category, i) => (
            <span
              key={`${project.slug}-${category}-${i}`}
              className="pill-frost flex h-[27px] items-center rounded-[4px] px-2 font-micro text-[12px] leading-none tracking-[-0.02em] text-white"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-[10px]">
        <h3 className="font-mono text-[14px] leading-[21px] text-ink transition-opacity duration-500 group-hover:opacity-55">
          {project.title}
        </h3>
        <p className="mt-[6px] line-clamp-2 max-w-[320px] text-[16px] leading-[1.2] text-soft">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
