/**
 * 把 dist/ 整个目录上传到阿里云 OSS，并按文件类型设置好缓存头和 Content-Type。
 *
 * 用法（密钥只从环境变量读，不写进代码、不进 git）：
 *   OSS_KEY_ID=xxx OSS_KEY_SECRET=xxx OSS_BUCKET=my-bucket OSS_REGION=oss-cn-hongkong \
 *     node scripts/upload-oss.mjs
 *
 * 可选项：
 *   OSS_PREFIX=site/   传到 bucket 的某个子目录下（默认传到根目录）
 *   OSS_WEBSITE=0      跳过「静态网站默认首页 / 404 文档」的自动配置
 *
 * 关于地域：
 *   大陆地域（oss-cn-hangzhou 等）绑定域名必须 ICP 备案；
 *   oss-cn-hongkong / oss-ap-southeast-1 等境外地域不需要备案，能立刻用。
 */
import { createRequire } from "node:module";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ali-oss 装在隔离的 node workspace 里，避免污染项目依赖（否则 Vercel 构建会多装几百 KB）
let OSS;
try {
  OSS = createRequire(import.meta.url)("ali-oss");
} catch {
  OSS = createRequire("file:///C:/Users/q/.workbuddy/binaries/node/workspace/index.js")("ali-oss");
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

/** 带 hash 的构建产物可以永久缓存；图片一年一次更新，缓存七天；HTML 每次都要回源校验 */
function cacheControl(rel) {
  if (rel.startsWith("assets/")) return "public, max-age=31536000, immutable";
  if (rel.startsWith("images/")) return "public, max-age=604800";
  if (rel.endsWith(".html")) return "no-cache";
  if (rel === "robots.txt" || rel === "sitemap.xml") return "public, max-age=3600";
  return "public, max-age=86400";
}

async function walk(dir, base = "") {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...(await walk(path.join(dir, entry.name), rel)));
    else out.push(rel);
  }
  return out;
}

const { OSS_KEY_ID, OSS_KEY_SECRET, OSS_BUCKET, OSS_REGION, OSS_PREFIX = "" } = process.env;
const missing = ["OSS_KEY_ID", "OSS_KEY_SECRET", "OSS_BUCKET", "OSS_REGION"].filter(
  (k) => !process.env[k],
);
if (missing.length) {
  console.error(`缺少环境变量：${missing.join(", ")}`);
  console.error("用法：OSS_KEY_ID=… OSS_KEY_SECRET=… OSS_BUCKET=… OSS_REGION=oss-cn-hongkong node scripts/upload-oss.mjs");
  process.exit(1);
}

const client = new OSS({
  region: OSS_REGION,
  bucket: OSS_BUCKET,
  accessKeyId: OSS_KEY_ID,
  accessKeySecret: OSS_KEY_SECRET,
  secure: true,
});

const files = await walk(DIST);
console.log(`准备上传 ${files.length} 个文件 → oss://${OSS_BUCKET}/${OSS_PREFIX}`);

let done = 0;
let failed = 0;
const CONCURRENCY = 8;

for (let i = 0; i < files.length; i += CONCURRENCY) {
  const batch = files.slice(i, i + CONCURRENCY);
  await Promise.all(
    batch.map(async (rel) => {
      const object = OSS_PREFIX ? `${OSS_PREFIX.replace(/\/$/, "")}/${rel}` : rel;
      const headers = {
        "Content-Type": MIME[path.extname(rel).toLowerCase()] ?? "application/octet-stream",
        "Cache-Control": cacheControl(rel),
      };
      try {
        await client.put(object, path.join(DIST, rel), { headers });
        done += 1;
      } catch (err) {
        failed += 1;
        console.error(`✗ ${rel} — ${err.message}`);
      }
    }),
  );
  process.stdout.write(`\r已上传 ${done}/${files.length}`);
}

console.log(`\n完成：成功 ${done}，失败 ${failed}`);

if (process.env.OSS_WEBSITE !== "0") {
  try {
    await client.putBucketWebsite({ index: "index.html", error: "404.html" });
    console.log("静态网站已配置：默认首页 index.html，404 文档 404.html");
  } catch (err) {
    console.error(`静态网站配置失败（可以在控制台手动设置）：${err.message}`);
  }
}

if (failed > 0) process.exit(1);
