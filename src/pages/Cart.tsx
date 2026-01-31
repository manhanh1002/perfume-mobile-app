
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, shipping, tax, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
          <div className="text-6xl">🛒</div>
          <h2 className="text-2xl font-serif">Giỏ hàng của bạn đang trống</h2>
          <p className="text-gray-500">Có vẻ như bạn chưa tìm thấy mùi hương ưng ý.</p>
          <div className="flex gap-4 mt-4">
            <Button onClick={() => navigate('/quiz')}>Làm trắc nghiệm</Button>
            <Button variant="secondary" onClick={() => navigate('/collection')}>Xem cửa hàng</Button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="pb-24">
      <h1 className="text-2xl font-serif mb-6">Giỏ hàng ({items.length})</h1>
      
      <div className="space-y-6">
        <div className="space-y-4">
          {items.map((item: any) => (
            <div key={`${item.productId}-${item.selectedSize}`} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brand} • {item.selectedSize}</p>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="font-medium text-primary">
                    {(item.priceAtTime * item.quantity).toLocaleString('vi-VN')} VND
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
                    >
                      -
                    </button>
                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => removeItem(item.productId)}
                className="text-gray-400 hover:text-red-500 self-start"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="font-serif text-lg mb-4">Tổng quan đơn hàng</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tạm tính</span>
            <span>{(subtotal || 0).toLocaleString('vi-VN')} VND</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Phí vận chuyển</span>
            <span>{(shipping || 0) === 0 ? 'Miễn phí' : `${(shipping || 0).toLocaleString('vi-VN')} VND`}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Thuế (10%)</span>
            <span>{(tax || 0).toLocaleString('vi-VN')} VND</span>
          </div>
          <div className="pt-3 border-t flex justify-between font-bold text-lg text-primary">
            <span>Tổng cộng</span>
            <span>{(total || 0).toLocaleString('vi-VN')} VND</span>
          </div>
          
          <Button fullWidth className="mt-4" onClick={() => navigate('/checkout')}>
            Thanh toán
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};
