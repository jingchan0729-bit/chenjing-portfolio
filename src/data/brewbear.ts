/**
 * ---------------------------------------------------------------
 * 项目 04 — BREWBEAR 的全部内容
 *
 * 版式：满幅拼版（full-bleed tiling），与项目 03 同一套排版语言，
 * 但节奏改成「标志 → 手稿 → 字体 → 应用 → 空间 → 屏幕 → 户外」，
 * 中间插一段米白呼吸页，把连续图流断开。
 *
 * 素材：原始项目 23 张图，剔除 2 张纯文字页（原作者的项目陈述与致谢页）
 * 与 5 张重复度高的机位，留 16 张；统一转 webp 控制体积，未做画面修改。
 * alt 已按画面内容逐条描述。
 * ---------------------------------------------------------------
 */

import type { Image } from "./sneaker"

const dir = "/images/brewbear"

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

export const brewbear = {
  label: "04 / Selected project",
  title: "BREWBEAR",
  subtitle: "Specialty Coffee Brand Identity",
  intro:
    "为一个虚构的精品咖啡烘焙品牌做的识别：粗壮的自定义字标，加一只捧着杯子的熊。深蓝与米白打底，牛皮纸是它落地时最常出现的材质。",

  overview: [
    { label: "Project", value: "BREWBEAR Specialty Coffee" },
    { label: "Fields", value: "Branding / Art Direction" },
    { label: "Scope", value: "Wordmark / Mascot / Type System" },
    { label: "Applications", value: "Packaging / Retail / Digital" },
  ],

  /** 07 — 呼吸页：一段大字 + 一段短文，独占一屏 */
  statement: {
    label: "07 / Note",
    title: "Legible at eight centimetres.",
    body: "杯身、贴纸、封箱胶带、收据——这套标志最常出现的尺寸，比屏幕上小得多。所以字重、字距，以及熊与杯子之间的那道空隙，都是按一只八厘米纸杯去校的，而不是按一张一千四百像素的画板。",
  },

  /** 08 — 16 件，满幅拼版 */
  gallery: {
    label: "08 / Gallery",
    title: "From mark to counter.",
    note: "十六件，从二十三件里挑出。",
    blocks: [
      {
        kind: "image",
        src: `${dir}/brew-01.webp`,
        alt: "蓝色椅面上放着一只牛皮纸双杯托，两只米色纸杯从中露出；杯托印着深蓝色 BREWBEAR 字标、捧杯的熊与一行小字 Good Coffee Good Day",
        w: 1400,
        h: 872,
        cls: "md:col-span-12",
        priority: true,
      },
      {
        kind: "image",
        src: `${dir}/brew-02.webp`,
        alt: "深蓝底上居中排布标志：米白色的熊捧着杯子，下方是 BREWBEAR 大字与 Roasters Coffee 副标",
        w: 1400,
        h: 788,
        cls: "md:col-span-12",
      },
      {
        kind: "image",
        src: `${dir}/brew-03.webp`,
        alt: "同一标志的深蓝版本压在米白纸面上，四周留出大片空白",
        w: 1400,
        h: 1050,
        cls: "md:col-span-6",
      },
      {
        kind: "image",
        src: `${dir}/brew-04.webp`,
        alt: "米白纸面上的标志构成线稿：圆形与网格辅助线标出熊头、杯身与字标的对齐关系",
        w: 1400,
        h: 1050,
        cls: "md:col-span-6",
      },
      {
        kind: "image",
        src: `${dir}/brew-05.webp`,
        alt: "摊开的速写本，铅笔画着熊的多版姿态与旋转的辅助圆，中间一只已经填上深蓝",
        w: 1400,
        h: 788,
        cls: "md:col-span-12",
      },
      {
        kind: "image",
        src: `${dir}/brew-06.webp`,
        alt: "墙上一组钉着的样张：深蓝底的标志海报、印满 A 到 Z 的米色字体海报、深蓝底的数字 0 到 9",
        w: 1400,
        h: 788,
        cls: "md:col-span-12",
      },

      // ---- 呼吸页：把连续图流断开 ----
      { kind: "note", cls: "md:col-span-12" },

      {
        kind: "image",
        src: `${dir}/brew-07.webp`,
        alt: "深蓝瓷砖台面俯拍：牛皮纸盒、一碗咖啡豆、一块深蓝布巾、一杯黑咖啡，以及一张压印标志的纸卡",
        w: 1400,
        h: 788,
        cls: "md:col-span-6",
      },
      {
        kind: "image",
        src: `${dir}/brew-08.webp`,
        alt: "米白桌面俯拍：深蓝名片、牛皮纸卡、吊牌、圆形杯垫与压凹的标志样张，右上角有咖啡豆与一只咖啡杯",
        w: 1400,
        h: 788,
        cls: "md:col-span-6",
      },
      {
        kind: "image",
        src: `${dir}/brew-09.webp`,
        alt: "牛皮纸三件套——豆袋、封箱纸箱、手提纸袋——前面一卷印满熊的封箱贴纸与一张集章卡，背景是深蓝瓷砖",
        w: 1400,
        h: 788,
        cls: "md:col-span-12",
      },
      {
        // 竖构图居中占 8 栏，让满幅横条之间出现一次收窄
        kind: "image",
        src: `${dir}/brew-10.webp`,
        alt: "咖啡机接水盘上，一只纸杯侧躺、两只竖立；杯身由深蓝渐变到浅色，印着淡淡的熊与 Made for Every Coffee Lover",
        w: 1400,
        h: 872,
        cls: "md:col-span-8 md:col-start-3",
      },
      {
        kind: "image",
        src: `${dir}/brew-11.webp`,
        alt: "米白竖立菜单卡，印着 Espresso、Filter、Not Coffee 三组价目，右下角被放大的深蓝熊插画压住；旁边一只深蓝马克杯",
        w: 1400,
        h: 1050,
        cls: "md:col-span-6",
      },
      {
        kind: "image",
        src: `${dir}/brew-12.webp`,
        alt: "咖啡店里穿深蓝围裙的咖啡师，围裙胸口绣着细线标志，背景是意式机、磨豆机与一摞纸杯",
        w: 1400,
        h: 1050,
        cls: "md:col-span-6",
      },
      {
        kind: "image",
        src: `${dir}/brew-14.webp`,
        alt: "街边店面：米色墙面与深蓝门框，门头是深蓝标志，整幅玻璃窗内可见吧台、层架与座位",
        w: 1400,
        h: 1050,
        cls: "md:col-span-12",
      },
      {
        kind: "image",
        src: `${dir}/brew-15.webp`,
        alt: "桌面上的手机与平板：手机是品牌社交主页，平板是点单界面；右侧一只牛皮纸外带杯与一张打印小票",
        w: 1400,
        h: 788,
        cls: "md:col-span-12",
      },
      {
        kind: "image",
        src: `${dir}/brew-16.webp`,
        alt: "户外墙面上三张并排海报：深蓝底的大字宣言、咖啡萃取的中景照片、米色底印着纸杯图形与一段文案",
        w: 1400,
        h: 872,
        cls: "md:col-span-12",
      },
      {
        kind: "image",
        src: `${dir}/brew-13.webp`,
        alt: "聚光灯下，深蓝瓷砖墙前立着一只牛皮纸手提袋，印着标志、Good Coffee Good Day、网址与电话",
        w: 1400,
        h: 872,
        cls: "md:col-span-12",
      },
    ] as Block[],
  },
}
