import { projects } from "../data/projects";
import { site } from "../data/site";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { WorkCard } from "./WorkCard";

/**
 * 作品展示
 * - 桌面/平板：与参考站一致——满幅横向作品条，缓慢漂移，悬停暂停
 * - 移动端：纵向列表
 * - 系统开启「减少动态效果」时自动退化为可横向拖动的滚动区
 */
export function WorksShowcase() {
  const isWide = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const marquee = site.works.mode === "marquee" && !reduceMotion;

  return (
    <section id="works" aria-labelledby="works-heading" className="scroll-mt-[54px] md:scroll-mt-[61px]">
      <h2 id="works-heading" className="sr-only">
        {site.works.eyebrow}
      </h2>

      {isWide ? (
        <div className="flex min-h-[100svh] items-start pb-16 pt-16 md:pt-24 lg:pt-[132px]">
          {marquee ? (
            <div className="w-full overflow-hidden">
              <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
                {[...projects, ...projects].map((project, i) => (
                  <div key={`${project.slug}-${i}`} className="w-[306px] shrink-0 pr-[6px] lg:w-[346px] xl:w-[386px]">
                    <WorkCard project={project} eager={i < 4} decorative={i >= projects.length} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-scrollbar w-full snap-x snap-mandatory overflow-x-auto">
              <div className="flex w-max">
                {projects.map((project) => (
                  <div key={project.slug} className="w-[306px] shrink-0 snap-start pr-[6px] lg:w-[346px] xl:w-[386px]">
                    <WorkCard project={project} eager />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <ul className="space-y-4 px-4 pb-12 pt-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <WorkCard project={project} eager />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
