import type { CollectionConfig } from "payload";

export const Ustadz: CollectionConfig = {
  slug: "ustadz",
  labels: { singular: "Ustadz", plural: "Asatidzah" },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Nama" },
    { name: "role", type: "text", required: true, label: "Peran" },
    { name: "focus", type: "textarea", required: true, label: "Deskripsi / fokus" },
    { name: "initials", type: "text", required: true, label: "Inisial (avatar)" },
  ],
};
