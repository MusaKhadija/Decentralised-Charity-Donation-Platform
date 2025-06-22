import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDonationStore } from '../useDonationStore';
import { mockDonation } from '../../test-utils';

// Mock the mockData import
vi.mock('../../data/mockData', () => ({
  mockDonations: [mockDonation],
}));

describe('useDonationStore', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useDonationStore.setState({
      donations: [],
      userDonations: [],
      isLoading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useDonationStore());

    expect(result.current.donations).toEqual([]);
    expect(result.current.userDonations).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('fetches donations successfully', async () => {
    const { result } = renderHook(() => useDonationStore());

    await act(async () => {
      await result.current.fetchDonations();
    });

    expect(result.current.donations).toEqual([mockDonation]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('sets loading state during fetchDonations', async () => {
    const { result } = renderHook(() => useDonationStore());

    // Start the async operation
    const fetchPromise = act(async () => {
      await result.current.fetchDonations();
    });

    // Check loading state is set immediately
    expect(result.current.isLoading).toBe(true);

    // Wait for completion
    await fetchPromise;

    expect(result.current.isLoading).toBe(false);
  });

  it('fetches user donations for specific address', async () => {
    const { result } = renderHook(() => useDonationStore());
    const userAddress = mockDonation.donorAddress;

    await act(async () => {
      await result.current.fetchUserDonations(userAddress);
    });

    expect(result.current.userDonations).toEqual([mockDonation]);
    expect(result.current.isLoading).toBe(false);
  });

  it('filters user donations by address correctly', async () => {
    const { result } = renderHook(() => useDonationStore());
    const differentAddress = 'ST2DIFFERENT_ADDRESS';

    await act(async () => {
      await result.current.fetchUserDonations(differentAddress);
    });

    expect(result.current.userDonations).toEqual([]);
  });

  it('makes a donation successfully', async () => {
    const { result } = renderHook(() => useDonationStore());

    const newDonation = {
      charityId: 'charity-2',
      charityName: 'New Test Charity',
      amount: 200,
      donorAddress: 'ST2NEWADDRESS',
      donorName: 'New Donor',
      message: 'New donation message',
      transactionId: 'tx-new-123',
    };

    await act(async () => {
      await result.current.makeDonation(newDonation);
    });

    expect(result.current.donations).toHaveLength(1);
    expect(result.current.userDonations).toHaveLength(1);
    expect(result.current.isLoading).toBe(false);

    const addedDonation = result.current.donations[0];
    expect(addedDonation).toMatchObject(newDonation);
    expect(addedDonation.id).toMatch(/^donation-\d+$/);
    expect(addedDonation.timestamp).toBeDefined();
  });

  it('sets loading state during makeDonation', async () => {
    const { result } = renderHook(() => useDonationStore());

    const newDonation = {
      charityId: 'charity-2',
      charityName: 'New Test Charity',
      amount: 200,
      donorAddress: 'ST2NEWADDRESS',
      donorName: 'New Donor',
      message: 'New donation message',
      transactionId: 'tx-new-123',
    };

    // Start the async operation
    const donationPromise = act(async () => {
      await result.current.makeDonation(newDonation);
    });

    // Check loading state is set immediately
    expect(result.current.isLoading).toBe(true);

    // Wait for completion
    await donationPromise;

    expect(result.current.isLoading).toBe(false);
  });

  it('handles donation errors gracefully', async () => {
    const { result } = renderHook(() => useDonationStore());

    // Mock a rejection by overriding the setTimeout to reject
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = vi.fn().mockImplementation((callback, delay) => {
      if (delay === 1500) { // This is the delay used in makeDonation
        throw new Error('Network error');
      }
      return originalSetTimeout(callback, delay);
    });

    const newDonation = {
      charityId: 'charity-2',
      charityName: 'New Test Charity',
      amount: 200,
      donorAddress: 'ST2NEWADDRESS',
      donorName: 'New Donor',
      message: 'New donation message',
      transactionId: 'tx-new-123',
    };

    await act(async () => {
      try {
        await result.current.makeDonation(newDonation);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Failed to process donation');
    expect(result.current.isLoading).toBe(false);

    // Restore original setTimeout
    global.setTimeout = originalSetTimeout;
  });

  it('handles fetch donations errors gracefully', async () => {
    const { result } = renderHook(() => useDonationStore());

    // Mock a rejection
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = vi.fn().mockImplementation((callback, delay) => {
      if (delay === 1000) { // This is the delay used in fetchDonations
        throw new Error('Network error');
      }
      return originalSetTimeout(callback, delay);
    });

    await act(async () => {
      try {
        await result.current.fetchDonations();
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Failed to fetch donations');
    expect(result.current.isLoading).toBe(false);

    // Restore original setTimeout
    global.setTimeout = originalSetTimeout;
  });

  it('handles fetch user donations errors gracefully', async () => {
    const { result } = renderHook(() => useDonationStore());

    // Mock a rejection
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = vi.fn().mockImplementation((callback, delay) => {
      if (delay === 800) { // This is the delay used in fetchUserDonations
        throw new Error('Network error');
      }
      return originalSetTimeout(callback, delay);
    });

    await act(async () => {
      try {
        await result.current.fetchUserDonations('test-address');
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Failed to fetch user donations');
    expect(result.current.isLoading).toBe(false);

    // Restore original setTimeout
    global.setTimeout = originalSetTimeout;
  });

  it('generates unique donation IDs', async () => {
    const { result } = renderHook(() => useDonationStore());

    const donation1 = {
      charityId: 'charity-1',
      charityName: 'Charity 1',
      amount: 100,
      donorAddress: 'ST1ADDRESS',
      donorName: 'Donor 1',
      message: 'Message 1',
      transactionId: 'tx-1',
    };

    const donation2 = {
      charityId: 'charity-2',
      charityName: 'Charity 2',
      amount: 200,
      donorAddress: 'ST2ADDRESS',
      donorName: 'Donor 2',
      message: 'Message 2',
      transactionId: 'tx-2',
    };

    await act(async () => {
      await result.current.makeDonation(donation1);
    });

    // Small delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    await act(async () => {
      await result.current.makeDonation(donation2);
    });

    expect(result.current.donations).toHaveLength(2);
    expect(result.current.donations[0].id).not.toBe(result.current.donations[1].id);
  });

  it('adds donations to both donations and userDonations arrays', async () => {
    const { result } = renderHook(() => useDonationStore());

    const newDonation = {
      charityId: 'charity-1',
      charityName: 'Test Charity',
      amount: 100,
      donorAddress: 'ST1ADDRESS',
      donorName: 'Test Donor',
      message: 'Test message',
      transactionId: 'tx-123',
    };

    await act(async () => {
      await result.current.makeDonation(newDonation);
    });

    expect(result.current.donations).toHaveLength(1);
    expect(result.current.userDonations).toHaveLength(1);
    expect(result.current.donations[0]).toEqual(result.current.userDonations[0]);
  });
});
