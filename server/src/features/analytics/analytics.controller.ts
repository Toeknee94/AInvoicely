import { Request, Response } from 'express';
import { getAnalyticsData } from './analytics.service';

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await getAnalyticsData();
    res.status(200).json(analytics);
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics data' });
  }
};
