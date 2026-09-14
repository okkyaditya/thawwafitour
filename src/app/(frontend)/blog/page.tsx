import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";

export const metadata: Metadata = {
  title: "Blog — Panduan Umrah dan Informasi Tanah Suci",
  description: "Artikel edukatif Thawwafi Tour tentang panduan umrah, persiapan perjalanan, dan informasi Tanah Suci.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog Thawwafi Tour", description: "Panduan umrah dan informasi Tanah Suci.", url: "/blog", type: "website" },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://thawwafi.com/blog#blog",
  url: "https://thawwafi.com/blog",
  name: "Blog Thawwafi Tour",
  publisher: { "@id": "https://thawwafi.com/#organization" },
  inLanguage: "id-ID",
};

export const revalidate = 60;

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const CAT_MAP: Record<string, string> = {
  "panduan-sunnah": "Panduan Sunnah",
  "tips-umroh": "Tips Umroh",
  "berita-tanah-suci": "Berita Tanah Suci",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const params = await searchParams;
  const payload = await getPayloadClient();

  const where: Record<string, unknown> = {};
  if (params.cat) where.category = { equals: params.cat };

  const result = await payload.find({
    collection: "posts",
    where: where as never,
    sort: "-date",
    limit: 20,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-pine-950 text-cream-100 py-16 lg:py-20 bg-hero-pattern">
        <div className="relative mx-auto max-w-6xl px-4 lg:px-6 text-center">
          <FadeIn delay={0.05} distance={15}>
            <span className="inline-block rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-bold tracking-widest text-gold-300 uppercase">
              Catatan Perjalanan
            </span>
          </FadeIn>
          <FadeIn delay={0.15} distance={20}>
            <h1 className="mt-4 font-head text-3xl font-bold text-cream-100 md:text-5xl leading-tight">
              Edukasi &amp; <em className="font-head italic text-gold-400">Bekal Ibadah</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.25} distance={20}>
            <p className="mx-auto mt-4 text-sm md:text-base text-cream-200/80 max-w-2xl leading-relaxed">
              Artikel edukatif tentang panduan umrah, tips persiapan fisik, dan informasi seputar Tanah Suci.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-cream-50 border-b border-cream-200 py-5">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-ink-400 uppercase tracking-wider mr-1">Kategori:</span>
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              !params.cat
                ? "bg-pine-950 text-gold-400 shadow-xs"
                : "bg-cream-200/70 text-ink-700 hover:bg-cream-200"
            }`}
          >
            Semua
          </Link>
          {Object.entries(CAT_MAP).map(([key, label]) => (
            <Link
              key={key}
              href={params.cat === key ? "/blog" : `/blog?cat=${key}`}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                params.cat === key
                  ? "bg-pine-950 text-gold-400 shadow-xs"
                  : "bg-cream-200/70 text-ink-700 hover:bg-cream-200"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Blog Cards */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {result.docs.map((post) => (
              <StaggerItem key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-cream-200 bg-white overflow-hidden shadow-xs hover:border-gold-300 hover:shadow-md transition-all duration-300 h-full hover:-translate-y-1"
                >
                  <div>
                    <div className="h-44 bg-gradient-to-br from-pine-900 to-pine-950 flex items-center justify-center relative overflow-hidden">
                      <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-300">
                        {post.category === "panduan-sunnah" ? "📖" : post.category === "berita-tanah-suci" ? "🕌" : "✈️"}
                      </span>
                      <span className="absolute top-3 left-3 bg-pine-950/80 backdrop-blur-xs border border-gold-400/30 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {post.category?.replace(/-/g, " ")}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-[11px] text-ink-400 mb-2.5 font-medium">
                        <span>{formatDate(String(post.date))}</span>
                        <span>·</span>
                        <span>{post.readTime} min baca</span>
                      </div>
                      <h3 className="font-head text-lg font-bold text-pine-950 group-hover:text-gold-600 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-ink-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-cream-200/60 flex items-center justify-between text-xs font-semibold text-pine-700 group-hover:text-gold-600 transition-colors">
                    <span>{post.author}</span>
                    <span className="border-b border-transparent group-hover:border-gold-500 pb-0.5">Baca selengkapnya →</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
