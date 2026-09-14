import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { Package } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion/MotionWrapper";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function LegacyContentBlock({ block }: { block: Record<string, unknown> }) {
  switch (block.blockType) {
    case "paragraph":
      return <p className="text-ink-700 leading-relaxed mb-5 text-sm sm:text-base">{String(block.text)}</p>;
    case "heading":
      return <h2 className="font-head text-xl sm:text-2xl font-bold text-pine-950 mt-10 mb-4">{String(block.text)}</h2>;
    case "callout":
      return (
        <div className="rounded-2xl bg-gold-100/70 border border-gold-300/60 p-5 my-8 text-sm text-ink-800 leading-relaxed shadow-xs">
          <strong className="text-gold-700 font-bold block mb-1">📌 Catatan Penting:</strong> {String(block.text)}
        </div>
      );
    case "list":
      return (
        <ul className="list-disc pl-6 space-y-2 mb-6 text-sm sm:text-base text-ink-700">
          {((block.items as Array<Record<string, string>>) ?? []).map((item, i) => (
            <li key={i}>{item.text}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayloadClient();
  try {
    const result = await payload.find({ collection: "posts", where: { slug: { equals: slug } }, limit: 1, depth: 0 });
    if (result.docs.length === 0) return {};
    const post = result.docs[0];
    const title = (post.metaTitle as string) || (post.title as string);
    const description = (post.metaDescription as string) || (post.excerpt as string) || "";
    return {
      title,
      description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        title,
        description,
        url: `/blog/${slug}`,
        type: "article",
        publishedTime: post.date as string,
        authors: [post.author as string],
      },
      twitter: { title, description },
    };
  } catch {
    return {};
  }
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      limit: 100,
    });
    return result.docs.map((post) => ({ slug: String(post.slug) }));
  } catch {
    return [];
  }
}

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });

  if (result.docs.length === 0) notFound();

  const post = result.docs[0];

  // Related packages
  const relatedCats = (post.relatedCategories as string[] | undefined) ?? [];
  let relatedPkgs: Package[] = [];
  if (relatedCats.length > 0) {
    const pkgResult = await payload.find({
      collection: "packages",
      where: { category: { in: relatedCats }, status: { equals: "active" } },
      limit: 3,
    });
    relatedPkgs = pkgResult.docs;
  }

  // Determine content format
  const rawContent = post.content as Record<string, unknown> | Array<Record<string, unknown>> | undefined;
  const isLexical = rawContent && typeof rawContent === "object" && !Array.isArray(rawContent) && "root" in rawContent;
  const isLegacyBlocks = Array.isArray(rawContent) && rawContent[0] && "block" in rawContent[0];
  const legacyBlocks = isLegacyBlocks ? ((rawContent[0] as { block: Array<Record<string, unknown>> }).block ?? []) : [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title as string,
    datePublished: post.date as string,
    dateModified: (post.updatedAt as string) || (post.date as string),
    author: [{ "@type": "Person", name: post.author as string }],
    publisher: { "@id": "https://thawwafi.com/#organization" },
    url: `https://thawwafi.com/blog/${slug}`,
    inLanguage: "id-ID",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: "https://thawwafi.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://thawwafi.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title as string },
    ],
  };
  const graph = [articleSchema, breadcrumbSchema];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />
      {/* Breadcrumb */}
      <div className="bg-cream-50 border-b border-cream-200 py-3.5">
        <div className="mx-auto max-w-4xl px-4 lg:px-6 flex items-center gap-2 text-xs text-ink-500">
          <Link href="/" className="hover:text-pine-950 transition-colors">Beranda</Link>
          <ChevronRight className="h-3.5 w-3.5 text-ink-400" />
          <Link href="/blog" className="hover:text-pine-950 transition-colors">Blog</Link>
          <ChevronRight className="h-3.5 w-3.5 text-ink-400" />
          <span className="text-pine-950 font-semibold truncate">{post.title}</span>
        </div>
      </div>

      {/* Header */}
      <section className="relative overflow-hidden bg-pine-950 text-cream-100 py-14 lg:py-18 bg-hero-pattern">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <FadeIn delay={0.05} distance={15}>
            <span className="inline-block rounded-full bg-gold-400/20 border border-gold-400/30 px-3.5 py-1 text-xs font-bold text-gold-300 uppercase tracking-wide mb-4">
              {post.category?.replace(/-/g, " ")}
            </span>
          </FadeIn>
          <FadeIn delay={0.15} distance={20}>
            <h1 className="font-head text-3xl font-bold text-cream-100 md:text-5xl leading-tight">{post.title}</h1>
          </FadeIn>
          <FadeIn delay={0.25} distance={15}>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-cream-200/70">
              <span>📅 {formatDate(String(post.date))}</span>
              <span>·</span>
              <span>oleh {post.author}</span>
              <span>·</span>
              <span>⏱ {post.readTime} menit baca</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Article Content */}
      <article className="bg-cream-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <FadeIn className="rounded-2xl bg-white border border-cream-200 p-6 sm:p-10 shadow-xs">
            {isLexical ? (
              <RichText data={post.content as never} className="rich-text-content" />
            ) : isLegacyBlocks ? (
              legacyBlocks.map((block, i) => <LegacyContentBlock key={i} block={block} />)
            ) : typeof post.content === "string" ? (
              <p className="text-ink-700 leading-relaxed">{post.content}</p>
            ) : (
              <p className="text-ink-500 italic">Konten artikel belum tersedia.</p>
            )}
          </FadeIn>

          {/* Related packages */}
          {relatedPkgs.length > 0 && (
            <FadeIn className="mt-12 rounded-2xl bg-white border border-cream-200 p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Rekomendasi Terkait</span>
              <h3 className="mt-1 font-head text-xl font-bold text-pine-950 mb-6">Paket Umroh untuk Anda</h3>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPkgs.map((p) => (
                  <StaggerItem key={p.id}>
                    <Link
                      href={`/paket/${p.id}`}
                      className="group block rounded-xl border border-cream-200 bg-cream-50/50 p-5 hover:bg-white hover:border-gold-300 hover:shadow-md transition-all duration-300 h-full hover:-translate-y-1"
                    >
                      <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider bg-gold-100/60 px-2 py-0.5 rounded">{p.category}</span>
                      <h4 className="mt-2 font-head text-base font-bold text-pine-950 group-hover:text-gold-600 transition-colors">{p.name}</h4>
                      <p className="mt-2 text-sm font-semibold text-pine-950">{formatIDR(p.price)}</p>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          )}

          {/* CTA */}
          <ScaleIn className="mt-10 rounded-2xl bg-pine-950 p-8 sm:p-10 text-center text-cream-100 shadow-md bg-hero-pattern relative overflow-hidden">
            <span className="inline-block rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-bold tracking-widest text-gold-300 uppercase">
              Konsultasi Ibadah
            </span>
            <h3 className="mt-3 font-head text-2xl font-bold md:text-3xl">Butuh Pendampingan Ibadah?</h3>
            <p className="mt-2 text-sm text-cream-200/70 max-w-lg mx-auto leading-relaxed">
              Konsultasikan rencana keberangkatan umrah keluarga Anda dengan tim Thawwafi Tour secara gratis dan transparan.
            </p>
            <a
              href="https://wa.me/6285121008442?text=Bismillah.%20Assalamu%27alaikum%20Thawwafi%20Tour.%20Saya%20membaca%20artikel%20di%20blog%20Anda%20dan%20ingin%20berkonsultasi.%20Mohon%20informasinya.%20Terima%20kasih."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-semibold text-white hover:bg-[#1fb855] shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              Konsultasi via WhatsApp
            </a>
          </ScaleIn>
        </div>
      </article>
    </>
  );
}
