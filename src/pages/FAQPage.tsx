import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Search, HelpCircle, Shield, Wallet, Users, Globe } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQPage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Questions', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'blockchain', label: 'Blockchain & Donations', icon: <Shield className="h-5 w-5" /> },
    { id: 'wallet', label: 'Wallet Setup', icon: <Wallet className="h-5 w-5" /> },
    { id: 'charity', label: 'Charity Verification', icon: <Users className="h-5 w-5" /> },
    { id: 'platform', label: 'Platform Usage', icon: <Globe className="h-5 w-5" /> },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      category: 'blockchain',
      question: 'How does blockchain technology make donations more transparent?',
      answer: 'Blockchain technology creates an immutable record of every donation. When you donate through GiveChain, your transaction is recorded on the Stacks blockchain, which means it cannot be altered or deleted. This provides complete transparency as anyone can verify that donations reached their intended recipients.'
    },
    {
      id: '2',
      category: 'blockchain',
      question: 'What are the benefits of using STX tokens for donations?',
      answer: 'STX tokens offer several advantages: lower transaction fees compared to traditional payment methods, faster international transfers, complete transparency through blockchain records, and the ability to donate to charities worldwide without currency conversion issues.'
    },
    {
      id: '3',
      category: 'wallet',
      question: 'How do I set up a Hiro Wallet for donations?',
      answer: 'To set up a Hiro Wallet: 1) Visit hiro.so and download the wallet extension, 2) Create a new wallet and securely store your seed phrase, 3) Fund your wallet with STX tokens from a cryptocurrency exchange, 4) Connect your wallet to GiveChain by clicking "Connect Wallet" on our platform.'
    },
    {
      id: '4',
      category: 'wallet',
      question: 'Is my wallet information secure on GiveChain?',
      answer: 'Yes, your wallet information is completely secure. GiveChain never stores your private keys or seed phrases. We only interact with your wallet through secure, industry-standard protocols. Your wallet remains under your complete control at all times.'
    },
    {
      id: '5',
      category: 'charity',
      question: 'How are charities verified on the platform?',
      answer: 'Our verification process includes: 1) Document verification of legal charity status, 2) Background checks on the organization and leadership, 3) Review of financial transparency and impact reports, 4) Ongoing monitoring of charity activities. Verified charities receive a blue checkmark badge.'
    },
    {
      id: '6',
      category: 'charity',
      question: 'Can I trust that my donation will reach the intended charity?',
      answer: 'Absolutely. All donations are sent directly to the charity\'s verified wallet address on the blockchain. There are no intermediaries, and you can track your donation in real-time using the transaction ID provided after your donation.'
    },
    {
      id: '7',
      category: 'platform',
      question: 'Are there any fees for making donations?',
      answer: 'GiveChain charges zero platform fees - 100% of your donation goes directly to the charity. You only pay minimal blockchain transaction fees (typically less than $0.50) which go to the network validators, not to GiveChain.'
    },
    {
      id: '8',
      category: 'platform',
      question: 'Can I get a tax receipt for my donations?',
      answer: 'Tax receipts depend on the charity\'s policies and your local tax laws. Many of our verified charities can provide tax receipts. Contact the charity directly using the information on their profile page to request a receipt.'
    },
    {
      id: '9',
      category: 'platform',
      question: 'How can I track the impact of my donations?',
      answer: 'You can track your donations in several ways: 1) View your donation history in your account, 2) Use the blockchain transaction ID to verify on Stacks Explorer, 3) Follow charity updates and impact reports on their profile pages, 4) Receive periodic impact updates via email if you opt-in.'
    },
    {
      id: '10',
      category: 'blockchain',
      question: 'What happens if I send my donation to the wrong address?',
      answer: 'Blockchain transactions are irreversible, so it\'s crucial to verify the recipient address. GiveChain automatically fills in verified charity addresses to prevent errors. If you accidentally send to a wrong address outside our platform, the transaction cannot be reversed.'
    },
    {
      id: '11',
      category: 'charity',
      question: 'How can my organization join GiveChain as a verified charity?',
      answer: 'To register your charity: 1) Click "Register Charity" in our navigation, 2) Complete the multi-step application form, 3) Submit required documentation, 4) Wait for our verification team to review (3-5 business days), 5) Once approved, your charity will be listed on the platform.'
    },
    {
      id: '12',
      category: 'platform',
      question: 'Is GiveChain available worldwide?',
      answer: 'Yes, GiveChain is accessible globally. However, charity registration and donation regulations may vary by country. We work with charities worldwide and support international donations through the Stacks blockchain network.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

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
              <HelpCircle className="h-8 w-8 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked{' '}
              <span className="text-orange animate-pulse-glow">Questions</span>
            </h1>
            
            <p className="text-xl text-text-light max-w-3xl mx-auto mb-8">
              Find answers to common questions about blockchain donations, wallet setup, 
              charity verification, and platform usage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200" ref={ref}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange focus:border-orange transition-colors duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-orange text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {filteredFAQs.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
                <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
              </motion.div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-text-dark pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-charcoal leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-bg-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-text-dark mb-4">
              Still Have Questions?
            </h2>
            <p className="text-charcoal mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
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

export default FAQPage;
