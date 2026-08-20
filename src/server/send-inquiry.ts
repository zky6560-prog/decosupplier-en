import type { APIRoute } from 'astro';
import { isValidBusinessEmail } from '@/utils/emailValidation';

// Reference handler for SSR/function deployments. Static builds cannot expose this POST route directly.

// HTML 转义，防止 XSS 注入
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 统一 CORS 响应头
function corsHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function getServerEnv(astroValue: unknown, name: string): string | undefined {
  if (typeof astroValue === 'string' && astroValue.trim()) {
    return astroValue.trim();
  }

  if (typeof process !== 'undefined' && typeof process.env?.[name] === 'string') {
    const nodeValue = process.env[name];
    return nodeValue?.trim() || undefined;
  }

  return undefined;
}

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ success: false, error: 'Method Not Allowed' }), {
    status: 405,
    headers: {
      ...corsHeaders(),
      Allow: 'POST, OPTIONS',
    },
  });
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
};

export const POST: APIRoute = async ({ request }) => {
  const apiKey = getServerEnv(import.meta.env.RESEND_API_KEY, 'RESEND_API_KEY');
  const fromEmail = getServerEnv(import.meta.env.RESEND_FROM_EMAIL, 'RESEND_FROM_EMAIL');
  const recipientEmail = getServerEnv(import.meta.env.RESEND_TO_EMAIL, 'RESEND_TO_EMAIL');
  const fallbackReplyToEmail = getServerEnv(import.meta.env.RESEND_REPLY_TO_EMAIL, 'RESEND_REPLY_TO_EMAIL');

  if (!apiKey || !fromEmail || !recipientEmail) {
    const missing = [
      !apiKey ? 'RESEND_API_KEY' : '',
      !fromEmail ? 'RESEND_FROM_EMAIL' : '',
      !recipientEmail ? 'RESEND_TO_EMAIL' : '',
    ].filter(Boolean);
    console.error(`Missing Resend environment variables: ${missing.join(', ')}`);
    return new Response(JSON.stringify({
      success: false,
      error: `Server configuration error: missing ${missing.join(', ')}`,
    }), {
      status: 500,
      headers: corsHeaders(),
    });
  }

  try {
    const rawBody = await request.text();
    if (!rawBody.trim()) {
      return new Response(JSON.stringify({ success: false, error: 'Request body is empty' }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return new Response(JSON.stringify({ success: false, error: 'Invalid request payload' }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const { products, name, email, phone, country, company, quantity, message } = body;
    const customerEmail = typeof email === 'string' ? email.trim() : '';
    if (!isValidBusinessEmail(customerEmail)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Please enter a valid email address.',
      }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    // HTML 转义所有用户输入
    const safeName = escapeHtml(name || '');
    const safeEmail = escapeHtml(email || '');
    const safePhone = escapeHtml(phone || '');
    const safeCountry = escapeHtml(country || '');
    const safeCompany = escapeHtml(company || '');
    const safeQuantity = escapeHtml(quantity || '');
    const safeMessage = escapeHtml(message || '');

    // 构建产品列表
    const safeProducts: string[] = Array.isArray(products) ? products.map(escapeHtml) : [];
    const productListHtml = safeProducts.length
      ? safeProducts.map((p) => `<li>${p}</li>`).join('')
      : '<li>Not specified</li>';

    // 邮件主题
    const productSummary = safeProducts.length ? safeProducts.join(', ') : 'General';

    const html = `
      <h2>New Inquiry from DecoSupplier</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:Arial,sans-serif">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;width:150px">Name</td><td style="padding:8px;border:1px solid #ddd">${safeName || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px;border:1px solid #ddd">${safeEmail || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Phone</td><td style="padding:8px;border:1px solid #ddd">${safePhone || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Country</td><td style="padding:8px;border:1px solid #ddd">${safeCountry || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Company</td><td style="padding:8px;border:1px solid #ddd">${safeCompany || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Quantity</td><td style="padding:8px;border:1px solid #ddd">${safeQuantity || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Products</td><td style="padding:8px;border:1px solid #ddd"><ul style="margin:0;padding-left:16px">${productListHtml}</ul></td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Message</td><td style="padding:8px;border:1px solid #ddd">${safeMessage || '-'}</td></tr>
      </table>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `DecoSupplier Inquiry <${fromEmail}>`,
        to: recipientEmail,
        reply_to: customerEmail || fallbackReplyToEmail || undefined,
        subject: `New Inquiry from ${safeName || 'Customer'} - ${productSummary}`,
        html,
      }),
    });

    if (!res.ok) {
      const responseText = await res.text();
      let errorMessage = `Resend request failed (HTTP ${res.status})`;
      try {
        const errorBody = JSON.parse(responseText) as { message?: string };
        errorMessage = errorBody.message || errorMessage;
      } catch {
        if (responseText.trim()) errorMessage = responseText.slice(0, 300);
      }
      console.error('Resend API error:', errorMessage);
      return new Response(JSON.stringify({ success: false, error: errorMessage }), {
        status: 500,
        headers: corsHeaders(),
      });
    }

    console.log('Email sent successfully');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error('send-inquiry error:', error);
    return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Internal server error' }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
};
