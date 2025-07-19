import { create } from 'zustand';
import { CharityTreasury, StakingPool, TreasuryTransaction, TreasuryStats } from '../types/treasury';

interface TreasuryState {
  treasuries: CharityTreasury[];
  stakingPools: StakingPool[];
  transactions: TreasuryTransaction[];
  stats: TreasuryStats;
  isLoading: boolean;
  error: string | null;
  
  // Treasury Management
  fetchTreasury: (charityAddress: string) => Promise<void>;
  depositToTreasury: (charityAddress: string, amount: number) => Promise<void>;
  withdrawFromTreasury: (charityAddress: string, amount: number) => Promise<void>;
  
  // Staking Operations
  stakeFunds: (charityAddress: string, amount: number) => Promise<void>;
  unstakeFunds: (poolId: number, amount: number) => Promise<void>;
  claimYield: (poolId: number) => Promise<void>;
  
  // Data Fetching
  fetchStakingPools: (charityAddress: string) => Promise<void>;
  fetchTransactionHistory: (charityAddress: string) => Promise<void>;
  fetchTreasuryStats: () => Promise<void>;
  
  // Emergency Functions
  emergencyWithdraw: (charityAddress: string, amount: number) => Promise<void>;
}

const mockTreasuryData: CharityTreasury = {
  charityAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
  totalBalance: 10000,
  stakedAmount: 6000,
  availableBalance: 4000,
  yieldEarned: 480,
  lastYieldClaim: 12345,
  emergencyContact: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
  apy: 8.0,
};

const mockStakingPools: StakingPool[] = [
  {
    id: 1,
    charityAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    principalAmount: 3000,
    stakeStartHeight: 10000,
    lastRewardHeight: 12000,
    pendingYield: 240,
    stakingDuration: 2000,
  },
  {
    id: 2,
    charityAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    principalAmount: 3000,
    stakeStartHeight: 11000,
    lastRewardHeight: 12000,
    pendingYield: 120,
    stakingDuration: 1000,
  },
];

const mockTransactions: TreasuryTransaction[] = [
  {
    id: 'tx-001',
    type: 'deposit',
    amount: 5000,
    timestamp: '2024-01-15T10:00:00Z',
    blockHeight: 9500,
    txHash: '0x123...abc',
    status: 'completed',
  },
  {
    id: 'tx-002',
    type: 'stake',
    amount: 3000,
    timestamp: '2024-01-16T14:30:00Z',
    blockHeight: 10000,
    txHash: '0x456...def',
    status: 'completed',
  },
  {
    id: 'tx-003',
    type: 'claim',
    amount: 240,
    timestamp: '2024-01-20T09:15:00Z',
    blockHeight: 12000,
    txHash: '0x789...ghi',
    status: 'completed',
  },
];

const mockStats: TreasuryStats = {
  totalValueLocked: 25000,
  totalYieldGenerated: 2000,
  averageApy: 8.2,
  numberOfStakingPools: 15,
  emergencyMode: false,
};

export const useTreasuryStore = create<TreasuryState>((set, get) => ({
  treasuries: [],
  stakingPools: [],
  transactions: [],
  stats: mockStats,
  isLoading: false,
  error: null,

  fetchTreasury: async (charityAddress) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call to fetch treasury data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const treasury = { ...mockTreasuryData, charityAddress };
      set(state => ({
        treasuries: [
          ...state.treasuries.filter(t => t.charityAddress !== charityAddress),
          treasury
        ],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to fetch treasury data', isLoading: false });
    }
  },

  depositToTreasury: async (charityAddress, amount) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const transaction: TreasuryTransaction = {
        id: `tx-${Date.now()}`,
        type: 'deposit',
        amount,
        timestamp: new Date().toISOString(),
        blockHeight: Math.floor(Math.random() * 1000) + 12000,
        status: 'completed',
      };

      set(state => ({
        treasuries: state.treasuries.map(t => 
          t.charityAddress === charityAddress 
            ? { 
                ...t, 
                totalBalance: t.totalBalance + amount,
                availableBalance: t.availableBalance + amount 
              }
            : t
        ),
        transactions: [transaction, ...state.transactions],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to deposit to treasury', isLoading: false });
    }
  },

  withdrawFromTreasury: async (charityAddress, amount) => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      const treasury = state.treasuries.find(t => t.charityAddress === charityAddress);
      
      if (!treasury || amount > treasury.availableBalance) {
        throw new Error('Insufficient available balance');
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const transaction: TreasuryTransaction = {
        id: `tx-${Date.now()}`,
        type: 'withdraw',
        amount,
        timestamp: new Date().toISOString(),
        blockHeight: Math.floor(Math.random() * 1000) + 12000,
        status: 'completed',
      };

      set(state => ({
        treasuries: state.treasuries.map(t => 
          t.charityAddress === charityAddress 
            ? { 
                ...t, 
                totalBalance: t.totalBalance - amount,
                availableBalance: t.availableBalance - amount 
              }
            : t
        ),
        transactions: [transaction, ...state.transactions],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to withdraw from treasury', isLoading: false });
    }
  },

  stakeFunds: async (charityAddress, amount) => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      const treasury = state.treasuries.find(t => t.charityAddress === charityAddress);
      
      if (!treasury || amount > treasury.availableBalance) {
        throw new Error('Insufficient available balance');
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPool: StakingPool = {
        id: state.stakingPools.length + 1,
        charityAddress,
        principalAmount: amount,
        stakeStartHeight: Math.floor(Math.random() * 1000) + 12000,
        lastRewardHeight: Math.floor(Math.random() * 1000) + 12000,
        pendingYield: 0,
        stakingDuration: 0,
      };

      const transaction: TreasuryTransaction = {
        id: `tx-${Date.now()}`,
        type: 'stake',
        amount,
        timestamp: new Date().toISOString(),
        blockHeight: newPool.stakeStartHeight,
        status: 'completed',
      };

      set(state => ({
        treasuries: state.treasuries.map(t => 
          t.charityAddress === charityAddress 
            ? { 
                ...t, 
                stakedAmount: t.stakedAmount + amount,
                availableBalance: t.availableBalance - amount 
              }
            : t
        ),
        stakingPools: [...state.stakingPools, newPool],
        transactions: [transaction, ...state.transactions],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to stake funds', isLoading: false });
    }
  },

  unstakeFunds: async (poolId, amount) => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      const pool = state.stakingPools.find(p => p.id === poolId);
      
      if (!pool || amount > pool.principalAmount) {
        throw new Error('Invalid unstake amount');
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const transaction: TreasuryTransaction = {
        id: `tx-${Date.now()}`,
        type: 'unstake',
        amount,
        timestamp: new Date().toISOString(),
        blockHeight: Math.floor(Math.random() * 1000) + 12000,
        status: 'completed',
      };

      set(state => ({
        treasuries: state.treasuries.map(t => 
          t.charityAddress === pool.charityAddress 
            ? { 
                ...t, 
                stakedAmount: t.stakedAmount - amount,
                availableBalance: t.availableBalance + amount 
              }
            : t
        ),
        stakingPools: amount === pool.principalAmount 
          ? state.stakingPools.filter(p => p.id !== poolId)
          : state.stakingPools.map(p => 
              p.id === poolId 
                ? { ...p, principalAmount: p.principalAmount - amount }
                : p
            ),
        transactions: [transaction, ...state.transactions],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to unstake funds', isLoading: false });
    }
  },

  claimYield: async (poolId) => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      const pool = state.stakingPools.find(p => p.id === poolId);
      
      if (!pool || pool.pendingYield <= 0) {
        throw new Error('No yield to claim');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const yieldAmount = pool.pendingYield;
      const transaction: TreasuryTransaction = {
        id: `tx-${Date.now()}`,
        type: 'claim',
        amount: yieldAmount,
        timestamp: new Date().toISOString(),
        blockHeight: Math.floor(Math.random() * 1000) + 12000,
        status: 'completed',
      };

      set(state => ({
        treasuries: state.treasuries.map(t => 
          t.charityAddress === pool.charityAddress 
            ? { 
                ...t, 
                totalBalance: t.totalBalance + yieldAmount,
                availableBalance: t.availableBalance + yieldAmount,
                yieldEarned: t.yieldEarned + yieldAmount,
                lastYieldClaim: Math.floor(Math.random() * 1000) + 12000
              }
            : t
        ),
        stakingPools: state.stakingPools.map(p => 
          p.id === poolId 
            ? { ...p, pendingYield: 0, lastRewardHeight: Math.floor(Math.random() * 1000) + 12000 }
            : p
        ),
        transactions: [transaction, ...state.transactions],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to claim yield', isLoading: false });
    }
  },

  fetchStakingPools: async (charityAddress) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const pools = mockStakingPools.filter(p => p.charityAddress === charityAddress);
      set({ stakingPools: pools, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch staking pools', isLoading: false });
    }
  },

  fetchTransactionHistory: async (charityAddress) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // In a real implementation, filter by charity address
      set({ transactions: mockTransactions, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch transaction history', isLoading: false });
    }
  },

  fetchTreasuryStats: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ stats: mockStats, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch treasury stats', isLoading: false });
    }
  },

  emergencyWithdraw: async (charityAddress, amount) => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      const treasury = state.treasuries.find(t => t.charityAddress === charityAddress);
      
      if (!treasury || amount > treasury.totalBalance) {
        throw new Error('Insufficient total balance');
      }

      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const transaction: TreasuryTransaction = {
        id: `tx-${Date.now()}`,
        type: 'emergency',
        amount,
        timestamp: new Date().toISOString(),
        blockHeight: Math.floor(Math.random() * 1000) + 12000,
        status: 'completed',
      };

      set(state => ({
        treasuries: state.treasuries.map(t => 
          t.charityAddress === charityAddress 
            ? { 
                ...t, 
                totalBalance: t.totalBalance - amount,
                availableBalance: Math.max(0, t.availableBalance - amount),
                stakedAmount: Math.max(0, t.stakedAmount - Math.max(0, amount - t.availableBalance))
              }
            : t
        ),
        transactions: [transaction, ...state.transactions],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to execute emergency withdrawal', isLoading: false });
    }
  },
}));
