import { Request, Response, NextFunction } from 'express';
import * as clientService from './client.service';

export const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const clients = await clientService.getClients(userId);
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

export const getClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const client = await clientService.getClientById(req.params.id, userId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const newClient = await clientService.createClient({ ...req.body, userId });
    res.status(201).json(newClient);
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const updated = await clientService.updateClient(req.params.id, req.body, userId);
    if (updated.count === 0) {
      return res.status(404).json({ message: 'Client not found or not authorized' });
    }

    res.status(200).json({ message: 'Client updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const deleted = await clientService.deleteClient(req.params.id, userId);
    if (deleted.count === 0) {
      return res.status(404).json({ message: 'Client not found or not authorized' });
    }

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    next(error);
  }
};
