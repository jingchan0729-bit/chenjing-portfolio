import type { Image } from "../data/sneaker";
import { cn } from "../lib/cn";
import { FadeImg } from "./FadeImg";

type Props = Image & {
  className?: string;
  /** 首屏图：优先加载，其余懒加载 */
  priority?: boolean;
  /** 悬停时轻微放大，沿用首页作品卡片的动效语言 */
  hover?: boolean;
  /**
   * 固定显示比例（"w / h"）。用于一排高度略有不同的图，
   * 让说明文字落在同一条基线上。原图不会被裁到鞋的关键部位，
   * 因为这类素材四周留有白边。
   */
  ratio?: string;
  /**
   * 信息图（尺码表、试穿表一类）。这类图原图 1200px 宽，
   * 小屏上被压到 358px 时表格文字小到读不了。
   * 开启后小屏按 scrollWidth 渲染并允许横向拖动，md 以上恢复常规流式排布。
   */
  scroll?: boolean;
  /** 小屏下的渲染宽度，默认 880px —— 约为原图的 73%，字够大又不至于要拖太久 */
  scrollWidth?: number;
};

/**
 * 一张图 + 一行等宽小字说明。
 * 不套卡片、不加圆角与阴影——图片本身就是版式。
 */
export function Plate({
  src,
  alt,
  w,
  h,
  caption,
  className,
  priority = false,
  hover = true,
  ratio,
  scroll = false,
  scrollWidth = 880,
}: Props) {
  /** 信息图不参与悬停放大：放大会让可滚动区域跟着抽动 */
  const zoom = hover && !scroll;

  const img = (
    <FadeImg
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn(
        "block w-full object-cover",
        ratio ? "h-full" : "h-auto",
        // .plate-scroll 在 index.css 里定义：用 CSS 变量而不是内联 min-width，
        // 否则内联样式会盖过 md 断点、让小屏宽度一直撑到桌面尺寸
        scroll && "plate-scroll",
        zoom &&
          "transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.015]",
      )}
      {...(scroll
        ? { style: { "--plate-min": `${scrollWidth}px` } as React.CSSProperties }
        : {})}
    />
  );

  return (
    <figure className={cn("group", className)}>
      {scroll ? (
        // 负边距让滚动区顶到屏幕两侧，图片看起来是「溢出版心」而不是被框住
        <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
          {img}
        </div>
      ) : (
        <div
          className="overflow-hidden bg-[#f3f3f1]"
          {...(ratio ? { style: { aspectRatio: ratio } } : {})}
        >
          {img}
        </div>
      )}

      {caption ? (
        <figcaption className="mt-2.5 flex items-baseline justify-between gap-4 font-mono text-[11px] leading-[1.5] tracking-[0.01em] text-soft">
          <span>{caption}</span>
          {scroll ? (
            <span className="shrink-0 text-soft/60 md:hidden">滑动查看 →</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
