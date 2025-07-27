import { Request, Response, NextFunction } from 'express';
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from './client.service';

export async function getAllClients(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const clients = await getClients(userId);
    res.json(clients);
  } catch (error) {
    next(error);
  }
}

export async function getSingleClient(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const clientId = req.params.clientId || req.params.id;
    const client = await getClientById(clientId, userId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    res.json(client);
  } catch (error) {
    next(error);
  }
}

export async function createNewClient(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { name, email, phone, address } = req.body;

    if (!name) return res.status(400).json({ message: 'Name is required' });

    const newClient = await createClient({ userId, name, email, phone, address });
    res.status(201).json(newClient);
  } catch (error) {
    next(error);
  }
}

export async function updateExistingClient(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const clientId = req.params.clientId || req.params.id;
    const { name, email, phone, address } = req.body;

    // You might want to verify the client belongs to user here by fetching first

    const updatedClient = await updateClient(clientId, { name, email, phone, address }, userId);
    if (!updatedClient) return res.status(404).json({ message: 'Client not found or access denied' });

    res.json(updatedClient);
  } catch (error) {
    next(error);
  }
}

export async function deleteClientById(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const clientId = req.params.clientId || req.params.id;
    const deleted = await deleteClient(clientId, userId);
    if (!deleted) return res.status(404).json({ message: 'Client not found or access denied' });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
