type Env = {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  RESEND_TO_EMAIL?: string;
  RESEND_REPLY_TO_EMAIL?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

type InquiryPayload = {
  products?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  country?: unknown;
  company?: unknown;
  quantity?: unknown;
  message?: unknown;
};

const EMAIL_PATTERN = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

const jsonResponse = (body: Record<string, unknown>, status = 200) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
};

const toText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const normalizeProducts = (value: unknown) => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => toText(item)).filter(Boolean);
};

const isValidEmail = (value: string) => EMAIL_PATTERN.test(value);

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const onRequestPost = async ({ request, env }: PagesContext) => {
  const apiKey = env.RESEND_API_KEY?.trim();
  const fromEmail = env.RESEND_FROM_EMAIL?.trim();
  const toEmail = env.RESEND_TO_EMAIL?.trim();
  const fallbackReplyToEmail = env.RESEND_REPLY_TO_EMAIL?.trim();

  if (!apiKey || !fromEmail || !toEmail) {
    const missingVariables = [
      !apiKey ? 'RESEND_API_KEY' : '',
      !fromEmail ? 'RESEND_FROM_EMAIL' : '',
      !toEmail ? 'RESEND_TO_EMAIL' : '',
    ].filter(Boolean);

    return jsonResponse({
      success: false,
      error: `Inquiry email service is not configured. Missing: ${missingVariables.join(', ')}.`,
    }, 500);
  }

  let payload: InquiryPayload;
  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return jsonResponse({ success: false, error: 'Invalid request payload.' }, 400);
  }

  const products = normalizeProducts(payload.products);
  const name = toText(payload.name);
  const email = toText(payload.email);
  const phone = toText(payload.phone);
  const country = toText(payload.country);
  const company = toText(payload.company);
  const quantity = toText(payload.quantity);
  const message = toText(payload.message);

  if (!isValidEmail(email)) {
    return jsonResponse({ success: false, error: 'Please enter a valid email address.' }, 400);
  }

  if (!name || !phone || !message) {
    return jsonResponse({ success: false, error: 'Please complete all required fields.' }, 400);
  }

  const safeProducts = products.map(escapeHtml);
  const productListHtml = safeProducts.length
    ? safeProducts.map((product) => `<li>${product}</li>`).join('')
    : '<li>Not specified</li>';
  const productSummary = safeProducts.length ? safeProducts.join(', ') : 'General';

  const html = `
    <h2>New Inquiry from DecoSupplier</h2>
    <table style="border-collapse:collapse;width:100%;max-width:640px;font-family:Arial,sans-serif">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;width:150px">Name</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(name) || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(email) || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Phone</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(phone) || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Country</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(country) || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Company</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(company) || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Quantity</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(quantity) || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Products</td><td style="padding:8px;border:1px solid #ddd"><ul style="margin:0;padding-left:16px">${productListHtml}</ul></td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Message</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(message) || '-'}</td></tr>
    </table>
  `;

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `DecoSupplier Inquiry <${fromEmail}>`,
      to: [toEmail],
      reply_to: email || fallbackReplyToEmail || undefined,
      subject: `New Inquiry from ${name || 'Customer'} - ${productSummary}`,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return jsonResponse({
      success: false,
      error: errorText || `Resend request failed with status ${resendResponse.status}.`,
    }, 502);
  }

  return jsonResponse({ success: true });
};

const methodNotAllowed = async () => {
  return jsonResponse({ success: false, error: 'Method Not Allowed' }, 405);
};

export const onRequestGet = methodNotAllowed;
export const onRequestPut = methodNotAllowed;
export const onRequestPatch = methodNotAllowed;
export const onRequestDelete = methodNotAllowed;
