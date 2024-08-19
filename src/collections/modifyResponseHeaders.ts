"use server";

export const modifyResponseHeaders = ({ headers }: { headers: Headers }) => {
  headers.set("Cache-Control", "public, max-age=86400");
  return headers;
};
