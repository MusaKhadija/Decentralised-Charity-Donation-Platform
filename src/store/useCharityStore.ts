import { create } from 'zustand';
import { Charity } from '../types/charity';
import { mockCharities } from '../data/mockData';

interface CharityState {
  charities: Charity[];
  featuredCharities: Charity[];
  isLoading: boolean;
  error: string | null;
  fetchCharities: () => Promise<void>;
  fetchFeaturedCharities: () => Promise<void>;
  registerCharity: (charity: Omit<Charity, 'id'>) => Promise<void>;
}

export const useCharityStore = create<CharityState>((set) => ({
  charities: [],
  featuredCharities: [],
  isLoading: false,
  error: null,
  
  fetchCharities: async () => {
    set({ isLoading: true });
    try {
      // In a real implementation, this would fetch from the blockchain
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ charities: mockCharities, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch charities', isLoading: false });
    }
  },
  
  fetchFeaturedCharities: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const featured = mockCharities.filter(charity => charity.featured);
      set({ featuredCharities: featured, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch featured charities', isLoading: false });
    }
  },
  
  registerCharity: async (charity) => {
    set({ isLoading: true });
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newCharity: Charity = {
        ...charity,
        id: `charity-${Date.now()}`,
        verified: false,
        totalDonations: 0,
        donorCount: 0,
        featured: false,
      };
      
      set(state => ({
        charities: [...state.charities, newCharity],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to register charity', isLoading: false });
    }
  },
}));