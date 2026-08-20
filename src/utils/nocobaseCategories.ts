import { cacheNocoBaseImage } from '@/utils/nocobaseImageCache';

export interface ProductCategory {
  id: number | string;
  name: string;
  slug: string;
  href: string;
  image: string;
}

export interface ProductListItem {
  id: number | string;
  name: string;
  productCode: string;
  supplyCode: string;
  patternType: string;
  collectionId: string;
  collectionName: string;
  collectionDescription: string;
  colorFamily: string;
  sizes: string[];
  thicknesses: string[];
  finish: string;
  moq: string;
  leadTime: string;
  tradeTerms: string;
  productImage: { src: string };
  showImage: { src: string };
  relatedImages: Array<{ src: string; alt: string }>;
  description: string;
  remark: string;
  keywords: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

interface NocoBaseImage {
  url?: string;
}

interface NocoBaseCategory {
  id?: number | string;
  category_name_EN?: string;
  category_slug?: string;
  is_enabled?: string | boolean;
  Category_Img?: NocoBaseImage | NocoBaseImage[] | null;
  deco_product_image_id?: number | string | null;
}

interface NocoBaseListResponse {
  data?: NocoBaseCategory[];
}

interface NocoBaseProductImage {
  url?: string;
  title?: string;
  filename?: string;
}

interface NocoBasePatternCollection {
  id?: number | string;
  pattern_types?: string;
  collection_name?: string;
  description?: string;
  keyword?: string;
}

interface NocoBaseProduct {
  id?: number | string;
  createdAt?: string;
  updatedAt?: string;
  product_name?: string;
  product_code?: string;
  supply_Code?: string;
  color_family?: string;
  description?: string | null;
  remark?: string | null;
  keywords?: string | null;
  size?: string | null;
  sizes?: string | null;
  product_size?: string | null;
  thickness?: string | null;
  thicknesses?: string | null;
  total_thickness?: string | null;
  finish?: string | null;
  surface_finish?: string | null;
  moq?: string | null;
  MOQ?: string | null;
  lead_time?: string | null;
  trade_terms?: string | null;
  web_active?: string | boolean;
  main_image_id?: NocoBaseProductImage | null;
  related_img?: NocoBaseProductImage[] | null;
  pattern_collection_id?: NocoBasePatternCollection | null;
  deco_category_id?: number | string;
}

interface NocoBaseProductListResponse {
  data?: NocoBaseProduct[];
  meta?: {
    totalPage?: number;
  };
}

const LOCAL_CATEGORY_ROUTES: Record<string, string> = {
  'pvc-wall-panel': 'pvc_wall_panel',
  'self-adhesive-foam-wall-roll': 'self-adhesive-foam-wall-panels',
  '3d-pvc-wall-panel': '3d-pvc-wall-panels',
  'peel-stick-wallpapers': 'peel-and-stick-wallpapers',
};

const CACHE_TTL_MS = 60_000;

let categoryRequest: Promise<ProductCategory[]> | null = null;
let categoryCache: { value: ProductCategory[]; expiresAt: number } | null = null;
const productRequests = new Map<string, { value: ProductListItem[]; expiresAt: number }>();
const productPendingRequests = new Map<string, Promise<ProductListItem[]>>();

function getEnvValue(astroValue: unknown, name: string): string | undefined {
  if (typeof astroValue === 'string' && astroValue.trim()) return astroValue.trim();
  if (typeof process !== 'undefined' && typeof process.env?.[name] === 'string') {
    return process.env[name]?.trim() || undefined;
  }
  return undefined;
}

function getImageUrl(image: NocoBaseImage | NocoBaseImage[] | null | undefined, baseUrl: string): string {
  const imageObject = Array.isArray(image) ? image[0] : image;
  if (!imageObject?.url) return '';
  if (/^https?:\/\//i.test(imageObject.url)) return imageObject.url;
  return new URL(imageObject.url, `${baseUrl}/`).href;
}

function isEnabled(value: string | boolean | undefined): boolean {
  return value === true || value === '启用' || value === 'Enabled' || value === 'enabled';
}

function isOnline(value: string | boolean | undefined): boolean {
  return value === true || value === '上架' || value === 'Published' || value === 'published';
}

function toProductImage(image: NocoBaseProductImage | null | undefined, baseUrl: string): string {
  return getImageUrl(image, baseUrl);
}

function toProductSlug(product: NocoBaseProduct): string {
  const id = product.id;
  const code = product.product_code?.trim();
  const supplyCode = product.supply_Code?.trim();
  const name = product.product_name?.trim();
  const base = code || supplyCode || name || String(id || 'product');
  return `${base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${id || 'item'}`;
}

function normalizeFilterValue(value: string | undefined): string {
  const normalized = value?.trim();
  if (!normalized || normalized.toLowerCase() === 'other') return 'Other';
  return normalized;
}

function splitOptionValues(...values: Array<string | null | undefined>): string[] {
  const options = values
    .flatMap((value) => (value || '').split(/[,;|/\n]/))
    .map((value) => value.trim())
    .filter(Boolean);
  return [...new Set(options)];
}

async function fetchProductCategories(): Promise<ProductCategory[]> {
  const baseUrl = getEnvValue(import.meta.env.NOCObase_API_BASE_URL, 'NOCObase_API_BASE_URL');
  const token = getEnvValue(import.meta.env.NOCObase_API_TOKEN, 'NOCObase_API_TOKEN');
  if (!baseUrl || !token) return [];

  const apiBaseUrl = baseUrl.replace(/\/$/, '').replace(/\/api$/, '');
  const nocobaseOrigin = new URL(apiBaseUrl).origin;
  const response = await fetch(
    `${apiBaseUrl}/api/deco_category:list?page=1&pageSize=100&appends=Category_Img`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    },
  );

  if (!response.ok) throw new Error(`NocoBase category request failed: ${response.status}`);
  const payload = await response.json() as NocoBaseListResponse;

  const categories = (payload.data || [])
    .filter((category) => isEnabled(category.is_enabled))
    .filter((category) => category.id && category.category_name_EN && category.category_slug);

  return Promise.all(categories.map(async (category) => {
    const sourceImage = getImageUrl(category.Category_Img, apiBaseUrl);

    return {
      id: category.id as number | string,
      name: category.category_name_EN as string,
      slug: category.category_slug as string,
      href: `/products/${LOCAL_CATEGORY_ROUTES[category.category_slug as string] || category.category_slug}`,
      image: sourceImage
        ? await cacheNocoBaseImage(sourceImage, token, nocobaseOrigin)
        : '',
    };
  }));
}

export function getProductCategories(): Promise<ProductCategory[]> {
  if (categoryCache !== null && categoryCache.expiresAt > Date.now()) {
    return Promise.resolve(categoryCache.value);
  }

  if (categoryRequest !== null) {
    return categoryRequest;
  }

  const staleCategories = categoryCache?.value || [];
  categoryRequest = fetchProductCategories()
    .then((categories) => {
      categoryCache = { value: categories, expiresAt: Date.now() + CACHE_TTL_MS };
      return categories;
    })
    .catch((error) => {
      console.error('NocoBase categories unavailable:', error);
      if (staleCategories.length > 0) return staleCategories;
      throw error;
    })
    .finally(() => {
      categoryRequest = null;
    });

  return categoryRequest;
}

async function fetchProductsByCategory(categoryId: number | string): Promise<ProductListItem[]> {
  const baseUrl = getEnvValue(import.meta.env.NOCObase_API_BASE_URL, 'NOCObase_API_BASE_URL');
  const token = getEnvValue(import.meta.env.NOCObase_API_TOKEN, 'NOCObase_API_TOKEN');
  if (!baseUrl || !token) return [];

  const apiBaseUrl = baseUrl.replace(/\/$/, '').replace(/\/api$/, '');
  const nocobaseOrigin = new URL(apiBaseUrl).origin;
  const fetchPage = async (page: number): Promise<NocoBaseProductListResponse> => {
    const query = new URLSearchParams({
      page: String(page),
      pageSize: '100',
      'filter[deco_category_id][$eq]': String(categoryId),
      'filter[web_active][$eq]': '上架',
      appends: 'main_image_id,related_img,pattern_collection_id',
    });
    const response = await fetch(`${apiBaseUrl}/api/deco_product:list?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) throw new Error(`NocoBase products request failed: ${response.status}`);
    return response.json() as Promise<NocoBaseProductListResponse>;
  };

  const firstPage = await fetchPage(1);
  const totalPages = Math.max(1, firstPage.meta?.totalPage || 1);
  const remainingPages = totalPages > 1
    ? await Promise.all(Array.from({ length: totalPages - 1 }, (_, index) => fetchPage(index + 2)))
    : [];
  const products = [
    ...(firstPage.data || []),
    ...remainingPages.flatMap((page) => page.data || []),
  ];

  const onlineProducts = products
    .filter((product) => isOnline(product.web_active))
    .filter((product) => product.id);

  return Promise.all(onlineProducts.map(async (product) => {
    const mainImage = toProductImage(product.main_image_id, apiBaseUrl);
    const productImage = mainImage
      ? await cacheNocoBaseImage(mainImage, token, nocobaseOrigin)
      : '/assets/product/product (1).jpg';
    const patternType = normalizeFilterValue(product.pattern_collection_id?.pattern_types);
    const productCode = product.product_code?.trim() || product.supply_Code?.trim() || String(product.id);
    const productName = product.product_name?.trim() || product.supply_Code?.trim() || productCode;
    const relatedImageEntries = Array.isArray(product.related_img) ? product.related_img : [];
    const relatedImages = (await Promise.all(relatedImageEntries.map(async (image, index) => {
      const imageUrl = toProductImage(image, apiBaseUrl);
      if (!imageUrl) return null;
      return {
        src: await cacheNocoBaseImage(imageUrl, token, nocobaseOrigin),
        alt: image.title?.trim() || `Product view ${index + 1}`,
      };
    }))).filter((image): image is { src: string; alt: string } => image !== null);
    return {
      id: product.id as number | string,
      name: productName,
      productCode,
      supplyCode: product.supply_Code?.trim() || productCode,
      patternType,
      collectionId: product.pattern_collection_id?.id !== undefined
        ? String(product.pattern_collection_id.id)
        : '',
      collectionName: product.pattern_collection_id?.collection_name?.trim() || patternType,
      collectionDescription: product.pattern_collection_id?.description?.trim() || '',
      colorFamily: normalizeFilterValue(product.color_family),
      sizes: splitOptionValues(product.size, product.sizes, product.product_size),
      thicknesses: splitOptionValues(product.thickness, product.thicknesses, product.total_thickness),
      finish: product.finish?.trim() || product.surface_finish?.trim() || '',
      moq: product.moq?.trim() || product.MOQ?.trim() || '',
      leadTime: product.lead_time?.trim() || '',
      tradeTerms: product.trade_terms?.trim() || '',
      productImage: { src: productImage },
      showImage: { src: relatedImages[0]?.src || productImage },
      relatedImages,
      description: product.description?.trim() || '',
      remark: product.remark?.trim() || '',
      keywords: product.keywords?.trim() || product.pattern_collection_id?.keyword?.trim() || '',
      createdAt: product.createdAt || '',
      updatedAt: product.updatedAt || '',
      slug: toProductSlug(product),
    };
  }));
}

export function getProductsByCategory(categoryId: number | string): Promise<ProductListItem[]> {
  const cacheKey = String(categoryId);
  const cachedProducts = productRequests.get(cacheKey);
  if (cachedProducts && cachedProducts.expiresAt > Date.now()) {
    return Promise.resolve(cachedProducts.value);
  }

  const pendingRequest = productPendingRequests.get(cacheKey);
  if (pendingRequest) return pendingRequest;

  const staleProducts = cachedProducts?.value || [];
  const request = fetchProductsByCategory(categoryId)
    .then((products) => {
      productRequests.set(cacheKey, { value: products, expiresAt: Date.now() + CACHE_TTL_MS });
      return products;
    })
    .catch((error) => {
      console.error(`NocoBase products unavailable for category ${cacheKey}:`, error);
      if (staleProducts.length > 0) return staleProducts;
      throw error;
    })
    .finally(() => {
      productPendingRequests.delete(cacheKey);
    });
  productPendingRequests.set(cacheKey, request);
  return request;
}

export async function getProductsByCategoryForSitemap(
  categoryId: number | string,
): Promise<ProductListItem[]> {
  const cacheKey = String(categoryId);
  const cachedProducts = productRequests.get(cacheKey);

  if (cachedProducts && cachedProducts.expiresAt > Date.now()) {
    return cachedProducts.value;
  }

  try {
    const products = await fetchProductsByCategory(categoryId);
    productRequests.set(cacheKey, { value: products, expiresAt: Date.now() + CACHE_TTL_MS });
    return products;
  } catch (error) {
    if (cachedProducts) return cachedProducts.value;
    throw error;
  }
}

export async function getProductBySlug(
  categoryId: number | string,
  productSlug: string,
): Promise<ProductListItem | undefined> {
  const products = await getProductsByCategory(categoryId);
  return products.find((product) => product.slug === productSlug);
}
