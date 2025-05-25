import React from 'react';
import { Donation } from '../../types/donation';
import { ExternalLink } from 'lucide-react';

interface DonationHistoryProps {
  donations: Donation[];
  isLoading: boolean;
}

const DonationHistory: React.FC<DonationHistoryProps> = ({ donations, isLoading }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="flex justify-between">
              <div className="w-1/3">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (donations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No donations found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {donations.map((donation) => (
        <div key={donation.id} className="bg-white rounded-lg shadow-md p-4 transition duration-300 hover:shadow-lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h3 className="font-medium text-gray-900">{donation.charityName}</h3>
              <p className="text-sm text-gray-500">{formatDate(donation.timestamp)}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {donation.amount} STX
              </span>
            </div>
          </div>
          
          {donation.message && (
            <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-md italic">
              "{donation.message}"
            </div>
          )}
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {donation.donorName ? donation.donorName : 'Anonymous'}
            </span>
            
            <a
              href={`https://explorer.stacks.co/txid/${donation.transactionId}?chain=mainnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-800"
            >
              View Transaction <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationHistory;