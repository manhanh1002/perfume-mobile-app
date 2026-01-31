import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, CreditCard, Truck } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/hooks/useCart';

type CheckoutStep = 'shipping' | 'payment';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    // Simulate API call
    setTimeout(() => {
      clearCart();
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      navigate(`/order-confirmation/${orderId}`);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <p className="text-xl">Giỏ hàng của bạn đang trống</p>
          <Button onClick={() => navigate('/collection')}>Tiếp tục mua sắm</Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step === 'shipping' ? 'text-black' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'shipping' || step === 'payment' ? 'border-black bg-black text-white' : 'border-gray-300'}`}>
              1
            </div>
            <span className="ml-2 font-medium">Giao hàng</span>
          </div>
          <div className="w-16 h-px bg-gray-300 mx-4" />
          <div className={`flex items-center ${step === 'payment' ? 'text-black' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'payment' ? 'border-black bg-black text-white' : 'border-gray-300'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Thanh toán</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {step === 'shipping' ? (
                <motion.form
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmitShipping}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-serif mb-6">Thông tin giao hàng</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Họ</label>
                      <Input
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Nguyễn"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tên</label>
                      <Input
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Văn A"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Số điện thoại</label>
                    <Input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0912345678"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Địa chỉ</label>
                    <Input
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Số nhà, tên đường"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tỉnh / Thành phố</label>
                      <Input
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Hồ Chí Minh"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mã bưu chính (Tùy chọn)</label>
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="70000"
                      />
                    </div>
                  </div>

                  <Button type="submit" fullWidth className="mt-6">
                    Tiếp tục thanh toán
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <button 
                      onClick={() => setStep('shipping')}
                      className="mr-4 p-2 hover:bg-gray-100 rounded-full"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-2xl font-serif">Phương thức thanh toán</h2>
                  </div>

                  <div className="space-y-4">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer flex items-center space-x-4 transition-all ${formData.paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                    >
                      <div className="p-2 bg-white rounded-full border border-gray-200">
                        <Truck size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Thanh toán khi nhận hàng (COD)</h3>
                        <p className="text-sm text-gray-500">Thanh toán tiền mặt khi bạn nhận được hàng</p>
                      </div>
                      {formData.paymentMethod === 'cod' && <Check size={20} />}
                    </div>

                    <div 
                      className={`p-4 border rounded-lg cursor-pointer flex items-center space-x-4 transition-all ${formData.paymentMethod === 'bank' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'bank' }))}
                    >
                      <div className="p-2 bg-white rounded-full border border-gray-200">
                        <CreditCard size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Chuyển khoản ngân hàng</h3>
                        <p className="text-sm text-gray-500">Chuyển khoản trực tiếp qua mã QR</p>
                      </div>
                      {formData.paymentMethod === 'bank' && <Check size={20} />}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mt-6">
                    <h3 className="font-medium mb-2">Tổng quan đơn hàng</h3>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tạm tính</span>
                      <span>{(subtotal || 0).toLocaleString('vi-VN')} ₫</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Phí vận chuyển</span>
                      <span>{(shipping || 0) === 0 ? 'Miễn phí' : `${(shipping || 0).toLocaleString('vi-VN')} ₫`}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold text-lg">
                      <span>Tổng cộng</span>
                      <span>{(total || 0).toLocaleString('vi-VN')} ₫</span>
                    </div>
                  </div>

                  <Button onClick={handlePlaceOrder} fullWidth size="lg">
                    Đặt hàng ({(total || 0).toLocaleString('vi-VN')} ₫)
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary (Desktop) */}
          <div className="hidden md:block">
            <div className="bg-gray-50 p-6 rounded-2xl sticky top-24">
              <h3 className="font-serif text-lg mb-4">Giỏ hàng của bạn</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.selectedSize}`} className="flex space-x-3">
                    <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                      {item.image ? (
                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs">No Img</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.selectedSize}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">x{item.quantity}</span>
                        <span className="text-sm font-medium">{item.priceAtTime.toLocaleString('vi-VN')} ₫</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính</span>
                  <span>{(subtotal || 0).toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="text-green-600">{(shipping || 0) === 0 ? 'Miễn phí' : `${(shipping || 0).toLocaleString('vi-VN')} ₫`}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
                  <span>Tổng cộng</span>
                  <span>{(total || 0).toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
