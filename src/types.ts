export type TransactionType = 'deposit' | 'transfer' | 'pulsa' | 'receive';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  date: string;
  timestamp: number;
  amountEUR: number;
  amountUSD?: number;
  method?: string;
  recipientName?: string;
  accountNumber?: string;
  bank?: string;
  phoneNumber?: string;
  provider?: string;
  note?: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  referenceNo: string;
}

export type ModalType = 
  | 'deposit'
  | 'transfer'
  | 'pulsa'
  | 'history'
  | 'detail'
  | 'ticket'
  | 'contract'
  | 'profile'
  | 'calculator'
  | 'documents'
  | null;

export interface DocumentItem {
  id: string;
  name: string;
  category: string;
  status: 'COMPLETE' | 'VERIFIED';
  authority: string;
  docNumber: string;
  dateVerified: string;
  notes: string;
}

export interface UserProfile {
  name: string;
  idNumber: string;
  position: string;
  hotel: string;
  origin: string;
  contractDuration: string;
  address: string;
  email: string;
  phone: string;
  hourlyWage: number;
  overtimeWage: number;
  monthlyIncentive: number;
  monthlyMeal: number;
  workingHours: string;
  avatarUrl?: string;
}
