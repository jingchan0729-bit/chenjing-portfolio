/**
 * ---------------------------------------------------------------
 * 站点全局文案 / 品牌信息
 * 需要改名字、导航、About 文案、联系方式，只改这个文件即可。
 * ---------------------------------------------------------------
 */

export const site = {
  /** 顶部左侧品牌字标（参考站为 "Woo–Hu®" 的写法，这里用本人姓名） */
  brand: "CHEN JING®",

  /** 中文姓名，用于页面标题与结构化信息 */
  name: "陈靖",

  /** 页面 title 后缀 + 结构化描述用 */
  role: "AI Visual Designer",

  /** 顶部状态胶囊里的文案 */
  availability: "Available for work",
  availabilityShort: "Available",

  /** 顶部实时时钟使用的时区 */
  timeZone: "Asia/Shanghai",

  /**
   * 首屏那段衬线体短介绍。
   * 参考站是一段两行的居中衬线句，不写简历式长段落。
   */
  intro:
    "I'm an AI visual designer building commercial product imagery — footwear, furniture, and scenes that were never photographed, for brands that care about the last five percent.",

  /** 导航。href 全部是真实锚点或路由，没有占位链接 */
  nav: [
    { label: "Works", href: "/#works" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],

  /** 作品展示区（桌面为横向滚动，移动端为纵向列表） */
  works: {
    eyebrow: "Selected works",
    /**
     * 'marquee' — 与参考站一致：作品条缓慢横向漂移，悬停暂停
     * 'static'  — 不自动移动，改为可横向拖动的对齐滚动
     */
    mode: "marquee" as "marquee" | "static",
  },

  about: {
    eyebrow: "About",
    statement:
      "I build product imagery with generative models — and finish it to a standard a brand can actually ship.",
    paragraphs: [
      "我专注 AI 电商视觉：用生成式模型完成产品图、上脚场景与空间氛围，并把结果控制到可以直接投放的精度。",
      "工作方式介于摄影指导与图像工程之间——先确定光位、材质与构图逻辑，再用模型批量产出，最后逐张修到同一套标准上。",
    ],
    facts: [
      { label: "Focus", value: "AI 产品视觉 / 电商场景 / 图像工作流" },
      { label: "Tools", value: "Midjourney · ComfyUI · Stable Diffusion · Photoshop" },
      { label: "Based in", value: "Remote, working worldwide" },
      { label: "Availability", value: "全职机会 / 商业合作" },
    ],
  },

  contact: {
    /** 联系邮箱。留空时页脚与移动端菜单不渲染 mailto 链接，避免出现占位地址 */
    email: "18250622768@163.com",
    note: "Open for full-time roles and commissions.",
    /** 如有主页/社交账号，填入完整链接后会自动出现在页脚；留空则不渲染，避免死链 */
    links: [] as { label: string; href: string }[],
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} 陈靖 CHEN JING®`,
    note: "Designed & built with React · Vite · Tailwind",
  },
} as const
