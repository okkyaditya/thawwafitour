import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  labels: {
    singular: "Media & Foto",
    plural: "Media & Foto",
  },
  upload: {
    staticDir: "public/media",
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 800,
        height: 500,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt Text / Keterangan Gambar",
    },
  ],
};
