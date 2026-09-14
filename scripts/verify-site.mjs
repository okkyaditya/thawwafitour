const base = process.env.BASE_URL || "http://127.0.0.1:3003";

async function get(path) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  return { response, body: await response.text() };
}

const checks = [];
function check(condition, message) {
  checks.push({ condition, message });
  if (!condition) console.error(`FAIL: ${message}`);
}

for (const path of ["/", "/paket", "/blog", "/tentang", "/kontak", "/robots.txt", "/sitemap.xml", "/llms.txt"]) {
  const { response } = await get(path);
  check(response.status === 200, `${path} returns 200 (got ${response.status})`);
}

const invalidPackage = await get("/paket/99999");
check(invalidPackage.response.status === 404, `/paket/99999 returns 404 (got ${invalidPackage.response.status})`);

for (const path of ["/", "/paket/1", "/blog/panduan-tata-cara-umroh-sesuai-sunnah"]) {
  const { response, body } = await get(path);
  check(body.includes('rel="canonical"'), `${path} has canonical`);
  check(body.includes('application/ld+json'), `${path} has JSON-LD`);
  check(body.includes('property="og:'), `${path} has Open Graph metadata`);
  check(response.headers.get("x-content-type-options") === "nosniff", `${path} has security headers`);
}

if (checks.some(({ condition }) => !condition)) process.exit(1);
console.log(`PASS: ${checks.length} site checks`);
