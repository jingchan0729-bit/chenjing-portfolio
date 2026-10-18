/**
 * ---------------------------------------------------------------
 * 五个作品项目 —— 全站唯一的作品数据源
 * 首页作品条、作品详情页、上一项/下一项都由这里驱动。
 *
 * 换作品 = 改这个数组 +
 * 把图片放到 public/images/ 并把 image 指过去。
 * ---------------------------------------------------------------
 */

export type Project = {
  /** 详情页地址：/work/<slug> */
  slug: string
  /** 序号，显示在卡片标题前的角标 */
  index: string
  title: string
  categories: string[]
  /**
   * 首页卡片上显示的短分类（最多两个）。
   * 不填则用 categories 的前两项——长分类名会换行，破坏卡片的单行节奏。
   */
  cardCategories?: string[]
  /** 卡片下方那句短说明，两行以内最好看 */
  description: string
  image: string
  /** 无障碍替代文本，必须写清楚画面内容 */
  alt: string
  year: string
  /** 图片上的角标，如 NEW / FEATURED / Awards；留空则不显示 */
  badge?: string
  /** object-position，控制封面裁切焦点，例如 "50% 40%" */
  focus?: string
  /** 详情页正文段落（可选） */
  body?: string[]
  /**
   * 有独立版式的案例页。留空则使用通用详情页 ProjectPage。
   * 新增案例页时在这里登记，并在 App.tsx 的 caseStudies 里挂上组件。
   */
  caseStudy?: "sneaker" | "sofa" | "pac" | "brewbear" | "chips"
  /**
   * 占位项目（还没有真实内容）。
   * 上一项 / 下一项会跳过它们，避免导航指向「待补充」的空页面。
   */
  placeholder?: boolean
}

export const projects: Project[] = [
  {
    slug: "sneaker-visuals",
    index: "01",
    title: "SNEAKER VISUALS",
    categories: [
      "AI Product Photography",
      "Colorway Exploration",
      "E-commerce Visuals",
      "Lifestyle Campaign",
    ],
    cardCategories: ["Product Visuals", "Colorways"],
    description:
      "One canvas sneaker, five colourways, three kinds of day — built as a single product visual system.",
    image: "/images/sneaker/hero-skate.webp",
    alt: "街角低机位：前景是黑色帆布鞋的特写，后方有人蹲在滑板上，背景是斑马线与红绿灯",
    year: "2026",
    badge: "NEW",
    /** 方形原图，卡片按 1:1 取中即可，不裁到鞋 */
    focus: "50% 50%",
    caseStudy: "sneaker",
    body: [
      "围绕同一款黑白帆布休闲鞋，通过 AI 视觉创作探索产品配色、细节呈现与生活方式场景之间的视觉联系。",
      "项目重点不是单张图，而是让一组图看起来出自同一次拍摄：统一的鞋型、光位、机位与展示标准。",
    ],
  },
  {
    slug: "sofa-in-context",
    index: "02",
    title: "SOFA IN CONTEXT",
    categories: ["AI Interior", "Furniture Visuals", "Material Study"],
    cardCategories: ["Interior", "Furniture"],
    description:
      "One cloud sofa, three interiors — the same object re-lit until each room has its own temperature.",
    image: "/images/sofa/scene-cream.webp",
    alt: "奶油风客厅中的米白色云朵沙发，暖白墙面、拱形壁龛与浅色木地板，柔和自然光",
    year: "2026",
    badge: "FEATURED",
    /** 4:3 场景图裁 1:1 卡片：焦点略微下移，保住沙发主体不被切到扶手以上 */
    focus: "50% 58%",
    caseStudy: "sofa",
    body: [
      "同一件云朵沙发放进奶油、原木与中古三种室内语境：墙面、地板、灯具全换，只有产品不动。",
      "难点不在生成家具，而在让三间房各自成立——光从哪来、影子往哪落、沙发底是否真的坐在那面地上。",
    ],
  },
  {
    slug: "pac",
    index: "03",
    title: "P.A.C.",
    categories: ["Branding", "Visual Identity", "Art Direction", "Graphic Design"],
    cardCategories: ["Branding", "Identity"],
    description:
      "A bakery identity built on typography, refreshed by illustration — and open to interpretation.",
    image: "/images/pac/pac-03.webp",
    alt: "P.A.C. 品牌陶瓷杯：淡蓝色杯子错落堆叠在浅色台面上，杯身印有蓝色 P.A.C. 字样，深蓝背景",
    year: "2026",
    /** 原图 1400×1750，卡片 1:1 需要竖向裁切；焦点下移保住底部托盘 */
    focus: "50% 55%",
    caseStudy: "pac",
    body: [
      "一套以字体为骨架、插画为变量的面包店视觉识别。",
      "它不追求固定的视觉系统，而是留出让每一次应用都能不一样的空间。",
    ],
  },
  {
    slug: "brewbear",
    index: "04",
    title: "BREWBEAR",
    categories: ["Branding", "Visual Identity", "Art Direction", "Packaging"],
    cardCategories: ["Branding", "Packaging"],
    description:
      "One heavy wordmark, one bear, two colours — an identity that has to read at 8cm.",
    image: "/images/brewbear/brew-01.webp",
    alt: "蓝色椅面上放着一只牛皮纸双杯托，两只米色纸杯从中露出，杯托印着深蓝色 BREWBEAR 字标与捧杯的熊",
    year: "2026",
    /** 16:10 原图裁近 1:1 卡片：焦点略偏左上，保住杯托与杯身，不切到字标 */
    focus: "50% 50%",
    caseStudy: "brewbear",
    body: [
      "一套以粗壮自定义字标与熊吉祥物为核心的精品咖啡识别：深蓝、米白，加牛皮纸。",
      "判断标准不在提案版上，而在一只八厘米纸杯的杯身——标志必须在那里依然站得住。",
    ],
  },
  {
    slug: "chips",
    index: "05",
    title: "CRISPY CHAOS",
    categories: ["Packaging", "Brand Identity", "Illustration", "Art Direction"],
    cardCategories: ["Packaging", "Identity"],
    description:
      "Four flavours, four mascots, one wordmark that never changes.",
    image: "/images/chips/chips-02.webp",
    alt: "米白底上的四袋薯片：紫、红、黄、绿各一袋按 2×2 排布，每袋印着 CRISPY CHAOS 字标与自己的吉祥物",
    year: "2026",
    /** 4:3 总览图裁 1:1 卡片：取中即可，四袋全部落在画面里 */
    focus: "50% 50%",
    caseStudy: "chips",
    body: [
      "四款口味的薯片包装系统：辣椒、红洋葱、芝士块、青柠各配一只吉祥物，各占一个颜色。",
      "字标在四袋上一字不改——识别交给不动的部分，性格交给会变的部分。",
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const getNeighbour = (slug: string) => {
  /** 只在有真实内容的项目之间前后移动，首尾不再绕回占位项目 */
  const live = projects.filter((p) => !p.placeholder)
  const i = live.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: undefined, next: undefined }
  return {
    prev: i > 0 ? live[i - 1] : undefined,
    next: i < live.length - 1 ? live[i + 1] : undefined,
  }
}
