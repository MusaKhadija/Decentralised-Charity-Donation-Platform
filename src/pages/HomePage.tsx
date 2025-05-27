import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCharities from '../components/home/FeaturedCharities';
import HowItWorks from '../components/home/HowItWorks';
import CharityRegistrationCTA from '../components/home/CharityRegistrationCTA';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedCharities />
      <HowItWorks />
      <CharityRegistrationCTA />
    </div>
  );
};

export default HomePage;