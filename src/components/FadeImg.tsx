import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * 解码完成后淡入的 <img>。
 *
 * 两个必须处理的边界情况：
 * 1. 缓存命中的图片可能在 React 绑定 onLoad 之前就已经 complete，
 *    那样 load 事件永远不会来 —— 挂载后要主动检查一次，否则图片永久透明。
 * 2. 加载失败时同样要显形，否则坏图会以「一片空白」的形式藏起来，
 *    比显示破图标更难排查。
 */
export function FadeImg({ className, onLoad, onError, ...rest }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el?.complete) setSettled(true);
  }, []);

  return (
    <img
      ref={ref}
      onLoad={(e) => {
        setSettled(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setSettled(true);
        onError?.(e);
      }}
      data-loaded={settled}
      className={cn("img-fade", className)}
      {...rest}
    />
  );
}
