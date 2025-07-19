import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  PiggyBank, 
  DollarSign, 
  BarChart3, 
  Shield,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownRight 
} from 'lucide-react';
import { useTreasuryStore } from '../../store/useTreasuryStore';
import { CharityTreasury } from '../../types/treasury';
import StakingPoolCard from './StakingPoolCard';
import TransactionHistory from './TransactionHistory';
import YieldCalculator from './YieldCalculator';

interface TreasuryDashboardProps {
  charityAddress: string;
}

const TreasuryDashboard: React.FC<TreasuryDashboardProps> = ({ charityAddress }) => {
  const {
    treasuries,
    stakingPools,
    stats,
    isLoading,
    error,
    fetchTreasury,
    fetchStakingPools,
    fetchTreasuryStats,
    depositToTreasury,
    withdrawFromTreasury,
    stakeFunds,
    emergencyWithdraw,
  } = useTreasuryStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'staking' | 'history' | 'calculator'>('overview');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const treasury = treasuries.find(t => t.charityAddress === charityAddress);
  const charityPools = stakingPools.filter(p => p.charityAddress === charityAddress);

  useEffect(() => {
    fetchTreasury(charityAddress);
    fetchStakingPools(charityAddress);
    fetchTreasuryStats();
  }, [charityAddress, fetchTreasury, fetchStakingPools, fetchTreasuryStats]);

  const handleDeposit = async () => {
    if (depositAmount && parseFloat(depositAmount) > 0) {
      await depositToTreasury(charityAddress, parseFloat(depositAmount));
      setDepositAmount('');
    }
  };

  const handleWithdraw = async () => {
    if (withdrawAmount && parseFloat(withdrawAmount) > 0) {
      await withdrawFromTreasury(charityAddress, parseFloat(withdrawAmount));
      setWithdrawAmount('');
    }
  };

  const handleStake = async () => {
    if (stakeAmount && parseFloat(stakeAmount) > 0) {
      await stakeFunds(charityAddress, parseFloat(stakeAmount));
      setStakeAmount('');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatSTX = (amount: number) => {
    return `${amount.toLocaleString()} STX`;
  };

  if (isLoading && !treasury) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!treasury) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Treasury not found for this charity</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Treasury Dashboard</h1>
            <p className="text-orange-100">Manage your charity's funds and earn yield through staking</p>
          </div>
          <div className="text-right">
            <p className="text-orange-200 text-sm">Total Value Locked (Platform)</p>
            <p className="text-2xl font-bold">{formatSTX(stats.totalValueLocked)}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900">{formatSTX(treasury.totalBalance)}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Staked Amount</p>
              <p className="text-2xl font-bold text-gray-900">{formatSTX(treasury.stakedAmount)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <PiggyBank className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900">{formatSTX(treasury.availableBalance)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Yield Earned</p>
              <p className="text-2xl font-bold text-green-600">{formatSTX(treasury.yieldEarned)}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <ArrowDownRight className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold">Deposit Funds</h3>
          </div>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Amount (STX)"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              onClick={handleDeposit}
              disabled={isLoading || !depositAmount}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Processing...' : 'Deposit'}
            </button>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <ArrowUpRight className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="font-semibold">Withdraw Funds</h3>
          </div>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Amount (STX)"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              max={treasury.availableBalance}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              onClick={handleWithdraw}
              disabled={isLoading || !withdrawAmount || parseFloat(withdrawAmount) > treasury.availableBalance}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold">Stake for Yield</h3>
          </div>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Amount (STX)"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              max={treasury.availableBalance}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              onClick={handleStake}
              disabled={isLoading || !stakeAmount || parseFloat(stakeAmount) > treasury.availableBalance}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Processing...' : `Stake (${treasury.apy}% APY)`}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Emergency Withdrawal */}
      {stats.emergencyMode && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <h3 className="font-semibold text-red-800">Emergency Mode Active</h3>
                <p className="text-red-600 text-sm">Emergency withdrawals are enabled</p>
              </div>
            </div>
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Emergency Withdraw
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'staking', label: 'Staking Pools', icon: PiggyBank },
              { key: 'history', label: 'Transaction History', icon: Clock },
              { key: 'calculator', label: 'Yield Calculator', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.key
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Treasury Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Current APY</span>
                      <span className="font-semibold text-green-600">{treasury.apy}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Staking Ratio</span>
                      <span className="font-semibold">
                        {((treasury.stakedAmount / treasury.totalBalance) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Active Pools</span>
                      <span className="font-semibold">{charityPools.length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Platform Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Total Yield Generated</span>
                      <span className="font-semibold">{formatSTX(stats.totalYieldGenerated)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Average APY</span>
                      <span className="font-semibold text-green-600">{stats.averageApy}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Total Pools</span>
                      <span className="font-semibold">{stats.numberOfStakingPools}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'staking' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Active Staking Pools</h3>
              {charityPools.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {charityPools.map((pool) => (
                    <StakingPoolCard key={pool.id} pool={pool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <PiggyBank className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No active staking pools</p>
                  <p className="text-gray-400 text-sm">Stake some funds to start earning yield</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <TransactionHistory charityAddress={charityAddress} />
          )}

          {activeTab === 'calculator' && (
            <YieldCalculator apy={treasury.apy} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TreasuryDashboard;
