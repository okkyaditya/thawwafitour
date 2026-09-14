import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";
import { CoverArt } from "@/components/CoverArt";
import { getCoverImageUrl } from "@/lib/packageUtils";
import BadgeClient from "@/components/BadgeClient";

export const metadata: Metadata = {
  title: "Paket Umroh — Ruby, Sapphire, Diamond",
  description: "Katalog paket umroh Thawwafi Tour: Ruby, Sapphire, Diamond dengan transparansi hotel, maskapai, dan jadwal keberangkatan.",
  alternates: { canonical: "/paket" },
  openGraph: { title: "Paket Umroh Thawwafi Tour", description: "Katalog paket umroh dengan informasi harga, hotel, maskapai, dan jadwal.", url: "/paket", type: "website" },
};

export const revalidate = 60;

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function SeatBadge({ total, left }: { total: number; left: number }) {
  if (left <= 0) return <span className="text-xs font-bold text-danger">Sold Out</span>;
  const pct = Math.round((left / total) * 100);
  if (pct <= 20) {
    return <span className="text-xs font-bold text-orange">Sisa {left} seat ({pct}%)</span>;
  }
  return <span className="text-xs text-ink-400">Sisa {left} dari {total} seat</span>;
}

export default async function PaketPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; bulan?: string }>;
}) {
  const params = await searchParams;
  const payload = await getPayloadClient();

  const where: Record<string, unknown> = { status: { equals: "active" } };
  if (params.cat) where.category = { equals: params.cat };

  const result = await payload.find({
    collection: "packages",
    where: where as never,
    sort: "departDate",
    limit: 20,
  });

  // Filter by month if specified
  let packages = result.docs;
  if (params.bulan) {
    packages = packages.filter((p) => String(p.departDate).startsWith(params.bulan!));
  }

  // Get available months
  const allPkgs = (await payload.find({ collection: "packages", where: { status: { equals: "active" } }, sort: "departDate" })).docs;
  const months = [...new Set(allPkgs.map((p) => String(p.departDate).slice(0, 7)))].sort();

  const cats = ["ruby", "sapphire", "diamond"];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-pine-950 text-cream-100 py-16 lg:py-20 bg-hero-pattern">
        <div className="relative mx-auto max-w-6xl px-4 lg:px-6 text-center">
          <FadeIn delay={0.05} distance={15}>
            <span className="inline-block rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-bold tracking-widest text-gold-300 uppercase">
              Pilihan Perjalanan
            </span>
          </FadeIn>
          <FadeIn delay={0.15} distance={20}>
            <h1 className="mt-4 font-head text-3xl font-bold text-cream-100 md:text-5xl leading-tight">
              Katalog Paket <em className="font-head italic text-gold-400">Umroh</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.25} distance={20}>
            <p className="mx-auto mt-4 text-sm md:text-base text-cream-200/70 max-w-2xl leading-relaxed">
              Setiap paket transparan hingga detail hotel, maskapai, dan jadwal harian. Temukan perjalanan yang paling sesuai untuk keluarga Anda.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-cream-50 border-b border-cream-200 py-5">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-ink-400 uppercase tracking-wider mr-1">Kategori:</span>
            <Link
              href="/paket"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                !params.cat
                  ? "bg-pine-950 text-gold-400 shadow-xs"
                  : "bg-cream-200/70 text-ink-700 hover:bg-cream-200"
              }`}
            >
              Semua
            </Link>
            {cats.map((c) => (
              <Link
                key={c}
                href={params.cat === c ? "/paket" : `/paket?cat=${c}${params.bulan ? `&bulan=${params.bulan}` : ""}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  params.cat === c
                    ? "bg-pine-950 text-gold-400 shadow-xs"
                    : "bg-cream-200/70 text-ink-700 hover:bg-cream-200"
                }`}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </Link>
            ))}
          </div>

          {months.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-ink-400 uppercase tracking-wider mr-1">Bulan:</span>
              {months.map((m) => (
                <Link
                  key={m}
                  href={params.bulan === m ? `/paket${params.cat ? `?cat=${params.cat}` : ""}` : `/paket?bulan=${m}${params.cat ? `&cat=${params.cat}` : ""}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    params.bulan === m
                      ? "bg-pine-950 text-gold-400 shadow-xs"
                      : "bg-cream-200/70 text-ink-700 hover:bg-cream-200"
                  }`}
                >
                  {new Date(m + "-01").toLocaleDateString("id-ID", { month: "short", year: "numeric" })}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Package grid */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          {packages.length === 0 ? (
            <FadeIn className="text-center py-20 rounded-2xl bg-white border border-cream-200 p-8">
              <p className="text-ink-500 font-medium">Tidak ada paket ditemukan untuk filter ini.</p>
              <Link href="/paket" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pine-700 hover:text-gold-600">
                Lihat semua paket <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeIn>
          ) : (
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => {
                const coverUrl = getCoverImageUrl(p.coverImage, p.coverImageUrl);

                return (
                  <StaggerItem key={p.id}>
                    <Link
                      href={`/paket/${p.id}`}
                      className="group flex flex-col justify-between rounded-2xl border border-cream-200 bg-white overflow-hidden shadow-xs hover:border-gold-300 hover:shadow-md transition-all duration-300 h-full hover:-translate-y-1"
                    >
                      {/* Card Cover Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-pine-950">
                        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                          {coverUrl ? (
                            <Image
                              src={coverUrl}
                              alt={p.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <CoverArt category={p.category} />
                          )}
                        </div>
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="text-xs font-bold text-gold-400 uppercase tracking-wider bg-pine-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-gold-500/30">
                            {p.category}
                          </span>
                        </div>
                        {p.badge && p.badge !== "none" && (
                          <div className="absolute top-3 right-3">
                            <BadgeClient type={p.badge} />
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-head text-xl font-bold text-pine-950 group-hover:text-gold-600 transition-colors leading-snug">
                            {p.name}
                          </h3>
                          <p className="mt-1.5 text-xs text-ink-400 font-medium">{formatDate(String(p.departDate))} · {p.duration}</p>

                          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-ink-600 border-t border-cream-200 pt-4">
                            <div>
                              <p className="text-[11px] text-ink-400 mb-0.5">Keberangkatan</p>
                              <p className="text-[13px] font-semibold text-pine-950">{formatDate(String(p.departDate))}</p>
                            </div>
                            <div>
                              <p className="text-[11px] text-ink-400 mb-0.5">Maskapai</p>
                              <p className="text-[13px] font-semibold text-pine-950 truncate" title={p.airline}>{p.airline}</p>
                            </div>
                            <div>
                              <p className="text-[11px] text-ink-400 mb-0.5">Hotel Makkah</p>
                              <p className="text-[13px] font-semibold text-pine-950 truncate" title={p.hotelMakkahName || `Bintang ${p.hotelMakkahStars}`}>
                                {p.hotelMakkahName || `Bintang ${p.hotelMakkahStars}`}
                              </p>
                            </div>
                            <div>
                              <p className="text-[11px] text-ink-400 mb-0.5">Hotel Madinah</p>
                              <p className="text-[13px] font-semibold text-pine-950 truncate" title={p.hotelMadinahName || `Bintang ${p.hotelMadinahStars}`}>
                                {p.hotelMadinahName || `Bintang ${p.hotelMadinahStars}`}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-cream-200 flex items-end justify-between">
                          <div>
                            <span className="text-[11px] text-ink-400">Mulai dari</span>
                            <p className="font-head text-2xl font-bold text-pine-950">{formatIDR(p.price)}</p>
                          </div>
                          <SeatBadge total={p.seatsTotal} left={p.seatsLeft} />
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}
