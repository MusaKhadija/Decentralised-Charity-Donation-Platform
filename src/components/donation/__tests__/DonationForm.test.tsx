import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../../test-utils';
import DonationForm from '../DonationForm';
import { mockCharity, mockStacksContext, mockDonationStoreState } from '../../../test-utils';
import * as donationStore from '../../../store/useDonationStore';
import * as stacksContext from '../../../contexts/StacksContext';

// Mock the stores and contexts
vi.mock('../../../store/useDonationStore');
vi.mock('../../../contexts/StacksContext');

const mockUseDonationStore = vi.mocked(donationStore.useDonationStore);
const mockUseStacks = vi.mocked(stacksContext.useStacks);

describe('DonationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseDonationStore.mockReturnValue(mockDonationStoreState);
    mockUseStacks.mockReturnValue(mockStacksContext);
  });

  it('renders donation form with all required fields', () => {
    render(<DonationForm charity={mockCharity} />);

    expect(screen.getByLabelText(/donation amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/make this donation anonymous/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /donate 10 stx/i })).toBeInTheDocument();
  });

  it('displays predefined amount buttons', () => {
    render(<DonationForm charity={mockCharity} />);

    const predefinedAmounts = [5, 10, 25, 50, 100];
    predefinedAmounts.forEach(amount => {
      expect(screen.getByRole('button', { name: `${amount} STX` })).toBeInTheDocument();
    });
  });

  it('updates amount when predefined button is clicked', async () => {
    render(<DonationForm charity={mockCharity} />);

    const amount25Button = screen.getByRole('button', { name: '25 STX' });
    fireEvent.click(amount25Button);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /donate 25 stx/i })).toBeInTheDocument();
    });
  });

  it('updates amount when input field is changed', async () => {
    render(<DonationForm charity={mockCharity} />);

    const amountInput = screen.getByLabelText(/donation amount/i);
    fireEvent.change(amountInput, { target: { value: '75' } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /donate 75 stx/i })).toBeInTheDocument();
    });
  });

  it('handles anonymous donation toggle', async () => {
    render(<DonationForm charity={mockCharity} />);

    const nameInput = screen.getByLabelText(/your name/i);
    const anonymousCheckbox = screen.getByLabelText(/make this donation anonymous/i);

    // Initially, name input should be enabled
    expect(nameInput).not.toBeDisabled();

    // Toggle anonymous donation
    fireEvent.click(anonymousCheckbox);

    await waitFor(() => {
      expect(nameInput).toBeDisabled();
      expect(nameInput).toHaveValue('');
    });
  });

  it('submits donation with correct data', async () => {
    const mockMakeDonation = vi.fn().mockResolvedValue(undefined);
    mockUseDonationStore.mockReturnValue({
      ...mockDonationStoreState,
      makeDonation: mockMakeDonation,
    });

    render(<DonationForm charity={mockCharity} />);

    // Fill out the form
    const amountInput = screen.getByLabelText(/donation amount/i);
    const nameInput = screen.getByLabelText(/your name/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /donate 10 stx/i });

    fireEvent.change(amountInput, { target: { value: '50' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(messageInput, { target: { value: 'Great cause!' } });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMakeDonation).toHaveBeenCalledWith({
        charityId: mockCharity.id,
        charityName: mockCharity.name,
        amount: 50,
        donorAddress: mockStacksContext.userData.profile.stxAddress.mainnet,
        donorName: 'John Doe',
        message: 'Great cause!',
        transactionId: expect.stringMatching(/^tx-\d+$/),
      });
    });
  });

  it('submits anonymous donation correctly', async () => {
    const mockMakeDonation = vi.fn().mockResolvedValue(undefined);
    mockUseDonationStore.mockReturnValue({
      ...mockDonationStoreState,
      makeDonation: mockMakeDonation,
    });

    render(<DonationForm charity={mockCharity} />);

    // Toggle anonymous donation
    const anonymousCheckbox = screen.getByLabelText(/make this donation anonymous/i);
    fireEvent.click(anonymousCheckbox);

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /donate 10 stx/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMakeDonation).toHaveBeenCalledWith(
        expect.objectContaining({
          donorName: 'Anonymous',
        })
      );
    });
  });

  it('shows loading state during donation submission', async () => {
    mockUseDonationStore.mockReturnValue({
      ...mockDonationStoreState,
      isLoading: true,
    });

    render(<DonationForm charity={mockCharity} />);

    const submitButton = screen.getByRole('button', { name: /processing/i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute('aria-busy', 'true');
  });

  it('shows success message after successful donation', async () => {
    let isLoading = false;
    const mockMakeDonation = vi.fn().mockImplementation(() => {
      isLoading = false;
      return Promise.resolve();
    });

    // Mock the store to return loading state initially, then success
    mockUseDonationStore.mockImplementation(() => ({
      ...mockDonationStoreState,
      isLoading,
      makeDonation: mockMakeDonation,
    }));

    render(<DonationForm charity={mockCharity} />);

    const submitButton = screen.getByRole('button', { name: /donate 10 stx/i });
    fireEvent.click(submitButton);

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText(/donation successful/i)).toBeInTheDocument();
      expect(screen.getByText(/thank you for your generous donation/i)).toBeInTheDocument();
    });
  });

  it('validates minimum donation amount', () => {
    render(<DonationForm charity={mockCharity} />);

    const amountInput = screen.getByLabelText(/donation amount/i);
    const submitButton = screen.getByRole('button');

    // Try to set amount to 0
    fireEvent.change(amountInput, { target: { value: '0' } });
    expect(submitButton).toBeDisabled();

    // Try to set amount to negative
    fireEvent.change(amountInput, { target: { value: '-5' } });
    expect(submitButton).toBeDisabled();
  });

  it('resets form after successful donation', async () => {
    const mockMakeDonation = vi.fn().mockResolvedValue(undefined);
    mockUseDonationStore.mockReturnValue({
      ...mockDonationStoreState,
      makeDonation: mockMakeDonation,
    });

    render(<DonationForm charity={mockCharity} />);

    // Fill out the form
    const amountInput = screen.getByLabelText(/donation amount/i);
    const nameInput = screen.getByLabelText(/your name/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.change(amountInput, { target: { value: '50' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(messageInput, { target: { value: 'Great cause!' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /donate 50 stx/i });
    fireEvent.click(submitButton);

    // Wait for success and then click "Make Another Donation"
    await waitFor(() => {
      expect(screen.getByText(/donation successful/i)).toBeInTheDocument();
    });

    const anotherDonationButton = screen.getByRole('button', { name: /make another donation/i });
    fireEvent.click(anotherDonationButton);

    // Form should be reset
    await waitFor(() => {
      expect(screen.getByDisplayValue('10')).toBeInTheDocument(); // Default amount
      expect(nameInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });
  });

  it('has proper accessibility attributes', () => {
    render(<DonationForm charity={mockCharity} />);

    const form = screen.getByRole('form', { name: /donation form/i });
    expect(form).toBeInTheDocument();

    const amountInput = screen.getByLabelText(/donation amount/i);
    expect(amountInput).toHaveAttribute('required');
    expect(amountInput).toHaveAttribute('min', '1');

    const submitButton = screen.getByRole('button', { name: /donate 10 stx/i });
    expect(submitButton).toHaveAttribute('aria-disabled', 'false');
  });
});
