import Invoice from '../features/invoices/invoice.model';

export const canCreateInvoice = async (userId: string): Promise<boolean> => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const count = await Invoice.countDocuments({
    userId,
    createdAt: { $gte: startOfMonth },
  });

  return count < 5;
};

