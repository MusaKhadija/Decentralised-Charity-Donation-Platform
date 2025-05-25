import React from 'react';
import { Link } from 'react-router-dom';
import { Charity } from '../../types/charity';
import { BadgeCheck, ExternalLink } from 'lucide-react';

interface CharityCardProps {
  charity: Charity;
}

const CharityCard: React.FC<CharityCardProps> = ({ charity }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="h-48 relative overflow-hidden">
        <img 
          src={charity.imageUrl} 
          alt={charity.name} 
          className="w-full h-full object-cover" 
        />
        {charity.featured && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center space-x-1 mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{charity.name}</h3>
          {charity.verified && (
            <BadgeCheck className="h-5 w-5 text-teal-500" title="Verified Charity" />
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{charity.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Category:</span>
            <p className="font-medium text-gray-800">{charity.category}</p>
          </div>
          <div>
            <span className="text-gray-500">Donors:</span>
            <p className="font-medium text-gray-800">{charity.donorCount}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Total Donations:</span>
            <p className="font-medium text-gray-800">{charity.totalDonations} STX</p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link 
            to={`/charities/${charity.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
          >
            View Details
          </Link>
          
          <a 
            href={charity.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-500 hover:text-indigo-600"
          >
            Website <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CharityCard;