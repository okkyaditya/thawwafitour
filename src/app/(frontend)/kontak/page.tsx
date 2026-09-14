"use client";

import { Phone, Mail, MapPin, Clock, Shield } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function KontakPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-pine-950 text-cream-100 py-16 lg:py-20 bg-hero-pattern">
        <div className="relative mx-auto max-w-6xl px-4 lg:px-6 text-center">
          <FadeIn delay={0.05} distance={15}>
            <span className="inline-block rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-bold tracking-widest text-gold-300 uppercase">
              Hubungi Kami
            </span>
          </FadeIn>
          <FadeIn delay={0.15} distance={20}>
            <h1 className="mt-4 font-head text-3xl font-bold text-cream-100 md:text-5xl leading-tight">
              Konsultasi &amp; <em className="font-head italic text-gold-400">Kunjungan Kantor</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.25} distance={20}>
            <p className="mx-auto mt-4 text-sm md:text-base text-cream-200/70 max-w-2xl leading-relaxed">
              Tim konsultan kami siap menjawab pertanyaan Anda tentang paket, jadwal, kuota, dan prosedur pendaftaran dengan ramah dan amanah.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Kontak & Lokasi */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
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
            <StaggerItem className="flex flex-col gap-4">
              <div className="min-h-[360px] flex-1 rounded-2xl overflow-hidden border border-cream-200 shadow-xs relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5!2d106.7!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDAuMCJTIDEwNsKwNDInMDAuMCJF!5e0!3m2!1sid!2sid!4v1"
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[360px] border-0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Lokasi Kantor Thawwafi Tour"
                />
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-pine-950 px-5 py-3.5 text-xs text-cream-100 shadow-xs">
                <Shield className="h-4 w-4 text-gold-400 shrink-0" />
                <p>
                  <strong className="text-gold-400">PT Noor Barkatul Haromain</strong> — Izin PPIU Kemenag RI 12690001206830002
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
