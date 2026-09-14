import type { CollectionConfig } from "payload";

export const Packages: CollectionConfig = {
  slug: "packages",
  // Paket adalah data publik (katalog marketing) — izinkan REST read tanpa login.
  // Tulis (create/update/delete) tetap butuh autentikasi admin.
  access: {
    read: () => true,
  },
  labels: { singular: "Paket Umroh", plural: "Paket Umroh" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "departDate", "price", "status", "badge"],
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Nama Paket" },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Kategori",
      options: [
        { label: "Ruby", value: "ruby" },
        { label: "Sapphire", value: "sapphire" },
        { label: "Diamond", value: "diamond" },
      ],
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Gambar Cover / Foto Card",
      admin: {
        description: "Upload foto untuk tampilan cover di kartu paket dan halaman detail. Jika kosong, akan menggunakan ilustrasi tema kategori.",
      },
    },
    {
      name: "coverImageUrl",
      type: "text",
      label: "Atau URL Gambar Eksternal",
      admin: {
        description: "Alternatif jika menggunakan tautan gambar eksternal (misal dari CDN / Unsplash).",
      },
    },
    { name: "tagline", type: "text", label: "Tagline" },
    { name: "price", type: "number", required: true, label: "Harga (IDR)" },
    { name: "priceNote", type: "text", label: "Catatan harga", defaultValue: "harga per orang, twin share" },
    {
      name: "badge",
      type: "select",
      label: "Badge",
      options: [
        { label: "— (tanpa badge)", value: "none" },
        { label: "Limited Seat", value: "limited" },
        { label: "Promo Terbatas", value: "promo" },
      ],
      defaultValue: "none",
    },
    { name: "promoLabel", type: "text", label: "Teks promo (jika badge promo)" },
    {
      name: "status",
      type: "select",
      required: true,
      label: "Status",
      options: [
        { label: "Aktif", value: "active" },
        { label: "Draft", value: "draft" },
        { label: "Sold Out", value: "soldout" },
      ],
      defaultValue: "active",
    },
    { name: "featured", type: "checkbox", label: "Tampilkan di Beranda", defaultValue: false },
    { name: "departDate", type: "date", required: true, label: "Tanggal Keberangkatan", admin: { date: { pickerAppearance: "dayOnly" } } },
    { name: "duration", type: "text", required: true, label: "Durasi (mis. 9 Hari)" },
    { name: "airline", type: "text", required: true, label: "Maskapai" },
    { name: "flight", type: "text", label: "Detail penerbangan" },
    {
      name: "hotelMakkahName",
      type: "text",
      required: true,
      label: "Hotel Makkah (nama)",
    },
    {
      name: "hotelMakkahStars",
      type: "select",
      required: true,
      label: "Bintang Makkah",
      options: [
        { label: "3★", value: "3" },
        { label: "4★", value: "4" },
        { label: "5★", value: "5" },
      ],
      defaultValue: "3",
    },
    { name: "hotelMakkahDistance", type: "text", required: true, label: "Jarak hotel Makkah ke Haram (mis. ± 600 m)" },
    {
      name: "hotelMadinahName",
      type: "text",
      required: true,
      label: "Hotel Madinah (nama)",
    },
    {
      name: "hotelMadinahStars",
      type: "select",
      required: true,
      label: "Bintang Madinah",
      options: [
        { label: "3★", value: "3" },
        { label: "4★", value: "4" },
        { label: "5★", value: "5" },
      ],
      defaultValue: "3",
    },
    { name: "hotelMadinahDistance", type: "text", required: true, label: "Jarak hotel Madinah ke Masjid Nabawi" },
    { name: "haramain", type: "checkbox", label: "Termasuk Kereta Cepat Haramain", defaultValue: false },
    { name: "thaif", type: "checkbox", label: "Termasuk City Tour Thaif", defaultValue: false },
    { name: "seatsTotal", type: "number", required: true, label: "Total seat" },
    { name: "seatsLeft", type: "number", required: true, label: "Sisa seat" },
    { name: "visa", type: "text", label: "Visa", defaultValue: "Visa Umrah" },
    { name: "group", type: "text", label: "Grup jamaah" },
    {
      name: "ustadz",
      type: "relationship",
      relationTo: "ustadz",
      label: "Ustadz Pembimbing",
    },
    {
      name: "itinerary",
      type: "array",
      label: "Itinerary",
      fields: [
        { name: "day", type: "text", required: true, label: "Hari" },
        { name: "title", type: "text", required: true, label: "Judul" },
        { name: "desc", type: "textarea", required: true, label: "Deskripsi" },
      ],
    },
    {
      name: "included",
      type: "array",
      label: "Termasuk (Include)",
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "excluded",
      type: "array",
      label: "Tidak Termasuk (Exclude)",
      fields: [{ name: "item", type: "text", required: true }],
    },
  ],
};
