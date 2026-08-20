// src/components/react/RFQForm.tsx
import * as Label from '@radix-ui/react-label';
import Icon from 'astro-iconset/react';
import { useState } from 'react';
import { getEmailValidationError } from '@/utils/emailValidation';

const inquiryEndpoint = import.meta.env.PUBLIC_INQUIRY_ENDPOINT?.trim() || '/api/send-inquiry';
const fallbackInquiryEmail = import.meta.env.PUBLIC_INQUIRY_EMAIL?.trim() || 'info@decosupplier.com';

type InquiryPayload = Record<string, FormDataEntryValue | string[]> & {
  products: string[];
};

const isResendApiEndpoint = (endpoint: string) => /^https:\/\/api\.resend\.com\/emails\/?$/i.test(endpoint);

const createInquiryMailtoUrl = (payload: InquiryPayload) => {
  const value = (key: string) => String(payload[key] || '').trim() || '-';
  const products = payload.products.length ? payload.products.join(', ') : '-';
  const subject = `New Inquiry from ${value('name')}`;
  const body = [
    'New Inquiry from DecoSupplier website',
    '',
    `Name: ${value('name')}`,
    `Email: ${value('email')}`,
    `Phone: ${value('phone')}`,
    `Country: ${value('country')}`,
    `Company: ${value('company')}`,
    `Quantity: ${value('quantity')}`,
    `Products: ${products}`,
    '',
    'Message:',
    value('message'),
  ].join('\n');

  return `mailto:${encodeURIComponent(fallbackInquiryEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// 国家列表（含常用简称）
const countryList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea (North)',
  'Korea (South)',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom (UK)',
  'United States (USA)',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe'
];

export default function RFQForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('We will respond within 24 hours.');
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const emailErrorMessage = getEmailValidationError(String(data.email || ''));

    setEmailTouched(true);
    setEmailError(emailErrorMessage);
    if (emailErrorMessage) {
      setStatus('error');
      setErrorMsg(emailErrorMessage);
      document.getElementById('email')?.focus();
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const selectedProducts: string[] = [];
    form.querySelectorAll('input[name="products"]:checked').forEach((cb) =>
      selectedProducts.push((cb as HTMLInputElement).value)
    );

    const payload: InquiryPayload = { ...data, products: selectedProducts };

    if (isResendApiEndpoint(inquiryEndpoint)) {
      window.location.href = createInquiryMailtoUrl(payload);
      setStatus('success');
      setSuccessMsg('Your email app has opened with the inquiry details. Please send the email to complete the inquiry.');
      form.reset();
      setEmailTouched(false);
      setEmailError('');
      return;
    }

    try {
      const res = await fetch(inquiryEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseContentType = res.headers.get('content-type') || '';
      const result = responseContentType.includes('application/json')
        ? await res.json().catch(() => ({}))
        : {};

      if (res.ok && result.success !== false) {
        setStatus('success');
        setSuccessMsg('We will respond within 24 hours.');
        form.reset();
        setEmailTouched(false);
        setEmailError('');
      } else {
        setStatus('error');
        setErrorMsg(result.error || result.message || `Inquiry service returned HTTP ${res.status}. Please try again.`);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <form className="space-y-5" id="rfq-form" onSubmit={handleSubmit} name="rfq-form">
      {/* ===== Product Requirements ===== */}
      <div>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-teal-600 flex items-center justify-center mr-2">
            <Icon name="lucide:package" className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Products Requirements <span className="text-red-500">*</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {[
            { id: 'pvc-film', label: 'PVC Decorative Film' },
            { id: 'lvt-flooring', label: 'Peel and Stick Vinyl Flooring' },
            { id: 'spc-panels', label: 'PVC Wall Panel' },
            { id: 'refinishing-film', label: 'Self-Adhesive Decorative Film' },
            { id: 'foam-panels', label: 'Self-adhesive Foam Wallpaper Roll' },
            { id: 'wallpapers', label: 'Peel & Stick Wallpapers' },
            { id: '3d-pvc-panels', label: '3D PVC Wall Panel' },
          ].map((product) => (
            <label
              key={product.id}
              htmlFor={product.id}
              className="flex items-center space-x-2 p-2 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group"
            >
              <input
                type="checkbox"
                id={product.id}
                name="products"
                value={product.id}
                className="h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-blue-600"
              />
              <span className="text-xs md:text-sm font-medium text-gray-700 cursor-pointer flex-1 group-hover:text-gray-900 transition-colors">
                {product.label}
              </span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">Select at least one product</p>
      </div>

      {/* ===== All Fields (Vertical layout) ===== */}
      <div className="space-y-4">
        {/* Name */}
        <div>
          <Label.Root htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </Label.Root>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Email */}
        <div>
          <Label.Root htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </Label.Root>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="email@company.com"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? 'email-error' : undefined}
            onChange={(event) => {
              if (emailTouched) setEmailError(getEmailValidationError(event.currentTarget.value));
            }}
            onBlur={(event) => {
              setEmailTouched(true);
              setEmailError(getEmailValidationError(event.currentTarget.value));
            }}
            onInvalid={(event) => {
              event.preventDefault();
              setEmailTouched(true);
              setEmailError(getEmailValidationError(event.currentTarget.value));
            }}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${emailError ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
          {emailError && (
            <p id="email-error" role="alert" className="text-red-600 text-xs mt-1">
              {emailError}
            </p>
          )}
        </div>

        {/* Phone Number (Vertical) */}
        <div>
          <Label.Root htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </Label.Root>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="+1234 567 8900"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Country (with search) */}
        <div>
          <Label.Root htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </Label.Root>
          <div className="relative">
            <input
              type="text"
              id="country"
              name="country"
              list="country-list"
              placeholder="Please select your country"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <datalist id="country-list">
              {countryList.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
            <Icon name="lucide:search" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Company */}
        <div>
          <Label.Root htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </Label.Root>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Your company name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Estimated Quantity (Vertical) */}
        <div>
          <Label.Root htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Quantity
          </Label.Root>
          <input
            type="text"
            id="quantity"
            name="quantity"
            placeholder="e.g. 500 sqm, 1000 rolls"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition"
          />
        </div>

        {/* Message */}
        <div>
          <Label.Root htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </Label.Root>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Please describe your project requirements: target application (wall floor, furniture), preferred colors/textures, pattern references, desired thickness, MOQ needs, or any custom specifications..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition resize-none"
          />
        </div>
      </div>

      {/* ===== Submit ===== */}
      <div className="pt-4">
        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <Icon name="lucide:circle-check" className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-green-800 font-semibold">Inquiry Sent Successfully!</p>
            <p className="text-green-600 text-sm mt-1">{successMsg}</p>
          </div>
        ) : (
          <>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-linear-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg shadow-lg hover:from-[var(--color-primary-700)] hover:to-[var(--color-secondary-700)] transition-all duration-200 hover:shadow-xl active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Inquiry & Get Free Samples</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
            {status === 'error' && (
              <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                <p className="text-red-700 text-sm">{errorMsg}</p>
              </div>
            )}
            <p className="text-xs md:text-sm text-gray-500 text-center mt-4">
              We respond to all inquiries within 24 hours. Your information is protected by our Privacy Policy.
            </p>
          </>
        )}
      </div>
    </form>
  );
}
