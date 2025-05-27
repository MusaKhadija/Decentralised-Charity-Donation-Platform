import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStacks } from '../../contexts/StacksContext';
import { ArrowRight, LogIn, Heart, Shield, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  const { authenticated, handleSignIn } = useStacks();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingIcons = [
    { Icon: Heart, delay: 0, x: 20, y: 30 },
    { Icon: Shield, delay: 1, x: -30, y: 20 },
    { Icon: TrendingUp, delay: 2, x: 40, y: -20 }
  ];

  return (
    <div className="bg-gradient-to-br from-bg-dark via-charcoal to-bg-dark text-white relative overflow-hidden animate-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute opacity-10"
            style={{
              left: `${20 + index * 30}%`,
              top: `${30 + index * 20}%`,
            }}
            animate={{
              x: [0, x, 0],
              y: [0, y, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
          >
            <Icon className="h-16 w-16" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.h1
              className="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl"
              variants={itemVariants}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Blockchain-Powered
              </motion.span>
              <motion.span
                className="block text-orange animate-pulse-glow"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Charitable Giving
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-3 text-base text-text-light sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl"
              variants={itemVariants}
            >
              Donate securely and transparently to verified charities using the Stacks blockchain.
              Every contribution is immutably recorded and can be tracked in real-time.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              {authenticated ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/charities"
                    className="btn-primary inline-flex items-center justify-center group"
                  >
                    Browse Charities
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  onClick={handleSignIn}
                  className="btn-primary inline-flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect Wallet
                  <motion.div
                    className="ml-2"
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <LogIn className="h-5 w-5" />
                  </motion.div>
                </motion.button>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register-charity"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  Register Your Charity
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:block"
            variants={itemVariants}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated placeholder for illustration */}
              <motion.div
                className="w-full h-64 bg-gradient-to-br from-orange/20 to-orange-red/20 rounded-xl flex items-center justify-center relative"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(255,152,53,0.2), rgba(252,100,50,0.2))",
                    "linear-gradient(45deg, rgba(252,100,50,0.2), rgba(255,152,53,0.2))",
                    "linear-gradient(45deg, rgba(255,152,53,0.2), rgba(252,100,50,0.2))"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  className="text-center"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="h-20 w-20 text-orange mx-auto mb-4 animate-float" />
                  <p className="text-white/80 font-medium">Transparent Giving</p>
                </motion.div>
              </motion.div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-orange rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
