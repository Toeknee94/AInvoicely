import { Router } from 'express';
import { createPaymentIntent } from './stripe.controller';
import { stripeWebhookHandler } from './stripe.webhook';
import bodyParser from 'body-parser';

const router = Router();

// Endpoint to create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Webhook endpoint (MUST use raw body)
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhookHandler);

export default router;
