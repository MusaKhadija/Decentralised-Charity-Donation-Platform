import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CharitiesPage from './pages/CharitiesPage';
import CharityDetailPage from './pages/CharityDetailPage';
import DonationHistoryPage from './pages/DonationHistoryPage';
import CharityRegistrationPage from './pages/CharityRegistrationPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import { StacksProvider } from './contexts/StacksContext';
import { ToastProvider } from './contexts/ToastContext';
import AccessibilityEnhancer from './components/ui/AccessibilityEnhancer';
import ErrorBoundary from './components/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <StacksProvider>
        <ToastProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>

            <NavBar />
            <motion.main
              id="main-content"
              className="flex-grow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/charities" element={<CharitiesPage />} />
                  <Route path="/charities/:id" element={<CharityDetailPage />} />
                  <Route path="/history" element={<DonationHistoryPage />} />
                  <Route path="/register-charity" element={<CharityRegistrationPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                </Routes>
              </AnimatePresence>
            </motion.main>
            <Footer />

            {/* Accessibility Enhancer */}
            <AccessibilityEnhancer />
          </div>
        </ToastProvider>
      </StacksProvider>
    </ErrorBoundary>
  );
}

export default App;