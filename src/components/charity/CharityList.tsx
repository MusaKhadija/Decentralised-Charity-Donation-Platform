import React from 'react';
import { Charity } from '../../types/charity';
import CharityCard from './CharityCard';

interface CharityListProps {
  charities: Charity[];
  isLoading: boolean;
}

const CharityList: React.FC<CharityListProps> = ({ charities, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-5 space-y-3">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
              <div className="flex justify-between pt-2">
                <div className="h-8 bg-gray-300 rounded w-24"></div>
                <div className="h-8 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (charities.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No charities found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {charities.map(charity => (
        <CharityCard key={charity.id} charity={charity} />
      ))}
    </div>
  );
};

export default CharityList;