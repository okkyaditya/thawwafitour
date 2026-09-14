import Link from "next/link";

export default function FrontendNotFound() {
  return (
    <div className="min-h-[60vh] bg-cream-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">404</span>
        <h1 className="mt-2 font-head text-3xl font-bold text-pine-950">Halaman Tidak Ditemukan</h1>
        <p className="mt-3 text-sm text-ink-500 leading-relaxed">
          Halaman yang Anda cari tidak ditemukan. Silakan periksa kembali tautan Anda.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-pine-950 px-6 py-2.5 text-xs font-bold text-gold-400 shadow-sm hover:bg-pine-900 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
