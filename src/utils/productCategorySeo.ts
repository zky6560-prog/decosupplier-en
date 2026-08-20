import { SITE } from '@config/site';
import type { ProductListItem } from '@/utils/nocobaseCategories';

export const productCategoryFaqs = [
  {
    question: 'What is the MOQ for PVC decorative film?',
    answer: 'Standard MOQ is 500 square meters per pattern/color. Small-batch trial orders are supported for first-time cooperation.',
  },
  {
    question: 'Can thickness and width be customized?',
    answer: 'Yes. Thickness can be customized from 0.12mm to 0.45mm, and width supports custom slitting.',
  },
  {
    question: 'What surface treatments are available?',
    answer: 'Matte, textured wood-grain, high-gloss UV coated, and more.',
  },
  {
    question: 'What environmental standards are met?',
    answer: 'Products are RoHS compliant, low VOCs, formaldehyde-free.',
  },
];

export function createProductCategoryItemListSchema(
  categoryName: string,
  categoryPath: string,
  products: ProductListItem[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${categoryName} Products`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
      const productUrl = new URL(`${categoryPath}/${product.slug}`, SITE.url).href;
      return {
        '@type': 'ListItem',
        position: index + 1,
        url: productUrl,
        item: {
          '@type': 'Product',
          '@id': productUrl,
          name: product.name,
          url: productUrl,
          image: new URL(product.productImage.src, SITE.url).href,
          sku: product.productCode,
          category: categoryName,
          brand: { '@type': 'Brand', name: 'DecoSupplier' },
        },
      };
    }),
  };
}
