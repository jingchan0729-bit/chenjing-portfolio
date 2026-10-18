import { useCallback, useEffect, useState } from "react";

/**
 * 极简路由：只服务这个作品集（"/" 与 "/work/:slug"）。
 * 不引入 react-router，减少依赖；同时保证链接是真实的 <a href>。
 */

const listeners = new Set<() => void>();

const normalize = (p: string) => {
  if (!p) return "/";
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
};

const scrollToHash = (hash: string, smooth = true) => {
  const run = () => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    }
  };
  // 等 React 把新路由渲染完再滚
  requestAnimationFrame(() => requestAnimationFrame(run));
};

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  const samePath = normalize(url.pathname) === normalize(window.location.pathname);

  if (!samePath) {
    window.history.pushState({}, "", url.pathname + url.hash);
    listeners.forEach((l) => l());
    if (url.hash) scrollToHash(url.hash.slice(1));
    else window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  // 同页跳锚点
  window.history.replaceState({}, "", url.pathname + url.hash);
  listeners.forEach((l) => l());
  if (url.hash) scrollToHash(url.hash.slice(1));
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export function useRoute() {
  const [state, setState] = useState(() => ({
    path: normalize(window.location.pathname),
    hash: window.location.hash,
  }));

  useEffect(() => {
    const sync = () =>
      setState({
        path: normalize(window.location.pathname),
        hash: window.location.hash,
      });
    listeners.add(sync);
    window.addEventListener("popstate", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  return state;
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/** 站内链接：保留真实 href（可右键新窗口打开），左键走前端跳转 */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const handle = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (/^https?:|^mailto:|^tel:/.test(to)) return;
      e.preventDefault();
      navigate(to);
    },
    [to, onClick],
  );

  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
