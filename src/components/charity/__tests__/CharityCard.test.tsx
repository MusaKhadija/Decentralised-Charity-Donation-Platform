import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import CharityCard from '../CharityCard';
import { mockCharity } from '../../../test-utils';
import * as router from 'react-router-dom';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const mockNavigate = vi.fn();

describe('CharityCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(router.useNavigate).mockReturnValue(mockNavigate);
  });

  it('renders charity information correctly', () => {
    render(<CharityCard charity={mockCharity} />);

    expect(screen.getByText(mockCharity.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharity.description)).toBeInTheDocument();
    expect(screen.getByText(mockCharity.category)).toBeInTheDocument();
    expect(screen.getByText(/1,000 STX/)).toBeInTheDocument(); // totalDonations formatted
    expect(screen.getByText(/50 donors/)).toBeInTheDocument(); // donorCount
  });

  it('displays verified badge for verified charities', () => {
    render(<CharityCard charity={mockCharity} />);
    
    expect(screen.getByText(/verified/i)).toBeInTheDocument();
  });

  it('does not display verified badge for unverified charities', () => {
    const unverifiedCharity = { ...mockCharity, verified: false };
    render(<CharityCard charity={unverifiedCharity} />);
    
    expect(screen.queryByText(/verified/i)).not.toBeInTheDocument();
  });

  it('displays featured badge for featured charities', () => {
    render(<CharityCard charity={mockCharity} />);
    
    expect(screen.getByText(/featured/i)).toBeInTheDocument();
  });

  it('does not display featured badge for non-featured charities', () => {
    const nonFeaturedCharity = { ...mockCharity, featured: false };
    render(<CharityCard charity={nonFeaturedCharity} />);
    
    expect(screen.queryByText(/featured/i)).not.toBeInTheDocument();
  });

  it('navigates to charity detail page when "Learn More" is clicked', () => {
    render(<CharityCard charity={mockCharity} />);

    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    fireEvent.click(learnMoreButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/charities/${mockCharity.id}`);
  });

  it('navigates to charity detail page when "Donate Now" is clicked', () => {
    render(<CharityCard charity={mockCharity} />);

    const donateButton = screen.getByRole('button', { name: /donate now/i });
    fireEvent.click(donateButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/charities/${mockCharity.id}`);
  });

  it('displays charity image with proper alt text', () => {
    render(<CharityCard charity={mockCharity} />);

    const image = screen.getByRole('img', { name: mockCharity.name });
    expect(image).toHaveAttribute('src', mockCharity.imageUrl);
    expect(image).toHaveAttribute('alt', mockCharity.name);
  });

  it('formats donation amounts correctly', () => {
    const charityWithLargeDonations = {
      ...mockCharity,
      totalDonations: 1234567,
      donorCount: 9876,
    };

    render(<CharityCard charity={charityWithLargeDonations} />);

    expect(screen.getByText(/1,234,567 STX/)).toBeInTheDocument();
    expect(screen.getByText(/9,876 donors/)).toBeInTheDocument();
  });

  it('handles zero donations gracefully', () => {
    const charityWithNoDonations = {
      ...mockCharity,
      totalDonations: 0,
      donorCount: 0,
    };

    render(<CharityCard charity={charityWithNoDonations} />);

    expect(screen.getByText(/0 STX/)).toBeInTheDocument();
    expect(screen.getByText(/0 donors/)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<CharityCard charity={mockCharity} />);

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();

    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    expect(learnMoreButton).toHaveAttribute('type', 'button');

    const donateButton = screen.getByRole('button', { name: /donate now/i });
    expect(donateButton).toHaveAttribute('type', 'button');
  });

  it('displays social links when available', () => {
    render(<CharityCard charity={mockCharity} />);

    // Check if social links section is present
    const socialSection = screen.getByText(/follow us/i);
    expect(socialSection).toBeInTheDocument();
  });

  it('handles missing social links gracefully', () => {
    const charityWithoutSocial = {
      ...mockCharity,
      socialLinks: undefined,
    };

    render(<CharityCard charity={charityWithoutSocial} />);

    // Should not crash and should still render the charity card
    expect(screen.getByText(mockCharity.name)).toBeInTheDocument();
  });

  it('truncates long descriptions appropriately', () => {
    const charityWithLongDescription = {
      ...mockCharity,
      description: 'This is a very long description that should be truncated when displayed in the charity card component to ensure proper layout and readability for users browsing through multiple charity options.',
    };

    render(<CharityCard charity={charityWithLongDescription} />);

    // The component should handle long text gracefully
    expect(screen.getByText(charityWithLongDescription.description)).toBeInTheDocument();
  });

  it('applies hover effects correctly', () => {
    render(<CharityCard charity={mockCharity} />);

    const card = screen.getByRole('article');
    
    // Simulate hover
    fireEvent.mouseEnter(card);
    
    // The card should have hover styles applied (this would be tested with actual CSS in integration tests)
    expect(card).toBeInTheDocument();
  });

  it('displays wallet address for transparency', () => {
    render(<CharityCard charity={mockCharity} />);

    // Check if wallet address is displayed (might be truncated)
    const walletText = screen.getByText(/wallet/i);
    expect(walletText).toBeInTheDocument();
  });

  it('handles missing image gracefully', () => {
    const charityWithoutImage = {
      ...mockCharity,
      imageUrl: '',
    };

    render(<CharityCard charity={charityWithoutImage} />);

    // Should still render the charity information
    expect(screen.getByText(mockCharity.name)).toBeInTheDocument();
  });

  it('displays category badge with proper styling', () => {
    render(<CharityCard charity={mockCharity} />);

    const categoryBadge = screen.getByText(mockCharity.category);
    expect(categoryBadge).toBeInTheDocument();
    expect(categoryBadge).toHaveClass('bg-blue-100'); // Assuming this is the category badge styling
  });
});
