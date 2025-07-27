
// server/src/index.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Middleware imports
import { authenticateToken } from './middleware/auth.middleware';
import { checkTrialStatus } from './middleware/trialcheck.middleware';
import { errorHandler } from './middleware/errorHandler';

// Routes imports
import authRoutes from './features/Auth/auth.routes';
import userRoutes from './features/users/user.routes';
import clientRoutes from './features/clients/client.routes';
import invoiceRoutes from './features/invoices/invoice.routes';
import analyticsRoutes from './features/analytics/analytics.routes';
import stripeRoutes from './features/stripe/stripe.routes';
import aiRoutes from './features/ai/ai.routes';

const app = express();
const port = process.env.PORT || 5000;

// Global Middleware
app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Middleware for protected routes
app.use(authenticateToken);
app.use(checkTrialStatus);

// Protected routes
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/ping', (_req, res) => res.send('pong'));

// Error handler must be last
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
