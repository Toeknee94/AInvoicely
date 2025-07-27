import { Router } from 'express';
import { getAnalytics } from './analytics.controller';

const router = Router();

router.get('/dashboard', getAnalytics);

export default router;
