import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Gallery } from "./collections/Gallery";
import { Media } from "./collections/Media";
import { Packages } from "./collections/Packages";
import { Posts } from "./collections/Posts";
import { SiteSettings } from "./collections/SiteSettings";
import { Testimonials } from "./collections/Testimonials";
import { Ustadz } from "./collections/Ustadz";
import { Users } from "./collections/Users";

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — Thawwafi Tour Admin",
      icons: [{ url: "/favicon.ico" }],
      description: "Panel Kontrol Resmi Thawwafi Tour",
    },
    components: {
      graphics: {
        Logo: "@/components/admin/AdminLogo#AdminLogo",
        Icon: "@/components/admin/AdminIcon#AdminIcon",
      },
      beforeDashboard: ["@/components/admin/BeforeDashboard#BeforeDashboard"],
      beforeNavLinks: ["@/components/admin/BeforeNavLinks#BeforeNavLinks"],
    },
    importMap: {
      baseDir: "src",
    },
  },
  collections: [Packages, Posts, Ustadz, Testimonials, Gallery, SiteSettings, Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || (() => {
    throw new Error("PAYLOAD_SECRET is required");
  })(),
  typescript: {
    outputFile: "src/payload-types.ts",
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./thawwafi.db",
    },
    push: process.env.NODE_ENV !== "production",
  }),
  sharp,
});
