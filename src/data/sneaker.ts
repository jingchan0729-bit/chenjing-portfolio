/**
 * ---------------------------------------------------------------
 * 项目 01 — SNEAKER VISUALS 的全部内容
 * 改标题、改文案、换图片只动这个文件，页面结构不用碰。
 *
 * 所有图片都来自用户提供的原始素材（public/images/sneaker/），
 * 未做任何生成或替换；仅统一转成 webp 以控制体积。
 * 规格一栏只写图片里能被看到的东西。
 * ---------------------------------------------------------------
 */

export type Image = {
  src: string
  alt: string
  /** 原图尺寸，用于占位、避免加载时布局跳动 */
  w: number
  h: number
  caption?: string
}

const dir = "/images/sneaker"

export const sneaker = {
  label: "01 / Selected project",
  title: "SNEAKER VISUALS",
  subtitle: "AI Product Visuals & Art Direction",
  intro:
    "围绕同一款黑白帆布鞋，探索配色、细节与上脚场景之间的关系，建立一套可复用的电商视觉标准。",

  /** 主视觉：单张，方形原图不裁切 */
  hero: {
    src: `${dir}/hero-skate.webp`,
    alt: "街角低机位：前景是黑色帆布鞋的特写，鞋带、白色围条与鞋底完整可见，后方有人蹲在滑板上，背景是斑马线与红绿灯",
    w: 1824,
    h: 1824,
    caption: "Street & Skate — low-angle campaign frame",
  } satisfies Image,

  overview: [
    { label: "Project", value: "Canvas Skate / Visual System" },
    { label: "Focus", value: "Colorways / Details / Lifestyle" },
    { label: "Visual Direction", value: "Minimal / Skate / Everyday" },
    { label: "Deliverables", value: "Product / Detail / Lifestyle" },
  ],

  product: {
    label: "03 / Product & Colorways",
    title: "One silhouette, five colorways.",
    body: "五张图共用机位、光位与投影方向，只有鞋面配色不同；扩到更多配色时，展示标准不必重定。",
    tiles: [
      {
        src: `${dir}/colorway-01.webp`,
        alt: "沙色帆布休闲鞋，侧面四分之三视角，白色鞋带与白色围条",
        w: 539,
        h: 305,
        caption: "Sand",
      },
      {
        src: `${dir}/colorway-02.webp`,
        alt: "橄榄绿帆布休闲鞋，侧面四分之三视角，白色鞋带与白色围条",
        w: 539,
        h: 312,
        caption: "Olive",
      },
      {
        src: `${dir}/colorway-03.webp`,
        alt: "靛蓝色帆布休闲鞋，侧面四分之三视角，白色鞋带与白色围条",
        w: 539,
        h: 305,
        caption: "Indigo",
      },
      {
        src: `${dir}/colorway-04.webp`,
        alt: "深咖啡色帆布休闲鞋，侧面四分之三视角，白色鞋带与白色围条",
        w: 539,
        h: 314,
        caption: "Cocoa",
      },
      {
        src: `${dir}/colorway-05.webp`,
        alt: "红色帆布休闲鞋，侧面四分之三视角，白色鞋带与白色围条",
        w: 539,
        h: 309,
        caption: "Red",
      },
    ] satisfies Image[],
    /** 同一双鞋的两种拍摄：白底影棚 / 沥青地面 */
    pair: {
      studio: {
        src: `${dir}/product-white.webp`,
        alt: "黑白帆布休闲鞋的白底产品图，两只鞋成对摆放，可见白色鞋带与白色围条",
        w: 1254,
        h: 1254,
        caption: "Studio pair — canvas upper, white foxing",
      } satisfies Image,
      field: {
        src: `${dir}/product-ground.webp`,
        alt: "灰色沥青地面上的黑白帆布鞋，俯视四分之三角度，鞋头与鞋带完整可见",
        w: 1024,
        h: 1536,
        caption: "The same pair — asphalt, side light",
      } satisfies Image,
    },
  },

  details: {
    label: "04 / Product details",
    title: "Where the silhouette is defined.",
    body: "鞋头弧度、鞋带走向、围条高度与鞋底厚度，是模型最容易改坏的地方，也是这组细节图要固定的参考点。",
    images: {
      top: {
        src: `${dir}/detail-top.webp`,
        alt: "黑白帆布鞋的正上方俯视图，鞋带、鞋舌与鞋头结构完整",
        w: 1600,
        h: 1600,
        caption: "Overhead — toe cap, lace line, tongue",
      } satisfies Image,
      profiles: {
        src: `${dir}/detail-profiles.webp`,
        alt: "黑白帆布鞋的左侧外侧与内侧侧视图，展示鞋面拼接、围条与鞋底轮廓",
        w: 1263,
        h: 1920,
        caption: "Outer and inner profile, left shoe",
      } satisfies Image,
      sole: {
        src: `${dir}/detail-sole.webp`,
        alt: "黑白帆布鞋的后跟视角与鞋底俯视图，可见鞋跟围条与鞋底厚度",
        w: 1600,
        h: 1428,
        caption: "Heel counter and outsole",
      } satisfies Image,
    },
  },

  /** 产品信息：尺码与试穿，直接沿用产品资料原图 */
  info: {
    label: "05 / Product information",
    title: "The part that has to be exact.",
    body: "尺码表与试穿记录沿用产品资料：女段 US 5–7、男段 7.5–11.5，八位试穿者覆盖不同脚型。",
    size: {
      src: `${dir}/info-size.webp`,
      alt: "产品尺码表，列出女段与男段的 US、EUR、MM 三个尺码体系对照，并注明人工测量存在 1–5mm 误差",
      w: 1200,
      h: 730,
      caption: "Size range — US / EUR / MM",
    } satisfies Image,
    fit: {
      src: `${dir}/info-fit.webp`,
      alt: "试穿参考表，八位试穿者按性别、脚型与平时尺码给出试穿尺码与试穿效果",
      w: 1200,
      h: 950,
      caption: "Fitting reference — eight wearers",
    } satisfies Image,
  },

  lifestyle: {
    label: "06 / Lifestyle imagery",
    title: "The same pair, in three kinds of day.",
    /** layout 决定这一组的图片排法，见 SneakerVisuals 里的 layoutClass */
    groups: [
      {
        index: "01",
        title: "CITY WALK",
        note: "宽牛仔裤、白袜、台阶与行道砖：最日常的穿法。",
        layout: "wide-narrow" as const,
        images: [
          {
            src: `${dir}/city-02.webp`,
            alt: "城市人行道上行走的下半身，阔腿牛仔裤与黑白帆布鞋，鞋头朝向镜头",
            w: 1453,
            h: 1824,
          },
          {
            src: `${dir}/city-01.webp`,
            alt: "穿绿格纹衬衫与阔腿牛仔裤的人坐在台阶上，脚上是黑白帆布鞋与白袜",
            w: 1122,
            h: 1402,
          },
        ] satisfies Image[],
      },
      {
        index: "02",
        title: "EVERYDAY COMMUTE",
        note: "同一个工作日里的两个瞬间：站定，与走下台阶。",
        layout: "narrow-wide" as const,
        images: [
          {
            src: `${dir}/commute-02.webp`,
            alt: "建筑外墙旁行走的人，米色外套、深色牛仔裤与黑白帆布鞋",
            w: 1530,
            h: 1920,
          },
          {
            src: `${dir}/commute-03.webp`,
            alt: "从台阶上走下的双腿，牛仔裤脚与黑白帆布鞋，可见鞋底侧面",
            w: 1453,
            h: 1824,
          },
        ] satisfies Image[],
      },
      {
        index: "03",
        title: "STREET & SKATE",
        note: "滑板公园与水泥地：把鞋放回它最早的功能语境。",
        layout: "offset-duo" as const,
        images: [
          {
            src: `${dir}/street-01.webp`,
            alt: "滑板公园里踩在滑板上的人，宽松牛仔裤与黑白帆布鞋，背景是水泥碗池",
            w: 1536,
            h: 1920,
          },
          {
            src: `${dir}/street-02.webp`,
            alt: "低机位特写：滑板上的黑白帆布鞋与阔腿牛仔裤，背景是滑板公园与城市天际线",
            w: 1453,
            h: 1824,
          },
        ] satisfies Image[],
      },
    ],
    footnote: "注：场景图的鞋型与棚拍图存在细微比例差异，白底图为准。",
  },

  approach: {
    label: "07 / Creative approach",
    title: "Three constraints, one visual system.",
    items: [
      {
        index: "01",
        title: "Product consistency",
        body: "以同一份产品参考控制鞋头弧度、鞋带孔位、围条高度与鞋底厚度。",
      },
      {
        index: "02",
        title: "Color exploration",
        body: "同一块白底、同一机位下替换鞋面配色，差异只留在颜色本身。",
      },
      {
        index: "03",
        title: "Lifestyle art direction",
        body: "用通勤、城市与街头三种语境检验产品：变的是光与姿态，不变的是那双鞋。",
      },
    ],
  },
} as const
