import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import DonationHistory from '../components/donation/DonationHistory';
import { useDonationStore } from '../store/useDonationStore';
import { useStacks } from '../contexts/StacksContext';

const DonationHistoryPage: React.FC = () => {
  const { userDonations, isLoading, fetchUserDonations } = useDonationStore();
  const { authenticated, userData } = useStacks();
  
  useEffect(() => {
    if (authenticated && userData) {
      const userAddress = userData.profile.stxAddress.mainnet;
      fetchUserDonations(userAddress);
    }
  }, [authenticated, userData, fetchUserDonations]);
  
  // If not authenticated, redirect to home page
  if (!authenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Your Donation History</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
          Track all your contributions to charitable causes.
        </p>
      </div>
      
      <DonationHistory donations={userDonations} isLoading={isLoading} />
    </div>
  );
};

export default DonationHistoryPage;