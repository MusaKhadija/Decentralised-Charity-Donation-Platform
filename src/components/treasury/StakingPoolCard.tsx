import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, TrendingUp, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';
import { StakingPool } from '../../types/treasury';
import { useTreasuryStore } from '../../store/useTreasuryStore';

interface StakingPoolCardProps {
  pool: StakingPool;
}

const StakingPoolCard: React.FC<StakingPoolCardProps> = ({ pool }) => {
  const { claimYield, unstakeFunds, isLoading } = useTreasuryStore();
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [showUnstakeInput, setShowUnstakeInput] = useState(false);

  const handleClaimYield = async () => {
    await claimYield(pool.id);
  };

  const handleUnstake = async () => {
    if (unstakeAmount && parseFloat(unstakeAmount) > 0) {
      await unstakeFunds(pool.id, parseFloat(unstakeAmount));
      setUnstakeAmount('');
      setShowUnstakeInput(false);
    }
  };

  const formatSTX = (amount: number) => {
    return `${amount.toLocaleString()} STX`;
  };

  const calculateYieldRate = () => {
    const dailyRate = 8 / 365; // 8% APY to daily rate
    return (pool.principalAmount * dailyRate / 100).toFixed(2);
  };

  const getStakingDurationDays = () => {
    // Assuming 144 blocks per day (10 minute block times)
    return Math.floor(pool.stakingDuration / 144);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-lg mr-3">
            <PiggyBank className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Pool #{pool.id}</h3>
            <p className="text-sm text-gray-500">Active Staking Pool</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-medium">{getStakingDurationDays()} days</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 font-medium">PRINCIPAL</p>
              <p className="text-lg font-bold text-blue-900">{formatSTX(pool.principalAmount)}</p>
            </div>
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-600 font-medium">PENDING YIELD</p>
              <p className="text-lg font-bold text-green-900">{formatSTX(pool.pendingYield)}</p>
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Yield Information */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Daily Yield Rate</p>
            <p className="text-xl font-bold text-orange-600">{calculateYieldRate()} STX</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">APY</p>
            <p className="text-xl font-bold text-green-600">8.0%</p>
          </div>
        </div>
      </div>

      {/* Pool Details */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Start Block</span>
          <span className="font-medium">#{pool.stakeStartHeight.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Last Reward</span>
          <span className="font-medium">#{pool.lastRewardHeight.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Blocks Staked</span>
          <span className="font-medium">{pool.stakingDuration.toLocaleString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {/* Claim Yield Button */}
        <button
          onClick={handleClaimYield}
          disabled={isLoading || pool.pendingYield <= 0}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          {isLoading ? 'Claiming...' : `Claim Yield (${formatSTX(pool.pendingYield)})`}
        </button>

        {/* Unstake Button */}
        {!showUnstakeInput ? (
          <button
            onClick={() => setShowUnstakeInput(true)}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Unstake Funds
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="number"
              placeholder={`Max: ${pool.principalAmount} STX`}
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              max={pool.principalAmount}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleUnstake}
                disabled={isLoading || !unstakeAmount || parseFloat(unstakeAmount) > pool.principalAmount}
                className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {isLoading ? 'Processing...' : 'Confirm Unstake'}
              </button>
              <button
                onClick={() => {
                  setShowUnstakeInput(false);
                  setUnstakeAmount('');
                }}
                className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-600">Staking Progress</span>
          <span className="text-xs text-gray-600">{getStakingDurationDays()} days</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((getStakingDurationDays() / 30) * 100, 100)}%` }}
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {getStakingDurationDays() < 30 
            ? `${30 - getStakingDurationDays()} days until full maturity`
            : 'Fully matured - optimal yield rate'}
        </p>
      </div>
    </motion.div>
  );
};

export default StakingPoolCard;
