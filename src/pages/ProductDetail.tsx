import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Star, Info } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-serif mb-4">Không tìm thấy sản phẩm</h2>
          <Button onClick={() => navigate('/collection')}>Quay lại bộ sưu tập</Button>
        </div>
      </PageWrapper>
    );
  }

  // Set default size if not selected
  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0].size);
  }

  const handleAddToCart = () => {
    addItem(product, 1, selectedSize);
    navigate('/cart');
  };

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-8 hover:text-black transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Quay lại
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center h-[500px]"
          >
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain" 
            />
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-lg text-gray-500 uppercase tracking-wide mb-2">{product.brand}</h3>
              <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl font-medium">{product.price.toLocaleString('vi-VN')} ₫</span>
                {product.rating && (
                  <div className="flex items-center text-yellow-500">
                    <Star size={18} fill="currentColor" />
                    <span className="ml-1 text-gray-600 font-medium">{product.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Scent Profile */}
            <div className="border-t border-b border-gray-100 py-6">
              <h4 className="font-medium mb-4 flex items-center">
                <Info size={18} className="mr-2" />
                Hương thơm
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <span className="text-sm text-gray-500 block mb-1">Nhóm hương</span>
                  <div className="flex flex-wrap gap-2">
                    {product.scentFamilies.map((family) => (
                      <span key={family} className="text-sm border border-gray-200 px-2 py-1 rounded-md">
                        {family}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="col-span-2 space-y-3 mt-2">
                  {product.topNotes.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">Hương đầu</span>
                      <p className="text-sm">{product.topNotes.join(', ')}</p>
                    </div>
                  )}
                  {product.heartNotes.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">Hương giữa</span>
                      <p className="text-sm">{product.heartNotes.join(', ')}</p>
                    </div>
                  )}
                  {product.baseNotes.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">Hương cuối</span>
                      <p className="text-sm">{product.baseNotes.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h4 className="font-medium mb-3">Chọn kích thước</h4>
              <div className="flex space-x-3">
                {product.sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => setSelectedSize(sizeOption.size)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedSize === sizeOption.size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {sizeOption.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleAddToCart} size="lg" fullWidth className="flex items-center justify-center">
                <ShoppingBag size={20} className="mr-2" />
                Thêm vào giỏ hàng
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};
