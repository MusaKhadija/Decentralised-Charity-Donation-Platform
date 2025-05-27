import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wallet, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: <Wallet className="h-10 w-10 text-orange-red" />,
      title: 'Connect Your Wallet',
      description: 'Link your Hiro Wallet to our platform with just a few clicks. Your funds remain secure and under your control at all times.',
    },
    {
      icon: <DollarSign className="h-10 w-10 text-orange-red" />,
      title: 'Make a Donation',
      description: 'Choose a verified charity and donate any amount of STX tokens. The transaction is processed securely on the Stacks blockchain.',
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-orange-red" />,
      title: 'Track Your Impact',
      description: 'All donations are recorded on-chain and can be viewed in real-time. See exactly how your contribution is making a difference.',
    },
  ];

  return (
    <section className="py-16 bg-bg-blue relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-orange-red rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-orange rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-text-dark">How It Works</h2>
          <p className="mt-4 text-lg text-charcoal max-w-2xl mx-auto">
            GiveChain makes charitable giving transparent, secure, and efficient through blockchain technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="card p-6 flex flex-col items-center text-center relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Step number */}
              <motion.div
                className="absolute -top-3 -right-3 w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{
                  delay: 0.5 + index * 0.2,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {index + 1}
              </motion.div>

              <motion.div
                className="bg-orange-red/10 rounded-full p-4 mb-6 group-hover:bg-orange-red/20 transition-colors duration-300"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -10, 10, 0],
                }}
                transition={{ duration: 0.5 }}
              >
                {step.icon}
              </motion.div>

              <motion.h3
                className="text-xl font-bold text-text-dark mb-3"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              >
                {step.title}
              </motion.h3>

              <motion.p
                className="text-charcoal"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
              >
                {step.description}
              </motion.p>

              {/* Connection arrow for desktop */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.8 + index * 0.3, duration: 0.6 }}
                >
                  <ArrowRight className="h-8 w-8 text-orange" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/charities" className="btn-primary inline-flex items-center group">
              Start Donating
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
      </div>
    </section>
  );
};

export default HowItWorks;
