/* Seed script: populate Payload collections from legacy seed data.
   Run with: npm run seed */
import fs from "fs";
import path from "path";

import { getPayload } from "payload";

// @ts-expect-error - @next/env exports loadEnvConfig via CJS interop
const { loadEnvConfig } = await import("@next/env").then((m) => m.default ?? m);
loadEnvConfig(process.cwd(), true);

const { default: config } = await import("./payload.config.ts");

// Parse legacy data.js (it's a browser script assigning window.TW)
function loadLegacyData(): Record<string, unknown> {
  const file = path.join(process.cwd(), "legacy/assets/js/data.js");
  const code = fs.readFileSync(file, "utf8");
  const window: Record<string, unknown> = {};
  const globalScope = globalThis as unknown as Record<string, unknown>;
  globalScope.window = window;
  globalScope.TW = {};
  const fn = new Function("window", code);
  fn(window);
  return (globalScope.TW as Record<string, unknown>) ?? {};
}

async function main() {
  const TW = loadLegacyData();
  const payload = await getPayload({ config });

  // --- Users (first admin) ---
  const existingUsers = await payload.count({ collection: "users" });
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: process.env.SEED_ADMIN_EMAIL || "admin@thawwafi.id",
        password: process.env.SEED_ADMIN_PASS || "thawwafi2026",
        name: "Admin Thawwafi",
        roles: ["admin"],
      },
    });
    console.log("✓ Admin user created");
  }

  // --- Site settings (singleton) ---
  const settings = await payload.find({ collection: "site-settings", limit: 1 });
  if (settings.totalDocs === 0) {
    await payload.create({
      collection: "site-settings",
      data: {
        waNumber: String(TW.WA_NUMBER),
        waDisplay: String(TW.WA_DISPLAY),
        email: String(TW.EMAIL),
        instagram: String(TW.INSTAGRAM),
        instagramUrl: String(TW.INSTAGRAM_URL),
        legalName: String(TW.LEGAL_NAME),
        ppiu: String(TW.PPIU),
        addrLegal: String(TW.ADDR_LEGAL),
        addrOps: String(TW.ADDR_OPS),
        mapsQuery: String(TW.MAPS_QUERY),
      },
    });
    console.log("✓ Site settings created");
  }

  // --- Ustadz ---
  const ustadzMap = new Map<string, number>();
  const existingUstadz = await payload.find({ collection: "ustadz", limit: 100 });
  if (existingUstadz.totalDocs === 0) {
    for (const u of TW.USTADZ as Array<Record<string, string>>) {
      const doc = await payload.create({
        collection: "ustadz",
        data: { name: u.name, role: u.role, focus: u.focus, initials: u.initials },
      });
      ustadzMap.set(u.id, doc.id);
    }
    console.log("✓ Ustadz seeded:", ustadzMap.size);
  } else {
    for (const u of existingUstadz.docs) ustadzMap.set(String(u.name), u.id);
  }

  // --- Testimonials ---
  const existingTesti = await payload.count({ collection: "testimonials" });
  if (existingTesti.totalDocs === 0) {
    for (const t of TW.TESTIMONIALS as Array<Record<string, string>>) {
      await payload.create({
        collection: "testimonials",
        data: { name: t.name, role: t.role, text: t.text, initials: t.initials },
      });
    }
    console.log("✓ Testimonials seeded");
  }

  // --- Gallery ---
  const existingGallery = await payload.count({ collection: "gallery" });
  if (existingGallery.totalDocs === 0) {
    let galCount = 0;
    for (const g of TW.GALLERY as Array<Record<string, string>>) {
      try {
        await payload.create({
          collection: "gallery",
          data: { title: g.title, category: g.category.toLowerCase().replace(/\s+/g, "-") as never, art: g.art as never },
        });
        galCount++;
      } catch (e) {
        console.error("✗ Failed to seed gallery:", g.title, (e as Error).message);
      }
    }
    console.log("✓ Gallery seeded:", galCount, "/", (TW.GALLERY as unknown[]).length);
  }

  // --- Packages ---
  const existingPkgs = await payload.count({ collection: "packages" });
  if (existingPkgs.totalDocs === 0) {
    for (const p of TW.SEED_PACKAGES as Array<Record<string, never>>) {
      const hm = p.hotelMakkah as unknown as Record<string, unknown>;
      const hd = p.hotelMadinah as unknown as Record<string, unknown>;
      await payload.create({
        collection: "packages",
        data: {
          name: p.name as string,
          category: String(p.category).toLowerCase() as never,
          tagline: p.tagline as string,
          price: p.price as number,
          priceNote: p.priceNote as string,
          badge: (p.badge === "limited" || p.badge === "promo" ? p.badge : "none") as never,
          promoLabel: p.promoLabel as string | undefined,
          status: p.status as never,
          featured: p.featured as boolean,
          departDate: p.departDate as string,
          duration: p.duration as string,
          airline: p.airline as string,
          flight: p.flight as string,
          hotelMakkahName: hm.name as string,
          hotelMakkahStars: String(hm.stars) as never,
          hotelMakkahDistance: hm.distance as string,
          hotelMadinahName: hd.name as string,
          hotelMadinahStars: String(hd.stars) as never,
          hotelMadinahDistance: hd.distance as string,
          haramain: p.haramain as boolean,
          thaif: p.thaif as boolean,
          seatsTotal: p.seatsTotal as number,
          seatsLeft: p.seatsLeft as number,
          visa: p.visa as string,
          group: p.group as string,
          ustadz: ustadzMap.get(String(p.ustadzId)) ?? null,
          itinerary: (p.itinerary as Array<Record<string, string>>).map((i) => ({ day: i.day, title: i.title, desc: i.desc })),
          included: (TW.INCLUDE_DEFAULT as string[]).map((item) => ({ item })),
          excluded: (TW.EXCLUDE_DEFAULT as string[]).map((item) => ({ item })),
        },
      });
    }
    console.log("✓ Packages seeded:", (TW.SEED_PACKAGES as unknown[]).length);
  }

  // --- Posts ---
  const existingPosts = await payload.count({ collection: "posts" });
  if (existingPosts.totalDocs === 0) {
    let postCount = 0;
    for (const b of TW.SEED_POSTS as Array<Record<string, never>>) {
      try {
        const rawContent = (b.content as Array<{ type?: string; text?: string; items?: string[] }>) ?? [];
        const lexicalChildren = rawContent.map((c) => {
          if (c.type === "h2") {
            return {
              type: "heading",
              tag: "h2",
              format: "",
              indent: 0,
              version: 1,
              children: [{ type: "text", text: String(c.text || ""), format: 0, version: 1 }],
            };
          }
          if (c.type === "callout" || c.type === "quote") {
            return {
              type: "quote",
              format: "",
              indent: 0,
              version: 1,
              children: [{ type: "text", text: String(c.text || ""), format: 0, version: 1 }],
            };
          }
          if (c.type === "ul" && Array.isArray(c.items)) {
            return {
              type: "list",
              listType: "bullet",
              tag: "ul",
              format: "",
              indent: 0,
              version: 1,
              children: c.items.map((item) => ({
                type: "listitem",
                format: "",
                indent: 0,
                version: 1,
                value: 1,
                children: [{ type: "text", text: String(item), format: 0, version: 1 }],
              })),
            };
          }
          return {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [{ type: "text", text: String(c.text || ""), format: 0, version: 1 }],
          };
        });

        const lexicalState = {
          root: {
            type: "root",
            format: "",
            indent: 0,
            version: 1,
            children: lexicalChildren,
            direction: "ltr",
          },
        };

        const cats = (b.relatedTags as string[]).map((c) => c.toLowerCase()) as never;
        await payload.create({
          collection: "posts",
          data: {
            title: b.title as string,
            slug: b.slug as string,
            category: String(b.category).toLowerCase().replace(/\s+/g, "-") as never,
            date: b.date as string,
            author: b.author as string,
            readTime: b.readTime as number,
            excerpt: b.excerpt as string,
            content: lexicalState as never,
            metaTitle: b.metaTitle as string,
            metaDescription: b.metaDescription as string,
            relatedCategories: cats,
          },
        });
        postCount++;
      } catch (e) {
        console.error("✗ Failed to seed post:", b.title, (e as Error).message);
      }
    }
    console.log("✓ Posts seeded with richText:", postCount, "/", (TW.SEED_POSTS as unknown[]).length);
  }

  console.log("Seed selesai. ✅");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
