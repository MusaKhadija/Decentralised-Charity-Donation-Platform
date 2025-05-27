import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Heart, Building, History, HelpCircle, Info, User, LogOut } from 'lucide-react';
import { useStacks } from '../../contexts/StacksContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { authenticated, userData, handleSignOut } = useStacks();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/charities', label: 'Charities', icon: <Heart className="h-5 w-5" /> },
    { path: '/register-charity', label: 'Register Charity', icon: <Building className="h-5 w-5" /> },
    { path: '/about', label: 'About Us', icon: <Info className="h-5 w-5" /> },
    { path: '/faq', label: 'FAQ', icon: <HelpCircle className="h-5 w-5" /> },
  ];

  const authenticatedItems = [
    { path: '/history', label: 'Your Donations', icon: <History className="h-5 w-5" /> },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    onClose();
  };

  const handleSignOutClick = () => {
    handleSignOut();
    onClose();
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-8 h-8 bg-orange rounded-full flex items-center justify-center"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="h-4 w-4 text-white" />
                  </motion.div>
                  <span className="text-lg font-bold text-gray-900">GiveChain</span>
                </div>
                
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </motion.button>
              </div>

              {/* User Info */}
              {authenticated && userData && (
                <motion.div
                  className="p-6 bg-gradient-to-r from-orange to-orange-red text-white"
                  custom={0}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Welcome back!</p>
                      <p className="text-sm opacity-90 truncate max-w-[200px]">
                        {userData.profile?.name || 'Anonymous Donor'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Items */}
              <nav className="flex-1 py-6">
                <div className="space-y-2 px-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      custom={index + 1}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        to={item.path}
                        onClick={handleLinkClick}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActivePath(item.path)
                            ? 'bg-orange text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className={isActivePath(item.path) ? 'text-white' : 'text-gray-500'}>
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Authenticated Items */}
                  {authenticated && (
                    <>
                      <div className="border-t border-gray-200 my-4"></div>
                      {authenticatedItems.map((item, index) => (
                        <motion.div
                          key={item.path}
                          custom={navItems.length + index + 1}
                          variants={itemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <Link
                            to={item.path}
                            onClick={handleLinkClick}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                              isActivePath(item.path)
                                ? 'bg-orange text-white shadow-lg'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span className={isActivePath(item.path) ? 'text-white' : 'text-gray-500'}>
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>
              </nav>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-200">
                {authenticated ? (
                  <motion.button
                    onClick={handleSignOutClick}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    custom={navItems.length + authenticatedItems.length + 2}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                  </motion.button>
                ) : (
                  <motion.div
                    className="space-y-3"
                    custom={navItems.length + 2}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <p className="text-sm text-gray-600 text-center">
                      Connect your wallet to start donating
                    </p>
                    <button
                      onClick={() => {
                        // Handle wallet connection
                        onClose();
                      }}
                      className="w-full bg-orange text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-red transition-colors duration-200"
                    >
                      Connect Wallet
                    </button>
                  </motion.div>
                )}

                {/* App Info */}
                <motion.div
                  className="mt-6 pt-6 border-t border-gray-200 text-center"
                  custom={navItems.length + 3}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                >
                  <p className="text-xs text-gray-500">
                    GiveChain v1.0.0
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Built with ❤️ by Khadija Musa
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
