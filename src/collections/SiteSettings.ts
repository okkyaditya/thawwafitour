import type { CollectionConfig } from "payload";

export const SiteSettings: CollectionConfig = {
  slug: "site-settings",
  labels: { singular: "Pengaturan Situs", plural: "Pengaturan Situs" },
  admin: {
    useAsTitle: "id",
  },
  fields: [
    { name: "waNumber", type: "text", required: true, label: "Nomor WhatsApp (format 62...)", defaultValue: "6285121008442" },
    { name: "waDisplay", type: "text", required: true, label: "Nomor tampil", defaultValue: "+62 851-2100-8442" },
    { name: "email", type: "email", required: true, label: "Email", defaultValue: "info@thawwafi.com" },
    { name: "instagram", type: "text", required: true, label: "Instagram", defaultValue: "@thawwafi.tour" },
    { name: "instagramUrl", type: "text", required: true, label: "URL Instagram", defaultValue: "https://instagram.com/thawwafi.tour" },
    { name: "legalName", type: "text", required: true, label: "Nama badan hukum", defaultValue: "PT Noor Barkatul Haromain" },
    { name: "ppiu", type: "text", required: true, label: "Izin PPIU Kemenag", defaultValue: "12690001206830002" },
    { name: "addrLegal", type: "textarea", label: "Alamat legal", defaultValue: "Ruko Market City Pondok Cabe Blok C2 No. 2, Jalan Pondok Cabe Raya, Pamulang, Tangerang Selatan" },
    { name: "addrOps", type: "textarea", label: "Alamat operasional", defaultValue: "Ruko Urbana Place No. A8, Jl. Merpati Raya, Sawah Baru, Ciputat, Tangerang Selatan" },
    { name: "mapsQuery", type: "text", label: "Query Google Maps", defaultValue: "Urbana Place, Jl. Merpati Raya, Sawah Baru, Ciputat, Tangerang Selatan" },
  ],
};
