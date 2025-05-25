import { create } from 'zustand';
import { Donation } from '../types/donation';
import { mockDonations } from '../data/mockData';

interface DonationState {
  donations: Donation[];
  userDonations: Donation[];
  isLoading: boolean;
  error: string | null;
  fetchDonations: () => Promise<void>;
  fetchUserDonations: (userAddress: string) => Promise<void>;
  makeDonation: (donation: Omit<Donation, 'id' | 'timestamp'>) => Promise<void>;
}

export const useDonationStore = create<DonationState>((set, get) => ({
  donations: [],
  userDonations: [],
  isLoading: false,
  error: null,
  
  fetchDonations: async () => {
    set({ isLoading: true });
    try {
      // In a real implementation, this would fetch from the blockchain
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ donations: mockDonations, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch donations', isLoading: false });
    }
  },
  
  fetchUserDonations: async (userAddress) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const userDonations = mockDonations.filter(
        donation => donation.donorAddress.toLowerCase() === userAddress.toLowerCase()
      );
      set({ userDonations, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch user donations', isLoading: false });
    }
  },
  
  makeDonation: async (donation) => {
    set({ isLoading: true });
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newDonation: Donation = {
        ...donation,
        id: `donation-${Date.now()}`,
        timestamp: new Date().toISOString(),
      };
      
      set(state => ({
        donations: [...state.donations, newDonation],
        userDonations: [...state.userDonations, newDonation],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to process donation', isLoading: false });
    }
  },
}));