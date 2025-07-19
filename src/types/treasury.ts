export interface CharityTreasury {
  charityAddress: string;
  totalBalance: number;
  stakedAmount: number;
  availableBalance: number;
  yieldEarned: number;
  lastYieldClaim: number;
  emergencyContact: string;
  apy: number;
}

export interface StakingPool {
  id: number;
  charityAddress: string;
  principalAmount: number;
  stakeStartHeight: number;
  lastRewardHeight: number;
  pendingYield: number;
  stakingDuration: number; // in blocks
}

export interface TreasuryTransaction {
  id: string;
  type: 'deposit' | 'stake' | 'unstake' | 'claim' | 'withdraw' | 'emergency';
  amount: number;
  timestamp: string;
  blockHeight: number;
  txHash?: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface TreasuryStats {
  totalValueLocked: number;
  totalYieldGenerated: number;
  averageApy: number;
  numberOfStakingPools: number;
  emergencyMode: boolean;
}

export interface YieldCalculation {
  principal: number;
  timeStaked: number; // in blocks
  apy: number;
  yieldAmount: number;
  compoundFrequency: 'daily' | 'weekly' | 'monthly';
}
