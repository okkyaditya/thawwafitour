import type { CollectionConfig } from "payload";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: { singular: "Foto Galeri", plural: "Galeri" },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Judul foto" },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Kategori",
      options: [
        { label: "Makkah", value: "makkah" },
        { label: "Madinah", value: "madinah" },
        { label: "Fasilitas", value: "fasilitas" },
        { label: "Keberangkatan", value: "keberangkatan" },
        { label: "Wisata Ziarah", value: "wisata-ziarah" },
        { label: "Manasik", value: "manasik" },
      ],
    },
    {
      name: "art",
      type: "select",
      required: true,
      label: "Ilustrasi placeholder",
      options: [
        { label: "Kaaba", value: "kaaba" },
        { label: "Nabawi", value: "nabawi" },
        { label: "Haramain (kereta)", value: "haramain" },
        { label: "Pesawat", value: "plane" },
        { label: "Thaif", value: "thaif" },
        { label: "Manasik", value: "manasik" },
        { label: "Hotel", value: "hotel" },
        { label: "Jamaah", value: "group" },
      ],
    },
  ],
};
