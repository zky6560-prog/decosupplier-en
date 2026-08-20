// src/components/react/FloatingCTA.tsx
import { useState, useEffect, useRef } from 'react';
import { Icon } from 'astro-iconset/react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showContactCard, setShowContactCard] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 联系方式数据
  const contactInfo = {
    wechatId: 'decosupplier_2025',
    phone: '+86 574 8888-6688',
    email: 'info@decosupplier.com',
    whatsapp: '+86 138 8888 8888',
    qrCode: '/images/wechat-qr.png',
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击外部关闭联系人卡片
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setShowContactCard(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 复制功能（点击内容直接复制）
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    }).catch(() => {
      // 降级方案
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  // 悬停延迟显示
  const handleContactHover = (show: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowContactCard(show);
    }, show ? 200 : 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 bottom-24 z-40 flex flex-col gap-2.5">
      {/* ===== 1. Free Samples ===== */}
      <a
        href="/contact"
        className="group relative w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label="Get Free Samples"
      >
        <Icon name="lucide:package" className="w-5 h-5" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Free Samples
        </span>
      </a>

      {/* ===== 2. WhatsApp ===== */}
      <a
        href={`https://wa.me/${contactInfo.whatsapp.replace(/\s/g, '')}?text=Hi%20DecoSupplier%2C%20I%27m%20interested%20in%20your%20products`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-11 h-11 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <Icon name="lucide:message-circle" className="w-5 h-5" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          WhatsApp
        </span>
      </a>

      {/* ===== 3. Contact（联系人复合按钮 - 使用"打电话的人"图标） ===== */}
      <div
        ref={contactRef}
        className="relative"
        onMouseEnter={() => handleContactHover(true)}
        onMouseLeave={() => handleContactHover(false)}
      >
        <button
          className="w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          aria-label="Contact Us"
          onClick={() => setShowContactCard(!showContactCard)}
        >
          {/* 使用 phone-call 图标，更接近"打电话的人" */}
          <Icon name="lucide:phone-call" className="w-5 h-5" />
        </button>

        {/* 向左弹出的联系人卡片（放大了宽度） */}
        {showContactCard && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-6 animate-slideInLeft">
            {/* 三角形箭头 */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white"></div>

            <div className="text-center mb-5">
              <h4 className="text-base font-bold text-slate-800">Contact Us</h4>
              <p className="text-xs text-slate-500">Click any info to copy</p>
            </div>

            {/* 微信二维码 */}
            <div className="flex justify-center mb-5">
              <div className="w-36 h-36 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 overflow-hidden">
                {contactInfo.qrCode ? (
                  <img
                    src={contactInfo.qrCode}
                    alt="WeChat QR Code"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'text-center text-slate-400 text-xs p-2';
                        placeholder.innerHTML = `
                          <svg class="w-12 h-12 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                          </svg>
                          <span>Scan with WeChat</span>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                ) : (
                  <div className="text-center text-slate-400 text-xs p-2">
                    <svg className="w-12 h-12 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span>QR Code</span>
                  </div>
                )}
              </div>
            </div>

            {/* 联系方式列表（点击内容直接复制） */}
            <div className="space-y-2.5 text-sm">
              {/* 微信号 */}
              <div
                onClick={() => copyToClipboard(contactInfo.wechatId, 'WeChat ID')}
                className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2.5 border border-slate-200 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm7.316 2.878c-2.941 0-5.326 2.37-5.326 5.294 0 2.924 2.385 5.294 5.326 5.294a5.65 5.65 0 0 0 2.624-.643l1.388.813a.353.353 0 0 0 .17.049c.164 0 .293-.129.293-.292 0-.058-.02-.11-.039-.162l-.334-1.272a.528.528 0 0 1 .173-.598c1.372-1.043 2.283-2.605 2.283-4.346 0-2.924-2.385-5.294-5.326-5.294zm-2.462 2.533c.48 0 .867.395.867.882a.87.87 0 0 1-.867.882.87.87 0 0 1-.867-.882c0-.487.388-.882.867-.882zm3.74 0c.48 0 .867.395.867.882a.87.87 0 0 1-.867.882.87.87 0 0 1-.867-.882c0-.487.388-.882.867-.882z"/>
                  </svg>
                  <span className="text-slate-500 text-xs font-medium shrink-0">WeChat:</span>
                  <span className="text-slate-800 font-mono text-sm">{contactInfo.wechatId}</span>
                </div>
                <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  {copiedText === 'WeChat ID' ? '✅ Copied!' : 'Click to copy'}
                </span>
              </div>

              {/* 电话 */}
              <div
                onClick={() => copyToClipboard(contactInfo.phone, 'Phone')}
                className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2.5 border border-slate-200 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Icon name="lucide:phone" className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="text-slate-500 text-xs font-medium shrink-0">Phone:</span>
                  <span className="text-slate-800 font-mono text-sm">{contactInfo.phone}</span>
                </div>
                <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  {copiedText === 'Phone' ? '✅ Copied!' : 'Click to copy'}
                </span>
              </div>

              {/* 邮箱 */}
              <div
                onClick={() => copyToClipboard(contactInfo.email, 'Email')}
                className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2.5 border border-slate-200 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Icon name="lucide:mail" className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-slate-500 text-xs font-medium shrink-0">Email:</span>
                  <span className="text-slate-800 font-mono text-sm">{contactInfo.email}</span>
                </div>
                <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  {copiedText === 'Email' ? '✅ Copied!' : 'Click to copy'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== 4. Live Chat（在线沟通，突出显示） ===== */}
      <a
        href="/contact"
        className="group relative w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center animate-pulse-subtle"
        aria-label="Live Chat"
      >
        <Icon name="lucide:message-circle" className="w-5 h-5" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Live Chat
        </span>
      </a>

      {/* ===== 5. LinkedIn ===== */}
      <a
        href="https://linkedin.com/company/decousupplier"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-11 h-11 rounded-full bg-blue-800 hover:bg-blue-900 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label="LinkedIn"
      >
        <Icon name="lucide:linkedin" className="w-5 h-5" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          LinkedIn
        </span>
      </a>

      {/* ===== 6. Back to Top ===== */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-slate-600 hover:text-slate-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-slate-200"
        aria-label="Back to top"
      >
        <Icon name="lucide:chevron-up" className="w-5 h-5" />
      </button>
    </div>
  );
}