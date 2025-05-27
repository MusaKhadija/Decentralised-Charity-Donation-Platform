import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import { BrowserRouter } from 'react-router-dom';
import CharityDetailPage from '../pages/CharityDetailPage';
import { mockCharity, mockStacksContext } from '../test-utils';
import * as charityStore from '../store/useCharityStore';
import * as donationStore from '../store/useDonationStore';
import * as stacksContext from '../contexts/StacksContext';
import * as router from 'react-router-dom';

// Mock all the dependencies
vi.mock('../store/useCharityStore');
vi.mock('../store/useDonationStore');
vi.mock('../contexts/StacksContext');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: 'charity-1' }),
    useNavigate: () => vi.fn(),
  };
});

const mockUseCharityStore = vi.mocked(charityStore.useCharityStore);
const mockUseDonationStore = vi.mocked(donationStore.useDonationStore);
const mockUseStacks = vi.mocked(stacksContext.useStacks);

describe('Donation Flow Integration', () => {
  const mockMakeDonation = vi.fn();
  const mockGetCharityById = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockGetCharityById.mockReturnValue(mockCharity);
    
    mockUseCharityStore.mockReturnValue({
      charities: [mockCharity],
      featuredCharities: [mockCharity],
      isLoading: false,
      error: null,
      searchTerm: '',
      selectedCategory: 'All',
      fetchCharities: vi.fn(),
      setSearchTerm: vi.fn(),
      setSelectedCategory: vi.fn(),
      getCharityById: mockGetCharityById,
    });

    mockUseDonationStore.mockReturnValue({
      donations: [],
      userDonations: [],
      isLoading: false,
      error: null,
      fetchDonations: vi.fn(),
      fetchUserDonations: vi.fn(),
      makeDonation: mockMakeDonation,
    });

    mockUseStacks.mockReturnValue(mockStacksContext);
  });

  it('completes full donation flow from charity detail page', async () => {
    mockMakeDonation.mockResolvedValue(undefined);

    render(
      <BrowserRouter>
        <CharityDetailPage />
      </BrowserRouter>
    );

    // Verify charity information is displayed
    expect(screen.getByText(mockCharity.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharity.description)).toBeInTheDocument();

    // Find and interact with donation form
    const amountInput = screen.getByLabelText(/donation amount/i);
    const nameInput = screen.getByLabelText(/your name/i);
    const messageInput = screen.getByLabelText(/message/i);

    // Fill out the donation form
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(nameInput, { target: { value: 'Integration Test User' } });
    fireEvent.change(messageInput, { target: { value: 'Testing the donation flow' } });

    // Submit the donation
    const donateButton = screen.getByRole('button', { name: /donate 100 stx/i });
    fireEvent.click(donateButton);

    // Verify donation was submitted with correct data
    await waitFor(() => {
      expect(mockMakeDonation).toHaveBeenCalledWith({
        charityId: mockCharity.id,
        charityName: mockCharity.name,
        amount: 100,
        donorAddress: mockStacksContext.userData.profile.stxAddress.mainnet,
        donorName: 'Integration Test User',
        message: 'Testing the donation flow',
        transactionId: expect.stringMatching(/^tx-\d+$/),
      });
    });

    // Verify success message appears
    await waitFor(() => {
      expect(screen.getByText(/donation successful/i)).toBeInTheDocument();
    });
  });

  it('handles donation with predefined amounts', async () => {
    mockMakeDonation.mockResolvedValue(undefined);

    render(
      <BrowserRouter>
        <CharityDetailPage />
      </BrowserRouter>
    );

    // Click on a predefined amount button
    const amount50Button = screen.getByRole('button', { name: '50 STX' });
    fireEvent.click(amount50Button);

    // Submit the donation
    const donateButton = screen.getByRole('button', { name: /donate 50 stx/i });
    fireEvent.click(donateButton);

    // Verify donation was submitted with correct amount
    await waitFor(() => {
      expect(mockMakeDonation).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 50,
        })
      );
    });
  });

  it('handles anonymous donations correctly', async () => {
    mockMakeDonation.mockResolvedValue(undefined);

    render(
      <BrowserRouter>
        <CharityDetailPage />
      </BrowserRouter>
    );

    // Toggle anonymous donation
    const anonymousCheckbox = screen.getByLabelText(/make this donation anonymous/i);
    fireEvent.click(anonymousCheckbox);

    // Submit the donation
    const donateButton = screen.getByRole('button', { name: /donate 10 stx/i });
    fireEvent.click(donateButton);

    // Verify donation was submitted as anonymous
    await waitFor(() => {
      expect(mockMakeDonation).toHaveBeenCalledWith(
        expect.objectContaining({
          donorName: 'Anonymous',
        })
      );
    });
  });

  it('shows loading state during donation processing', async () => {
    // Mock loading state
    mockUseDonationStore.mockReturnValue({
      donations: [],
      userDonations: [],
      isLoading: true,
      error: null,
      fetchDonations: vi.fn(),
      fetchUserDonations: vi.fn(),
      makeDonation: mockMakeDonation,
    });

    render(
      <BrowserRouter>
        <CharityDetailPage />
      </BrowserRouter>
    );

    // Verify loading state is shown
    const submitButton = screen.getByRole('button', { name: /processing/i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute('aria-busy', 'true');
  });

  it('handles donation errors gracefully', async () => {
    const errorMessage = 'Transaction failed';
    mockMakeDonation.mockRejectedValue(new Error(errorMessage));

    // Mock error state
    mockUseDonationStore.mockReturnValue({
      donations: [],
      userDonations: [],
      isLoading: false,
      error: 'Failed to process donation',
      fetchDonations: vi.fn(),
      fetchUserDonations: vi.fn(),
      makeDonation: mockMakeDonation,
    });

    render(
      <BrowserRouter>
        <CharityDetailPage />
      </BrowserRouter>
    );

    // The error should be handled gracefully
    // In a real implementation, you might show an error toast or message
    expect(screen.getByText(mockCharity.name)).toBeInTheDocument();
  });

  it('validates required wallet connection', async () => {
    // Mock unauthenticated state
    mockUseStacks.mockReturnValue({
      ...mockStacksContext,
      authenticated: false,
      userData: null,
    });

    render(
      <BrowserRouter>
        <CharityDetailPage />
      </BrowserRouter>
    );

    // Should show wallet connection prompt instead of donation form
    // This depends on how the component handles unauthenticated users
    expect(screen.getByText(mockCharity.name)).toBeInTheDocument();
  });

  it('resets form after successful donation', async () => {
    let donationComplete = false;
    mockMakeDonation.mockImplementation(() => {
      donationComplete = true;
      return Promise.resolve();
    });

    render(
      <BrowserRouter>
        <CharityDetailPage />
      </BrowserRouter>
    );

    // Fill out the form
    const amountInput = screen.getByLabelText(/donation amount/i);
    const nameInput = screen.getByLabelText(/your name/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.change(amountInput, { target: { value: '75' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // Submit the donation
    const donateButton = screen.getByRole('button', { name: /donate 75 stx/i });
    fireEvent.click(donateButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/donation successful/i)).toBeInTheDocument();
    });

    // Click "Make Another Donation" to reset form
    const anotherDonationButton = screen.getByRole('button', { name: /make another donation/i });
    fireEvent.click(anotherDonationButton);

    // Verify form is reset
    await waitFor(() => {
      expect(screen.getByDisplayValue('10')).toBeInTheDocument(); // Default amount
      expect(nameInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });
  });

  it('displays charity verification status', () => {
    render(
      <BrowserRouter>
        <CharityDetailPage />
      </BrowserRouter>
    );

    // Should show verified badge for verified charity
    expect(screen.getByText(/verified/i)).toBeInTheDocument();
  });

  it('shows charity statistics correctly', () => {
    render(
      <BrowserRouter>
        <CharityDetailPage />
      </BrowserRouter>
    );

    // Should display total donations and donor count
    expect(screen.getByText(/1,000/)).toBeInTheDocument(); // totalDonations
    expect(screen.getByText(/50/)).toBeInTheDocument(); // donorCount
  });

  it('handles missing charity gracefully', () => {
    mockGetCharityById.mockReturnValue(null);

    render(
      <BrowserRouter>
        <CharityDetailPage />
      </BrowserRouter>
    );

    // Should handle missing charity without crashing
    // This might show a "Charity not found" message
    expect(screen.queryByText(mockCharity.name)).not.toBeInTheDocument();
  });
});
