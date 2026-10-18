/**
 * ---------------------------------------------------------------
 * 项目 03 — P.A.C. 的全部内容
 *
 * 版式：满幅拼版（full-bleed tiling）
 * 图块之间只留 4–6px 的缝，画廊外侧不留内容边距，让图片自己撑满视野。
 * 34 张原图筛选到 14 张，按「气质 → 印刷 → 平面 → 食物 → 人物 → 收束」编排，
 * 中间插入一段纯文字呼吸页，把连续图流断开。
 *
 * 关于 alt：已按画面内容逐条描述。
 * ---------------------------------------------------------------
 */

import type { Image } from "./sneaker"

const dir = "/images/pac"

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

export const pac = {
  label: "03 / Selected project",
  title: "P.A.C.",
  subtitle: "Bakery Visual Identity",
  intro:
    "一套以字体为骨架、插画为变量的面包店识别。它不追求把每次应用都做成同一个样子，而是留出让场合自己决定的空间——连店里那台收据打印机，也成了图形工具。",

  overview: [
    { label: "Project", value: "P.A.C. Bakery Identity" },
    { label: "Fields", value: "Art Direction / Branding" },
    { label: "Scope", value: "Typography / Illustration / Print" },
    { label: "Applications", value: "Packaging / Ceramics / Space" },
  ],

  /** 04 — 呼吸页：一段大字 + 一段短文，独占一屏 */
  statement: {
    label: "04 / Note",
    title: "Recognizable, not fixed.",
    body: "字体定下性格，插画提供变量。菜单每周更换，于是沟通被当作一次性的出版物来做，而不是一套固定的品牌资产。热敏打印机的单色、粗糙分辨率与半透的纸，也一并成了语言的一部分。",
  },

  /** 05 — 14 件，满幅拼版 */
  gallery: {
    label: "05 / Gallery",
    title: "Selected pieces.",
    note: "十四件，从三十四件里挑出。",
    blocks: [
      {
        kind: "image",
        src: `${dir}/pac-01.webp`,
        alt: "深蓝背景前，一只印着蓝色 P.A.C. 字样的白色马克杯，压在一摞金黄色面包上",
        w: 1400,
        h: 788,
        cls: "md:col-span-12",
        priority: true,
      },
      {
        kind: "image",
        src: `${dir}/pac-03.webp`,
        alt: "三只印着 P.A.C. 的浅蓝色陶瓷杯横向叠放，浅色台面与灰蓝背景",
        w: 1400,
        h: 1750,
        cls: "md:col-span-6",
        ratio: "4 / 5",
      },
      {
        kind: "image",
        src: `${dir}/pac-27.webp`,
        alt: "成摞的白色纸杯，杯身印蓝色 P.A.C. 字样，层层堆到画面顶部",
        w: 1400,
        h: 1750,
        cls: "md:col-span-6",
        ratio: "4 / 5",
      },

      // ---- 呼吸页：把连续图流断开 ----
      { kind: "note", cls: "md:col-span-12" },

      {
        kind: "image",
        src: `${dir}/pac-13.webp`,
        alt: "银色托盘俯拍：一杯黑咖啡、一张印着 segunda estamos abertos 的黑白海报、一只可颂",
        w: 1400,
        h: 875,
        cls: "md:col-span-12",
      },
      {
        kind: "image",
        src: `${dir}/pac-28.webp`,
        alt: "两袋并排的咖啡豆包装，黑白印刷，分别印着 old crew 与 cold brew",
        w: 1400,
        h: 1750,
        cls: "md:col-span-6",
        ratio: "4 / 5",
      },
      {
        kind: "image",
        src: `${dir}/pac-21.webp`,
        alt: "白色纸袋表面，印着蓝色 P.A.C. 字样与一道蓝色弧线",
        w: 1400,
        h: 1750,
        cls: "md:col-span-6",
        ratio: "4 / 5",
      },
      {
        // 竖版海报：不裁切，居中占 8 栏，让满幅横条之间出现一张竖幅
        kind: "image",
        src: `${dir}/pac-10.webp`,
        alt: "蓝底海报，白色超大字号葡文与黑色线稿插画，画着人物与一只眼睛",
        w: 1400,
        h: 1750,
        cls: "md:col-span-8 md:col-start-3",
      },
      {
        kind: "image",
        src: `${dir}/pac-05.webp`,
        alt: "三只印着 P.A.C. 的蓝边白盘，盛着咖啡、蛋糕与三明治，配手绘餐垫",
        w: 1400,
        h: 788,
        cls: "md:col-span-6",
        ratio: "16 / 10",
      },
      {
        kind: "image",
        src: `${dir}/pac-24.webp`,
        alt: "圆形面包的切面特写，露出多孔的瓤，放在印着菜单文字的纸上，浅蓝台面",
        w: 1400,
        h: 788,
        cls: "md:col-span-6",
        ratio: "16 / 10",
      },
      {
        kind: "image",
        src: `${dir}/pac-31.webp`,
        alt: "满版黑色贴纸，白色的 PIZZA 字样横竖重复排满整个画面",
        w: 600,
        h: 750,
        cls: "md:col-span-6",
        ratio: "4 / 5",
      },
      {
        kind: "image",
        src: `${dir}/pac-22.webp`,
        alt: "白色热敏收据纸，竖排印着粗黑的 P.A.C. 字样与虚线",
        w: 600,
        h: 750,
        cls: "md:col-span-6",
        ratio: "4 / 5",
      },
      {
        kind: "image",
        src: `${dir}/pac-06.webp`,
        alt: "穿印着 P.A.C. 黑 T 恤的人，端着一整盘金黄色的布里欧修面包",
        w: 1400,
        h: 1750,
        cls: "md:col-span-6",
        ratio: "4 / 5",
      },
      {
        kind: "image",
        src: `${dir}/pac-16.webp`,
        alt: "戴蓝色棒球帽的人抱着两个印着 PANIETONE P.A.C. 的纸盒，脸被蓝色纸板遮住",
        w: 1400,
        h: 1748,
        cls: "md:col-span-6",
        ratio: "4 / 5",
      },
      {
        kind: "image",
        src: `${dir}/pac-33.webp`,
        alt: "莓果酱夹层蛋糕的极度特写，暗红果酱与浅色蛋糕体交错",
        w: 1400,
        h: 788,
        cls: "md:col-span-12",
      },
    ] satisfies Block[],
  },
}
