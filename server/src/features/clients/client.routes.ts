// src/features/clients/client.routes.ts

import { Router } from 'express';
import {
  getAllClients,
  getSingleClient,
  createNewClient,
  updateExistingClient,
  deleteClientById,
} from './client.controller';

const router = Router();

// GET /api/clients - List all clients for the authenticated user
router.get('/', getAllClients);

// GET /api/clients/:clientId - Get a single client by ID
router.get('/:clientId', getSingleClient);

// POST /api/clients - Create a new client
router.post('/', createNewClient);

// PUT /api/clients/:clientId - Update an existing client by ID
router.put('/:clientId', updateExistingClient);

// DELETE /api/clients/:clientId - Delete a client by ID
router.delete('/:clientId', deleteClientById);

export default router;
