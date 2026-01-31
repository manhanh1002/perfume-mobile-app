import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Sparkles, Gift, Truck } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-primary to-[#1a1a1a] text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-md w-full space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-serif leading-tight">
            Tìm Kiếm <br />
            <span className="text-secondary">Hương Thơm Đặc Trưng</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Hãy để bài trắc nghiệm AI của chúng tôi khám phá hương thơm hoàn hảo cho cá tính độc đáo của bạn.
          </p>
          
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              size="lg" 
              fullWidth 
              onClick={() => navigate('/quiz')}
              className="bg-secondary hover:bg-secondary/90 text-white border-none"
            >
              Bắt đầu trắc nghiệm
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              fullWidth
              onClick={() => navigate('/collection')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Khám phá bộ sưu tập
            </Button>
            <Button 
              variant="tertiary" 
              onClick={() => navigate('/collection?sort=bestseller')}
              className="text-gray-400 hover:text-white"
            >
              Sản phẩm bán chạy
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-background">
        <div className="max-w-md mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card title="Gợi ý cá nhân hóa" icon={<Sparkles className="text-secondary" />} className="bg-white">
              <p className="text-sm text-gray-600 mt-2">
                Thuật toán của chúng tôi phân tích sở thích để tìm ra mùi hương bạn sẽ yêu thích.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card title="Đóng gói cao cấp" icon={<Gift className="text-secondary" />} className="bg-white">
              <p className="text-sm text-gray-600 mt-2">
                Mỗi đơn hàng đều được đóng gói trong hộp sang trọng kèm theo mẫu thử miễn phí.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card title="Miễn phí vận chuyển" icon={<Truck className="text-secondary" />} className="bg-white">
              <p className="text-sm text-gray-600 mt-2">
                Miễn phí vận chuyển tiêu chuẩn cho đơn hàng trên 1.500.000 ₫.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 py-16 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h2 className="text-2xl font-serif">Tham gia cùng chúng tôi</h2>
          <p className="text-gray-600">
            Đăng ký để nhận ưu đãi độc quyền, sản phẩm mới và mẹo từ chuyên gia.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Địa chỉ email của bạn" 
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-secondary"
            />
            <Button>Đăng ký</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4 text-center">
        <div className="max-w-md mx-auto space-y-8">
          <h2 className="text-2xl font-serif text-secondary">Lumière</h2>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">TikTok</a>
            <a href="#" className="hover:text-white">Pinterest</a>
          </div>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Về chúng tôi</a>
            <a href="#" className="hover:text-white">Liên hệ</a>
            <a href="#" className="hover:text-white">Câu hỏi thường gặp</a>
          </div>
          <p className="text-xs text-gray-600">
            © 2024 Lumière Fragrances. All rights reserved.
          </p>
        </div>
      </footer>
    </PageWrapper>
  );
};