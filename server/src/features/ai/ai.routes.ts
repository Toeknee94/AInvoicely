import express from 'express';
import { authenticateToken } from '../../middleware/auth.middleware';
import { generateAIInvoice } from './ai.controller';

const router = express.Router();

// AI route to generate an invoice using AI
router.post('/generate-invoice', authenticateToken, generateAIInvoice);

export default router;
