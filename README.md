# 陈靖 CHEN JING · AI 视觉设计师作品集

以 [woo-hu.com](https://woo-hu.com/) 的实际页面结构为模板复刻的单页作品集：一句衬线体自我介绍 + 满幅横向作品条 + About + Contact。
下方五个项目各有一个独立版式的案例页。

React 19 + Vite 7 + TypeScript + Tailwind CSS 4，无 UI 库、无动画库、无路由库（`src/lib/router.tsx` 是自研的约 100 行实现）。

**线上**：https://chenjing-portfolio.vercel.app ｜ **仓库**：https://github.com/jingchan0729-bit/chenjing-portfolio（推 `main` 即自动重新部署）

---

## 快速开始

```bash
npm install
npm run dev      # 本地开发，默认 http://localhost:5173
npm run build    # 生产构建，产物在 dist/
npm run preview  # 预览构建结果（默认 4173）
```

Node 18+ 即可。

---

## 五个项目

| # | 标题 | 路由 | 数据文件 | 页面组件 | 图片 |
| --- | --- | --- | --- | --- | --- |
| 01 | SNEAKER VISUALS | `/work/sneaker-visuals` | `src/data/sneaker.ts` | `case-study/SneakerVisuals.tsx` | 19 |
| 02 | SOFA IN CONTEXT | `/work/sofa-in-context` | `src/data/sofa.ts` | `case-study/SofaInContext.tsx` | 17 |
| 03 | P.A.C. | `/work/pac` | `src/data/pac.ts` | `case-study/PacIdentity.tsx` | 14 |
| 04 | BREWBEAR | `/work/brewbear` | `src/data/brewbear.ts` | `case-study/BrewbearIdentity.tsx` | 16 |
| 05 | CRISPY CHAOS | `/work/chips` | `src/data/chips.ts` | `case-study/ChipsPackaging.tsx` | 7 |

共 73 张 webp，约 24MB（其中 03 的 5 张动图占 13MB）。

- **01 / 02** 是自有素材：01 由用户提供的产品与场景素材整理而成，02 用 AI 生成补图后与原始产品图一起归档。
- **03 / 04 / 05** 是从 Behance 抓取的公开项目，见下方「图片版权」。

---

## 目录结构

```
images-src/                      ← 01 的原始素材存档（原文件名、未压缩）
sofa-new-shots_assets/           ← 02 的 AI 补图产物
public/
  images/
    sneaker/  sofa/  pac/  brewbear/  chips/   ← 页面实际加载的 webp
  favicon.svg
  _redirects                     ← Netlify 的 SPA 回退规则
src/
  data/
    projects.ts                  ← ★ 五个作品的总数据源
    site.ts                      ← ★ 姓名 / 品牌 / 首屏介绍 / 导航 / About / 联系方式
    sneaker.ts  sofa.ts  pac.ts  brewbear.ts  chips.ts   ← 各项目文案与图片清单
  components/
    Navbar.tsx  Hero.tsx  WorksShowcase.tsx  WorkCard.tsx
    About.tsx  Footer.tsx  Plate.tsx  ProjectPage.tsx  Reveal.tsx  Icons.tsx
    case-study/
      SneakerVisuals.tsx  SofaInContext.tsx
      PacIdentity.tsx  BrewbearIdentity.tsx  ChipsPackaging.tsx
  lib/
    router.tsx  cn.ts
  hooks/
    useLocalTime.ts  useMediaQuery.ts
```

---

## 改文案 / 换图

### 姓名与品牌（`src/data/site.ts`）

| 字段 | 作用 |
| --- | --- |
| `brand` | 左上角字标，现在是 `CHEN JING®` |
| `name` | 中文姓名 `陈靖`，用于首页标签页标题 |
| `intro` | 首屏那句衬线体介绍 |
| `availability` / `availabilityShort` | 顶部状态胶囊 |
| `timeZone` | 顶部时钟时区（现为 `Asia/Shanghai`） |
| `nav` | 导航项，`href` 支持 `/#works` 锚点 |
| `about` | About 区的主张、两段正文、四行信息表 |
| `contact.email` | 联系邮箱，留空则不渲染 mailto（不会出现占位地址） |
| `contact.links` | 有主页/社交账号就填 `{ label, href }`，留空不渲染，避免死链 |

**换域名时**：`index.html` 里的 `canonical` / `og:url` / `og:image` 是绝对地址（分享卡片只认绝对地址，相对路径抓不到图），`public/robots.txt` 与 `public/sitemap.xml` 里也有域名，**这四处的域名要一起改**。

### 作品（`src/data/projects.ts`）

首页作品条、详情页、上一项 / 下一项全部由这个数组驱动。

```ts
{
  slug: "chips",                    // 详情页地址 /work/chips
  index: "05",
  title: "CRISPY CHAOS",            // 卡片标题（14px 等宽，一行最好）
  categories: ["Packaging", "Brand Identity"],   // 完整分类（详情页标题区）
  cardCategories: ["Packaging", "Identity"],     // 可选：卡片上的短标签，最多两个
  description: "……",                // 卡片下方短说明，两行以内
  image: "/images/chips/chips-02.webp",
  alt: "……",                        // 必填
  year: "2026",
  badge: "FEATURED",                // 可选，删掉就不显示
  focus: "50% 50%",                 // 可选，object-position
  caseStudy: "chips",               // 有独立版式；删掉则退回通用详情页 ProjectPage
  placeholder: true,                // 可选：占位项目，上一项/下一项会跳过
}
```

`caseStudy` 的取值是 `projects.ts` 里的联合类型；新增案例页要在那里登记，并在 `App.tsx` 的 `caseStudies` 里挂上组件。

### 图片规范

- **封面比例 380 : 373（≈1.02:1）**，建议导出 **1140 × 1120**。
- 卡片与案例页大图都用 `object-cover`，不同尺寸的原图只会被裁，不会被拉伸；用 `focus` 控制裁切焦点。
- 每张图都要写 `w` / `h`（图片原始像素），用来占位防加载跳动。
- 素材转 webp：`sharp(input).webp({ quality: 82, effort: 5 })`。

---

## 排版语言

数值来自 woo-hu.com 的 DOM 与计算样式实测，本站按同样的值实现。

| 项目 | 参考站 | 本站 |
| --- | --- | --- |
| 顶栏高度 | 61px（移动端 54px） | 61 / 54 ✅ |
| 左右内边距 | 24px / 16px | 24 / 16 ✅ |
| 字标 | 32px 衬线，字距 −0.05em | 32px，−1.6px ✅ |
| 状态标签 | 14px，字距 −0.42px，`#323232`，h27 r4 | 一致 ✅ |
| 时钟 | 15px，字距 −0.6px，`#696969` | 一致 ✅ |
| 导航项 | 15px，字距 −0.45px，`#030303` | 一致 ✅ |
| 首屏介绍 | 24px 衬线，居中，两行，上下留白 48px | 一致 ✅ |
| 卡片宽 / 比例 | 380px / 380×373 | 380px / 1.019 ✅ |
| 图上胶囊 | 12px Azeret Mono，`rgba(0,0,0,.12)` + 40px 模糊，h27 | 一致 ✅ |
| 卡片间距 | 5px | 6px（视觉一致） |
| 作品区高度 | 100vh | 100svh ✅ |

字体用 Google Fonts 的近似替代：**Instrument Serif** / Inter / Roboto Mono / Azeret Mono。加载失败时回落到系统衬线体与等宽体，版式不塌。

案例页沿用同一套语言：1400 容器、11px 等宽小标签、Instrument Serif 大标题、4–6px 图片间距、无卡片 / 圆角 / 阴影。03 / 04 / 05 是满幅拼版（图块之间 4–6px，外侧不留内容边距），中段插一段呼吸页把连续图流断开。

刻意不同的两点：

- 导航是 Works / About / Contact 三项。参考站还有 Lab 页，没有真实内容，不放空入口。
- About 与 Contact 做成首页锚点区块（参考站是独立页面）。

---

## 动效

原则：**只做帮人看清内容的动效，不做表演性的。** 这个站的语言是印刷、大留白、衬线体，视差滚动、自定义光标、逐字打字机这类效果会立刻把质感拉下来，所以没有采用。

| 动效 | 位置 | 时长 | 作用 |
| --- | --- | --- | --- |
| 图片淡入 | 全站所有图（`FadeImg`） | 800ms | 图解码完才显形，避免"啪"一下跳出来；也让加载中/失败状态可辨 |
| 页面入场 | 换项目时整页（`.animate-rise`） | 800ms | 消除硬切，切页有个开场 |
| 滚动揭示 | `.reveal`（各区块） | 900ms | 进入视口时轻微上浮淡入 |
| 逐块揭示 | 03/04/05 画廊（每块独立 Reveal） | 900ms | 滚到哪张哪张进来，长画廊才有节奏 |
| 横向漂移 | 首页作品条 | 130s 循环 | 参考站原样，悬停暂停 |
| 下划线扫入 | 桌面导航文字链接 | 420ms | 比变淡更符合印刷感，也更易读 |
| 箭头位移 | `← All works`、上一/下一项目 | 500ms | 4px 位移，交代点击方向 |
| 图片微放大 | 卡片与案例图 hover | 1200ms | 1.02 / 1.015，极轻 |

三条工程约束，改的时候别破坏：

1. **`FadeImg` 必须在挂载时检查 `img.complete`。** 缓存命中的图不会触发 `load`，只靠 `onLoad` 会让图片永久透明。
2. **淡入用 `animation` 不用 `transition`。** 图片上还挂着 `transition-transform`（hover 放大），那条规则会覆盖 `transition-property`，把 opacity 过渡吃掉。
3. **`Reveal` 除了 `IntersectionObserver` 还有一个共享的滚动兜底。** 快速拖动滚动条时元素可能在一帧内从视口下方跳到上方，中间没有交叉，observer 不会回调，块就永远停在 `opacity: 0`。兜底用一个 rAF 节流的监听器统一处理，不要改成每个块各挂一个 scroll。

系统开启「减少动态效果」时全部退化为静态（图片直接显形、位移与漂移关闭），`prefers-reduced-motion` 已在 `index.css` 里统一兜住。

---

## 图片版权（重要）

**03 P.A.C.、04 BREWBEAR、05 CRISPY CHAOS 的图片与文案来自 Behance 上的公开项目，版权属于原作者，不是你的作品。** 目前页面里没有放原作者署名。

公开上线前建议二选一：

1. **补署名**：在项目页 Overview 里加一行 `Original design by <原作者>` 并链回原项目页；
2. **换素材**：只保留版式，把 `public/images/pac/`、`brewbear/`、`chips/` 三个目录换成你自己的图，并改写对应的 `src/data/*.ts` 文案。

版式本身不受影响，换图不用动组件。

---

## 部署

### Vercel / Netlify（推荐）

- 构建命令 `npm run build`，输出目录 `dist`。
- 直接连仓库即可。`vercel.json` 与 `public/_redirects` 已配 SPA 回退，`/work/chips` 直接刷新不会 404。
- 已上线 Vercel，连的是 GitHub 仓库 `jingchan0729-bit/chenjing-portfolio`，推 `main` 触发自动部署。
- `vercel.json` 的 SPA 回退正则里额外排除了 `robots.txt` 与 `sitemap.xml`——不排除的话它们会被重写成 `index.html`，搜索引擎拿到的是个 HTML 页面。

### 任意静态服务器 / Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### GitHub Pages

部署在 `https://<user>.github.io/<repo>/` 子路径时：

```ts
export default defineConfig({ base: '/<repo>/', /* ... */ })
```

`public/robots.txt`（允许全站抓取 + 指向 sitemap）与 `public/sitemap.xml`（六条路由）已建好，域名写的是上面的 Vercel 地址，换域名时记得同步。

---

## 已验证

- `npm run build` 通过（TypeScript 严格模式，无类型错误）。
- 1920 / 1440 / 1024 / 768 / 390 五个宽度，六条路由全部无横向溢出。
- 图片加载：01 = 19/19、02 = 17/17、03 = 14/14、04 = 16/16、05 = 7/7，坏图 0。
- 控制台无报错、无 React key 警告。
- `Reveal` 淡入：连续滚动下无元素卡在透明态（超高容器已把阈值降为 0）。
- 导航链：01 → 02 → 03 → 04 → 05 → All works，Previous 反向一致。
- 移动端：作品条转为纵向列表，菜单展开 / Esc 关闭正常；离开案例页后 meta description 复原。
