import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Calendar, PiggyBank } from 'lucide-react';

interface YieldCalculatorProps {
  apy: number;
}

const YieldCalculator: React.FC<YieldCalculatorProps> = ({ apy }) => {
  const [principal, setPrincipal] = useState(1000);
  const [timeframe, setTimeframe] = useState(365); // days
  const [compoundFrequency, setCompoundFrequency] = useState(365); // daily
  const [results, setResults] = useState({
    totalReturn: 0,
    totalYield: 0,
    dailyYield: 0,
    monthlyYield: 0,
    yearlyYield: 0,
  });

  useEffect(() => {
    calculateYield();
  }, [principal, timeframe, compoundFrequency, apy]);

  const calculateYield = () => {
    if (principal <= 0 || timeframe <= 0) return;

    const rate = apy / 100;
    const periodsPerYear = compoundFrequency;
    const years = timeframe / 365;

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const totalReturn = principal * Math.pow(1 + rate / periodsPerYear, periodsPerYear * years);
    const totalYield = totalReturn - principal;
    
    const dailyYield = totalYield / timeframe;
    const monthlyYield = totalYield / (timeframe / 30);
    const yearlyYield = totalYield / years;

    setResults({
      totalReturn,
      totalYield,
      dailyYield,
      monthlyYield,
      yearlyYield,
    });
  };

  const formatSTX = (amount: number) => {
    return `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} STX`;
  };

  const timeFrameOptions = [
    { value: 30, label: '1 Month' },
    { value: 90, label: '3 Months' },
    { value: 180, label: '6 Months' },
    { value: 365, label: '1 Year' },
    { value: 730, label: '2 Years' },
    { value: 1825, label: '5 Years' },
  ];

  const compoundOptions = [
    { value: 1, label: 'Annually' },
    { value: 12, label: 'Monthly' },
    { value: 52, label: 'Weekly' },
    { value: 365, label: 'Daily' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-orange-100 p-2 rounded-lg">
          <Calculator className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Yield Calculator</h3>
          <p className="text-sm text-gray-600">Calculate potential returns on your staked funds</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h4 className="font-semibold mb-4">Investment Parameters</h4>
            
            <div className="space-y-4">
              {/* Principal Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Principal Amount (STX)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="100"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter amount to stake"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {[500, 1000, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setPrincipal(amount)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Frame */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Period
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                  >
                    {timeFrameOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Compound Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compound Frequency
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={compoundFrequency}
                    onChange={(e) => setCompoundFrequency(parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                  >
                    {compoundOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Current APY Display */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Current APY</span>
                  <span className="text-2xl font-bold text-green-600">{apy}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white"
          >
            <h4 className="font-semibold mb-4">Projected Returns</h4>
            
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-orange-100 text-sm">Total Return</p>
                <p className="text-3xl font-bold">{formatSTX(results.totalReturn)}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-orange-100 text-sm">Total Yield Earned</p>
                <p className="text-2xl font-bold">{formatSTX(results.totalYield)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h4 className="font-semibold mb-4">Yield Breakdown</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Daily Yield</span>
                <span className="font-semibold text-blue-600">{formatSTX(results.dailyYield)}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Monthly Yield</span>
                <span className="font-semibold text-green-600">{formatSTX(results.monthlyYield)}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">Yearly Yield</span>
                <span className="font-semibold text-purple-600">{formatSTX(results.yearlyYield)}</span>
              </div>
            </div>
          </motion.div>

          {/* ROI Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <PiggyBank className="h-5 w-5 text-gray-600 mr-2" />
              <h4 className="font-semibold">Investment Summary</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Initial Investment</p>
                <p className="font-semibold">{formatSTX(principal)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">ROI Percentage</p>
                <p className="font-semibold text-green-600">
                  {principal > 0 ? ((results.totalYield / principal) * 100).toFixed(2) : 0}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Investment Period</p>
                <p className="font-semibold">{timeframe} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Compound Frequency</p>
                <p className="font-semibold">
                  {compoundOptions.find(opt => opt.value === compoundFrequency)?.label}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-medium text-yellow-800 mb-2">⚠️ Important Disclaimer</h5>
        <p className="text-sm text-yellow-700">
          These calculations are estimates based on the current APY and compound frequency. 
          Actual returns may vary due to market conditions, protocol changes, and other factors. 
          Staking involves risks, and past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
};

export default YieldCalculator;
