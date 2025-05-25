import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStacks } from '../../contexts/StacksContext';
import { Heart, Menu, X, LogIn, LogOut } from 'lucide-react';

const NavBar: React.FC = () => {
  const { authenticated, connecting, handleSignIn, handleSignOut, userData } = useStacks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-amber-400" />
              <span className="text-xl font-bold">GiveChain</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150">
                  Home
                </Link>
                <Link to="/charities" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150">
                  Charities
                </Link>
                {authenticated && (
                  <Link to="/history" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150">
                    Your Donations
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            {authenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-indigo-200">
                  {userData?.profile?.stxAddress?.mainnet?.slice(0, 6)}...{userData?.profile?.stxAddress?.mainnet?.slice(-4)}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-900 transition duration-150"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={connecting}
                className="flex items-center space-x-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-900 transition duration-150 disabled:opacity-70"
              >
                <LogIn className="h-4 w-4" />
                <span>{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/charities"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Charities
            </Link>
            {authenticated && (
              <Link
                to="/history"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition duration-150"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Donations
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-indigo-700">
            <div className="px-5 py-3">
              {authenticated ? (
                <div className="space-y-3">
                  <span className="block text-sm text-indigo-200">
                    {userData?.profile?.stxAddress?.mainnet?.slice(0, 6)}...{userData?.profile?.stxAddress?.mainnet?.slice(-4)}
                  </span>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-1 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-900 transition duration-150"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Disconnect</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleSignIn();
                    setIsMenuOpen(false);
                  }}
                  disabled={connecting}
                  className="flex items-center space-x-1 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-900 transition duration-150 disabled:opacity-70"
                >
                  <LogIn className="h-4 w-4" />
                  <span>{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;