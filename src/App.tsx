import { useEffect, type FC } from "react";
import { About } from "./components/About";
import { BrewbearIdentity } from "./components/case-study/BrewbearIdentity";
import { ChipsPackaging } from "./components/case-study/ChipsPackaging";
import { PacIdentity } from "./components/case-study/PacIdentity";
import { SneakerVisuals } from "./components/case-study/SneakerVisuals";
import { SofaInContext } from "./components/case-study/SofaInContext";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ProjectPage } from "./components/ProjectPage";
import { WorksShowcase } from "./components/WorksShowcase";
import { getProject, type Project } from "./data/projects";
import { site } from "./data/site";
import { useRoute } from "./lib/router";

/** 有独立版式的案例页；其余作品走通用详情页 */
const caseStudies: Partial<Record<NonNullable<Project["caseStudy"]>, FC<{ project: Project }>>> = {
  sneaker: SneakerVisuals,
  sofa: SofaInContext,
  pac: PacIdentity,
  brewbear: BrewbearIdentity,
  chips: ChipsPackaging,
};

export default function App() {
  const { path, hash } = useRoute();
  const slug = path.startsWith("/work/") ? decodeURIComponent(path.slice("/work/".length)) : null;
  const project = slug ? getProject(slug) : undefined;
  // 只认识 "/" 和 "/work/<有效 slug>"。以前只在 /work/ 下判 404，
  // 结果是访问任意瞎写的路径都会渲染出首页 —— 对象存储把 404.html 返回给
  // /abc 时，浏览器地址栏是 /abc、页面却是首页，状态码和内容对不上。
  const notFound = path !== "/" && !project;
  const CaseStudy = project?.caseStudy ? caseStudies[project.caseStudy] : undefined;

  // 直接访问 /#about 这类链接时，首帧滚到锚点
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, []);

  useEffect(() => {
    if (notFound) {
      document.title = `页面不存在 — ${site.name} ${site.brand}`;
      return;
    }
    if (!project) document.title = `${site.name} ${site.brand} — AI 电商产品视觉与场景生成`;
  }, [project, notFound]);

  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Navbar />

      {/*
        key 只跟 path（不含 hash）：切换项目时整页重新挂载并重放一次入场动画，
        同页跳锚点则不重放 —— 否则点导航会让整页闪一下，很打断。
      */}
      <div key={path} className="animate-rise flex-1">
        {notFound ? (
          <NotFound />
        ) : project && CaseStudy ? (
          <CaseStudy project={project} />
        ) : project ? (
          <ProjectPage project={project} />
        ) : (
          <>
            <Hero />
            <WorksShowcase />
            <About />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <main className="mx-auto flex max-w-[1400px] flex-col items-start px-4 py-32 lg:px-6">
      <p className="font-mono text-[11px] tracking-[0.01em] text-soft">404</p>
      <h1 className="mt-5 font-display text-[34px] leading-[1.1] tracking-[-0.03em] text-ink lg:text-[44px]">
        这个项目不存在，或者已经被替换。
      </h1>
      <a
        href="/#works"
        className="mt-8 font-mono text-[12px] tracking-[0.01em] text-muted underline underline-offset-4 transition-opacity duration-300 hover:opacity-55"
      >
        返回作品列表
      </a>
    </main>
  );
}
