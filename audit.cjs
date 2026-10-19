const { chromium } = require("playwright-core")
const routes = ["/", "/work/sneaker-visuals", "/work/sofa-in-context", "/work/pac", "/work/brewbear", "/work/chips"]
const widths = [1920, 1440, 1024, 768, 390]

;(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  })
  let bad = 0
  for (const route of routes) {
    for (const w of widths) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } })
      const page = await ctx.newPage()
      const errors = []
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()))
      page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message))
      // 屏蔽一切 Google Fonts，确保自托管彻底
      await page.route("**fonts.g**", (r) => r.abort())

      await page.goto("http://127.0.0.1:4173" + route, { waitUntil: "load", timeout: 60000 })
      const h = await page.evaluate(() => document.documentElement.scrollHeight)
      let y = 0
      while (y < h) { y += 700; await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(70) }
      await page.waitForTimeout(1000)

      const d = await page.evaluate(async () => {
        await document.fonts.ready
        const de = document.documentElement
        const imgs = Array.from(document.images)
        const inView = imgs.filter((i) => {
          const b = i.getBoundingClientRect()
          return b.bottom > 0 && b.top < window.innerHeight && b.right > 0 && b.left < window.innerWidth
        })
        return {
          ovf: de.scrollWidth - de.clientWidth,
          imgs: imgs.length,
          loaded: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
          broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
          noAlt: imgs.filter((i) => !i.alt || !i.alt.trim()).length,
          inViewBad: inView.filter((i) => !(i.complete && i.naturalWidth > 0)).length,
          hidden: Array.from(document.querySelectorAll(".reveal")).filter((el) => getComputedStyle(el).opacity === "0").length,
          h1: document.querySelectorAll("h1").length,
          serifOk: document.fonts.check('400 24px "Instrument Serif"'),
          interOk: document.fonts.check('400 16px "Inter"'),
        }
      })
      const ok = d.ovf === 0 && d.broken === 0 && d.noAlt === 0 && d.h1 === 1 &&
                 d.hidden === 0 && d.inViewBad === 0 && errors.length === 0 &&
                 d.serifOk && d.interOk
      if (!ok) bad++
      console.log(`${ok ? "OK " : "NG "} ${route.padEnd(22)} ${String(w).padStart(4)}px ovf=${d.ovf} img=${d.loaded}/${d.imgs} 坏图=${d.broken} 缺alt=${d.noAlt} 透明=${d.hidden} 字体=${d.serifOk && d.interOk ? "OK" : "NG"}${errors.length ? " ERR:" + errors[0].slice(0, 60) : ""}`)
      await ctx.close()
    }
  }
  console.log(bad === 0 ? "\n全部通过（30 组）" : `\n${bad} 项需处理`)
  await browser.close()
})()
