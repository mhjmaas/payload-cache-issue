import type { CollectionConfig } from "payload";
import { modifyResponseHeaders } from "./modifyResponseHeaders";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    modifyResponseHeaders: modifyResponseHeaders,
  },
};
