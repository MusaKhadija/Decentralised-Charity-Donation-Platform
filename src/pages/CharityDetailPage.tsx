import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CharityDetail from '../components/charity/CharityDetail';
import { useCharityStore } from '../store/useCharityStore';
import { Charity } from '../types/charity';

const CharityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { charities, isLoading, fetchCharities } = useCharityStore();
  const [charity, setCharity] = useState<Charity | null>(null);
  
  useEffect(() => {
    if (charities.length === 0) {
      fetchCharities();
    } else {
      const foundCharity = charities.find(c => c.id === id) || null;
      setCharity(foundCharity);
    }
  }, [id, charities, fetchCharities]);
  
  useEffect(() => {
    // Set page title when charity data is loaded
    if (charity) {
      document.title = `${charity.name} - GiveChain`;
    }
    
    // Reset title when component unmounts
    return () => {
      document.title = 'GiveChain';
    };
  }, [charity]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CharityDetail charity={charity!} isLoading={isLoading} />
    </div>
  );
};

export default CharityDetailPage;