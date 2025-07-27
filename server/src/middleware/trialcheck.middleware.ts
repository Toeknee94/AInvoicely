import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma'; // make sure prisma client is correctly imported

export const checkTrialStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const trialEndsAt = user.trialEndsAt;
    const now = new Date();

    if (
      (!trialEndsAt || now > new Date(trialEndsAt)) &&
      user.subscription !== 'paid'
    ) {
      return res
        .status(403)
        .json({ message: 'Trial expired. Upgrade to continue.' });
    }

    next();
  } catch (err) {
    console.error('Trial check error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

