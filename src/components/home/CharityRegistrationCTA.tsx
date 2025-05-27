import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building, ArrowRight, Shield, Globe, Users, Heart } from 'lucide-react';

const CharityRegistrationCTA: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      text: 'Global Reach'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      text: 'Transparent Donations'
    },
    {
      icon: <Users className="h-6 w-6" />,
      text: 'Verified Status'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      text: 'Zero Platform Fees'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange to-orange-red text-white relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Building className="h-8 w-8 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Are You a Charity Organization?
            </h2>
            
            <p className="text-xl text-white/90 mb-6">
              Join our blockchain-powered platform and connect with donors worldwide. 
              Experience transparent, secure, and efficient charitable giving.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg">
                    {feature.icon}
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                to="/register-charity"
                className="inline-flex items-center bg-white text-orange font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
              >
                Register Your Charity
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ 
                      y: [-10, 10, -10],
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Join 1000+ Charities
                  </h3>
                  
                  <p className="text-white/80 mb-6">
                    Already making a difference on our platform
                  </p>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">$2.5M+</div>
                      <div className="text-sm text-white/70">Donated</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">50K+</div>
                      <div className="text-sm text-white/70">Donors</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">100+</div>
                      <div className="text-sm text-white/70">Countries</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-white rounded-full opacity-60"
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CharityRegistrationCTA;
