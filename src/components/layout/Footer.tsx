import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Twitter, Facebook, Github, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/khadijamusa/Decentralised-Charity-Donation-Platform',
      icon: <Github className="h-5 w-5" />,
      hoverColor: 'hover:text-gray-300'
    },
    {
      name: 'Twitter/X',
      url: 'https://twitter.com/givechain',
      icon: <Twitter className="h-5 w-5" />,
      hoverColor: 'hover:text-blue-400'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/givechain',
      icon: <Facebook className="h-5 w-5" />,
      hoverColor: 'hover:text-blue-500'
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Charities', path: '/charities' },
    { name: 'Register Charity', path: '/register-charity' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' }
  ];

  return (
    <footer className="bg-bg-dark text-text-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-red rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
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
                <Heart className="h-8 w-8 text-orange" />
              </motion.div>
              <span className="text-2xl font-bold text-white">GiveChain</span>
            </motion.div>

            <motion.p
              className="text-text-light mb-6 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Revolutionizing charitable giving through blockchain technology.
              Creating transparency, trust, and global impact one donation at a time.
            </motion.p>

            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-800 rounded-lg text-text-light ${social.hoverColor} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              className="text-white font-bold mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                >
                  <Link
                    to={link.path}
                    className="text-text-light hover:text-orange transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h3
              className="text-white font-bold mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Get in Touch
            </motion.h3>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange" />
                <a
                  href="mailto:support@givechain.org"
                  className="text-text-light hover:text-orange transition-colors duration-300"
                >
                  support@givechain.org
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange" />
                <span className="text-text-light">Nigeria & Global</span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange" />
                <span className="text-text-light">24/7 Support</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-text-light">
              &copy; {new Date().getFullYear()} GiveChain. All rights reserved. Built with ❤️ by Khadija Musa.
            </p>

            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-text-light hover:text-orange transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-text-light hover:text-orange transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
