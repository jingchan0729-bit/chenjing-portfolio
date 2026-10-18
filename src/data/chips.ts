/**
 * ---------------------------------------------------------------
 * 项目 05 — CRISPY CHAOS 的全部内容
 *
 * 版式：沿用 03 / 04 的满幅拼版，但这套项目只有八张素材，
 * 所以节奏改成「四袋并排 → 口味总览 → 战役双联 → 呼吸页 →
 * 生活场景 + 社媒双联 → 印刷卷筒 → 四袋合影」，
 * 用一次双联和一次呼吸页把连续的大图断开。
 *
 * 素材：原始项目 8 张，去掉 1 张原作者的文字介绍页，留 7 张；
 * 统一转 webp，未做画面修改。alt 按画面内容逐条描述。
 *
 * 色值取自素材本身（高饱和像素 / 底色采样，非目测）：
 * 奶油底 #faeddb、主红 #cc1317、洋葱紫 #5a237e、
 * 芝士黄 #eaa113、青柠绿 #2e541e、正文字 #62584c。
 * ---------------------------------------------------------------
 */

import type { Image } from "./sneaker"

const dir = "/images/chips"

/** 画廊里的一块：图片，或一段纯文字呼吸页 */
type Block =
  | (Image & {
      kind: "image"
      /** md 以上的 12 栏定位 */
      cls: string
      /** 固定显示比例，用于并排时对齐高度 */
      ratio?: string
      priority?: boolean
    })
  | { kind: "note"; cls: string }

export const chips = {
  label: "05 / Selected project",
  title: "CRISPY CHAOS",
  subtitle: "Potato Chips Packaging System",
  intro:
    "四款口味的薯片包装：每袋一只吉祥物、一套自己的底色与散料，但字标始终是同一枚。红色负责在货架上先喊住人，其余三色把口味讲清楚。",

  overview: [
    { label: "Project", value: "Crispy Chaos Potato Chips" },
    { label: "Fields", value: "Packaging / Brand Identity" },
    { label: "Scope", value: "Wordmark / Mascots / Flavour System" },
    { label: "Applications", value: "Pack / Print / Social / Campaign" },
  ],

  /** 呼吸页：一段大字 + 一段短文 */
  statement: {
    label: "03 / Note",
    title: "One wordmark, four personalities.",
    body: "四袋的 CRISPY CHAOS 字标是同一枚——同样的两行堆叠、同样的白字黑边、同样的倾角。变的是字标之外的一切：吉祥物、底色、散落在袋底的原料。货架上的识别不靠加法，靠那个始终不动的部分。",
  },

  gallery: {
    label: "04 / Gallery",
    title: "Loud on the shelf, legible at arm's length.",
    note: "七件，来自八件。",
    blocks: [
      {
        kind: "image",
        src: `${dir}/chips-01.webp`,
        alt: "黄色棚拍背景前并排立着四袋薯片：紫色 Purple Haze（红洋葱吉祥物）、红色 Fire Paprika（辣椒吉祥物）、黄色 Cheese Blast（芝士块吉祥物）、绿色 Lime Riot（戴墨镜的青柠吉祥物），薯片与红洋葱、辣椒、芝士块、青柠散落在台面上",
        w: 1400,
        h: 788,
        cls: "md:col-span-12",
        priority: true,
      },
      {
        kind: "image",
        src: `${dir}/chips-02.webp`,
        alt: "米白底的口味总览：顶部横着手刷质感的 FLAVOUR RANGE 大字，四袋按 2×2 排布，每袋旁是口味名与一段小字说明，四周散落辣椒、芝士块、红洋葱与青柠",
        w: 1400,
        h: 933,
        cls: "md:col-span-12",
      },
      {
        kind: "image",
        src: `${dir}/chips-03.webp`,
        alt: "左右双联：左侧一个人抱着装满四袋薯片的红色购物篮，橙色放射背景；右侧米白底上红色大字逐行堆叠成 GRAB THE CHAOS / TASTE THE FUN，四只吉祥物散布在字间，底部一行网址",
        w: 1400,
        h: 754,
        cls: "md:col-span-12",
      },

      // ---- 呼吸页：把连续图流断开 ----
      { kind: "note", cls: "md:col-span-12" },

      {
        kind: "image",
        src: `${dir}/chips-04.webp`,
        alt: "扎丸子头的年轻女性闭眼咬着一片薯片，另一只手举着紫色 Purple Haze 包装袋，穿印有标识的奶油色 T 恤与紫色长裤，身后是紫橙色涂鸦墙与洋葱吉祥物，前景一碗薯片",
        w: 1400,
        h: 933,
        cls: "md:col-span-6",
      },
      {
        kind: "image",
        src: `${dir}/chips-05.webp`,
        alt: "米白底上并排三块竖版社媒画面：左边青柠味包装配青柠与薯片，中间是穿红外套的女性举着 Fire Paprika 袋的实拍，右边紫洋葱味包装配洋葱圈",
        w: 1400,
        h: 926,
        cls: "md:col-span-6",
      },
      {
        kind: "image",
        src: `${dir}/chips-06.webp`,
        alt: "印刷机出料口：印着四款包装的卷筒薄膜正在展开，四色图案沿纸面重复排列，边缘可见色标条、条码与营养成分表",
        w: 1400,
        h: 788,
        cls: "md:col-span-12",
      },
      {
        kind: "image",
        src: `${dir}/chips-07.webp`,
        alt: "穿奶油色插肩袖 T 恤的人双手把四袋薯片扇形摊开在身前，面部被裁出画面，背景是紫红黄绿的涂鸦墙面，画着白色折线与皇冠",
        w: 1400,
        h: 926,
        cls: "md:col-span-12",
      },
    ] as Block[],
  },
}
