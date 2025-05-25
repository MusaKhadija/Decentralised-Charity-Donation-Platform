import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCharities from '../components/home/FeaturedCharities';
import HowItWorks from '../components/home/HowItWorks';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <FeaturedCharities />
    </div>
  );
};

export default HomePage;