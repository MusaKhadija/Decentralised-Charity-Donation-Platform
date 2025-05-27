import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Shield, Globe, Users, Code, Zap, Target, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { label: 'Total Donations', value: '$2.5M+', icon: <Heart className="h-6 w-6" /> },
    { label: 'Verified Charities', value: '1,000+', icon: <Shield className="h-6 w-6" /> },
    { label: 'Countries Reached', value: '100+', icon: <Globe className="h-6 w-6" /> },
    { label: 'Active Donors', value: '50K+', icon: <Users className="h-6 w-6" /> },
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-orange" />,
      title: 'Transparency',
      description: 'Every donation is recorded on the blockchain, providing complete transparency and accountability.'
    },
    {
      icon: <Heart className="h-8 w-8 text-orange" />,
      title: 'Impact',
      description: 'We focus on maximizing the impact of every donation by connecting donors directly with verified charities.'
    },
    {
      icon: <Globe className="h-8 w-8 text-orange" />,
      title: 'Global Reach',
      description: 'Breaking down geographical barriers to enable worldwide charitable giving and support.'
    },
    {
      icon: <Users className="h-8 w-8 text-orange" />,
      title: 'Community',
      description: 'Building a global community of donors and charities united by the desire to make a difference.'
    }
  ];

  const techStack = [
    { name: 'React', description: 'Modern frontend framework for building user interfaces' },
    { name: 'TypeScript', description: 'Type-safe JavaScript for better development experience' },
    { name: 'Stacks Blockchain', description: 'Bitcoin-secured smart contracts for transparent donations' },
    { name: 'Framer Motion', description: 'Beautiful animations and micro-interactions' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid UI development' },
    { name: 'Zustand', description: 'Lightweight state management for React applications' }
  ];

  const milestones = [
    { year: '2024', title: 'Platform Launch', description: 'GiveChain officially launches with blockchain-powered donations' },
    { year: '2024', title: 'First 100 Charities', description: 'Reached milestone of 100 verified charitable organizations' },
    { year: '2024', title: '$1M in Donations', description: 'Facilitated over $1 million in transparent charitable donations' },
    { year: '2024', title: 'Global Expansion', description: 'Expanded to serve charities and donors in 50+ countries' }
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
              About{' '}
              <span className="text-orange animate-pulse-glow">GiveChain</span>
            </h1>
            
            <p className="text-xl text-text-light max-w-3xl mx-auto mb-8">
              Revolutionizing charitable giving through blockchain technology, 
              creating transparency, trust, and global impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-text-dark mb-6">Our Mission</h2>
              <p className="text-lg text-charcoal mb-6 leading-relaxed">
                GiveChain is dedicated to transforming the charitable giving landscape by leveraging 
                blockchain technology to create unprecedented transparency, security, and efficiency 
                in donations.
              </p>
              <p className="text-lg text-charcoal mb-6 leading-relaxed">
                We believe that every donation should be traceable, every charity should be verified, 
                and every donor should have complete confidence that their contribution is making a 
                real difference in the world.
              </p>
              <div className="flex items-center space-x-4">
                <Target className="h-8 w-8 text-orange" />
                <span className="text-lg font-semibold text-text-dark">
                  Connecting hearts, changing lives, one blockchain transaction at a time.
                </span>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-orange to-orange-red rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    >
                      <div className="flex justify-center mb-2">
                        <div className="p-2 bg-white/20 rounded-lg">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm opacity-90">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-bg-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-text-dark mb-4">Our Values</h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              The principles that guide everything we do at GiveChain
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-orange/10 rounded-full">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-text-dark mb-4">Meet Our Team</h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Passionate individuals dedicated to revolutionizing charitable giving
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-orange to-orange-red rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Code className="h-12 w-12 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-text-dark mb-2">Khadija Musa</h3>
              <p className="text-orange font-semibold mb-4">Lead Developer & Founder</p>
              <p className="text-charcoal mb-6 leading-relaxed">
                Passionate blockchain developer from Nigeria, dedicated to creating 
                transparent and impactful solutions for charitable giving. Combining 
                technical expertise with a vision for social good.
              </p>
              
              <div className="flex justify-center space-x-4">
                <motion.div
                  className="p-2 bg-gray-100 rounded-lg hover:bg-orange hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Code className="h-5 w-5" />
                </motion.div>
                <motion.div
                  className="p-2 bg-gray-100 rounded-lg hover:bg-orange hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Globe className="h-5 w-5" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-bg-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-text-dark mb-4">Technology Stack</h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Built with modern, secure, and scalable technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center mb-3">
                  <Zap className="h-6 w-6 text-orange mr-3" />
                  <h3 className="text-lg font-semibold text-text-dark">{tech.name}</h3>
                </div>
                <p className="text-charcoal text-sm">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-text-dark mb-4">Our Journey</h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Key milestones in our mission to transform charitable giving
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange opacity-20"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center mb-3">
                        <Award className="h-6 w-6 text-orange mr-2" />
                        <span className="text-orange font-bold">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-text-dark mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-charcoal">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-orange rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-orange to-orange-red text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of the revolution in charitable giving. Together, we can create 
              a more transparent and impactful world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/charities"
                className="bg-white text-orange font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Donating
              </motion.a>
              <motion.a
                href="/register-charity"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-orange transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register Your Charity
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
