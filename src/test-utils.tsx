import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StacksProvider } from './contexts/StacksContext';
import { ToastProvider } from './contexts/ToastContext';

// Mock user data for testing
export const mockUserData = {
  profile: {
    stxAddress: {
      mainnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      testnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    },
    name: 'Test User',
  },
  username: 'testuser.id.stx',
  identityAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
};

// Mock charity data for testing
export const mockCharity = {
  id: 'charity-1',
  name: 'Test Charity',
  description: 'A test charity for unit testing',
  mission: 'To test charitable giving functionality',
  category: 'Testing',
  imageUrl: 'https://example.com/test-image.jpg',
  website: 'https://testcharity.org',
  walletAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  verified: true,
  totalDonations: 1000,
  donorCount: 50,
  featured: true,
  socialLinks: {
    twitter: 'https://twitter.com/testcharity',
    facebook: 'https://facebook.com/testcharity',
  },
};

// Mock donation data for testing
export const mockDonation = {
  id: 'donation-1',
  charityId: 'charity-1',
  charityName: 'Test Charity',
  amount: 100,
  donorAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  donorName: 'Test Donor',
  message: 'Test donation message',
  timestamp: '2024-01-15T10:30:00Z',
  transactionId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
};

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <StacksProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </StacksProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Test utilities for common interactions
export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 100));
};

export const createMockEvent = (value: string) => ({
  target: { value },
  preventDefault: () => {},
  stopPropagation: () => {},
});

export const createMockFormEvent = (formData: Record<string, string>) => ({
  preventDefault: () => {},
  target: {
    elements: Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = { value };
      return acc;
    }, {} as any),
  },
});

// Mock store states
export const mockDonationStoreState = {
  donations: [mockDonation],
  userDonations: [mockDonation],
  isLoading: false,
  error: null,
  fetchDonations: vi.fn(),
  fetchUserDonations: vi.fn(),
  makeDonation: vi.fn(),
};

export const mockCharityStoreState = {
  charities: [mockCharity],
  featuredCharities: [mockCharity],
  isLoading: false,
  error: null,
  searchTerm: '',
  selectedCategory: 'All',
  fetchCharities: vi.fn(),
  setSearchTerm: vi.fn(),
  setSelectedCategory: vi.fn(),
  getCharityById: vi.fn().mockReturnValue(mockCharity),
};

// Mock Stacks context
export const mockStacksContext = {
  userSession: {} as any,
  network: {} as any,
  userData: mockUserData,
  authenticated: true,
  connecting: false,
  handleSignIn: vi.fn(),
  handleSignOut: vi.fn(),
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
export { vi } from 'vitest';
