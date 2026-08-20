const EMAIL_PATTERN = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

// Keep the form focused on commonly used business and target-market TLDs.
const SUPPORTED_TLDS = new Set([
  'com', 'net', 'org', 'edu', 'gov', 'mil', 'biz', 'info', 'name', 'pro',
  'co', 'io', 'ai', 'app', 'dev', 'me', 'tv', 'tech', 'online', 'site',
  'store', 'shop', 'cloud', 'company', 'website', 'xyz',
  'cn', 'com.cn', 'net.cn', 'org.cn', 'hk', 'tw', 'mo', 'jp', 'kr', 'sg',
  'my', 'th', 'vn', 'id', 'in', 'au', 'nz', 'uk', 'ie', 'de', 'fr', 'it',
  'es', 'pt', 'nl', 'be', 'ch', 'at', 'se', 'no', 'dk', 'fi', 'pl', 'cz',
  'ca', 'us', 'mx', 'br', 'ar', 'cl', 'pe', 'ae', 'sa', 'qa', 'kw', 'om',
  'tr', 'ru', 'kz', 'uz', 'za',
]);

export function isValidBusinessEmail(value: string): boolean {
  const email = value.trim();
  if (!EMAIL_PATTERN.test(email)) return false;

  const [localPart, domain] = email.split('@');
  if (!localPart || localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
    return false;
  }
  if (!domain || domain.includes('..')) return false;

  const tld = domain.split('.').slice(-2).join('.').toLowerCase();
  return SUPPORTED_TLDS.has(tld) || SUPPORTED_TLDS.has(tld.split('.').pop() || '');
}

export function getEmailValidationError(value: string): string {
  const email = value.trim();
  if (!email) return 'Please enter your email address.';
  if (!isValidBusinessEmail(email)) return 'Please enter a valid email address.';
  return '';
}
