import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sparkles, ShoppingBag, ShoppingCart } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useCart } from '@/hooks/useCart';

export const BottomNav: React.FC = () => {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/quiz', label: 'Trắc nghiệm', icon: Sparkles },
    { path: '/collection', label: 'Cửa hàng', icon: ShoppingBag },
    { path: '/cart', label: 'Giỏ hàng', icon: ShoppingCart, badge: itemCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center h-[60px]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              twMerge(
                "flex flex-col items-center justify-center w-full h-full space-y-1",
                isActive ? "text-secondary" : "text-gray-400 hover:text-gray-600"
              )
            }
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.badge ? (
                <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full px-1">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};