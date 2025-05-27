import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Charity } from '../../types/charity';
import { useDonationStore } from '../../store/useDonationStore';
import { useStacks } from '../../contexts/StacksContext';
import { DollarSign, Heart, CheckCircle, Sparkles } from 'lucide-react';

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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const predefinedAmounts = [5, 10, 25, 50, 100];

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
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            className="text-center py-8"
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.div
              className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4 relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              <CheckCircle className="h-8 w-8 text-green-600" />

              {/* Celebration particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos(i * 45 * Math.PI / 180) * 40,
                    y: Math.sin(i * 45 * Math.PI / 180) * 40,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>

            <motion.h3
              className="text-xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              🎉 Donation Successful!
            </motion.h3>

            <motion.p
              className="text-sm text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Thank you for your generous donation of <span className="font-bold text-orange-red">{amount} STX</span> to {charity.name}.
              Your contribution will make a real difference!
            </motion.p>

            <motion.button
              onClick={() => setShowSuccess(false)}
              className="btn-primary inline-flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="mr-2 h-4 w-4" />
              Make Another Donation
            </motion.button>
          </motion.div>
        ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-label="Donation form"
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-3">
              Donation Amount (STX)
            </label>
            <motion.div
              className="relative rounded-md shadow-sm"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                animate={{
                  color: focusedField === 'amount' ? '#ff9835' : '#9CA3AF'
                }}
              >
                <DollarSign className="h-5 w-5" />
              </motion.div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                onFocus={() => setFocusedField('amount')}
                onBlur={() => setFocusedField(null)}
                min="1"
                required
                className="focus:ring-orange focus:border-orange block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3 transition-all duration-300"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm font-medium">STX</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-sm font-medium text-gray-700 mb-3">Quick amounts:</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {predefinedAmounts.map((presetAmount, index) => (
                <motion.button
                  key={presetAmount}
                  type="button"
                  onClick={() => setAmount(presetAmount)}
                  className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    amount === presetAmount
                      ? 'bg-orange text-white shadow-lg ring-2 ring-orange ring-opacity-50'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    animate={{
                      scale: amount === presetAmount ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {presetAmount} STX
                  </motion.span>
                  {amount === presetAmount && (
                    <motion.div
                      className="absolute inset-0 bg-orange rounded-lg opacity-20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

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
              aria-busy={isLoading}
              aria-disabled={isLoading || amount <= 0}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : `Donate ${amount} STX`}
            </button>
          </div>
          {/* Placeholder for error feedback */}
          {/* {error && <div className="text-red-600 mt-2" role="alert">{error}</div>} */}
        </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DonationForm;