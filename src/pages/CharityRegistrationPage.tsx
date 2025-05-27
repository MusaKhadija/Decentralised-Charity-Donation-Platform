import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CharityRegistrationForm from '../components/charity/CharityRegistrationForm';
import { Shield, Clock, CheckCircle, Users, Globe, Heart } from 'lucide-react';

const CharityRegistrationPage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: <Globe className="h-8 w-8 text-orange" />,
      title: 'Global Reach',
      description: 'Connect with donors worldwide through our blockchain-powered platform'
    },
    {
      icon: <Shield className="h-8 w-8 text-orange" />,
      title: 'Transparent Donations',
      description: 'All donations are recorded on the blockchain for complete transparency'
    },
    {
      icon: <Users className="h-8 w-8 text-orange" />,
      title: 'Verified Status',
      description: 'Get verified status to build trust with potential donors'
    },
    {
      icon: <Heart className="h-8 w-8 text-orange" />,
      title: 'Zero Platform Fees',
      description: '100% of donations go directly to your organization'
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Submit Application',
      description: 'Fill out our comprehensive registration form with your organization details'
    },
    {
      step: 2,
      title: 'Verification Process',
      description: 'Our team reviews your application and verifies your organization\'s legitimacy'
    },
    {
      step: 3,
      title: 'Get Listed',
      description: 'Once approved, your charity appears on our platform and can start receiving donations'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-bg-dark via-charcoal to-bg-dark text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-orange rounded-full mb-6"
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
              <Heart className="h-8 w-8 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Register Your{' '}
              <span className="text-orange animate-pulse-glow">Charity</span>
            </h1>
            
            <p className="text-xl text-text-light max-w-3xl mx-auto mb-8">
              Join our blockchain-powered platform and connect with donors worldwide. 
              Experience transparent, secure, and efficient charitable giving.
            </p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>Free Registration</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <Clock className="h-4 w-4 text-blue-400 mr-2" />
                <span>3-5 Day Review</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <Shield className="h-4 w-4 text-orange mr-2" />
                <span>Verified Status</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-text-dark mb-4">
              Why Choose GiveChain?
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Our platform offers unique advantages for charitable organizations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-orange/10 rounded-full">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-text-dark mb-2">
                  {benefit.title}
                </h3>
                <p className="text-charcoal text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-bg-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-text-dark mb-4">
              Registration Process
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Simple steps to get your charity listed on our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="bg-white rounded-xl p-6 text-center relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-text-dark mb-2">
                      {step.title}
                    </h3>
                    <p className="text-charcoal text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-orange transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-text-dark mb-4">
              Start Your Registration
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Complete the form below to register your charity on our platform
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <CharityRegistrationForm />
          </motion.div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-text-dark mb-4">
              Need Help?
            </h2>
            <p className="text-charcoal mb-6">
              Our team is here to help you through the registration process. 
              If you have any questions or need assistance, don't hesitate to reach out.
            </p>
            <motion.a
              href="mailto:support@givechain.org"
              className="btn-primary inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CharityRegistrationPage;
