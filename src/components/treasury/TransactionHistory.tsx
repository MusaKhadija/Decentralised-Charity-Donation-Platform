import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  PiggyBank, 
  TrendingUp, 
  Shield,
  ExternalLink,
  Filter,
  Search 
} from 'lucide-react';
import { useTreasuryStore } from '../../store/useTreasuryStore';
import { TreasuryTransaction } from '../../types/treasury';

interface TransactionHistoryProps {
  charityAddress: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ charityAddress }) => {
  const { transactions, isLoading, fetchTransactionHistory } = useTreasuryStore();
  const [filteredTransactions, setFilteredTransactions] = useState<TreasuryTransaction[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransactionHistory(charityAddress);
  }, [charityAddress, fetchTransactionHistory]);

  useEffect(() => {
    let filtered = transactions;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(tx => tx.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.txHash?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, filterType, searchTerm]);

  const getTransactionIcon = (type: TreasuryTransaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownRight className="h-5 w-5 text-blue-600" />;
      case 'withdraw':
        return <ArrowUpRight className="h-5 w-5 text-purple-600" />;
      case 'stake':
        return <PiggyBank className="h-5 w-5 text-green-600" />;
      case 'unstake':
        return <ArrowUpRight className="h-5 w-5 text-orange-600" />;
      case 'claim':
        return <TrendingUp className="h-5 w-5 text-emerald-600" />;
      case 'emergency':
        return <Shield className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: TreasuryTransaction['type']) => {
    switch (type) {
      case 'deposit':
        return 'bg-blue-50 border-blue-200';
      case 'withdraw':
        return 'bg-purple-50 border-purple-200';
      case 'stake':
        return 'bg-green-50 border-green-200';
      case 'unstake':
        return 'bg-orange-50 border-orange-200';
      case 'claim':
        return 'bg-emerald-50 border-emerald-200';
      case 'emergency':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadge = (status: TreasuryTransaction['status']) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Failed</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>;
    }
  };

  const formatSTX = (amount: number) => {
    return `${amount.toLocaleString()} STX`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const transactionTypes = [
    { value: 'all', label: 'All Transactions' },
    { value: 'deposit', label: 'Deposits' },
    { value: 'withdraw', label: 'Withdrawals' },
    { value: 'stake', label: 'Staking' },
    { value: 'unstake', label: 'Unstaking' },
    { value: 'claim', label: 'Yield Claims' },
    { value: 'emergency', label: 'Emergency' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h3 className="text-lg font-semibold">Transaction History</h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
            >
              {transactionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`rounded-lg border p-4 ${getTransactionColor(transaction.type)} hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    
                    {/* Transaction Details */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">
                          {capitalizeFirst(transaction.type)}
                        </h4>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-gray-600">
                          {formatDate(transaction.timestamp)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Block #{transaction.blockHeight.toLocaleString()}
                        </p>
                        {transaction.txHash && (
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-500">TX:</span>
                            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                              {transaction.txHash.slice(0, 8)}...{transaction.txHash.slice(-6)}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Amount */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {transaction.type === 'withdraw' || transaction.type === 'unstake' || transaction.type === 'emergency' ? '-' : '+'}
                      {formatSTX(transaction.amount)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {searchTerm || filterType !== 'all' 
              ? 'No transactions found matching your criteria' 
              : 'No transaction history available'}
          </p>
          {(searchTerm || filterType !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
              }}
              className="mt-2 text-orange-600 hover:text-orange-700 text-sm"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Summary */}
      {filteredTransactions.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Transaction Summary</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {filteredTransactions.filter(tx => tx.type === 'deposit').length}
              </p>
              <p className="text-sm text-gray-600">Deposits</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {filteredTransactions.filter(tx => tx.type === 'stake').length}
              </p>
              <p className="text-sm text-gray-600">Stakes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">
                {filteredTransactions.filter(tx => tx.type === 'claim').length}
              </p>
              <p className="text-sm text-gray-600">Claims</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {filteredTransactions.filter(tx => tx.type === 'withdraw').length}
              </p>
              <p className="text-sm text-gray-600">Withdrawals</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
