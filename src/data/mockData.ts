import { Charity } from '../types/charity';
import { Donation } from '../types/donation';

export const mockCharities: Charity[] = [
  {
    id: 'charity-1',
    name: 'Global Water Relief',
    description: 'Providing clean water to communities in need worldwide.',
    mission: 'Our mission is to ensure everyone has access to clean, safe drinking water. We work with local communities to implement sustainable water solutions and educate about water conservation.',
    category: 'Water & Sanitation',
    imageUrl: 'https://images.pexels.com/photos/2031756/pexels-photo-2031756.jpeg',
    website: 'https://example.org/water-relief',
    walletAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    verified: true,
    totalDonations: 2500,
    donorCount: 156,
    featured: true,
    socialLinks: {
      twitter: 'https://twitter.com/waterrelief',
      facebook: 'https://facebook.com/waterrelief',
    }
  },
  {
    id: 'charity-2',
    name: 'Education for All',
    description: 'Promoting equal access to quality education globally.',
    mission: 'We believe education is a fundamental human right. Our programs focus on building schools, training teachers, and providing educational materials to underserved communities.',
    category: 'Education',
    imageUrl: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg',
    website: 'https://example.org/education-for-all',
    walletAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    verified: true,
    totalDonations: 4300,
    donorCount: 278,
    featured: true,
    socialLinks: {
      twitter: 'https://twitter.com/eduforall',
      facebook: 'https://facebook.com/eduforall',
      instagram: 'https://instagram.com/eduforall',
    }
  },
  {
    id: 'charity-3',
    name: 'Wildlife Protection Fund',
    description: 'Preserving endangered species and their habitats.',
    mission: 'We are dedicated to protecting wildlife through conservation efforts, anti-poaching initiatives, and education programs. We work closely with local communities to create sustainable solutions.',
    category: 'Environment',
    imageUrl: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg',
    website: 'https://example.org/wildlife-protection',
    walletAddress: 'ST3CECAKJ4BH08JYY7W53MC81BYBT4KGMAC95J6KT',
    verified: true,
    totalDonations: 1850,
    donorCount: 93,
    featured: false,
    socialLinks: {
      twitter: 'https://twitter.com/wildlifeprotect',
    }
  },
  {
    id: 'charity-4',
    name: 'Healthcare Access Initiative',
    description: 'Expanding healthcare access to underserved populations.',
    mission: 'Our organization works to provide healthcare services to those who lack access. We establish mobile clinics, train local healthcare workers, and provide essential medications.',
    category: 'Healthcare',
    imageUrl: 'https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg',
    website: 'https://example.org/healthcare-access',
    walletAddress: 'ST31DA6FTSJX2WGTZ69SFY11BH51NZMB0ZZ239N96',
    verified: true,
    totalDonations: 3100,
    donorCount: 187,
    featured: false
  },
  {
    id: 'charity-5',
    name: 'Hunger Relief Network',
    description: 'Fighting hunger through food assistance programs.',
    mission: 'We combat hunger by distributing food, supporting local agriculture, and implementing sustainable food systems in communities facing food insecurity.',
    category: 'Food & Hunger',
    imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
    website: 'https://example.org/hunger-relief',
    walletAddress: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    verified: true,
    totalDonations: 1950,
    donorCount: 124,
    featured: true
  }
];

export const mockDonations: Donation[] = [
  {
    id: 'donation-1',
    charityId: 'charity-1',
    charityName: 'Global Water Relief',
    amount: 100,
    donorAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    donorName: 'Anonymous',
    message: 'Keep up the great work!',
    timestamp: '2023-04-15T10:30:00Z',
    transactionId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  },
  {
    id: 'donation-2',
    charityId: 'charity-2',
    charityName: 'Education for All',
    amount: 250,
    donorAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    donorName: 'Crypto Philanthropist',
    message: 'Education is the foundation of a better future.',
    timestamp: '2023-04-16T14:22:00Z',
    transactionId: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef'
  },
  {
    id: 'donation-3',
    charityId: 'charity-3',
    charityName: 'Wildlife Protection Fund',
    amount: 75,
    donorAddress: 'ST3CECAKJ4BH08JYY7W53MC81BYBT4KGMAC95J6KT',
    timestamp: '2023-04-17T09:15:00Z',
    transactionId: '0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef'
  },
  {
    id: 'donation-4',
    charityId: 'charity-1',
    charityName: 'Global Water Relief',
    amount: 150,
    donorAddress: 'ST31DA6FTSJX2WGTZ69SFY11BH51NZMB0ZZ239N96',
    donorName: 'Water Supporter',
    message: 'Everyone deserves clean water!',
    timestamp: '2023-04-18T16:45:00Z',
    transactionId: '0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef'
  },
  {
    id: 'donation-5',
    charityId: 'charity-5',
    charityName: 'Hunger Relief Network',
    amount: 200,
    donorAddress: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    timestamp: '2023-04-19T11:30:00Z',
    transactionId: '0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef'
  },
  {
    id: 'donation-6',
    charityId: 'charity-2',
    charityName: 'Education for All',
    amount: 50,
    donorAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    message: 'Small contribution for a big cause.',
    timestamp: '2023-04-20T13:10:00Z',
    transactionId: '0x6789012345abcdef6789012345abcdef6789012345abcdef6789012345abcdef'
  }
];