/**
 * ---------------------------------------------------------------
 * 项目 02 — SOFA IN CONTEXT 的全部内容
 * 改标题、改文案、换图片只动这个文件，页面结构不用碰。
 *
 * 图片来源与对应关系（用户标注）：
 *  product-front      ← 最终版（be41ddce）
 *  process-01-base    ← 初始白底图（5bde01f7）
 *  process-02-levels  ← 色阶（345adf18）
 *  process-03-volume  ← 强化体积（ad91c976）
 *  process-04-shadow  ← 补充阴影（9482b2fc）
 *  scene-cream / scene-wood / scene-vintage ← 奶油风 / 原木风 / 中古风
 *  detail-01~03       ← 三张材质特写
 *  scene-cream-portrait / detail-vignette / detail-corner ← 在上述素材基础上做的取景延展
 *
 * 文案只写画面里能被看到的东西：不写尺寸、填充物、面料成分、品牌与工艺参数。
 * ---------------------------------------------------------------
 */

import type { Image } from "./sneaker"

const dir = "/images/sofa"

export const sofa = {
  label: "02 / Selected project",
  title: "SOFA IN CONTEXT",
  subtitle: "AI Interior & Furniture Visuals",
  intro:
    "把同一件云朵沙发放进奶油、原木与中古三种室内语境，让光位、色温与明暗关系跟着空间一起变——产品本身不动，房间的性格在变。",

  /**
   * 主视觉用竖幅取景，和项目 01 的方形大图拉开差别。
   * 3:4 裁切只吃掉上下各约 5%，沙发主体完整。
   */
  hero: {
    src: `${dir}/scene-cream-portrait.webp`,
    alt: "奶油色调客厅的竖幅取景：云朵沙发位于画面中部，暖白墙面搭配浅色木地板，柔和自然光从侧面进入",
    w: 1672,
    h: 2507,
    caption: "Cream interior — vertical framing",
  } satisfies Image,

  overview: [
    { label: "Project", value: "Cloud Sofa / Interior Study" },
    { label: "Focus", value: "Spaces / Material / Light" },
    { label: "Spaces", value: "Cream / Oak / Mid-century" },
    { label: "Deliverables", value: "Product / Interior / Detail" },
  ],

  /** 03 — 产品本体：三个机位 */
  object: {
    label: "03 / The object",
    title: "One sofa, three angles.",
    body: "正面、侧面与背面共用同一套光位与投影方向。家具不能只给一个机位——三个角度合起来，才构成一个能被人相信的形体。",
    front: {
      src: `${dir}/product-front.webp`,
      alt: "米白色绒面云朵沙发的白底产品图，四分之三正面视角：低矮宽大的座身、靠背的拉扣、三只抱枕与一条针织扭结抱枕，底座直接落地、没有沙发脚",
      w: 1254,
      h: 1254,
      caption: "Front three-quarter — studio white",
    } satisfies Image,
    side: {
      src: `${dir}/product-side.webp`,
      alt: "同一件云朵沙发的侧面视角白底图，可见坐深、扶手与靠背的高度关系，底座贴地无脚",
      w: 1024,
      h: 1024,
      caption: "Side elevation",
    } satisfies Image,
    rear: {
      src: `${dir}/product-rear.webp`,
      alt: "同一件云朵沙发的背面视角白底图，可见靠背背面、拉扣的走位与面料接缝",
      w: 1024,
      h: 1024,
      caption: "Rear three-quarter",
    } satisfies Image,
  },

  /**
   * 04 — 白底图迭代。
   * 五个中间状态：初始白底没有地面投影、主体是"浮"着的；之后依次做色阶、强化体积、
   * 补上投影，最后收尾成最终版。差异很细，所以用五张小图并排，让递进本身成为内容。
   */
  iteration: {
    label: "04 / White-background iteration",
    title: "Five passes to make it sit on the floor.",
    body: "初始白底图没有地面投影，沙发是浮在空中的。之后逐步调整色阶、体积感与投影，直到它真正落在白底面上——差异只有几个百分点，但落地感全在这几步里。",
    steps: [
      {
        index: "01",
        name: "Base white",
        src: `${dir}/process-01-base.webp`,
        alt: "白底图的初始状态：沙发下方没有地面投影，主体看起来浮在白底上",
        w: 1254,
        h: 1254,
        caption: "No contact shadow",
      } satisfies Image & { index: string; name: string },
      {
        index: "02",
        name: "Levels",
        src: `${dir}/process-02-levels.webp`,
        alt: "白底图调整色阶后的状态，明暗层次比初始版本更分明",
        w: 1254,
        h: 1254,
        caption: "Tonal levels",
      } satisfies Image & { index: string; name: string },
      {
        index: "03",
        name: "Volume",
        src: `${dir}/process-03-volume.webp`,
        alt: "白底图强化体积后的状态，坐垫与靠背的隆起更明确",
        w: 1254,
        h: 1254,
        caption: "Volume reinforced",
      } satisfies Image & { index: string; name: string },
      {
        index: "04",
        name: "Shadow",
        src: `${dir}/process-04-shadow.webp`,
        alt: "白底图补上地面投影后的状态，沙发底部第一次与地面建立接触",
        w: 1254,
        h: 1254,
        caption: "Contact shadow added",
      } satisfies Image & { index: string; name: string },
      {
        index: "05",
        name: "Final",
        src: `${dir}/product-front.webp`,
        alt: "白底图的最终版本，投影与整体明暗收尾完成",
        w: 1254,
        h: 1254,
        caption: "Final",
      } satisfies Image & { index: string; name: string },
    ],
  },

  /**
   * 05 — 三种室内语境。
   * note 里的明暗描述来自实测：三张场景整体亮度依次 186 / 160 / 131，
   * 明暗跨度依次 103 / 118 / 155，暖调偏移依次 46 / 47 / 55。
   */
  interiors: {
    label: "05 / Three interiors",
    title: "The same sofa, in three rooms.",
    groups: [
      {
        index: "01",
        title: "Cream",
        note: "三间里最亮的一间，明暗过渡也最柔和。暖白墙面与拱形壁龛把沙发的米白色接住，几乎看不到硬边阴影。",
        layout: "wide-narrow" as const,
        images: [
          {
            src: `${dir}/scene-cream.webp`,
            alt: "奶油风客厅中的云朵沙发：暖白墙面、拱形壁龛、木质边柜与圆形洞石茶几，柔和漫射光",
            w: 1920,
            h: 1440,
            caption: "Cream — full room",
          } satisfies Image,
          {
            src: `${dir}/detail-vignette.webp`,
            alt: "沙发一角近景：扶手、三只抱枕与针织扭结抱枕，旁边是放有杯子与书本的木质边几",
            w: 1800,
            h: 1800,
            caption: "Cream — corner with side table",
          } satisfies Image,
        ],
      },
      {
        index: "02",
        title: "Oak",
        note: "亮度居中。浅色木地板与整面木饰墙把光反弹回来，沙发与地面之间的承接关系比另外两间更明确。",
        layout: "narrow-wide" as const,
        images: [
          {
            src: `${dir}/scene-wood.webp`,
            alt: "原木风客厅中的云朵沙发：木饰墙面、落地窗与山景、木质长柜与蘑菇台灯，自然侧光",
            w: 1824,
            h: 1368,
            caption: "Oak — full room",
          } satisfies Image,
          {
            src: `${dir}/detail-corner.webp`,
            alt: "沙发低机位近景：坐垫边缘、底座与地毯、木地板之间的层次",
            w: 1800,
            h: 1800,
            caption: "Oak — low corner",
          } satisfies Image,
        ],
      },
      {
        index: "03",
        title: "Mid-century",
        note: "压得最暗、对比最重的一间，暖调也最浓。深色胡桃木与皮质扶手椅让沙发的轮廓直接从背景里浮出来。",
        layout: "single" as const,
        images: [
          {
            src: `${dir}/scene-vintage.webp`,
            alt: "中古风客厅中的云朵沙发：深色胡桃木护墙板、皮质扶手椅、深木色茶几与落地灯，暖光对比强",
            w: 1824,
            h: 1368,
            caption: "Mid-century — full room",
          } satisfies Image,
        ],
      },
    ],
    footnote:
      "三间房的整体亮度依次递减，明暗跨度依次拉大。沙发没有变过，是房间的光在替它定调。",
  },

  /** 06 — 材质细节：三张特写走 Z 字递进，避免与项目 01 的细节区撞版式 */
  material: {
    label: "06 / Material & light",
    title: "Close enough to read the weave.",
    body: "面料的细密织纹、三只抱枕各自的材质、扶手转折处的明暗，都得在近距里站得住。这是一张家具体感图成不成立的地方。",
    images: [
      {
        src: `${dir}/detail-01.webp`,
        alt: "沙发材质特写：坐垫前缘的滚边与绒面织纹，后方是黑弧纹方枕、焦糖橙圆枕与针织扭结抱枕",
        w: 1254,
        h: 1254,
        caption: "Cushion edge & weave",
      } satisfies Image,
      {
        src: `${dir}/detail-02.webp`,
        alt: "沙发材质特写：黑弧纹方枕的印花、针织扭结抱枕的粗织纹理，与坐垫的绒面形成三种质感",
        w: 1254,
        h: 1254,
        caption: "Three textiles",
      } satisfies Image,
      {
        src: `${dir}/detail-03.webp`,
        alt: "沙发材质特写：扶手与坐垫交接处的圆润转折，黑线条方枕与焦糖橙圆枕在虚化背景中",
        w: 1254,
        h: 1254,
        caption: "Arm to seat",
      } satisfies Image,
    ],
  },

  approach: {
    label: "07 / Approach",
    title: "How the room holds the object.",
    items: [
      {
        index: "01",
        title: "Space before object",
        body: "先让房间成立：墙、地面、窗的位置决定光从哪来。空间对了，家具放进去才有落点，而不是浮在上面。",
      },
      {
        index: "02",
        title: "One light logic per room",
        body: "三间房各自的光位不同，但每一间内部只认一套光位与投影方向。不加第二个光源，影子才不会互相打架。",
      },
      {
        index: "03",
        title: "Material at close range",
        body: "远看形体，近看材质。绒面、针织与丝绒在近距下的纹理密度要保持一致，材质才经得起被放大看。",
      },
    ],
  },
}
