const { chromium } = require("playwright-core")
const BASE = "http://127.0.0.1:8099"

;(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  })
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  const errs = []
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()))
  page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message))

  for (const path of ["/", "/work/chips", "/work/chips/", "/work/brewbear/", "/work/pac/"]) {
    const resp = await page.goto(BASE + path, { waitUntil: "load", timeout: 30000 })
    await page.waitForTimeout(900)
    const info = await page.evaluate(() => ({
      finalUrl: location.pathname,
      h1: document.querySelector("h1")?.textContent?.trim().slice(0, 44) || "(无)",
      title: document.title,
    }))
    const chain = resp.request().redirectedFrom()
    console.log(
      `${path.padEnd(22)} → ${resp.status()}  最终 ${info.finalUrl.padEnd(22)} h1="${info.h1}"`
    )
  }

  // 直接从项目页点「Next project」，验证客户端路由仍然正常
  await page.goto(BASE + "/work/chips/", { waitUntil: "load" })
  await page.waitForTimeout(600)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(500)
  const nav = await page.evaluate(() => {
    const n = document.querySelector('nav[aria-label="项目切换"]')
    return n ? n.innerText.replace(/\s+/g, " ") : "(无导航)"
  })
  console.log("\nchips 页底部导航:", nav)

  console.log("\n控制台报错:", errs.length ? errs.slice(0, 3).join(" | ") : "无")
  await browser.close()
})()
