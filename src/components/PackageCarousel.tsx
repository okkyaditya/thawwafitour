"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import PackageDetailSheet from "./PackageDetailSheet";
import { CoverArt } from "./CoverArt";
import { getCoverImageUrl } from "@/lib/packageUtils";
import { motion } from "@/components/motion/MotionWrapper";

export interface Package {
  id: string;
  name: string;
  category: string;
  departDate: string;
  duration: string;
  airline: string;
  hotelMakkahName?: string;
  hotelMakkahStars: string;
  hotelMakkahDistance: string;
  hotelMadinahName?: string;
  hotelMadinahStars: string;
  hotelMadinahDistance: string;
  haramain: boolean;
  thaif: boolean;
  price: number;
  badge: string;
  tagline: string;
  seatsTotal: number;
  seatsLeft: number;
  coverImage?: { url?: string; alt?: string } | string | null;
  coverImageUrl?: string | null;
}

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function formatDateShort(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

/* ── Badge ── */
function Badge({ badge }: { badge?: string }) {
  if (!badge || badge === "none") return null;

  const labels: Record<string, string> = {
    limited: "LIMITED SEAT",
    promo: "PROMO TERBATAS",
  };
  const label = labels[badge] || badge.toUpperCase();

  return (
    <motion.span
      animate={{
        scale: [1, 1.06, 0.98, 1.05, 1],
        rotate: [0, -2, 2, -1.5, 0],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
      className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md shadow-md bg-orange-500 text-white z-10 select-none"
    >
      {label}
    </motion.span>
  );
}

/* ── Card ── */
function PackageCard({ pkg, onSelect }: { pkg: Package; onSelect: (id: string) => void }) {
  const cat = pkg.category;
  const coverUrl = getCoverImageUrl(pkg.coverImage, pkg.coverImageUrl);

  return (
    <Link
      href={`/paket/${pkg.id}`}
      onClick={(event) => {
        event.preventDefault();
        onSelect(pkg.id);
      }}
      aria-haspopup="dialog"
      className="group flex-shrink-0 w-[320px] snap-start bg-white border border-cream-200 rounded-2xl overflow-hidden text-left transition-all duration-300 hover:shadow-xl hover:border-gold-300/50 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-pine-950">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={pkg.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          ) : (
            <CoverArt category={cat} />
          )}
        </div>
        <Badge badge={pkg.badge} />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Row 1: Category + Duration */}
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-[11px] font-bold tracking-[0.15em] uppercase ${cat === "ruby" ? "text-red-600" : cat === "sapphire" ? "text-blue-600" : "text-purple-600"}`}>
            {cat}
          </span>
          <span className="text-[11px] font-bold text-ink-400 tracking-wide">
            {pkg.duration}
          </span>
        </div>

        {/* Row 2: Name */}
        <h3 className="font-head text-[20px] font-bold text-pine-950 leading-tight group-hover:text-gold-600 transition-colors">
          {pkg.name.replace("Paket Umroh ", "")}
        </h3>

        {/* Row 3: Route */}
        <p className="mt-1 text-xs text-ink-400">Jakarta · Makkah · Madinah</p>

        {/* Separator */}
        <div className="my-4 border-t border-cream-200" />

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <p className="text-[11px] text-ink-400 mb-0.5">Keberangkatan</p>
            <p className="text-[13px] font-semibold text-pine-950">{formatDateShort(String(pkg.departDate))}</p>
          </div>
          <div>
            <p className="text-[11px] text-ink-400 mb-0.5">Maskapai</p>
            <p className="text-[13px] font-semibold text-pine-950 truncate" title={pkg.airline}>{pkg.airline}</p>
          </div>
          <div>
            <p className="text-[11px] text-ink-400 mb-0.5">Hotel Makkah</p>
            <p className="text-[13px] font-semibold text-pine-950 truncate" title={pkg.hotelMakkahName || `Bintang ${pkg.hotelMakkahStars}`}>
              {pkg.hotelMakkahName || `Bintang ${pkg.hotelMakkahStars}`}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-ink-400 mb-0.5">Hotel Madinah</p>
            <p className="text-[13px] font-semibold text-pine-950 truncate" title={pkg.hotelMadinahName || `Bintang ${pkg.hotelMadinahStars}`}>
              {pkg.hotelMadinahName || `Bintang ${pkg.hotelMadinahStars}`}
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="my-4 border-t border-cream-200" />

        {/* Price + CTA */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] text-ink-400 mb-0.5">Mulai dari</p>
            <p className="font-head text-[20px] font-bold text-pine-950 leading-none">{formatIDR(pkg.price)}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-pine-700 group-hover:text-gold-600 transition-colors pb-0.5 border-b-2 border-transparent group-hover:border-gold-400">
            Lihat detail <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Main Carousel ── */
export default function PackageCarousel({ packages }: { packages: Package[] }) {
  const [filter, setFilter] = useState("semua");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const filtered = filter === "semua" ? packages : packages.filter((p) => p.category === filter);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft < maxScroll - 5);
    setProgress(maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState, filtered]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 320 + 24; // card + gap
    el.scrollBy({ left: dir === "left" ? -cardWidth * 2 : cardWidth * 2, behavior: "smooth" });
  };

  const tabs = [
    { key: "semua", label: "Semua" },
    { key: "ruby", label: "Ruby" },
    { key: "sapphire", label: "Sapphire" },
    { key: "diamond", label: "Diamond" },
  ];

  return (
    <section id="paket" className="bg-cream-50 py-16 lg:py-20 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-lg">
            <span className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">Paket Keberangkatan</span>
            <h2 className="mt-3 font-head text-3xl font-bold text-pine-950 md:text-4xl leading-tight">
              Pilih perjalanan <em className="text-gold-500 font-head italic">yang paling sesuai.</em>
            </h2>
          </div>
          <p className="text-sm text-ink-500 max-w-sm leading-relaxed lg:text-right lg:pb-1">
            Setiap paket kami susun dengan detail yang jelas, dari hotel hingga agenda harian. Bandingkan dengan tenang sebelum berkonsultasi.
          </p>
        </div>

        {/* ── Tabs + Nav ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2 p-1.5 rounded-full bg-cream-200/60">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setFilter(t.key); setProgress(0); }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  filter === t.key
                    ? "bg-pine-950 text-gold-400 shadow-xs"
                    : "text-ink-500 hover:text-pine-950 hover:bg-cream-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canLeft}
              className="w-10 h-10 rounded-full border border-cream-200 flex items-center justify-center text-ink-400 hover:text-pine-950 hover:border-pine-950 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canRight}
              className="w-10 h-10 rounded-full border border-cream-200 flex items-center justify-center text-ink-400 hover:text-pine-950 hover:border-pine-950 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ── Cards ── */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onSelect={setSelectedId} />
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div className="mt-6 h-[3px] bg-cream-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-200 ease-out"
            style={{
              width: `${Math.max(progress, 5)}%`,
              background: "linear-gradient(90deg, #D4AF37, #C5A869)",
            }}
          />
        </div>

        {/* ── Footer ── */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-ink-400 uppercase tracking-[0.12em]">
          <span>Geser untuk melihat paket lainnya</span>
          <span>{String(filtered.length).padStart(2, "0")} Paket</span>
        </div>
      </div>

      {/* ── Slide-up detail sheet ── */}
      <PackageDetailSheet packageId={selectedId} onClose={() => setSelectedId(null)} />
    </section>
  );
}
