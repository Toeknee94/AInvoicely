import  prisma from '../config/prisma';

export const canCreateInvoice = async (userId: string): Promise<boolean> => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const count = await prisma.invoice.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth,
      },
    },
  });

  return count < 5;
};

