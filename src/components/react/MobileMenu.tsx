import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import Icon from 'astro-iconset/react';
import { NAVIGATION } from '../../config/site';

interface ProductMenuItem {
  id: number | string;
  name: string;
  href: string;
  image: string;
}

interface MobileMenuProps {
  productItems: ProductMenuItem[];
}

export default function MobileMenu({ productItems }: MobileMenuProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Icon name="lucide:menu" className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 lg:hidden" />
        <Dialog.Content className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 lg:hidden max-h-[85vh] overflow-y-auto">
          <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
          <Dialog.Description className="sr-only">Main navigation menu</Dialog.Description>
          <div className="container mx-auto px-4 py-6 space-y-2">
            {NAVIGATION.map((item) => {
              // 如果是 "Products"，渲染带折叠子菜单的按钮 + 垂直产品列表
              if (item.name === 'Products') {
                return (
                  <div key={item.href} className="space-y-1">
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-slate-700 hover:text-[var(--color-primary-600)] hover:bg-[color:var(--color-primary-50)] rounded-lg transition-all"
                    >
                      <span>{item.name}</span>
                      <Icon
                        name="lucide:chevron-down"
                        className={`w-5 h-5 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isProductsOpen && (
                      // 改为垂直单列列表
                      <div className="flex flex-col space-y-1 mt-2">
                        {productItems.map((product) => {
                          return (
                            <Dialog.Close asChild key={product.href}>
                              <a
                                href={product.href}
                                className="flex items-center gap-2 p-2 text-sm text-slate-600 hover:text-[var(--color-primary-600)] hover:bg-[color:var(--color-primary-50)] rounded-lg transition-all border border-transparent hover:border-[var(--color-primary-200)]"
                              >
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-10 h-10 object-cover rounded border border-slate-200 shrink-0"
                                  loading="lazy"
                                />
                                <span className="text-xs leading-tight line-clamp-2 break-words flex-1">
                                  {product.name}
                                </span>
                              </a>
                            </Dialog.Close>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              // 其他导航项
              return (
                <Dialog.Close asChild key={item.href}>
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-[var(--color-primary-600)] hover:bg-[color:var(--color-primary-50)] rounded-lg transition-all"
                  >
                    {item.name}
                  </a>
                </Dialog.Close>
              );
            })}
            <div className="pt-4">
              <Dialog.Close asChild>
                <a
                  href="/rfq"
                  className="block text-center px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-[var(--color-primary-600)] to-[var(--color-primary-700)] hover:from-[var(--color-primary-700)] hover:to-[var(--color-primary-800)] rounded-lg shadow-md transition-all"
                >
                  Get Free Samples
                </a>
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <Icon name="lucide:x" className="h-6 w-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
