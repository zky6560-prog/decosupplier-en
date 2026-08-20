import { useState, useEffect, useRef } from 'react';

interface Product {
  title: string;
  id: number;
}

interface ProductNavigationProps {
  products: Product[];
}

export default function ProductNavigation({ products }: ProductNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 检查页面是否有产品模块
    const checkVisibility = () => {
      const hero = document.getElementById('hero-section');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        // 当滚动超过 Hero 区域后显示导航
        setIsVisible(rect.bottom < 0);
      }
    };

    // 监听滚动，高亮当前可见的产品
    const handleScroll = () => {
      checkVisibility();

      const productElements = products
        .map((_, index) => document.getElementById(`product-${index}`))
        .filter(el => el !== null);

      // 找到当前视口中可见的产品
      let currentIndex = 0;
      let minDistance = Infinity;

      productElements.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // 计算元素顶部到视口顶部的距离
        const distance = Math.abs(rect.top);
        if (distance < minDistance && rect.top < window.innerHeight / 2) {
          minDistance = distance;
          currentIndex = idx;
        }
      });

      setActiveIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // 初始检查
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [products]);

  const scrollToProduct = (index: number) => {
    const element = document.getElementById(`product-${index}`);
    if (element) {
      const navHeight = 80;
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-3 min-w-[160px]">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
          Products
        </div>
        <ul className="space-y-1">
          {products.map((product, index) => (
            <li key={index}>
              <button
                onClick={() => scrollToProduct(index)}
                className={`w-full text-left px-3 py-1.5 rounded-lg transition-all duration-300 text-sm font-medium ${
                  activeIndex === index
                    ? 'text-blue-600 bg-blue-50 text-base font-bold scale-105'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="block truncate">{product.title}</span>
              </button>
            </li>
          ))}
        </ul>
        {/* 当前进度指示 */}
        <div className="mt-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-2">
            <span>{activeIndex + 1}/{products.length}</span>
            <span className="w-12 h-0.5 bg-slate-200 rounded-full overflow-hidden">
              <span 
                className="block h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / products.length) * 100}%` }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}