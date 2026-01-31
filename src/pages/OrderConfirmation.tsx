import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';

export const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-6 text-green-500"
        >
          <CheckCircle size={80} strokeWidth={1.5} />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-serif mb-4"
        >
          Đặt hàng thành công!
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8 max-w-md"
        >
          Cảm ơn bạn đã mua hàng. Đơn hàng <span className="font-bold text-black">#{orderId}</span> của bạn đã được tiếp nhận và đang được xử lý.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 w-full max-w-xs"
        >
          <Button fullWidth onClick={() => navigate('/collection')}>
            Tiếp tục mua sắm
          </Button>
          <Button fullWidth variant="secondary" onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        </motion.div>
      </div>
    </PageWrapper>
  );
};
