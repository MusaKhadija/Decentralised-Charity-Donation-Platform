import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CharitiesPage from './pages/CharitiesPage';
import CharityDetailPage from './pages/CharityDetailPage';
import DonationHistoryPage from './pages/DonationHistoryPage';
import { StacksProvider } from './contexts/StacksContext';

function App() {
  return (
    <StacksProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/charities" element={<CharitiesPage />} />
            <Route path="/charities/:id" element={<CharityDetailPage />} />
            <Route path="/history" element={<DonationHistoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </StacksProvider>
  );
}

export default App;