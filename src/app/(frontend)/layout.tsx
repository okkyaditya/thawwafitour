import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWA from "@/components/FloatingWA";
import SplashScreen from "@/components/SplashScreen";

const playfair = Playfair_Display({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#1F2E23",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thawwafi.com"),
  title: {
    default: "Thawwafi Tour — Ibadah Umrah Sesuai Sunnah",
    template: "%s | Thawwafi Tour",
  },
  description:
    "Biro perjalanan umrah dan haji sesuai sunnah yang dikelola PT Noor Barkatul Haromain, dengan informasi paket, hotel, maskapai, dan jadwal yang transparan.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Thawwafi Tour",
    title: "Thawwafi Tour — Ibadah Umrah Sesuai Sunnah",
    description: "Paket umrah dengan informasi harga, hotel, maskapai, jadwal, dan fasilitas yang transparan.",
    images: [{ url: "/img/kaaba-hero.jpg", width: 1200, height: 630, alt: "Thawwafi Tour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thawwafi Tour — Ibadah Umrah Sesuai Sunnah",
    description: "Paket umrah dengan informasi harga, hotel, maskapai, jadwal, dan fasilitas yang transparan.",
    images: ["/img/kaaba-hero.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TravelAgency", "Organization"],
      "@id": "https://thawwafi.com/#organization",
      name: "Thawwafi Tour",
      legalName: "PT Noor Barkatul Haromain",
      url: "https://thawwafi.com/",
      logo: "https://thawwafi.com/img/thawwafi-logofull.png",
      telephone: "+62-851-2100-8442",
      email: "info@thawwafi.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ruko Urbana Place No. A8, Jl. Merpati Raya, Sawah Baru",
        addressLocality: "Tangerang Selatan",
        addressRegion: "Banten",
        addressCountry: "ID",
      },
      areaServed: { "@type": "Country", name: "Indonesia" },
      sameAs: ["https://instagram.com/thawwafi.tour", "https://www.linkedin.com/company/thawwafi-tour/"],
      knowsAbout: ["Umrah", "Haji", "Manasik Umrah", "Perjalanan Makkah dan Madinah"],
    },
    {
      "@type": "WebSite",
      "@id": "https://thawwafi.com/#website",
      url: "https://thawwafi.com/",
      name: "Thawwafi Tour",
      inLanguage: "id-ID",
      publisher: { "@id": "https://thawwafi.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${playfair.variable} ${jakarta.variable} antialiased`} suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWA />
      </body>
    </html>
  );
}
