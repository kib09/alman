import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/account/',
        '/cart/',
        '/wishlist/',
        '/checkout/',
        '/orders/',
        '/login/',
        '/register/',
      ],
    },
    sitemap: 'https://alman.com/sitemap.xml',
  }
}
