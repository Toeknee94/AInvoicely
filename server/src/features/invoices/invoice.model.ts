export interface Invoice {
  id: string;
  clientId: string;
  items: {
    description: string;
    amount: number;
  }[];
  total: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  createdAt: string;
  updatedAt: string;
}
