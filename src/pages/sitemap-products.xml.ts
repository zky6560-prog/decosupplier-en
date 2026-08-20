import type { APIRoute } from 'astro';
import {
  getProductCategories,
  getProductsByCategoryForSitemap,
} from '@/utils/nocobaseCategories';

const SITE_ORIGIN = 'https://www.decosupplier.com';

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function normalizeLastModified(value: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export const GET: APIRoute = async () => {
  const categories = await getProductCategories();

  if (categories.length === 0) {
    return new Response('Product sitemap source temporarily unavailable.', {
      status: 503,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Retry-After': '300',
      },
    });
  }

  let categoryProducts;
  try {
    categoryProducts = await Promise.all(
      categories.map(async (category) => ({
        category,
        products: await getProductsByCategoryForSitemap(category.id),
      })),
    );
  } catch (error) {
    console.error('NocoBase product sitemap unavailable:', error);
    return new Response('Product sitemap source temporarily unavailable.', {
      status: 503,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Retry-After': '300',
      },
    });
  }

  const urls = categoryProducts.flatMap(({ category, products }) => {
    const categoryUrl = new URL(category.href, SITE_ORIGIN).href;
    const productUrls = products.map((product) => ({
      location: new URL(`${category.href}/${product.slug}`, SITE_ORIGIN).href,
      lastModified: normalizeLastModified(product.updatedAt || product.createdAt),
    }));

    return [{ location: categoryUrl, lastModified: undefined }, ...productUrls];
  });

  const entries = urls.map(({ location, lastModified }) => [
    '<url>',
    `<loc>${escapeXml(location)}</loc>`,
    lastModified ? `<lastmod>${lastModified}</lastmod>` : '',
    '</url>',
  ].join('')).join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
  ].join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
    },
  });
};
