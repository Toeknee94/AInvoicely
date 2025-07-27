// server/src/app.ts
import express from 'express';
import cors from 'cors';

// Import your routes here
import authRoutes from './features/Auth/auth.routes';
import clientRoutes from './features/clients/client.routes';
import invoiceRoutes from './features/invoices/invoice.routes';
import aiRoutes from './features/ai/ai.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/ai', aiRoutes);

// You can add health check or root route
app.get('/', (_req, res) => res.send('API is running'));

export default app;
