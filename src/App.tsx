import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { initializeStorageIfNeeded } from './services/dataService';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CompatibilityPage } from './pages/CompatibilityPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminCompatibilityPage } from './pages/admin/AdminCompatibilityPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';

// Scroll to top helper on route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Customer Layout Wrapper (Navbar + Content + Footer)
const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  useEffect(() => {
    initializeStorageIfNeeded();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route
            path="/"
            element={
              <CustomerLayout>
                <HomePage />
              </CustomerLayout>
            }
          />
          <Route
            path="/catalog"
            element={
              <CustomerLayout>
                <CatalogPage />
              </CustomerLayout>
            }
          />
          <Route
            path="/products/:slug"
            element={
              <CustomerLayout>
                <ProductDetailPage />
              </CustomerLayout>
            }
          />
          <Route
            path="/compatibility"
            element={
              <CustomerLayout>
                <CompatibilityPage />
              </CustomerLayout>
            }
          />
          <Route
            path="/about"
            element={
              <CustomerLayout>
                <AboutPage />
              </CustomerLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <CustomerLayout>
                <ContactPage />
              </CustomerLayout>
            }
          />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Protected Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverviewPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="compatibility" element={<AdminCompatibilityPage />} />
            <Route path="inventory" element={<AdminInventoryPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
