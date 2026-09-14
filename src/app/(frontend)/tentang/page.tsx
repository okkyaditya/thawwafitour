"use client";

import { Shield, Moon, BookOpen, Phone, Mail, MapPin, Clock, Building2, FileCheck, MapPinned, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const storyImages = [
  { src: "/media/about1.png", alt: "Perjalanan ibadah umrah bersama Thawwafi Tour - Foto 1" },
  { src: "/media/about2.png", alt: "Perjalanan ibadah umrah bersama Thawwafi Tour - Foto 2" },
  { src: "/media/about3.jpg", alt: "Perjalanan ibadah umrah bersama Thawwafi Tour - Foto 3" },
];

function AboutImageSlider() {
  const [[page, direction], setPage] = useState([0, 0]);

  const currentIndex = ((page % storyImages.length) + storyImages.length) % storyImages.length;

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-cream-200 group bg-pine-950 select-none">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -10000 || offset.x < -50) {
              paginate(1);
            } else if (swipe > 10000 || offset.x > 50) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={storyImages[currentIndex].src}
            alt={storyImages[currentIndex].alt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-center pointer-events-none"
            priority={currentIndex === 0}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-pine-950/70 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        type="button"
        onClick={() => paginate(-1)}
        aria-label="Foto Sebelumnya"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-pine-950/50 text-white backdrop-blur-xs transition-all hover:bg-pine-950/80 hover:scale-110 active:scale-95 border border-white/20"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => paginate(1)}
        aria-label="Foto Selanjutnya"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-pine-950/50 text-white backdrop-blur-xs transition-all hover:bg-pine-950/80 hover:scale-110 active:scale-95 border border-white/20"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicators + Badge Overlay Container */}
      <div className="absolute bottom-4 left-4 right-4 z-20 space-y-2 pointer-events-none">
        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 pointer-events-auto">
          {storyImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPage([idx, idx > currentIndex ? 1 : -1])}
              aria-label={`Ke slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-6 bg-gold-400" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Badge overlay */}
        <div className="rounded-xl bg-white/95 backdrop-blur-xs px-4 py-3 shadow-md border border-cream-200/60 pointer-events-auto">
          <p className="text-xs font-bold text-pine-950">PT Noor Barkatul Haromain</p>
          <p className="text-[11px] text-ink-500 mt-0.5 font-medium">Izin PPIU Kemenag RI — 12690001206830002</p>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { id: "cerita", label: "Cerita Kami" },
  { id: "nilai", label: "Nilai-Nilai Kami" },
  { id: "legalitas", label: "Legalitas" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function TentangKontakPage() {
  const [activeTab, setActiveTab] = useState<TabId>("cerita");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-pine-950 text-cream-100 py-16 lg:py-20 bg-hero-pattern">
        <div className="relative mx-auto max-w-6xl px-4 lg:px-6 text-center">
          <FadeIn delay={0.05} distance={15}>
            <span className="inline-block rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-bold tracking-widest text-gold-300 uppercase">
              Tentang Kami
            </span>
          </FadeIn>
          <FadeIn delay={0.15} distance={20}>
            <h1 className="mt-4 font-head text-3xl font-bold text-cream-100 md:text-5xl leading-tight">
              Mengantar Anda ke <em className="font-head italic text-gold-400">Baitullah</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.25} distance={20}>
            <p className="mx-auto mt-4 text-sm md:text-base text-cream-200/80 max-w-2xl leading-relaxed">
              Biro perjalanan umrah &amp; haji sesuai sunnah dengan fasilitas premium dan pembimbing berkompeten.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tabbed Section — Cerita / Nilai / Legalitas */}
      <section className="bg-cream-50 py-16 lg:py-20 border-b border-cream-200/60">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          {/* Tab Pills */}
          <FadeIn className="flex justify-center mb-12">
            <div className="inline-flex rounded-full bg-cream-200/60 p-1.5 gap-1 shadow-xs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-pine-950 text-gold-400 shadow-xs"
                      : "text-ink-500 hover:text-pine-950 hover:bg-cream-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Tab Content with AnimatePresence */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {/* ── Tab: Cerita Kami ── */}
              {activeTab === "cerita" && (
                <motion.div
                  key="cerita"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-center"
                >
                  {/* Image Slider */}
                  <AboutImageSlider />

                  {/* Story Content */}
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Tentang Thawwafi</span>
                    <h2 className="mt-2 font-head text-2xl font-bold text-pine-950 md:text-3xl leading-snug">
                      Perjalanan ibadah yang <em className="text-gold-500 font-head italic">amanah</em> dan sesuai sunnah
                    </h2>
                    <div className="mt-6 space-y-4 text-sm text-ink-700 leading-relaxed">
                      <p>
                        Thawwafi Tour hadir dari kepedulian mendalam terhadap kualitas ibadah umrah dan haji
                        bagi umat Muslim Indonesia. Kami percaya bahwa perjalanan ibadah harus dilakukan dengan
                        ilmu yang benar, persiapan yang matang, dan pendampingan oleh pembimbing yang kompeten.
                      </p>
                      <p>
                        Berdiri di bawah naungan PT Noor Barkatul Haromain dengan Izin PPIU Kemenag RI
                        12690001206830002, kami berkomitmen menjaga amanah setiap jamaah dengan transparansi
                        penuh — dari detail hotel dan maskapai hingga jadwal manasik dan bimbingan asatidzah.
                      </p>
                      <p>
                        Setiap keberangkatan didampingi tim pembimbing dan muthawwif sesuai informasi paket,
                        dengan fokus pada persiapan ibadah dan kebutuhan jamaah selama perjalanan.
                      </p>
                    </div>
                    {/* Quick stats */}
                    <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                      {[
                        { number: "3", label: "Kategori Paket" },
                        { number: "2", label: "Lokasi Kantor" },
                        { number: "PPIU", label: "Izin Kemenag" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center rounded-2xl bg-white border border-cream-200 py-3.5 px-3 shadow-xs">
                          <p className="font-head text-lg sm:text-xl font-bold text-pine-950">{stat.number}</p>
                          <p className="text-[11px] text-ink-500 mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Tab: Nilai-Nilai Kami ── */}
              {activeTab === "nilai" && (
                <motion.div
                  key="nilai"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-center mb-12">
                    <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Prinsip Kami</span>
                    <h2 className="mt-2 font-head text-2xl font-bold text-pine-950 md:text-3xl">
                      Fondasi dalam setiap <em className="text-gold-500 font-head italic">perjalanan</em>
                    </h2>
                    <p className="mt-2.5 mx-auto max-w-lg text-sm text-ink-500">
                      Tiga pilar yang menjadi dasar kami dalam melayani setiap jamaah.
                    </p>
                  </div>
                  <StaggerContainer className="grid sm:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Moon,
                        title: "Sunnah",
                        desc: "Ibadah sesuai tuntunan Nabi ﷺ, tanpa tambahan atau pengurangan. Setiap amalan manasik yang kami ajarkan berlandaskan dalil yang shahih.",
                        color: "bg-gold-100 text-gold-600",
                      },
                      {
                        icon: BookOpen,
                        title: "Ilmu",
                        desc: "Bimbingan manasik oleh asatidzah berkompeten sebelum dan selama perjalanan. Jamaah dibekali pemahaman mendalam agar ibadah lebih khusyuk.",
                        color: "bg-pine-800/10 text-pine-700",
                      },
                      {
                        icon: Shield,
                        title: "Amanah",
                        desc: "Legalitas jelas, harga transparan, tanpa biaya siluman. Setiap rupiah yang diamanahkan jamaah kami pertanggungjawabkan dengan jujur.",
                        color: "bg-gold-100 text-gold-600",
                      },
                    ].map((v) => (
                      <StaggerItem
                        key={v.title}
                        className="group rounded-2xl bg-white border border-cream-200 p-8 text-center hover:border-gold-300 hover:shadow-md transition-all duration-300"
                      >
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${v.color} mx-auto transition-transform group-hover:scale-105`}>
                          <v.icon className="h-7 w-7" />
                        </div>
                        <h3 className="mt-5 font-head text-xl font-bold text-pine-950">{v.title}</h3>
                        <p className="mt-3 text-sm text-ink-500 leading-relaxed">{v.desc}</p>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </motion.div>
              )}

              {/* ── Tab: Legalitas ── */}
              {activeTab === "legalitas" && (
                <motion.div
                  key="legalitas"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="text-center mb-10">
                    <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Resmi &amp; Terpercaya</span>
                    <h2 className="mt-2 font-head text-2xl font-bold text-pine-950 md:text-3xl">
                      Legalitas &amp; <em className="text-gold-500 font-head italic">Badan Hukum</em>
                    </h2>
                    <p className="mt-2.5 mx-auto max-w-lg text-sm text-ink-500">
                      Kami beroperasi secara resmi di bawah pengawasan Kementerian Agama Republik Indonesia.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white border border-cream-200 shadow-xs overflow-hidden">
                    {[
                      {
                        icon: Building2,
                        label: "Nama Badan Hukum",
                        value: "PT Noor Barkatul Haromain",
                      },
                      {
                        icon: FileCheck,
                        label: "Izin PPIU Kemenag RI",
                        value: "12690001206830002",
                      },
                      {
                        icon: MapPinned,
                        label: "Alamat Legal",
                        value: "Ruko Market City Pondok Cabe Blok C2 No. 2, Jalan Pondok Cabe Raya, Pamulang, Tangerang Selatan",
                      },
                      {
                        icon: MapPin,
                        label: "Alamat Operasional",
                        value: "Ruko Urbana Place No. A8, Jl. Merpati Raya, Sawah Baru, Ciputat, Tangerang Selatan",
                      },
                    ].map((item, idx) => (
                      <div
                        key={item.label}
                        className={`flex items-start gap-4 px-6 py-5 ${
                          idx > 0 ? "border-t border-cream-200" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-ink-400 uppercase tracking-wide">{item.label}</p>
                          <p className="mt-1 text-sm font-semibold text-pine-950">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Trust badge */}
                  <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-pine-950 px-6 py-4 shadow-xs">
                    <Shield className="h-5 w-5 text-gold-400 shrink-0" />
                    <p className="text-sm text-cream-100">
                      <span className="font-semibold text-gold-400">Nomor PPIU 12690001206830002</span> — nomor izin yang dicantumkan PT Noor Barkatul Haromain.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Kontak & Lokasi */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <FadeIn className="mb-10 text-center lg:text-left">
            <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Kontak &amp; Lokasi</span>
            <h2 className="mt-2 font-head text-3xl font-bold text-pine-950 md:text-4xl leading-tight">
              Kunjungi Kantor &amp; <em className="text-gold-500 font-head italic">Hubungi Kami</em>
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Silakan datang langsung ke kantor operasional kami atau hubungi melalui kanal resmi di bawah ini.
            </p>
          </FadeIn>

          <StaggerContainer className="grid gap-8 lg:grid-cols-2 items-stretch">
            {/* Left: contact info & address */}
            <StaggerItem className="flex flex-col justify-between rounded-2xl bg-white border border-cream-200 p-6 sm:p-8 shadow-xs">
              <div className="space-y-5 text-sm text-ink-700">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-400 uppercase tracking-wide">Kantor Operasional</p>
                    <p className="mt-1 font-semibold text-pine-950 leading-relaxed">
                      Ruko Urbana Place No. A8, Jl. Merpati Raya, Sawah Baru, Ciputat, Tangerang Selatan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-400 uppercase tracking-wide">WhatsApp / Telepon</p>
                    <a
                      href="https://wa.me/6285121008442"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block font-semibold text-pine-700 hover:text-gold-600 transition-colors"
                    >
                      +62 851-2100-8442
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-400 uppercase tracking-wide">Email</p>
                    <a
                      href="mailto:info@thawwafi.com"
                      className="mt-1 block font-semibold text-pine-700 hover:text-gold-600 transition-colors"
                    >
                      info@thawwafi.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                    <InstagramIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-400 uppercase tracking-wide">Instagram</p>
                    <a
                      href="https://instagram.com/thawwafi.tour"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block font-semibold text-pine-700 hover:text-gold-600 transition-colors"
                    >
                      @thawwafi.tour
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-400 uppercase tracking-wide">Jam Operasional</p>
                    <p className="mt-1 font-semibold text-pine-950">Senin–Sabtu, 09.00–18.00 WIB</p>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="mt-8 pt-6 border-t border-cream-200">
                <a
                  href="https://wa.me/6285121008442?text=Bismillah.%20Assalamu%27alaikum%20Thawwafi%20Tour.%20Saya%20ingin%20berkonsultasi%20mengenai%20paket%20umroh."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#1fb855] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Hubungi via WhatsApp
                </a>
              </div>
            </StaggerItem>

            {/* Right: Maps */}
            <StaggerItem className="min-h-[400px] h-full rounded-2xl overflow-hidden border border-cream-200 shadow-xs relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5!2d106.7!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDAuMCJTIDEwNsKwNDInMDAuMCJF!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[400px] border-0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Lokasi Kantor Thawwafi Tour"
              />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
