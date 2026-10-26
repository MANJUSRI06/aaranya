import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './components/common/Toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CraftStoryPage } from './pages/CraftStoryPage';
import { JournalPage } from './pages/JournalPage';
import { JournalDetailPage } from './pages/JournalDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { BagPage } from './pages/BagPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminSareeEditorPage } from './pages/admin/AdminSareeEditorPage';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <ScrollToTop />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/collection" element={<CollectionPage />} />
                  <Route path="/collection/:category" element={<CollectionPage />} />
                  <Route path="/saree/:slug" element={<ProductDetailPage />} />
                  <Route path="/craft-story" element={<CraftStoryPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/journal/:slug" element={<JournalDetailPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/bag" element={<BagPage />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/admin/sarees/new" element={<AdminSareeEditorPage />} />
                  <Route path="/admin/sarees/:id/edit" element={<AdminSareeEditorPage />} />

                  {/* Catch-all Fallback */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
