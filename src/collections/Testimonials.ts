import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Testimoni", plural: "Testimoni" },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Nama jamaah" },
    { name: "role", type: "text", required: true, label: "Keterangan (paket & bulan)" },
    { name: "text", type: "textarea", required: true, label: "Testimoni" },
    { name: "initials", type: "text", required: true, label: "Inisial (avatar)" },
  ],
};
