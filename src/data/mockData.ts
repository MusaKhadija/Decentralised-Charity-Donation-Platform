import { Charity } from '../types/charity';
import { Donation } from '../types/donation';

export const mockCharities: Charity[] = [
  {
    id: 'charity-1',
    name: 'Doctors Without Borders',
    description: 'Médecins Sans Frontières (MSF) provides medical humanitarian assistance to people affected by conflict, epidemics, disasters, or exclusion from healthcare.',
    mission: 'We offer assistance to people based on need, irrespective of race, religion, gender, or political affiliation. Our teams of doctors, nurses, logisticians, and other frontline workers are often among the first on the scene when peoples\' lives are upended by conflict, disease outbreaks, or natural or human-made disasters.',
    category: 'Healthcare',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    website: 'https://www.doctorswithoutborders.org',
    walletAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    verified: true,
    totalDonations: 245000,
    donorCount: 8942,
    featured: true,
    socialLinks: {
      twitter: 'https://twitter.com/MSF_USA',
      facebook: 'https://facebook.com/doctorswithoutborders',
      instagram: 'https://instagram.com/doctorswithoutborders',
    }
  },
  {
    id: 'charity-2',
    name: 'American Red Cross',
    description: 'The American Red Cross prevents and alleviates human suffering in the face of emergencies by mobilizing the power of volunteers and the generosity of donors.',
    mission: 'We provide disaster relief, emergency assistance, and education. Our network of generous donors, volunteers and employees share a mission of preventing and relieving suffering, here at home and around the world.',
    category: 'Emergency Relief',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    website: 'https://www.redcross.org',
    walletAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    verified: true,
    totalDonations: 189000,
    donorCount: 12456,
    featured: true,
    socialLinks: {
      twitter: 'https://twitter.com/RedCross',
      facebook: 'https://facebook.com/redcross',
      instagram: 'https://instagram.com/americanredcross',
    }
  },
  {
    id: 'charity-3',
    name: 'Feeding America',
    description: 'Feeding America is the largest hunger-relief organization in the United States. Through a network of more than 200 food banks, we provide meals to more than 46 million people each year.',
    mission: 'Our mission is to advance change in America by ensuring equitable access to nutritious food for all in partnership with food banks, policymakers, supporters, and the communities we serve.',
    category: 'Food & Nutrition',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    website: 'https://www.feedingamerica.org',
    walletAddress: 'ST3CECAKJ4BH08JYY7W53MC81BYBT4KGMAC95J6KT',
    verified: true,
    totalDonations: 156700,
    donorCount: 9834,
    featured: true,
    socialLinks: {
      twitter: 'https://twitter.com/FeedingAmerica',
      facebook: 'https://facebook.com/FeedingAmerica',
      instagram: 'https://instagram.com/feedingamerica',
    }
  },
  {
    id: 'charity-4',
    name: 'United Way Worldwide',
    description: 'United Way fights for the health, education, and financial stability of every person in every community.',
    mission: 'We work with schools, nonprofits, businesses, and government to create lasting change in communities around the world. Our focus is on education, income, and health—the building blocks for a good quality of life.',
    category: 'Community Development',
    imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    website: 'https://www.unitedway.org',
    walletAddress: 'ST31DA6FTSJX2WGTZ69SFY11BH51NZMB0ZZ239N96',
    verified: true,
    totalDonations: 98700,
    donorCount: 6789,
    featured: false,
    socialLinks: {
      twitter: 'https://twitter.com/UnitedWay',
      facebook: 'https://facebook.com/UnitedWay',
      instagram: 'https://instagram.com/unitedway',
    }
  },
  {
    id: 'charity-5',
    name: 'The Salvation Army',
    description: 'The Salvation Army provides assistance to those in need without discrimination. We offer food, shelter, disaster relief, rehabilitation, and spiritual guidance.',
    mission: 'We are committed to serving the whole person, body, mind, and spirit, with integrity and respect, using creative solutions to positively transform communities.',
    category: 'Social Services',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    website: 'https://www.salvationarmyusa.org',
    walletAddress: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    verified: true,
    totalDonations: 123400,
    donorCount: 7654,
    featured: false,
    socialLinks: {
      twitter: 'https://twitter.com/SalvationArmyUS',
      facebook: 'https://facebook.com/SalvationArmyUSA',
    }
  },
  {
    id: 'charity-6',
    name: 'World Wildlife Fund',
    description: 'WWF works to conserve nature and reduce the most pressing threats to the diversity of life on Earth.',
    mission: 'Our mission is to build a future where people live in harmony with nature. We work to conserve the world\'s most important forests, protect endangered species, and address climate change.',
    category: 'Environment',
    imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    website: 'https://www.worldwildlife.org',
    walletAddress: 'ST2PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    verified: true,
    totalDonations: 87600,
    donorCount: 5432,
    featured: true,
    socialLinks: {
      twitter: 'https://twitter.com/World_Wildlife',
      facebook: 'https://facebook.com/WorldWildlifeFund',
      instagram: 'https://instagram.com/worldwildlifefund',
    }
  },
  {
    id: 'charity-7',
    name: 'Habitat for Humanity',
    description: 'Habitat for Humanity helps families build and improve places to call home. We believe affordable housing plays a critical role in strong and stable communities.',
    mission: 'Seeking to put God\'s love into action, Habitat for Humanity brings people together to build homes, communities and hope.',
    category: 'Housing',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    website: 'https://www.habitat.org',
    walletAddress: 'ST3CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    verified: true,
    totalDonations: 65400,
    donorCount: 4321,
    featured: false,
    socialLinks: {
      twitter: 'https://twitter.com/habitat_org',
      facebook: 'https://facebook.com/habitatforhumanity',
      instagram: 'https://instagram.com/habitatforhumanity',
    }
  },
  {
    id: 'charity-8',
    name: 'St. Jude Children\'s Research Hospital',
    description: 'St. Jude is leading the way the world understands, treats and defeats childhood cancer and other life-threatening diseases.',
    mission: 'Finding cures. Saving children. Families never receive a bill from St. Jude for treatment, travel, housing or food — so they can focus on helping their child live.',
    category: 'Healthcare',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    website: 'https://www.stjude.org',
    walletAddress: 'ST4CECAKJ4BH08JYY7W53MC81BYBT4KGMAC95J6KT',
    verified: true,
    totalDonations: 189000,
    donorCount: 8765,
    featured: true,
    socialLinks: {
      twitter: 'https://twitter.com/StJude',
      facebook: 'https://facebook.com/StJude',
      instagram: 'https://instagram.com/stjude',
    }
  }
];

export const mockDonations: Donation[] = [
  {
    id: 'donation-1',
    charityId: 'charity-1',
    charityName: 'Doctors Without Borders',
    amount: 500,
    donorAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    donorName: 'Anonymous',
    message: 'Thank you for saving lives around the world!',
    timestamp: '2024-01-15T10:30:00Z',
    transactionId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  },
  {
    id: 'donation-2',
    charityId: 'charity-2',
    charityName: 'American Red Cross',
    amount: 250,
    donorAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    donorName: 'Crypto Philanthropist',
    message: 'Supporting disaster relief efforts.',
    timestamp: '2024-01-16T14:22:00Z',
    transactionId: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef'
  },
  {
    id: 'donation-3',
    charityId: 'charity-3',
    charityName: 'Feeding America',
    amount: 175,
    donorAddress: 'ST3CECAKJ4BH08JYY7W53MC81BYBT4KGMAC95J6KT',
    donorName: 'Food Security Advocate',
    message: 'No one should go hungry.',
    timestamp: '2024-01-17T09:15:00Z',
    transactionId: '0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef'
  },
  {
    id: 'donation-4',
    charityId: 'charity-8',
    charityName: 'St. Jude Children\'s Research Hospital',
    amount: 1000,
    donorAddress: 'ST31DA6FTSJX2WGTZ69SFY11BH51NZMB0ZZ239N96',
    donorName: 'Hope Supporter',
    message: 'For the children and their families.',
    timestamp: '2024-01-18T16:45:00Z',
    transactionId: '0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef'
  },
  {
    id: 'donation-5',
    charityId: 'charity-6',
    charityName: 'World Wildlife Fund',
    amount: 300,
    donorAddress: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    donorName: 'Nature Lover',
    message: 'Protecting our planet for future generations.',
    timestamp: '2024-01-19T11:30:00Z',
    transactionId: '0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef'
  },
  {
    id: 'donation-6',
    charityId: 'charity-7',
    charityName: 'Habitat for Humanity',
    amount: 450,
    donorAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    donorName: 'Home Builder',
    message: 'Everyone deserves a safe place to call home.',
    timestamp: '2024-01-20T13:10:00Z',
    transactionId: '0x6789012345abcdef6789012345abcdef6789012345abcdef6789012345abcdef'
  },
  {
    id: 'donation-7',
    charityId: 'charity-4',
    charityName: 'United Way Worldwide',
    amount: 200,
    donorAddress: 'ST4CECAKJ4BH08JYY7W53MC81BYBT4KGMAC95J6KT',
    donorName: 'Community Champion',
    message: 'Building stronger communities together.',
    timestamp: '2024-01-21T15:20:00Z',
    transactionId: '0x7890123456abcdef7890123456abcdef7890123456abcdef7890123456abcdef'
  },
  {
    id: 'donation-8',
    charityId: 'charity-5',
    charityName: 'The Salvation Army',
    amount: 125,
    donorAddress: 'ST5DA6FTSJX2WGTZ69SFY11BH51NZMB0ZZ239N96',
    donorName: 'Anonymous',
    message: 'Supporting those in need.',
    timestamp: '2024-01-22T08:45:00Z',
    transactionId: '0x8901234567abcdef8901234567abcdef8901234567abcdef8901234567abcdef'
  }
];