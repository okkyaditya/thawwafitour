import Link from "next/link";
import Logo from "./Logo";

const FOOTER_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Paket Umroh", href: "/paket" },
  { label: "Fasilitas", href: "/#fasilitas" },
  { label: "Blog", href: "/blog" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-cream-100">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-3">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo className="h-12 w-auto" href="/" />
            <p className="mt-4 text-sm text-cream-200/70 leading-relaxed">
              Biro perjalanan umrah &amp; haji sesuai sunnah dengan fasilitas premium.
            </p>
            <p className="mt-2 text-xs text-gold-400 italic">
              &ldquo;The journey of your dream in Sunnah.&rdquo;
            </p>
            <p className="mt-3 text-xs text-cream-200/50">
              <strong className="text-cream-100">PT Noor Barkatul Haromain</strong>
              <br />
              Izin PPIU Kemenag RI: <strong className="text-cream-100">12690001206830002</strong>
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-4">Menu</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-cream-200/70 hover:text-cream-50 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-4">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm text-cream-200/70">
              <li>
                WhatsApp:{" "}
                <a href="https://wa.me/6285121008442" target="_blank" rel="noopener noreferrer" className="font-semibold text-cream-50 hover:text-gold-400">
                  +62 851-2100-8442
                </a>
              </li>
              <li>
                Email:{" "}
                <a href="mailto:info@thawwafi.com" className="text-cream-50 hover:text-gold-400">
                  info@thawwafi.com
                </a>
              </li>
              <li>
                Instagram:{" "}
                <a href="https://instagram.com/thawwafi.tour" target="_blank" rel="noopener noreferrer" className="text-cream-50 hover:text-gold-400">
                  @thawwafi.tour
                </a>
              </li>
              <li className="text-xs leading-relaxed">
                Kantor Operasional:
                <br />
                Ruko Urbana Place No. A8, Jl. Merpati Raya, Sawah Baru, Ciputat, Tangerang Selatan
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-cream-200/10 pt-6 text-center text-xs text-cream-200/40">
          <p>&copy; 2026 Thawwafi Tour &mdash; PT Noor Barkatul Haromain. Izin PPIU: 12690001206830002.</p>
        </div>
      </div>
    </footer>
  );
}
