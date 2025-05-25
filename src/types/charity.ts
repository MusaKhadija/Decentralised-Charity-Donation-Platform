export interface Charity {
  id: string;
  name: string;
  description: string;
  mission: string;
  category: string;
  imageUrl: string;
  website: string;
  walletAddress: string;
  verified: boolean;
  totalDonations: number;
  donorCount: number;
  featured: boolean;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}