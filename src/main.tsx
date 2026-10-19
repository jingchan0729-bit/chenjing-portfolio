/**
 * 字体自托管，不走 Google Fonts。
 * fonts.googleapis.com / fonts.gstatic.com 在中国大陆不可达（实测超时），
 * 而字体是浏览器直接请求的——放 CDN 上等于国内访客字体全丢、首屏还要卡到超时。
 * 只用 latin 子集：全站排版为西文，不需要中文字形。
 * 字重与原先 Google Fonts 的请求保持一致：Inter 300/400/500，Mono 各 400。
 * 全站没有用到斜体，故不引入 italic 字形。
 */
import "@fontsource/inter/latin-300.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/roboto-mono/latin-400.css";
import "@fontsource/azeret-mono/latin-400.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
