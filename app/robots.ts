import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/.env", "/.env.local"],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
        crawlDelay: 1,
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot"],
        disallow: "/",
      },
    ],
    sitemap: "https://truthmatrix.vercel.app/sitemap.xml",
  };
}
