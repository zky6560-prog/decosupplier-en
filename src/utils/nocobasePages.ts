import { cacheNocoBaseImage } from '@/utils/nocobaseImageCache';

export interface BlogPost {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  author: string;
  authorTitle: string;
  coverImage: string;
  isFeatured: boolean;
}

interface NocoBasePageCategory {
  name?: string;
  category_name?: string;
  category_name_EN?: string;
  title?: string;
}

interface NocoBasePageMedia {
  url?: string;
  title?: string;
  filename?: string;
}

interface NocoBasePage {
  id?: number | string;
  createdAt?: string;
  updatedAt?: string;
  page_name?: string;
  page_title?: string;
  subtitle?: string;
  summary?: string;
  content?: string;
  template?: string;
  slug?: string;
  route_path?: string;
  canonical_url?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: NocoBasePageMedia | NocoBasePageMedia[] | null;
  deco_page_categories_id?: NocoBasePageCategory | number | string | null;
  status?: string | boolean;
  is_enabled?: string | boolean;
  web_active?: string | boolean;
}

interface NocoBasePageListResponse {
  data?: NocoBasePage[];
  meta?: {
    totalPage?: number;
    total?: number;
    count?: number;
    pageSize?: number;
  };
}

export interface BlogPostWithContent extends BlogPost {
  subtitle: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
}

const CACHE_TTL_MS = 60_000;
let blogRequest: Promise<BlogPostWithContent[]> | null = null;
let blogCache: { value: BlogPostWithContent[]; expiresAt: number } | null = null;

function getEnvValue(astroValue: unknown, name: string): string | undefined {
  if (typeof astroValue === 'string' && astroValue.trim()) return astroValue.trim();
  if (typeof process !== 'undefined' && typeof process.env?.[name] === 'string') {
    return process.env[name]?.trim() || undefined;
  }
  return undefined;
}

function getImageUrl(image: NocoBasePageMedia | NocoBasePageMedia[] | null | undefined, baseUrl: string): string {
  const imageObject = Array.isArray(image) ? image[0] : image;
  if (!imageObject?.url) return '';
  if (/^https?:\/\//i.test(imageObject.url)) return imageObject.url;
  return new URL(imageObject.url, `${baseUrl}/`).href;
}

function isPublished(page: NocoBasePage): boolean {
  const value = page.status ?? page.is_enabled ?? page.web_active;
  return value === undefined
    || value === true
    || value === '启用'
    || value === '上架'
    || value === 'Published'
    || value === 'published'
    || value === 'Enabled'
    || value === 'enabled';
}

function getCategory(page: NocoBasePage): string {
  const category = page.deco_page_categories_id;
  if (category && typeof category === 'object') {
    return category.category_name_EN?.trim()
      || category.category_name?.trim()
      || category.name?.trim()
      || category.title?.trim()
      || 'Factory Updates';
  }
  return page.template?.trim() || 'Factory Updates';
}

function toSlug(page: NocoBasePage): string {
  const rawSlug = page.slug?.trim() || page.route_path?.split('/').filter(Boolean).pop()?.trim();
  if (rawSlug) return rawSlug.replace(/^\/+|\/+$/g, '');
  const base = page.page_name?.trim() || page.page_title?.trim() || String(page.id || 'blog');
  return base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `blog-${page.id || 'article'}`;
}

function toDate(value: string | undefined): string {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value.slice(0, 10) : date.toISOString().slice(0, 10);
}

async function localizeContentImages(content: string, baseUrl: string, token: string): Promise<string> {
  const sourceOrigin = new URL(baseUrl).origin;
  const sources = new Set<string>();
  const addSource = (source: string | undefined) => {
    if (source && (/^https?:\/\//i.test(source) || source.startsWith('/'))) sources.add(source);
  };

  for (const match of content.matchAll(/<img\b[^>]*\bsrc\s*=\s*(["'])([^"']+)\1/gi)) {
    addSource(match[2]);
  }
  for (const match of content.matchAll(/\b(?:srcset|data-srcset)\s*=\s*(["'])([^"']+)\1/gi)) {
    match[2].split(',').forEach((candidate) => addSource(candidate.trim().split(/\s+/)[0]));
  }
  for (const match of content.matchAll(/!\[[^\]]*\]\((?:<)?([^\s)>]+)(?:>)?(?:\s+["'][^"']*["'])?\)/g)) {
    addSource(match[1]);
  }

  const replacements = await Promise.all(Array.from(sources).map(async (source) => {
    const absoluteUrl = new URL(source, `${baseUrl}/`).href;
    return [source, await cacheNocoBaseImage(absoluteUrl, token, sourceOrigin)] as const;
  }));

  return replacements.reduce(
    (html, [source, localUrl]) => html.replaceAll(source, localUrl),
    content,
  );
}

async function mapPageToBlogPost(page: NocoBasePage, baseUrl: string, token: string, index: number): Promise<BlogPostWithContent | null> {
  const title = page.page_title?.trim() || page.page_name?.trim();
  if (!title || !page.id) return null;

  const slug = toSlug(page);
  const summary = page.summary?.trim() || page.subtitle?.trim() || '';
  const remoteCoverImage = getImageUrl(page.og_image, baseUrl);
  const coverImage = remoteCoverImage
    ? await cacheNocoBaseImage(remoteCoverImage, token, new URL(baseUrl).origin)
    : '/assets/blogbaner.jpg';
  const content = await localizeContentImages(page.content?.trim() || summary, baseUrl, token);
  const publishedAt = toDate(page.createdAt || page.updatedAt);
  const category = getCategory(page);

  return {
    id: Number(page.id) || index + 1,
    title,
    slug,
    excerpt: summary,
    publishedAt,
    category,
    author: 'DecoSupplier',
    authorTitle: 'DecoSupplier Editorial Team',
    coverImage,
    isFeatured: index === 0,
    subtitle: page.subtitle?.trim() || '',
    content,
    metaTitle: page.meta_title?.trim() || title,
    metaDescription: page.meta_description?.trim() || summary,
    metaKeywords: page.meta_keywords?.trim() || '',
    canonicalUrl: page.canonical_url?.trim() || '',
    ogTitle: page.og_title?.trim() || title,
    ogDescription: page.og_description?.trim() || summary,
  };
}

async function fetchBlogPostsFromNocoBase(): Promise<BlogPostWithContent[]> {
  const baseUrl = getEnvValue(import.meta.env.NOCObase_API_BASE_URL, 'NOCObase_API_BASE_URL');
  const token = getEnvValue(import.meta.env.NOCObase_API_TOKEN, 'NOCObase_API_TOKEN');
  if (!baseUrl || !token) return [];

  const apiBaseUrl = baseUrl.replace(/\/$/, '').replace(/\/api$/, '');
  const pageSize = 100;
  const fetchPage = async (page: number): Promise<NocoBasePageListResponse> => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      appends: 'deco_page_categories_id,og_image',
    });
    const response = await fetch(`${apiBaseUrl}/api/deco_pages:list?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`NocoBase pages request failed: ${response.status}`);
    return response.json() as Promise<NocoBasePageListResponse>;
  };

  const firstPage = await fetchPage(1);
  const reportedTotal = firstPage.meta?.total ?? firstPage.meta?.count;
  const reportedPageSize = firstPage.meta?.pageSize || pageSize;
  const totalPages = Math.max(
    1,
    firstPage.meta?.totalPage || (reportedTotal ? Math.ceil(reportedTotal / reportedPageSize) : 1),
  );
  const remainingPages = totalPages > 1
    ? await Promise.all(Array.from({ length: totalPages - 1 }, (_, index) => fetchPage(index + 2)))
    : [];
  const pages = [firstPage, ...remainingPages].flatMap((result) => result.data || []);

  const posts = pages
    .filter(isPublished)
    .filter((page) => {
      const route = page.route_path?.toLowerCase() || '';
      const template = page.template?.toLowerCase() || '';
      return route.includes('/blog') || template.includes('blog');
    })
    .sort((a, b) => String(b.createdAt || b.updatedAt || '').localeCompare(String(a.createdAt || a.updatedAt || '')))
    .map((page, index) => mapPageToBlogPost(page, apiBaseUrl, token, index));

  const mappedPosts = await Promise.all(posts);
  return mappedPosts.filter((post): post is BlogPostWithContent => post !== null);
}

export async function getBlogPosts(): Promise<BlogPostWithContent[]> {
  if (blogCache && blogCache.expiresAt > Date.now()) return blogCache.value;
  if (blogRequest) return blogRequest;

  blogRequest = fetchBlogPostsFromNocoBase()
    .then((posts) => {
      blogCache = { value: posts, expiresAt: Date.now() + CACHE_TTL_MS };
      return posts;
    })
    .catch((error) => {
      console.error('NocoBase blog pages unavailable:', error);
      throw error;
    })
    .finally(() => {
      blogRequest = null;
    });

  return blogRequest;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithContent | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getRelatedBlogPosts(currentSlug: string, limit = 3): Promise<BlogPostWithContent[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
