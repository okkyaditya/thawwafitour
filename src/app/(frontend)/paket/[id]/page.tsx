import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Hotel, Luggage, TrainFront, TreePalm, X } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion/MotionWrapper";
import { getCoverImageUrl } from "@/lib/packageUtils";
import type { Metadata } from "next";

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function starRating(n: number) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

/* ── Kartu hotel dengan ikon ── */
function HotelCard({ label, name, stars, distance, landmark }: { label: string; name: string; stars: number; distance: string; landmark: string }) {
  return (
    <div className="rounded-2xl bg-white border border-cream-200 p-5 shadow-xs">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-2.5 py-0.5 rounded-md border border-gold-200/50">{label}</span>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
          <Hotel className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-head text-base font-bold text-pine-950">{name}</p>
          <p className="text-xs font-semibold text-gold-600">{starRating(stars)}</p>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-500">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
        {distance} dari {landmark}
      </p>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const payload = await getPayloadClient();
  try {
    const p = await payload.findByID({ collection: "packages", id, depth: 0 });
    const title = p?.name || `Paket Umroh ${id}`;
    const description = `Detail paket ${title}: harga, jadwal keberangkatan, hotel, maskapai, dan fasilitas.`;
    return {
      title,
      description,
      alternates: { canonical: `/paket/${id}` },
      openGraph: {
        title,
        description: `Paket ${title} — informasi lengkap harga, tanggal, dan fasilitas.`,
        url: `/paket/${id}`,
        type: "website",
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
      collection: "packages",
      limit: 100,
    });
    return result.docs.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

export default async function PaketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayloadClient();

  let result;
  try {
    result = await payload.findByID({
      collection: "packages",
      id,
      depth: 1,
    });
  } catch {
    notFound();
  }

  if (!result) notFound();

  const p = result;
  const itinerary = (p.itinerary as Array<Record<string, string>> | undefined) ?? [];
  const included = (p.included as Array<Record<string, string>> | undefined) ?? [];
  const excluded = (p.excluded as Array<Record<string, string>> | undefined) ?? [];
  const ustadz = p.ustadz && typeof p.ustadz === "object" ? p.ustadz : null;

  const coverUrl = getCoverImageUrl(p.coverImage, p.coverImageUrl);

  const waText = encodeURIComponent(
    `Bismillah. Assalamu'alaikum Thawwafi Tour. Saya tertarik dengan ${p.name} (${formatDate(String(p.departDate))}). Mohon informasinya. Terima kasih.`
  );

  const isSoldOut = p.status === "soldout" || p.seatsLeft <= 0;

  const offerPrice = typeof p.price === "number" ? p.price : 0;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.tagline,
    image: coverUrl || undefined,
    offers: {
      "@type": "Offer",
      price: offerPrice,
      priceCurrency: "IDR",
      availability: isSoldOut
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      url: `https://thawwafi.com/paket/${id}`,
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: "https://thawwafi.com/" },
      { "@type": "ListItem", position: 2, name: "Paket Umroh", item: "https://thawwafi.com/paket" },
      { "@type": "ListItem", position: 3, name: p.name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [productSchema, breadcrumbSchema] }) }} />
      {/* Breadcrumb */}
      <div className="bg-cream-50 border-b border-cream-200 py-3.5">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 flex items-center gap-2 text-xs text-ink-500">
          <Link href="/" className="hover:text-pine-950 transition-colors">Beranda</Link>
          <ChevronRight className="h-3.5 w-3.5 text-ink-400" />
          <Link href="/paket" className="hover:text-pine-950 transition-colors">Paket Umroh</Link>
          <ChevronRight className="h-3.5 w-3.5 text-ink-400" />
          <span className="text-pine-950 font-semibold truncate">{p.name}</span>
        </div>
      </div>

      {/* Header */}
      <section className="relative overflow-hidden bg-pine-950 text-cream-100 py-14 lg:py-20 bg-hero-pattern">
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={p.name}
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-cover object-center opacity-30"
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/70 to-pine-950/80"
        />
        <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
          <FadeIn delay={0.05} distance={15}>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="rounded-full bg-gold-400/20 border border-gold-400/40 px-3 py-1 text-xs font-bold text-gold-300 uppercase tracking-wide">
                {p.category}
              </span>
              {isSoldOut ? (
                <span className="rounded-full bg-danger/20 border border-danger/30 px-3 py-1 text-xs font-bold text-danger uppercase">Sold Out</span>
              ) : p.badge === "limited" ? (
                <span className="rounded-full bg-orange/20 border border-orange/30 px-3 py-1 text-xs font-bold text-orange uppercase">Limited Seat</span>
              ) : p.badge === "promo" ? (
                <span className="rounded-full bg-gold-400/20 border border-gold-400/30 px-3 py-1 text-xs font-bold text-gold-300 uppercase">Promo</span>
              ) : (
                <span className="rounded-full bg-success/20 border border-success/30 px-3 py-1 text-xs font-bold text-success uppercase">Tersedia</span>
              )}
            </div>
          </FadeIn>
          <FadeIn delay={0.15} distance={20}>
            <h1 className="font-head text-3xl font-bold text-cream-100 md:text-5xl leading-tight">{p.name}</h1>
          </FadeIn>
          <FadeIn delay={0.25} distance={20}>
            <p className="mt-3 text-sm md:text-base text-cream-200/80 max-w-2xl leading-relaxed">{p.tagline}</p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left: main content */}
          <div>
            {/* Quick specs */}
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <StaggerItem className="rounded-2xl bg-white border border-cream-200 p-4 sm:p-5 text-center shadow-xs">
                <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider">Keberangkatan</span>
                <p className="mt-1.5 font-head text-base sm:text-lg font-bold text-pine-950">{formatDate(String(p.departDate))}</p>
              </StaggerItem>
              <StaggerItem className="rounded-2xl bg-white border border-cream-200 p-4 sm:p-5 text-center shadow-xs">
                <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider">Durasi</span>
                <p className="mt-1.5 font-head text-base sm:text-lg font-bold text-pine-950">{p.duration}</p>
              </StaggerItem>
              <StaggerItem className="rounded-2xl bg-white border border-cream-200 p-4 sm:p-5 text-center shadow-xs">
                <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider">Maskapai</span>
                <p className="mt-1.5 font-head text-base sm:text-lg font-bold text-pine-950">{p.airline}</p>
              </StaggerItem>
              <StaggerItem className="rounded-2xl bg-white border border-cream-200 p-4 sm:p-5 text-center shadow-xs">
                <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider">Seat Tersedia</span>
                <p className="mt-1.5 font-head text-base sm:text-lg font-bold text-pine-950">{p.seatsLeft}/{p.seatsTotal}</p>
              </StaggerItem>
            </StaggerContainer>

            {/* Detail specs */}
            <FadeIn className="mb-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <HotelCard
                  label="Hotel Makkah"
                  name={p.hotelMakkahName}
                  stars={Number(p.hotelMakkahStars)}
                  distance={p.hotelMakkahDistance}
                  landmark="Masjidil Haram"
                />
                <HotelCard
                  label="Hotel Madinah"
                  name={p.hotelMadinahName}
                  stars={Number(p.hotelMadinahStars)}
                  distance={p.hotelMadinahDistance}
                  landmark="Masjid Nabawi"
                />
              </div>

              {/* Include chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { ok: p.haramain, label: "Kereta Cepat", icon: TrainFront, off: "Bus full AC" },
                  { ok: p.thaif, label: "Thaif Tour", icon: TreePalm, off: "Tanpa Thaif" },
                  { ok: true, label: "Koper & Perlengkapan", icon: Luggage, off: "" },
                ].map((f) => (
                  <span
                    key={f.label}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold ${
                      f.ok
                        ? "bg-success-bg text-success border border-success/20"
                        : "bg-cream-100 text-ink-400 border border-cream-200"
                    }`}
                  >
                    <f.icon className="h-3.5 w-3.5" />
                    {f.label}
                    {f.ok ? ": Include" : f.off ? `: ${f.off}` : ""}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success-bg px-4 py-1.5 text-xs font-semibold text-success">
                  <Check className="h-3.5 w-3.5" />
                  {p.visa || "Visa Umrah"} + Manasik
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-ink-700 rounded-2xl bg-white border border-cream-200 p-6 shadow-xs">
                <p><strong className="text-pine-950">Penerbangan:</strong> {p.flight || p.airline}</p>
                <p><strong className="text-pine-950">Jarak Hotel – Ka&apos;bah:</strong> {p.hotelMakkahDistance}</p>
                <p><strong className="text-pine-950">Visa &amp; Manasik:</strong> {p.visa || "Visa Umrah"} + bimbingan manasik sunnah</p>
              </div>
            </FadeIn>

            {/* Itinerary */}
            {itinerary.length > 0 && (
              <FadeIn className="mb-10 rounded-2xl bg-white border border-cream-200 p-6 sm:p-8 shadow-xs">
                <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Agenda Harian</span>
                <h2 className="mt-1 font-head text-2xl font-bold text-pine-950 mb-8">Itinerary Perjalanan</h2>
                <div className="relative border-l-2 border-gold-300 ml-4 space-y-7">
                  {itinerary.map((item, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-gold-400 bg-cream-50" />
                      <span className="text-[11px] font-bold text-gold-600 uppercase tracking-wide bg-gold-50 px-2 py-0.5 rounded border border-gold-200/40">{item.day}</span>
                      <h3 className="mt-1.5 font-head text-base font-bold text-pine-950">{item.title}</h3>
                      <p className="mt-1 text-sm text-ink-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Include / Exclude */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {included.length > 0 && (
                <FadeIn direction="left" className="rounded-2xl bg-success-bg border border-success/20 p-6 shadow-xs">
                  <h3 className="font-head text-lg font-bold text-pine-950 mb-4">Termasuk dalam Paket</h3>
                  <ul className="space-y-2.5">
                    {included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <Check className="mt-0.5 h-4 w-4 text-success shrink-0" />
                        <span>{item.item}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              )}
              {excluded.length > 0 && (
                <FadeIn direction="right" className="rounded-2xl bg-danger-bg border border-danger/20 p-6 shadow-xs">
                  <h3 className="font-head text-lg font-bold text-pine-950 mb-4">Tidak Termasuk</h3>
                  <ul className="space-y-2.5">
                    {excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <X className="mt-0.5 h-4 w-4 text-danger shrink-0" />
                        <span>{item.item}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              )}
            </div>

            {/* Ustadz */}
            {ustadz && (
              <FadeIn className="rounded-2xl bg-sage/60 border border-cream-200 p-6 sm:p-8 shadow-xs">
                <span className="text-xs font-bold tracking-widest text-gold-600 uppercase">Pembimbing Ibadah</span>
                <div className="mt-4 flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pine-950 text-gold-400 font-head text-xl font-bold shadow-xs">
                    {(ustadz as unknown as Record<string, string>).initials}
                  </div>
                  <div>
                    <p className="font-head text-xl font-bold text-pine-950">{(ustadz as unknown as Record<string, string>).name}</p>
                    <p className="text-xs font-bold text-gold-600 uppercase tracking-wide mt-0.5">{(ustadz as unknown as Record<string, string>).role}</p>
                    <p className="mt-1.5 text-sm text-ink-600">{(ustadz as unknown as Record<string, string>).focus}</p>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Right: sticky booking card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ScaleIn className="rounded-2xl bg-white border border-cream-200 p-6 sm:p-8 shadow-md">
              <span className="text-[11px] font-bold text-gold-600 uppercase tracking-wider bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200/50">Harga Paket</span>
              <p className="mt-3 font-head text-3xl font-bold text-pine-950 leading-tight">{formatIDR(p.price)}</p>
              <span className="mt-1 block text-xs text-ink-400">{p.priceNote || "harga per orang, twin share"}</span>

              {p.promoLabel && (
                <div className="mt-4 rounded-xl bg-gold-100/70 border border-gold-300/60 p-3.5 text-xs text-gold-700 font-semibold">
                  ✦ {p.promoLabel}
                </div>
              )}

              <div className="mt-6 space-y-2.5 text-xs text-ink-600 border-t border-cream-200 pt-5">
                <p className="flex justify-between"><span>📅 Keberangkatan:</span> <strong className="text-pine-950">{formatDate(String(p.departDate))}</strong></p>
                <p className="flex justify-between"><span>⏱ Durasi:</span> <strong className="text-pine-950">{p.duration}</strong></p>
                <p className="flex justify-between"><span>✈ Maskapai:</span> <strong className="text-pine-950">{p.airline}</strong></p>
                <p className="flex justify-between"><span>👥 Kuota Seat:</span> <strong className="text-pine-950">{p.seatsLeft} tersisa dari {p.seatsTotal}</strong></p>
              </div>

              {isSoldOut ? (
                <p className="mt-6 text-center text-sm font-bold text-danger py-3 rounded-xl bg-danger/10">Sold Out</p>
              ) : (
                <a
                  href={`https://wa.me/6285121008442?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#1fb855] shadow-md transition-all w-full hover:scale-105 active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Tanya via WhatsApp
                </a>
              )}
            </ScaleIn>
          </div>
        </div>
      </section>
    </>
  );
}
