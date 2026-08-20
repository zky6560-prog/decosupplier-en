// Site configuration
export const SITE = {
  title: 'DecoSupplier - PVC Decorative Film, LVT Flooring & PVC Wall Panel Factory',
  description: 'Factory-direct PVC decorative film, LVT flooring & PVC wall panel manufacturer from China. ISO 9001 certified, 52 patents, 1000+ in-stock patterns, OEM/ODM supported. Free samples & factory quotes. Serving 30+ countries.',
  url: 'https://www.decosupplier.com',
  author: 'DecoSupplier',
  // Google Analytics 4 Measurement ID（替换为实际 ID）
  ga4Id: 'G-XXXXXXXXXX',
} as const;

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' }, // 无备注
  { name: 'About', href: '/about' }, // 无备注
  { name: 'Service', href: '/service' }, // 无备注
  { name: 'Blog', href: '/Blog' }, // 无备注
  { name: 'Contact', href: '/contact' }, // 无备注

] as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/decosupplier',
  twitter: 'https://twitter.com/decosupplier',
  facebook: 'https://facebook.com/decosupplier',
  // 建议增加: 
  // youtube: 'https://youtube.com/decousupplier',
  // instagram: 'https://instagram.com/decousupplier',
} as const;
