
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import { useQuiz } from '@/hooks/useQuiz';
import { useCart } from '@/hooks/useCart';
import { matchProduct } from '@/utils/quizMatching';
import { Product } from '@/types';

export const QuizResult: React.FC = () => {
  const navigate = useNavigate();
  const { answers, resetQuiz, isCompleted } = useQuiz();
  const { addItem } = useCart();
  const [match, setMatch] = useState<Product | null>(null);

  useEffect(() => {
    if (!isCompleted) {
      navigate('/quiz');
      return;
    }
    
    const result = matchProduct(answers);
    setMatch(result);
  }, [answers, isCompleted, navigate]);

  if (!match) return <div>Loading match...</div>;

  const handleAddToCart = () => {
    addItem(match, 1, match.sizes[0].size);
    navigate('/cart');
  };

  const handleRetake = () => {
    resetQuiz();
    navigate('/quiz');
  };

  return (
    <PageWrapper className="pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm uppercase tracking-widest text-gray-500">Lựa chọn hoàn hảo cho bạn</span>
            <h1 className="text-3xl font-serif mt-2">Chúng tôi đã tìm thấy!</h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center"
        >
          <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gray-50 relative">
            <img 
              src={match.images[0]} 
              alt={match.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">{match.brand}</h3>
            <h2 className="text-2xl font-serif text-primary">{match.name}</h2>
            <div className="flex justify-center gap-2 flex-wrap">
              {match.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-sm">
            {match.description}
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
            <h4 className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">Các tầng hương</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="text-lg w-6">🍊</span>
                <div>
                  <span className="font-semibold block text-gray-900">Hương đầu</span>
                  <span className="text-gray-500">{match.topNotes.join(', ')}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg w-6">🌸</span>
                <div>
                  <span className="font-semibold block text-gray-900">Hương giữa</span>
                  <span className="text-gray-500">{match.heartNotes.join(', ')}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg w-6">🪵</span>
                <div>
                  <span className="font-semibold block text-gray-900">Hương cuối</span>
                  <span className="text-gray-500">{match.baseNotes.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <div className="text-2xl font-serif text-primary mb-4">
                {match.price.toLocaleString('vi-VN')} VND
             </div>
            <Button 
              fullWidth 
              size="lg"
              onClick={handleAddToCart}
              className="shadow-lg shadow-secondary/20"
            >
              Thêm vào giỏ hàng ✨
            </Button>
            <Button 
              variant="tertiary" 
              fullWidth
              onClick={handleRetake}
            >
              Làm lại trắc nghiệm
            </Button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};
