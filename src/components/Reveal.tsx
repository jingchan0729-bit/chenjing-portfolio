import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

/**
 * 兜底：快速拖动滚动条（或 Ctrl+End、锚点跳转）时，元素可能在一帧之内
 * 从视口下方直接跳到上方 —— 中间没有任何一次「交叉」，而 IntersectionObserver
 * 只在跨越阈值时回调，这种情况它一声不响，块就永远停在 opacity: 0。
 *
 * 所以额外挂一个共享的滚动兜底：一个 rAF 节流的监听器统一处理所有待显形的块，
 * 而不是每个块各挂一个 scroll —— 二十来个监听器会造成大量重复的布局读取。
 */
const pending = new Map<HTMLElement, () => void>();
let raf = 0;
let bound = false;

function sweep() {
  raf = 0;
  for (const [el, show] of Array.from(pending)) {
    // 顶部已越过视口顶部 —— 说明读者至少滚到过这里，就该显形
    if (el.getBoundingClientRect().top < 0) show();
  }
}

function scheduleSweep() {
  if (!raf) raf = requestAnimationFrame(sweep);
}

function track(el: HTMLElement, show: () => void) {
  pending.set(el, show);
  if (!bound) {
    bound = true;
    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep, { passive: true });
  }
  scheduleSweep();
}

function untrack(el: HTMLElement) {
  pending.delete(el);
}

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** 进入视口时轻微上浮淡入，只做一次 */
export function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /**
     * 元素比视口高很多时（例如竖幅海报），可见比例永远达不到 8%，
     * observer 会一直不触发、内容整块保持透明。这类元素改用 0 阈值：
     * 只要开始进入视口就算数。
     */
    const tall = el.offsetHeight > window.innerHeight * 1.2;
    let io: IntersectionObserver | null = null;

    const show = () => {
      setVisible(true);
      io?.disconnect();
      untrack(el);
    };

    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold: tall ? 0 : 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    track(el, show);

    return () => {
      io?.disconnect();
      untrack(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
