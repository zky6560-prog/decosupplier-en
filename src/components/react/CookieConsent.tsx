import { useEffect, useState } from 'react';
import Icon from 'astro-iconset/react';

const CONSENT_KEY = 'decosupplier_cookie_consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(CONSENT_KEY) !== 'accepted');
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200 bg-white shadow-[0_-8px_30px_rgba(15,23,42,0.12)]"
      aria-label="Cookie consent"
      role="dialog"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex min-w-0 items-start gap-3">
          <Icon name="lucide:cookie" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary-600)]" />
          <div className="text-sm leading-6 text-slate-600">
            <p>
              We use essential cookies and, with your consent, analytics cookies to improve site performance and understand how visitors use DecoSupplier.
            </p>
            <nav className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1" aria-label="Legal policies">
              <a className="font-medium text-slate-800 underline underline-offset-2 hover:text-[var(--color-primary-600)]" href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              <span aria-hidden="true" className="text-slate-400">•</span>
              <a className="font-medium text-slate-800 underline underline-offset-2 hover:text-[var(--color-primary-600)]" href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>
              <span aria-hidden="true" className="text-slate-400">•</span>
              <a className="font-medium text-slate-800 underline underline-offset-2 hover:text-[var(--color-primary-600)]" href="/cookies" target="_blank" rel="noopener noreferrer">
                Cookie Policy
              </a>
            </nav>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3">
          <button
            type="button"
            onClick={rejectCookies}
            className="min-h-10 border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={acceptCookies}
            className="min-h-10 bg-[var(--color-primary-700)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-800)]"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
}
