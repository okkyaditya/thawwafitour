"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Hotel, Luggage, TrainFront, TreePalm, X } from "lucide-react";
import { getCoverImageUrl } from "@/lib/packageUtils";

interface PackageDetail {
  id: string;
  name: string;
  category: string;
  departDate: string;
  duration: string;
  airline: string;
  flight?: string;
  visa?: string;
  hotelMakkahName: string;
  hotelMakkahStars: string | number;
  hotelMakkahDistance: string;
  hotelMadinahName: string;
  hotelMadinahStars: string | number;
  hotelMadinahDistance: string;
  haramain: boolean;
  thaif: boolean;
  price: number;
  priceNote?: string;
  promoLabel?: string;
  badge: string;
  tagline: string;
  seatsTotal: number;
  seatsLeft: number;
  status: string;
  coverImage?: { url?: string; alt?: string } | string | null;
  coverImageUrl?: string | null;
  itinerary?: Array<{ day: string; title: string; desc: string }>;
  included?: Array<{ item: string }>;
  excluded?: Array<{ item: string }>;
  ustadz?: { name: string; role: string; focus: string; initials: string } | null;
}

const WA_NUMBER = "6285121008442";

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function starRating(n: number) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

/* ── Kartu hotel dengan ikon (dipakai di detail sheet) ── */
function HotelCard({ label, name, stars, distance, landmark }: { label: string; name: string; stars: number; distance: string; landmark: string }) {
  return (
    <div className="rounded-2xl border border-cream-200 bg-white p-5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500">{label}</span>
      <div className="mt-2.5 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100">
          <Hotel className="h-5 w-5 text-gold-600" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-head text-base font-bold text-pine-950">{name}</p>
          <p className="text-xs font-semibold text-gold-600">{starRating(stars)}</p>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[13px] text-ink-500">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
        {distance} dari {landmark}
      </p>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── Slide-up sheet dengan detail paket ── */
export default function PackageDetailSheet({
  packageId,
  onClose,
}: {
  packageId: string | null;
  onClose: () => void;
}) {
  const [pkg, setPkg] = useState<PackageDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false); // kontrol animasi enter
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Fetch data saat packageId berubah
  useEffect(() => {
    if (!packageId) {
      setPkg(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/packages/${packageId}?depth=1`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((doc: PackageDetail) => {
        if (!cancelled) setPkg(doc);
      })
      .catch(() => {
        if (!cancelled) setPkg(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [packageId]);

  // Animasi slide-up: mount → frame berikutnya → translate 0
  useEffect(() => {
    if (!packageId) {
      setShown(false);
      return;
    }
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    return () => cancelAnimationFrame(raf);
  }, [packageId]);

  // Body scroll lock + Escape + focus
  useEffect(() => {
    if (!packageId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [packageId, onClose]);

  if (!packageId) return null;

  const waText = pkg
    ? encodeURIComponent(
        `Bismillah. Assalamu'alaikum Thawwafi Tour. Saya tertarik dengan ${pkg.name} (${formatDate(String(pkg.departDate))}). Mohon informasinya. Terima kasih.`
      )
    : "";

  const isSoldOut = pkg ? pkg.status === "soldout" || pkg.seatsLeft <= 0 : false;

  return (
    <div
      className="fixed inset-0 z-[9998]"
      role="dialog"
      aria-modal="true"
      aria-label={pkg ? `Detail ${pkg.name}` : "Memuat detail paket"}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-pine-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel slide-up */}
      <div
        ref={panelRef}
        className={`absolute inset-x-0 bottom-0 mx-auto flex max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-cream-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-x-4 sm:bottom-4 sm:rounded-2xl lg:inset-x-auto lg:left-1/2 lg:w-[calc(100%-2rem)] lg:max-w-4xl lg:-translate-x-1/2 ${
          shown ? "translate-y-0" : "translate-y-full lg:translate-y-[110%] lg:translate-x-[-50%]"
        }`}
        style={{ maxHeight: "92vh" }}
      >
        {/* Drag handle (mobile affordance) */}
        <div className="flex justify-center bg-cream-50 pt-2.5 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-ink-400/40" />
        </div>

        {/* Header sticky */}
        <div className="flex items-start justify-between gap-4 border-b border-cream-200 bg-cream-50 px-5 py-4 sm:px-7">
          <div className="min-w-0">
            {loading || !pkg ? (
              <>
                <div className="h-3 w-24 animate-pulse rounded bg-cream-200" />
                <div className="mt-2 h-7 w-56 animate-pulse rounded bg-cream-200" />
              </>
            ) : (
              <>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
                  {pkg.category} · {pkg.duration}
                </span>
                <h2 className="mt-0.5 truncate font-head text-2xl font-bold text-pine-950">{pkg.name}</h2>
              </>
            )}
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Tutup detail paket"
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream-200 bg-white text-ink-500 transition-colors hover:border-pine-950 hover:text-pine-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 py-6 sm:px-7">
          {loading && (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-400">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
              <span className="text-sm">Memuat detail paket…</span>
            </div>
          )}

          {!loading && !pkg && (
            <div className="py-16 text-center">
              <p className="text-sm font-semibold text-pine-950">Detail paket tidak dapat dimuat.</p>
              <p className="mt-1 text-sm text-ink-400">Periksa koneksi Anda, lalu tutup panel ini dan coba lagi.</p>
            </div>
          )}

          {!loading && pkg && (
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
              {/* ── Kiri: konten ── */}
              <div className="min-w-0">
                {(() => {
                  const coverUrl = getCoverImageUrl(pkg.coverImage, pkg.coverImageUrl);

                  return coverUrl ? (
                    <div className="relative mb-5 h-52 sm:h-64 w-full overflow-hidden rounded-2xl bg-pine-950">
                      <Image
                        src={coverUrl}
                        alt={pkg.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    </div>
                  ) : null;
                })()}

                <p className="text-sm leading-relaxed text-ink-600">{pkg.tagline}</p>

                {/* Quick specs */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Keberangkatan", value: formatDate(String(pkg.departDate)) },
                    { label: "Durasi", value: pkg.duration },
                    { label: "Maskapai", value: pkg.airline },
                    { label: "Seat", value: `${pkg.seatsLeft}/${pkg.seatsTotal}` },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-cream-200 bg-white p-3 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-gold-500">{s.label}</span>
                      <p className="mt-1 text-[13px] font-bold leading-tight text-pine-950">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Hotel & fasilitas */}
                <div className="mt-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <HotelCard
                      label="Hotel Makkah"
                      name={pkg.hotelMakkahName}
                      stars={Number(pkg.hotelMakkahStars)}
                      distance={pkg.hotelMakkahDistance}
                      landmark="Masjidil Haram"
                    />
                    <HotelCard
                      label="Hotel Madinah"
                      name={pkg.hotelMadinahName}
                      stars={Number(pkg.hotelMadinahStars)}
                      distance={pkg.hotelMadinahDistance}
                      landmark="Masjid Nabawi"
                    />
                  </div>

                  {/* Include chips */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { ok: pkg.haramain, label: "Kereta Cepat", icon: TrainFront, off: "Bus full AC" },
                      { ok: pkg.thaif, label: "Thaif Tour", icon: TreePalm, off: "Tanpa Thaif" },
                      { ok: true, label: "Koper & Perlengkapan", icon: Luggage, off: "" },
                    ].map((f) => (
                      <span
                        key={f.label}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
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
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success-bg px-3.5 py-1.5 text-xs font-semibold text-success">
                      <Check className="h-3.5 w-3.5" />
                      {pkg.visa || "Visa Umrah"} + Manasik
                    </span>
                  </div>

                  <p className="mt-3 text-[13px] text-ink-500">
                    <strong className="text-ink-700">Jarak Hotel – Ka&apos;bah:</strong> {pkg.hotelMakkahDistance}
                  </p>
                </div>

                {/* Itinerary */}
                {pkg.itinerary && pkg.itinerary.length > 0 && (
                  <div className="mt-8">
                    <h3 className="mb-5 font-head text-xl font-bold text-pine-950">Itinerary Perjalanan</h3>
                    <div className="ml-3 space-y-5 border-l-2 border-gold-300">
                      {pkg.itinerary.map((item, i) => (
                        <div key={i} className="relative pl-6">
                          <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-gold-400 bg-cream-50" />
                          <span className="text-[10px] font-bold uppercase tracking-wide text-gold-500">{item.day}</span>
                          <h4 className="mt-0.5 font-head text-base font-bold text-pine-950">{item.title}</h4>
                          <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Include / Exclude */}
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {pkg.included && pkg.included.length > 0 && (
                    <div className="rounded-2xl border border-success/20 bg-success-bg p-5">
                      <h3 className="mb-3 font-head text-base font-bold text-pine-950">Termasuk</h3>
                      <ul className="space-y-2">
                        {pkg.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-ink-700">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                            {item.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.excluded && pkg.excluded.length > 0 && (
                    <div className="rounded-2xl border border-danger/20 bg-danger-bg p-5">
                      <h3 className="mb-3 font-head text-base font-bold text-pine-950">Tidak Termasuk</h3>
                      <ul className="space-y-2">
                        {pkg.excluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-ink-700">
                            <X className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                            {item.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Ustadz */}
                {pkg.ustadz && (
                  <div className="mt-8 rounded-2xl border border-cream-200 bg-sage p-5">
                    <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gold-500">Pembimbing</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pine-800 font-head text-base font-bold text-gold-400">
                        {pkg.ustadz.initials}
                      </div>
                      <div>
                        <p className="font-head text-base font-bold text-pine-950">{pkg.ustadz.name}</p>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-gold-500">{pkg.ustadz.role}</p>
                        <p className="mt-0.5 text-[13px] text-ink-500">{pkg.ustadz.focus}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Kanan: booking card ── */}
              <aside className="lg:sticky lg:top-0 lg:self-start">
                <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-gold-500">Harga Paket</span>
                  <p className="mt-1 font-head text-3xl font-bold text-pine-950">{formatIDR(pkg.price)}</p>
                  <span className="text-xs text-ink-400">{pkg.priceNote || "harga per orang, twin share"}</span>

                  {pkg.promoLabel && (
                    <div className="mt-3 rounded-lg bg-gold-100 p-3 text-xs font-semibold text-gold-600">
                      ✦ {pkg.promoLabel}
                    </div>
                  )}

                  <ul className="mt-4 space-y-1.5 text-xs text-ink-500">
                    <li>📅 {formatDate(String(pkg.departDate))}</li>
                    <li>⏱ {pkg.duration}</li>
                    <li>✈ {pkg.airline}</li>
                    <li>👥 {pkg.seatsLeft} seat tersisa dari {pkg.seatsTotal}</li>
                  </ul>

                  {isSoldOut ? (
                    <p className="mt-5 text-center text-sm font-bold text-danger">Sold Out</p>
                  ) : (
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1fb855] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Tanya via WhatsApp
                    </a>
                  )}

                  <a
                    href={`/paket/${pkg.id}`}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-cream-200 px-5 py-2.5 text-[13px] font-semibold text-pine-700 transition-colors hover:border-gold-400 hover:text-gold-600"
                  >
                    Buka halaman lengkap <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
