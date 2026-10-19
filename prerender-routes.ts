/**
 * 把五个项目路由预渲染成真实 HTML 文件。
 *
 * 为什么需要：站是自研路由的 SPA，直接托管在对象存储上时，
 * `/work/chips` 刷新会去请求一个不存在的对象 → 404。
 * Vercel / Netlify 可以用 rewrite 兜底，但阿里云 OSS 的静态网站托管
 * 只有「默认首页」和「404 文档」两个配置，没有通配回退。
 * 生成 dist/work/<slug>/index.html 之后，站就变成纯静态多页，
 * 任何对象存储都能直接托管，不需要服务端规则。
 *
 * 额外收益：每个项目页有了自己的 title / description / og:image，
 * 分享到微信时卡片显示的是这个项目自己的封面，而不是全站共用一张。
 *
 * 注意：这里只改 HTML 里的 meta 标签。页面本身仍由同一份 JS bundle 接管，
 * 加载后 React 会按当前路径渲染对应项目，不会重复请求或闪烁。
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";
import { projects } from "./src/data/projects";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** 替换某个 meta 标签的 content（按 name 或 property 定位） */
function setMeta(html: string, attr: "name" | "property", key: string, value: string) {
  const re = new RegExp(`(<meta[^>]*?${attr}=["']${key}["'][^>]*?content=)(["'])(.*?)\\2`, "i");
  return re.test(html) ? html.replace(re, `$1$2${esc(value)}$2`) : html;
}

function setHref(html: string, rel: string, value: string) {
  const re = new RegExp(`(<link[^>]*?rel=["']${rel}["'][^>]*?href=)(["'])(.*?)\\2`, "i");
  return re.test(html) ? html.replace(re, `$1$2${esc(value)}$2`) : html;
}

/**
 * 读封面图的真实像素尺寸写进 og:image:width / height。
 * 五个封面图比例各不相同（1:1 / 4:3 / 竖构图都有），沿用首页那组数字是错的。
 * sharp 只在构建期用，读不到就跳过这两个标签——它们本来就是可选的，
 * 爬虫会自己下载图片判断，宁可缺失也不要写错。
 */
async function imageSize(publicPath: string) {
  try {
    const sharp = (await import("sharp")).default;
    const meta = await sharp(path.resolve("public", publicPath.replace(/^\//, ""))).metadata();
    return meta.width && meta.height ? { width: meta.width, height: meta.height } : null;
  } catch {
    return null;
  }
}

export function prerenderRoutes(): Plugin {
  return {
    name: "prerender-routes",
    apply: "build",
    async writeBundle(options) {
      const outDir = options.dir ?? path.resolve("dist");
      const indexHtml = await readFile(path.join(outDir, "index.html"), "utf8");

      // 站点根域名从 index.html 的 canonical 里取，避免又多一处硬编码
      const canonical = indexHtml.match(/<link[^>]*?rel=["']canonical["'][^>]*?href=["'](.*?)["']/i);
      const origin = (canonical?.[1] ?? "").replace(/\/$/, "");
      if (!origin) {
        this.warn("index.html 里找不到 canonical，跳过预渲染");
        return;
      }

      const written: string[] = [];
      for (const project of projects) {
        const url = `${origin}/work/${project.slug}/`;
        const title = `${project.title} — 陈靖 CHEN JING®`;

        let html = indexHtml;
        html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
        html = setMeta(html, "name", "description", project.description);
        html = setMeta(html, "property", "og:title", title);
        html = setMeta(html, "property", "og:description", project.description);
        html = setMeta(html, "property", "og:url", url);
        html = setMeta(html, "property", "og:image", `${origin}${project.image}`);
        html = setMeta(html, "property", "og:image:alt", project.alt);
        html = setHref(html, "canonical", url);

        const size = await imageSize(project.image);
        if (size) {
          html = setMeta(html, "property", "og:image:width", String(size.width));
          html = setMeta(html, "property", "og:image:height", String(size.height));
        }

        const dir = path.join(outDir, "work", project.slug);
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, "index.html"), html, "utf8");
        written.push(`work/${project.slug}/index.html`);
      }

      // 对象存储的静态网站托管没有通配回退，只认一个「404 文档」。
      // 不给它准备实体文件的话，访问错路径会看到 OSS 自己的 XML 报错页。
      // 这里复用同一份 index.html 壳子，加载后 React 按当前路径渲染 NotFound。
      const notFound = indexHtml
        .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc("页面不存在 — 陈靖 CHEN JING®")}</title>`)
        .replace(/<link[^>]*?rel=["']canonical["'][^>]*?\/?>/i, "")
        // og 标签是给分享卡片用的，404 页不该被分享，一并去掉
        .replace(/<meta[^>]*?property=["']og:[^>]*?\/?>/gi, "")
        // 用插入而不是替换：首页本来没有 robots 标签，替换会静默失效
        .replace(/<\/head>/i, '  <meta name="robots" content="noindex">\n  </head>');
      await writeFile(path.join(outDir, "404.html"), notFound, "utf8");

      this.info(`预渲染 ${written.length} 个项目页 + 404.html：${written.join(", ")}`);
    },
  };
}
