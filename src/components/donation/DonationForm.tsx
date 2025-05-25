import React, { useState } from 'react';
import { Charity } from '../../types/charity';
import { useDonationStore } from '../../store/useDonationStore';
import { useStacks } from '../../contexts/StacksContext';
import { DollarSign } from 'lucide-react';

interface DonationFormProps {
  charity: Charity;
}

const DonationForm: React.FC<DonationFormProps> = ({ charity }) => {
  const { makeDonation, isLoading } = useDonationStore();
  const { userData } = useStacks();
  
  const [amount, setAmount] = useState<number>(10);
  const [message, setMessage] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userAddress = userData?.profile?.stxAddress?.mainnet || '';
    
    await makeDonation({
      charityId: charity.id,
      charityName: charity.name,
      amount,
      donorAddress: userAddress,
      donorName: isAnonymous ? 'Anonymous' : donorName,
      message,
      transactionId: `tx-${Date.now()}`, // In a real app, this would be the actual transaction ID
    });
    
    // Reset form and show success message
    setAmount(10);
    setMessage('');
    setDonorName('');
    setIsAnonymous(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAmount(value);
    }
  };
  
  return (
    <div>
      {showSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-green-800">Donation Successful!</h3>
          <p className="mt-2 text-sm text-green-700">
            Thank you for your generous donation of {amount} STX to {charity.name}.
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition duration-150"
          >
            Make Another Donation
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount (STX)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                min="1"
                required
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">STX</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <button
                type="button"
                onClick={() => setAmount(10)}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                  amount === 10
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                10 STX
              </button>
            </div>
            <div className="md:col-span-1">
              <button
                type="button"
                onClick={() => setAmount(25)}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                  amount === 25
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                25 STX
              </button>
            </div>
            <div className="md:col-span-1">
              <button
                type="button"
                onClick={() => setAmount(50)}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                  amount === 50
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                50 STX
              </button>
            </div>
            <div className="md:col-span-1">
              <button
                type="button"
                onClick={() => setAmount(100)}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                  amount === 100
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                100 STX
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name (Optional)
              </label>
              <input
                type="text"
                id="donorName"
                value={isAnonymous ? '' : donorName}
                onChange={(e) => setDonorName(e.target.value)}
                disabled={isAnonymous}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="anonymous"
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                Make this donation anonymous
              </label>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Leave a message for the charity..."
              ></textarea>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || amount <= 0}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : `Donate ${amount} STX`}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DonationForm;