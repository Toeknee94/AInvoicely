import prisma from '../../config/prisma';

export async function getClientById(clientId: string, userId: string) {
  return prisma.client.findFirst({
    where: {
      id: clientId,
      userId: userId, // enforce ownership
    },
  });
}

export async function updateClient(clientId: string, data: any, userId: string) {
  return prisma.client.updateMany({
    where: {
      id: clientId,
      userId: userId,
    },
    data,
  });
}

export async function deleteClient(clientId: string, userId: string) {
  return prisma.client.deleteMany({
    where: {
      id: clientId,
      userId: userId,
    },
  });
}

export async function getClients(userId: string) {
  return prisma.client.findMany({
    where: {
      userId,
    },
  });
}

export async function createClient(data: any) {
  return prisma.client.create({ data });
}
