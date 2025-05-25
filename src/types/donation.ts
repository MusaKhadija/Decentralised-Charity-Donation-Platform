export interface Donation {
  id: string;
  charityId: string;
  charityName: string;
  amount: number;
  donorAddress: string;
  donorName?: string;
  message?: string;
  timestamp: string;
  transactionId: string;
}