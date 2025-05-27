import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStacks } from '../../contexts/StacksContext';
import { Heart, Menu, X, LogIn, LogOut } from 'lucide-react';
import MobileMenu from '../ui/MobileMenu';

const NavBar: React.FC = () => {
  const { authenticated, connecting, handleSignIn, handleSignOut, userData } = useStacks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/charities', label: 'Charities' },
    { path: '/register-charity', label: 'Register Charity' },
    { path: '/history', label: 'Your Donations', authRequired: true },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <motion.nav
      className="bg-bg-dark text-white shadow-md relative z-50"
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-2 group">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Heart className="h-8 w-8 text-orange group-hover:text-orange-red transition-colors duration-300" />
                </motion.div>
                <span className="text-xl font-bold group-hover:text-orange transition-colors duration-300" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  GiveChain
                </span>
              </Link>
            </motion.div>

            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  if (item.authRequired && !authenticated) return null;

                  return (
                    <motion.div
                      key={item.path}
                      className="relative"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={item.path}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                          isActivePath(item.path)
                            ? 'text-orange bg-charcoal/50'
                            : 'hover:bg-charcoal/30 hover:text-orange'
                        }`}
                      >
                        {item.label}
                        {isActivePath(item.path) && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange rounded-full"
                            layoutId="activeTab"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            {authenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-text-light">
                  {userData?.profile?.stxAddress?.mainnet?.slice(0, 6)}...{userData?.profile?.stxAddress?.mainnet?.slice(-4)}
                </span>
                <button
                  onClick={handleSignOut}
                  className="btn-secondary flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={connecting}
                className="btn-primary flex items-center space-x-1 disabled:opacity-70"
              >
                <LogIn className="h-4 w-4" />
                <span>{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-orange hover:text-white hover:bg-charcoal focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </motion.nav>
  );
};

export default NavBar;
