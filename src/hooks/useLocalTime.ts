import { useEffect, useState } from "react";

/** 顶部那个实时时钟，形如 "6:35 PM" */
export function useLocalTime(timeZone: string) {
  const format = () => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone,
      }).format(new Date());
    } catch {
      return "";
    }
  };

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
}
