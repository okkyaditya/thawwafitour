import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Artikel", plural: "Artikel Blog" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "author"],
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Judul" },
    { name: "slug", type: "text", required: true, unique: true, label: "Slug URL" },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Kategori",
      options: [
        { label: "Panduan Sunnah", value: "panduan-sunnah" },
        { label: "Tips Umroh", value: "tips-umroh" },
        { label: "Berita Tanah Suci", value: "berita-tanah-suci" },
      ],
    },
    { name: "date", type: "date", required: true, label: "Tanggal", admin: { date: { pickerAppearance: "dayOnly" } } },
    { name: "author", type: "text", required: true, label: "Penulis" },
    { name: "readTime", type: "number", required: true, label: "Lama baca (menit)" },
    { name: "excerpt", type: "textarea", required: true, label: "Ringkasan" },
    {
      name: "content",
      type: "richText",
      label: "Isi Artikel (Editor Bebas / WYSIWYG)",
      required: true,
    },
    { name: "metaTitle", type: "text", label: "SEO: Meta title" },
    { name: "metaDescription", type: "textarea", label: "SEO: Meta description" },
    {
      name: "relatedCategories",
      type: "select",
      hasMany: true,
      label: "Kategori paket terkait",
      options: [
        { label: "Ruby", value: "ruby" },
        { label: "Sapphire", value: "sapphire" },
        { label: "Diamond", value: "diamond" },
      ],
    },
  ],
};
