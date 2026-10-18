import { site } from "../data/site";

/**
 * 首屏只有一句衬线体短介绍：
 * 参考站是三行以内、居中、大量留白的排版，不放简历段落。
 *
 * 用 h1 而不是 p：首页原本没有 h1（作品区的标题是 sr-only 的 h2），
 * 缺 h1 会让搜索引擎与读屏软件拿不到页面主标题。
 */
export function Hero() {
  return (
    <section id="hero" aria-label="介绍" className="border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-[18px] lg:py-12">
        <h1 className="mx-auto max-w-[1120px] text-center font-display text-[20px] font-normal leading-[1.28] tracking-[-0.03em] text-ink sm:text-[22px] lg:text-[24px] [text-wrap:balance]">
          {site.intro}
        </h1>
      </div>
    </section>
  );
}
