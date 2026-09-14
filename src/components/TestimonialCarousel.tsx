"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number | string;
  name: string;
  role: string;
  text: string;
  initials: string;
}

export default function TestimonialCarousel({ testimonials, rating }: { testimonials: Testimonial[]; rating: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

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
    window.addEventListener("resize", updateScrollState);
    updateScrollState();
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 340 + 24; // card + gap
    el.scrollBy({ left: dir === "left" ? -cardWidth * 2 : cardWidth * 2, behavior: "smooth" });
  };

  return (
    <section className="bg-cream-50 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        {/* ── Header + Nav ── */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">Kata Mereka</span>
            <h2 className="mt-3 font-head text-3xl font-bold text-pine-950 md:text-4xl leading-tight">
              Cerita jamaah yang sudah <em className="text-gold-500">berangkat.</em>
            </h2>
            <p className="mt-4 text-xs text-ink-500">{rating}</p>
          </div>
          <div className="hidden sm:flex gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canLeft}
              aria-label="Geser ke kiri"
              className="w-10 h-10 rounded-full border border-cream-200 flex items-center justify-center text-ink-400 hover:text-pine-950 hover:border-pine-950 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canRight}
              aria-label="Geser ke kanan"
              className="w-10 h-10 rounded-full border border-cream-200 flex items-center justify-center text-ink-400 hover:text-pine-950 hover:border-pine-950 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ── Cards (scroll kesamping) ── */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex w-[320px] sm:w-[340px] shrink-0 snap-start flex-col rounded-2xl border border-cream-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gold-300/50 hover:-translate-y-1"
            >
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-cream-200 pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine-800 font-head text-sm font-bold text-gold-400">
                  {t.initials}
                </span>
                <div>
                  <p className="font-head text-sm font-bold text-pine-950">{t.name}</p>
                  <p className="text-xs text-ink-400">{t.role}</p>
                </div>
              </figcaption>
            </figure>
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
      </div>
    </section>
  );
}
