const { chromium } = require("playwright-core")

;(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  })
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  // 模拟国内环境：屏蔽 Google Fonts，确保没有隐藏依赖
  await page.route("**fonts.g**", (r) => r.abort())

  const external = []
  await page.on("request", (r) => {
    const u = r.url()
    if (!u.includes("localhost") && !u.includes("127.0.0.1")) external.push(u)
  })

  await page.goto("http://127.0.0.1:4173/", { waitUntil: "load", timeout: 60000 })
  await page.waitForTimeout(2500)

  const r = await page.evaluate(async () => {
    await document.fonts.ready
    const checks = {}
    for (const spec of [
      '400 16px "Inter"',
      '500 16px "Inter"',
      '300 16px "Inter"',
      '400 24px "Instrument Serif"',
      '400 12px "Roboto Mono"',
      '400 12px "Azeret Mono"',
    ]) checks[spec] = document.fonts.check(spec)

    // 真实渲染宽度比对：若字体没生效，宽度会与 fallback 不同
    const mk = (family, size, weight = 400) => {
      const s = document.createElement("span")
      s.textContent = "Handgloves Portfolio 0123"
      s.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-size:${size}px;font-weight:${weight};font-family:${family}`
      document.body.appendChild(s)
      const w = s.getBoundingClientRect().width
      s.remove()
      return Math.round(w * 100) / 100
    }
    return {
      checks,
      loaded: Array.from(document.fonts).map((f) => `${f.family} ${f.weight} ${f.status}`),
      widths: {
        inter400: mk('"Inter"', 40, 400),
        fallbackSans: mk("ui-sans-serif, sans-serif", 40, 400),
        serif: mk('"Instrument Serif"', 40, 400),
        fallbackSerif: mk('"Times New Roman", serif', 40, 400),
        mono: mk('"Roboto Mono"', 30, 400),
        fallbackMono: mk("monospace", 30, 400),
      },
    }
  })

  console.log("=== 字体可用性 ===")
  for (const [k, v] of Object.entries(r.checks)) console.log(` ${v ? "✓" : "✗"} ${k}`)
  console.log("\n=== 已加载字体 ===")
  r.loaded.forEach((f) => console.log("  " + f))
  console.log("\n=== 渲染宽度（与目标字体验证区分）===")
  console.log("  Inter 400       ", r.widths.inter400, "| 系统无衬线 fallback", r.widths.fallbackSans)
  console.log("  Instrument Serif", r.widths.serif, "| Times fallback  ", r.widths.fallbackSerif)
  console.log("  Roboto Mono     ", r.widths.mono, "| monospace fallback", r.widths.fallbackMono)
  console.log("\n=== 外部请求（应无 fonts.g*）===")
  console.log(external.length ? external.join("\n  ") : "  无")

  await browser.close()
})()
