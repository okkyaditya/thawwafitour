import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Gem,
  Globe,
  Hotel,
  Plane,
  Shield,
  ShieldCheck,
  Star,
  TrainFront,
  Users,
  Utensils,
} from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import PackageCarousel from "@/components/PackageCarousel";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import PartnerGrid from "@/components/PartnerGrid";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion/MotionWrapper";

export const revalidate = 60;

const FACILITIES_DATA = [
  {
    icon: Hotel,
    category: "Akomodasi",
    title: "Hotel Dekat Masjid",
    desc: "Bintang 3–5 di Makkah & Madinah dengan jarak transparan ke pelataran.",
  },
  {
    icon: Plane,
    category: "Penerbangan",
    title: "Maskapai Terbaik",
    desc: "Menggunakan rute penerbangan langsung / transit yang nyaman.",
  },
  {
    icon: TrainFront,
    category: "Transportasi",
    title: "Kereta Cepat Haramain",
    desc: "Makkah–Madinah hanya ± 2 jam, hemat tenaga & istirahat maksimal.",
  },
  {
    icon: BookOpen,
    category: "Bimbingan",
    title: "Manasik Sesuai Sunnah",
    desc: "Dibimbing asatidzah kompeten sebelum & selama ibadah di Tanah Suci.",
  },
  {
    icon: Globe,
    category: "Ziarah",
    title: "City Tour & Ziarah",
    desc: "Kunjungan edukasi sejarah di Makkah, Madinah, hingga keindahan Thaif.",
  },
  {
    icon: ShieldCheck,
    category: "Legalitas",
    title: "Izin PPIU Kemenag",
    desc: "PT Noor Barkatul Haromain — Nomor PPIU 12690001206830002.",
  },
  {
    icon: Users,
    category: "Pelayanan",
    title: "Muthawwif Berpengalaman",
    desc: "Pendampingan ramah, bersahabat dan perhatian khusus lansia & keluarga.",
  },
  {
    icon: Utensils,
    category: "Konsumsi",
    title: "Konsumsi Full Board",
    desc: "Makanan higienis, lezat dan terjamin halal.",
  },
];

async function HomeContent() {
  const payload = await getPayloadClient();

  const [allResult, postsResult, testimonialsResult] = await Promise.all([
    payload.find({ collection: "packages", where: { status: { equals: "active" } }, sort: "departDate", limit: 20 }),
    payload.find({ collection: "posts", sort: "-date", limit: 4 }),
    payload.find({ collection: "testimonials", sort: "-createdAt", limit: 20 }),
  ]);

  const allActive = allResult.docs;
  const posts = postsResult.docs;
  const testimonials = testimonialsResult.docs;

  // Split first post as featured, rest as list
  const blogFeat = posts[0];
  const blogSide = posts.slice(1, 4);

  function splitTitle(title: string) {
    const words = title.split(" ");
    if (words.length < 3) return null;
    const cut = Math.ceil(words.length / 2);
    return { first: words.slice(0, cut).join(" "), rest: words.slice(cut).join(" ") };
  }

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-pine-950 text-cream-100 py-20 lg:py-28">
        {/* Background image: Ka'bah, dengan overlay gradient pine agar teks tetap terbaca */}
        <Image
          src="/img/kaaba-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pine-950/80 via-pine-950/55 to-pine-950/90"
        />
        <div className="relative mx-auto max-w-6xl px-4 lg:px-6 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <FadeIn delay={0.05} distance={16}>
              <span className="inline-block rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-bold tracking-widest text-gold-300 uppercase">
                Umrah &amp; Haji Sesuai Sunnah
              </span>
            </FadeIn>
            <FadeIn delay={0.15} distance={20}>
              <h1 className="mt-6 font-head text-4xl font-bold leading-[1.15] md:text-6xl">
                The journey of your{" "}
                <em className="font-head italic text-gold-400">dream</em> in Sunnah.
              </h1>
            </FadeIn>
            <FadeIn delay={0.25} distance={20}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream-200/80">
                Ibadah umrah yang menenangkan, amanah, dan sesuai tuntunan Nabi ﷺ — dibimbing asatidzah
                berpengalaman, dengan fasilitas hotel dan maskapai terbaik serta legalitas resmi.
              </p>
            </FadeIn>
            <FadeIn delay={0.35} distance={16}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/#paket"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-pine-950 shadow-lg shadow-gold-500/20 transition-all hover:bg-gold-400 hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Lihat Paket Umroh
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.45} distance={14}>
              <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-cream-200/60">
                <span className="inline-flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gold-400" /> PPIU Resmi
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-gold-400" /> Jamaah Reguler &amp; Corporate
                </span>
                <span className="inline-flex items-center gap-2">
                  <Star className="h-4 w-4 text-gold-400" /> Testimoni Jamaah
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ MENGAPA THAWWAFI ═══ */}
      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 lg:-mt-12 lg:px-6">
        <StaggerContainer className="grid gap-6 rounded-2xl border border-cream-200 bg-white p-6 sm:p-8 shadow-xl shadow-pine-950/5 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Sesuai Sunnah",
              desc: "Dibimbing sesuai tuntunan Nabi ﷺ.",
            },
            {
              icon: Gem,
              title: "Paket Terbaik",
              desc: "Hotel dekat masjid & Fasilitas Terbaik",
            },
            {
              icon: ShieldCheck,
              title: "Pelayanan Amanah",
              desc: "Pelayanan Sepenuh Hati Menjaga Jamaah.",
            },
          ].map((item) => (
            <StaggerItem key={item.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-600 transition-transform duration-300 hover:scale-110">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-head text-base font-bold text-pine-950">{item.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══ FEATURED PACKAGES (carousel) ═══ */}
      <FadeIn distance={20}>
        <PackageCarousel packages={allActive.map((p) => ({
          id: String(p.id),
          name: p.name as string,
          category: p.category as string,
          departDate: String(p.departDate),
          duration: p.duration as string,
          airline: p.airline as string,
          hotelMakkahName: p.hotelMakkahName as string,
          hotelMakkahStars: String(p.hotelMakkahStars),
          hotelMakkahDistance: p.hotelMakkahDistance as string,
          hotelMadinahName: p.hotelMadinahName as string,
          hotelMadinahStars: String(p.hotelMadinahStars),
          hotelMadinahDistance: p.hotelMadinahDistance as string,
          haramain: p.haramain as boolean,
          thaif: p.thaif as boolean,
          price: p.price as number,
          badge: p.badge as string,
          tagline: p.tagline as string,
          seatsTotal: p.seatsTotal as number,
          seatsLeft: p.seatsLeft as number,
          coverImage: p.coverImage as { url?: string; alt?: string } | string | null | undefined,
          coverImageUrl: (p.coverImageUrl as string) || null,
        }))} />
      </FadeIn>

      {/* ═══ FASILITAS & KEUNGGULAN LAYANAN (Compact 8-card grid) ═══ */}
      <section id="fasilitas" className="scroll-mt-16 bg-cream-100/70 py-16 lg:py-20 border-y border-cream-200/80">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <FadeIn className="mb-12 flex flex-col items-center text-center">
            <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Fasilitas &amp; Keunggulan</span>
            <h2 className="mt-2 font-head text-3xl font-bold text-pine-950 md:text-4xl leading-tight">
              Fasilitas Lengkap untuk Ibadah <em className="text-gold-500 font-head italic">Khusyuk</em>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-ink-500 leading-relaxed">
              Kenyamanan dan kepastian fasilitas terbaik yang menyertai setiap langkah perjalanan ibadah Anda.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {FACILITIES_DATA.map((f) => (
              <StaggerItem
                key={f.title}
                className="group rounded-2xl border border-cream-200 bg-white p-5 shadow-xs hover:border-gold-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-600 group-hover:bg-pine-950 group-hover:text-gold-400 transition-colors">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 bg-gold-50 px-2.5 py-0.5 rounded-md border border-gold-200/50">
                      {f.category}
                    </span>
                  </div>
                  <h3 className="mt-3 font-head text-base font-bold text-pine-950 leading-snug">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-ink-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ TESTIMONI (scroll kesamping) ═══ */}
      {testimonials.length > 0 && (
        <FadeIn distance={20}>
          <TestimonialCarousel
            testimonials={testimonials.map((t) => ({
              id: t.id,
              name: t.name as string,
              role: t.role as string,
              text: t.text as string,
              initials: t.initials as string,
            }))}
            rating="Testimoni dari jamaah"
          />
        </FadeIn>
      )}

      {/* ═══ PARTNER KAMI (3x3 Grid Mode) ═══ */}
      <section className="bg-white py-16 lg:py-20 border-b border-cream-200">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <FadeIn className="mb-12 flex flex-col items-center text-center">
            <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Penyedia Layanan</span>
            <h2 className="mt-2 font-head text-3xl font-bold text-pine-950 md:text-4xl leading-tight">
              Penyedia Layanan yang Digunakan Sesuai Paket
            </h2>
            <p className="mt-3 max-w-xl text-sm text-ink-500 leading-relaxed">
              Maskapai, transportasi, dan layanan pendukung dapat berbeda sesuai detail masing-masing paket.
            </p>
          </FadeIn>

          <PartnerGrid />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-pine-950 text-cream-100 py-16 lg:py-20 bg-hero-pattern border-t border-cream-200/10 text-center">
        <div className="relative mx-auto max-w-2xl px-4 lg:px-6">
          <ScaleIn>
            <span className="inline-block rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-bold tracking-widest text-gold-300 uppercase">
              Konsultasi Ibadah
            </span>
            <h2 className="mt-4 font-head text-3xl font-bold md:text-4xl leading-tight">
              Siap Memulai Perjalanan Ibadah Anda?
            </h2>
            <p className="mt-3 text-sm text-cream-200/80 leading-relaxed">
              Tim konsultan kami siap menjawab pertanyaan Anda tentang paket, jadwal, kuota, dan prosedur pendaftaran dengan ramah dan amanah.
            </p>
            <a
              href="https://wa.me/6285121008442?text=Bismillah.%20Assalamu%27alaikum%20Thawwafi%20Tour.%20Saya%20ingin%20berkonsultasi%20mengenai%20paket%20umroh.%20Mohon%20informasinya.%20Terima%20kasih."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-[#1fb855] hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi via WhatsApp
            </a>
          </ScaleIn>
        </div>
      </section>

      {/* ═══ EDITORIAL BLOG ═══ */}
      {blogFeat && (
        <section className="bg-cream-50 py-16 lg:py-20 border-t border-cream-200/80">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <FadeIn className="mb-12 flex flex-col items-center text-center">
              <div>
                <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Catatan Perjalanan</span>
                <h2 className="mt-2 font-head text-3xl font-bold text-pine-950 md:text-4xl leading-tight">
                  Bekal sebelum <em className="text-gold-500 font-head italic">melangkah.</em>
                </h2>
                <p className="mt-3 max-w-lg text-sm text-ink-500 leading-relaxed mx-auto">
                  Panduan fiqih, tips persiapan fisik, dan kabar terkini seputar Tanah Suci dari asatidzah pembimbing.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10 items-stretch">
              {/* Featured article */}
              <StaggerItem>
                <Link
                  href={`/blog/${blogFeat.slug}`}
                  className="group grid sm:grid-cols-[0.9fr_1.1fr] min-h-[340px] rounded-2xl overflow-hidden bg-sage border border-cream-200/80 shadow-xs hover:shadow-md transition-all duration-300 h-full"
                >
                  <div className="bg-pine-950 flex items-center justify-center p-8">
                    <div className="text-gold-400 text-6xl font-head opacity-60 group-hover:scale-110 transition-transform">
                      {blogFeat.category === "panduan-sunnah" ? "📖" : blogFeat.category === "berita-tanah-suci" ? "🕌" : "✈️"}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-8 gap-4 bg-white">
                    <span className="text-[11px] font-bold tracking-widest text-gold-600 uppercase">{blogFeat.category?.replace(/-/g, " ")}</span>
                    <h3 className="font-head text-xl font-bold text-pine-950 group-hover:text-gold-600 transition-colors leading-snug">
                      {blogFeat.title}
                    </h3>
                    <p className="text-sm text-ink-500 leading-relaxed line-clamp-3">{blogFeat.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-pine-700 border-b-2 border-gold-500 pb-0.5 self-start group-hover:text-gold-600 transition-colors">
                      Baca artikel <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>

              {/* Side list */}
              <StaggerItem className="flex flex-col justify-center rounded-2xl bg-white border border-cream-200 p-6 sm:p-8 shadow-xs">
                {blogSide.map((post, i) => {
                  const split = splitTitle(post.title);
                  const titleHtml = split ? (
                    <>
                      {split.first}<br /><em className="text-gold-500">{split.rest}</em>
                    </>
                  ) : (
                    post.title
                  );
                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className={`group flex-1 flex flex-col justify-center py-5 ${i > 0 ? "border-t border-cream-200" : ""}`}
                    >
                      <span className="text-[11px] font-bold tracking-widest text-gold-600 uppercase">
                        {post.category?.replace(/-/g, " ")} · {post.readTime} MIN BACA
                      </span>
                      <h3 className="mt-2 font-head text-base font-bold text-pine-950 group-hover:text-gold-600 transition-colors leading-snug">
                        {titleHtml}
                      </h3>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-pine-700 border-b border-gold-500 pb-0.5 self-start group-hover:text-gold-600 transition-colors">
                        Baca <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  );
                })}
              </StaggerItem>
            </StaggerContainer>

            <FadeIn delay={0.2} className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-pine-800 bg-white px-6 py-3 text-sm font-semibold text-pine-950 shadow-xs hover:bg-pine-950 hover:text-gold-400 transition-all hover:scale-105 active:scale-95"
              >
                Lihat Semua Artikel <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}

export default function Home() {
  return <HomeContent />;
}
