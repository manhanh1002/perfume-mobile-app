import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Quiz } from '@/pages/Quiz';
import { QuizResult } from '@/pages/QuizResult';
import { Collection } from '@/pages/Collection';
import { ProductDetail } from '@/pages/ProductDetail';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { OrderConfirmation } from '@/pages/OrderConfirmation';
import { BottomNav } from '@/components/ui/BottomNav';
import { MobileContainer } from '@/components/layout/MobileContainer';

// Wrapper to conditionally show BottomNav
const AppContent = () => {
  const location = useLocation();
  const hideNavRoutes = ['/quiz', '/checkout'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <MobileContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz-result" element={<QuizResult />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
      </Routes>
      {showNav && <BottomNav />}
    </MobileContainer>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;