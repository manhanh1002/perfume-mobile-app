import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { products } from '@/data/products';
import { Card } from '@/components/ui/Card';
import { Filter, X, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const PRICE_RANGES = [
  { label: 'Dưới 2 triệu', min: 0, max: 2000000 },
  { label: '2 - 4 triệu', min: 2000000, max: 4000000 },
  { label: '4 - 6 triệu', min: 4000000, max: 6000000 },
  { label: 'Trên 6 triệu', min: 6000000, max: Infinity },
];

export const Collection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Derived Data
  const allBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))).sort(), []);
  
  const normalizeStyle = (style: string) => {
    return style.trim().charAt(0).toUpperCase() + style.slice(1).toLowerCase();
  };

  const allStyles = useMemo(() => {
    const styles = new Set<string>();
    products.forEach(p => {
      p.style?.forEach(s => styles.add(normalizeStyle(s)));
    });
    return Array.from(styles).sort();
  }, []);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Brand Filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Style Filter
      if (selectedStyles.length > 0) {
        const hasStyle = product.style?.some(s => selectedStyles.includes(normalizeStyle(s)));
        if (!hasStyle) return false;
      }

      // Price Filter
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some(rangeLabel => {
          const range = PRICE_RANGES.find(r => r.label === rangeLabel);
          return range && product.price >= range.min && product.price <= range.max;
        });
        if (!matchesPrice) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'newest': return (b.releaseYear || 0) - (a.releaseYear || 0);
        default: return 0;
      }
    });
  }, [selectedBrands, selectedStyles, selectedPriceRanges, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedStyles([]);
    setSelectedPriceRanges([]);
    setCurrentPage(1);
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-7xl mx-auto px-4 py-8 overflow-x-hidden">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">Bộ Sưu Tập</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {filteredProducts.length} sản phẩm phù hợp với tiêu chí của bạn
          </p>
        </header>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter size={20} />
            Bộ lọc
          </button>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-black/5"
          >
            <option value="featured">Nổi bật</option>
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Bộ lọc</h3>
                {(selectedBrands.length > 0 || selectedStyles.length > 0 || selectedPriceRanges.length > 0) && (
                  <button onClick={clearFilters} className="text-sm text-red-500 hover:underline">
                    Xóa tất cả
                  </button>
                )}
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Thương hiệu</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {allBrands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
                      <input 
                        type="checkbox" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleFilter(setSelectedBrands, brand)}
                        className="rounded border-gray-300 focus:ring-black text-black"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Style Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Phong cách</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {allStyles.map(style => (
                    <label key={style} className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
                      <input 
                        type="checkbox" 
                        checked={selectedStyles.includes(style)}
                        onChange={() => toggleFilter(setSelectedStyles, style)}
                        className="rounded border-gray-300 focus:ring-black text-black"
                      />
                      <span className="text-sm">{style}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Giá</h4>
                <div className="space-y-2">
                  {PRICE_RANGES.map(range => (
                    <label key={range.label} className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
                      <input 
                        type="checkbox" 
                        checked={selectedPriceRanges.includes(range.label)}
                        onChange={() => toggleFilter(setSelectedPriceRanges, range.label)}
                        className="rounded border-gray-300 focus:ring-black text-black"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0 w-full">
            {/* Desktop Sort */}
            <div className="hidden lg:flex justify-end mb-6">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-black/5 cursor-pointer hover:border-gray-400 transition-colors"
              >
                <option value="featured">Nổi bật</option>
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full">
                {currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      title={product.name}
                      subtitle={`${product.brand} • ${product.price.toLocaleString('vi-VN')} ₫`}
                      image={product.images[0]}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="h-full hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="mt-2 flex flex-wrap gap-1">
                        {product.style?.slice(0, 3).map((s) => (
                          <span key={s} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                            {s}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-black text-white' 
                        : 'border hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileFilterOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white z-50 p-6 overflow-y-auto lg:hidden shadow-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif">Bộ lọc</h2>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Copy of filters for mobile */}
                  <div>
                    <h4 className="font-medium mb-3">Thương hiệu</h4>
                    <div className="space-y-2">
                      {allBrands.map(brand => (
                        <label key={brand} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleFilter(setSelectedBrands, brand)}
                            className="rounded border-gray-300 text-black focus:ring-black"
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Phong cách</h4>
                    <div className="space-y-2">
                      {allStyles.map(style => (
                        <label key={style} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={selectedStyles.includes(style)}
                            onChange={() => toggleFilter(setSelectedStyles, style)}
                            className="rounded border-gray-300 text-black focus:ring-black"
                          />
                          <span className="text-sm">{style}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Giá</h4>
                    <div className="space-y-2">
                      {PRICE_RANGES.map(range => (
                        <label key={range.label} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={selectedPriceRanges.includes(range.label)}
                            onChange={() => toggleFilter(setSelectedPriceRanges, range.label)}
                            className="rounded border-gray-300 text-black focus:ring-black"
                          />
                          <span className="text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <button 
                      onClick={clearFilters}
                      className="w-full py-2 border border-gray-300 rounded-lg mb-3"
                    >
                      Xóa bộ lọc
                    </button>
                    <button 
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="w-full py-2 bg-black text-white rounded-lg"
                    >
                      Xem {filteredProducts.length} sản phẩm
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
};
