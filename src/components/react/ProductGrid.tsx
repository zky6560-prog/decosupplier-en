// src/components/react/ProductGrid.tsx
import { useState, useMemo, useEffect, useRef } from 'react';
import { Icon } from 'astro-iconset/react';

interface Pattern {
  id: number | string;
  name: string;
  patternType: string;
  colorFamily: string;
  thickness?: string;
  finish?: string;
  slug: string;
  productImage: { src: string };
  showImage: { src: string };
  description?: string;
}

// ===== 颜色映射表（完整包含所有列出的颜色） =====
const colorMap: Record<string, string> = {
  'Brown/Tan': '#A67C52',
  'Grey': '#6C757D',
  'Cream/Beige': '#F5F0E1',
  'Black': '#343A40',
  'Yellow/Gold': '#D4AF37',
  'Orange/Rust': '#C55A11',
  'Green': '#28A745',
  'Red/Pink': '#D9534F',
  'Blue': '#007BFF',
  'Teal/Turquoise': '#008080',
  'Purple': '#6F42C1',
  'Other': '#CCCCCC'
};

// ===== 花纹图标映射（补充所有列出的类型） =====
const patternTypeIconMap: Record<string, string> = {
  'Wood': 'lucide:tree-deciduous',
  'Solid': 'lucide:square',
  'Stone': 'lucide:mountain',
  'Concrete': 'lucide:building',
  'Geometric': 'lucide:hexagon',
  'Organic': 'lucide:leaf',
  'Woven': 'lucide:grid',
  'Brick Texture': 'lucide:columns',        // 新增
  'Brushed Metal': 'lucide:shield',        // 新增
  'Floral': 'lucide:flower-2',            // 新增
  'Cartoon': 'lucide:smile',              // 新增
  'Other': 'lucide:more-horizontal'
};

// ===== 自定义顺序（按您的要求排列） =====
const PATTERN_TYPE_ORDER = [
  'Wood',
  'Solid',
  'Stone',
  'Concrete',
  'Geometric',
  'Organic',
  'Woven',
  'Brick Texture',
  'Brushed Metal',
  'Floral',
  'Cartoon',
  'Other'
];

const COLOR_FAMILY_ORDER = [
  'Brown/Tan',
  'Grey',
  'Cream/Beige',
  'Black',
  'Yellow/Gold',
  'Orange/Rust',
  'Green',
  'Red/Pink',
  'Blue',
  'Teal/Turquoise',
  'Purple',
  'Other'
];

const FIXED_PATTERN_TYPES = [
  'Wood',
  'Solid',
  'Stone',
  'Concrete',
  'Geometric',
  'Organic',
  'Woven',
];

const FIXED_COLOR_FAMILIES = [
  'Grey',
  'Cream/Beige',
  'Orange/Rust',
  'Blue',
];

const sortOptions = [
  { value: 'new-arrivals', label: 'New Arrivals' },
  { value: 'best-matches', label: 'Best Matches' },
  { value: 'name-asc', label: 'Product name (A-Z)' },
  { value: 'name-desc', label: 'Product name (Z-A)' },
];

interface ProductGridProps {
  patterns: Pattern[];
  defaultView?: 'room' | 'grid';
  categoryPath?: string;
}

const ITEMS_PER_PAGE = 32;

export default function ProductGrid({ patterns, defaultView = 'grid', categoryPath = '/products/pvc-decorative-film' }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'room' | 'grid'>(defaultView);
  const [selectedPatternTypes, setSelectedPatternTypes] = useState<string[]>([]);
  const [selectedColorFamilies, setSelectedColorFamilies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('new-arrivals');
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const isFirstRender = useRef(true);

  // 筛选 + 排序
  const filteredAndSorted = useMemo(() => {
    let result = patterns.filter(p => {
      const matchPattern = selectedPatternTypes.length === 0 || selectedPatternTypes.includes(p.patternType);
      const matchColor = selectedColorFamilies.length === 0 || selectedColorFamilies.includes(p.colorFamily);
      return matchPattern && matchColor;
    });

    switch (sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return result;
  }, [patterns, selectedPatternTypes, selectedColorFamilies, sortBy]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredAndSorted.slice(start, end);
  }, [filteredAndSorted, currentPage]);

  // 筛选/排序变化重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPatternTypes, selectedColorFamilies, sortBy]);

  // 页码变化滚动到工具栏（首次加载不执行）
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const toolbar = document.getElementById('product-toolbar');
    if (toolbar) {
      toolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const getCurrentImage = (pattern: Pattern, isHovered: boolean) => {
    if (viewMode === 'room') {
      return isHovered ? pattern.productImage : pattern.showImage;
    } else {
      return isHovered ? pattern.showImage : pattern.productImage;
    }
  };

  const handlePatternTypeToggle = (type: string) => {
    setSelectedPatternTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleColorFamilyToggle = (color: string) => {
    setSelectedColorFamilies(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const resetPatternTypes = () => setSelectedPatternTypes([]);
  const resetColorFamilies = () => setSelectedColorFamilies([]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const FilterPanel = () => (
    <>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Pattern Type</h4>
          {selectedPatternTypes.length > 0 && (
            <button onClick={resetPatternTypes} className="text-xs text-blue-600 hover:text-blue-800">
              Clear All
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {FIXED_PATTERN_TYPES.map(type => {
            const isChecked = selectedPatternTypes.includes(type);
            const iconName = patternTypeIconMap[type] || 'lucide:circle';
            return (
              <button
                key={type}
                onClick={() => handlePatternTypeToggle(type)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors text-left w-full ${
                  isChecked ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-400' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Icon name={iconName as any} className="w-4 h-4 shrink-0" />
                <span className="text-sm flex-1">{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Color Family</h4>
          {selectedColorFamilies.length > 0 && (
            <button onClick={resetColorFamilies} className="text-xs text-blue-600 hover:text-blue-800">
              Clear All
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {FIXED_COLOR_FAMILIES.map(color => {
            const isChecked = selectedColorFamilies.includes(color);
            const colorHex = colorMap[color] || '#CCCCCC';
            return (
              <button
                key={color}
                onClick={() => handleColorFamilyToggle(color)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors text-left w-full ${
                  isChecked ? 'bg-blue-50 ring-2 ring-blue-400' : 'hover:bg-slate-50'
                }`}
                title={color}
              >
                <span className="w-5 h-5 rounded-full shrink-0 border border-slate-300" style={{ backgroundColor: colorHex }} />
                <span className="text-sm flex-1 truncate">{color}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  const SortDropdown = () => (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="appearance-none pl-4 pr-10 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
      >
        {sortOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <Icon name="lucide:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );

  return (
    <div>
      {/* ===== 顶部工具栏 ===== */}
      <div id="product-toolbar" className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-slate-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('room')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'room' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon name="lucide:image" className="w-4 h-4" />
              Room View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon name="lucide:grid-2x2" className="w-4 h-4" />
              Grid View
            </button>
          </div>
          <span className="text-sm text-slate-500 hidden sm:inline">
            <span className="font-semibold text-slate-700">{filteredAndSorted.length}</span> patterns
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            <Icon name="lucide:sliders-horizontal" className="w-4 h-4" />
            Filters
          </button>
          <SortDropdown />
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="lg:hidden mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <FilterPanel />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        <div className="flex-1">
          <div className="text-sm text-slate-500 mb-4 lg:hidden">
            <span className="font-semibold text-slate-700">{filteredAndSorted.length}</span> patterns
          </div>

          {filteredAndSorted.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Icon name="lucide:search" className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-lg font-medium text-slate-700">No patterns found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedItems.map(pattern => {
                  const isHovered = hoveredId === pattern.id;
                  const currentImage = getCurrentImage(pattern, isHovered);

                  return (
                    <div
                      key={pattern.id}
                      className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      onMouseEnter={() => setHoveredId(pattern.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <a
                        href={`${categoryPath}/${pattern.slug}`}
                        className="relative block aspect-square overflow-hidden bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <img
                          src={currentImage.src}
                          alt={pattern.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-2.5 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-blue-600 hover:text-white flex items-center justify-center gap-2 text-sm font-semibold text-slate-800"
                        >
                          <Icon name="lucide:search" className="w-4 h-4" />
                          Quick View
                        </div>
                      </a>

                      {/* ===== 卡片底部信息：两行布局 ===== */}
                      <div className="p-3">
                        <div className="flex items-start gap-2">
                          {/* 缩略图：小、无圆角、紧贴左边缘 */}
                          <div className="w-9 h-9 shrink-0 overflow-hidden bg-slate-100 border border-slate-200 rounded-none">
                            <img
                              src={pattern.productImage.src}
                              alt=""
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>

                          {/* 右侧文字区域：两行 */}
                          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                            {/* 第一行：产品型号（不换行，超出截断） */}
                            <a
                              href={`${categoryPath}/${pattern.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              <span className="text-xs font-semibold text-slate-900 whitespace-nowrap truncate block">
                                {pattern.name}
                              </span>
                            </a>

                            {/* 第二行：pattern 和 colour 标签（同行显示） */}
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="inline-flex items-center text-[10px] font-medium text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                                {pattern.patternType}
                              </span>
                              <span className="inline-flex items-center text-[10px] font-medium text-cyan-700 bg-cyan-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                                {pattern.colorFamily}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-10 pt-6 border-t border-slate-200">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon name="lucide:chevron-left" className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">{currentPage}</span>
                    <span className="text-slate-400"> / </span>
                    <span className="text-slate-500">{totalPages}</span>
                  </span>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon name="lucide:chevron-right" className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
