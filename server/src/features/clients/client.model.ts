import { PrismaClient, Client } from '@prisma/client';

const prisma = new PrismaClient();

export const createClient = async (data: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  userId: string;
}): Promise<Client> => {
  return await prisma.client.create({ data });
};

export const getClientsByUserId = async (userId: string): Promise<Client[]> => {
  return await prisma.client.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getClientById = async (id: string): Promise<Client | null> => {
  return await prisma.client.findUnique({
    where: { id },
  });
};

export const updateClient = async (
  id: string,
  data: Partial<Pick<Client, 'name' | 'email' | 'phone' | 'address'>>
): Promise<Client> => {
  return await prisma.client.update({
    where: { id },
    data,
  });
};

export const deleteClient = async (id: string): Promise<Client> => {
  return await prisma.client.delete({
    where: { id },
  });
};
