import { useEffect, useState } from "react";
import { site } from "../data/site";
import { Link, useRoute } from "../lib/router";
import { useLocalTime } from "../hooks/useLocalTime";
import { ArrowIcon, ClockIcon, CloseIcon, MenuIcon } from "./Icons";
import { cn } from "../lib/cn";

export function Navbar() {
  const time = useLocalTime(site.timeZone);
  const [open, setOpen] = useState(false);
  const { path, hash } = useRoute();

  // 路由变化时收起菜单
  useEffect(() => setOpen(false), [path, hash]);

  // 打开时锁滚动 + Esc 关闭
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex h-[54px] items-center justify-between gap-6 px-4 md:h-[61px] md:px-6">
        {/* 品牌 + 状态 */}
        <div className="flex items-center gap-[6px] md:gap-6">
          <Link
            to="/"
            aria-label={`${site.brand} — 返回首页`}
            className="font-display text-[22px] leading-none tracking-[-0.05em] text-ink md:text-[32px]"
          >
            {site.brand}
          </Link>

          <div className="flex items-center gap-2.5">
            <span className="flex h-5 items-center gap-[6px] rounded-[4px] bg-chip px-2 md:h-[27px] md:gap-[7px] md:px-[10px]">
              <span
                aria-hidden="true"
                className="size-[6px] shrink-0 rounded-full bg-[#3ba55d] md:size-[7px]"
              />
              <span className="text-[12px] leading-none tracking-[-0.03em] text-body md:text-[14px]">
                <span className="md:hidden">{site.availabilityShort}</span>
                <span className="hidden md:inline">{site.availability}</span>
              </span>
            </span>

            <span className="hidden h-7 items-center gap-[6px] rounded-[4px] bg-chip-alt px-[10px] md:flex">
              <time className="text-[15px] leading-none tracking-[-0.04em] text-muted tabular-nums">
                {time}
              </time>
              <ClockIcon className="size-3 text-muted" />
            </span>
          </div>
        </div>

        {/* 桌面导航 */}
        <nav aria-label="主导航" className="hidden items-center gap-4 md:flex">
          {site.nav.map((item, i) => {
            const isContact = i === site.nav.length - 1;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-[15px] leading-none tracking-[-0.03em] text-ink",
                  // 文字链接用下划线扫入；末位是胶囊按钮，走背景色变化
                  isContact
                    ? "flex h-7 items-center rounded-[4px] bg-chip px-[14px] transition-colors duration-300 hover:bg-[#e7e7e7]"
                    : "nav-underline",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 移动端菜单按钮 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          className="-mr-1 flex size-[30px] items-center justify-center text-ink md:hidden"
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      {/* 移动端菜单 */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[54px] z-40 overflow-y-auto bg-white md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <nav aria-label="移动端导航" className="px-4 pb-16 pt-1">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 text-[24px] leading-none tracking-[-0.03em] text-ink"
                >
                  {item.label}
                  <ArrowIcon className="size-4 shrink-0 text-soft" />
                </Link>
              </li>
            ))}
          </ul>

          {site.contact.email ? (
            <>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-10 block text-[15px] tracking-[-0.03em] text-muted"
              >
                {site.contact.email}
              </a>
              <p className="mt-1 text-[13px] leading-[1.5] text-soft">{site.contact.note}</p>
            </>
          ) : (
            <p className="mt-10 text-[15px] leading-[1.5] tracking-[-0.03em] text-muted">
              {site.contact.note}
            </p>
          )}
        </nav>
      </div>
    </header>
  );
}
