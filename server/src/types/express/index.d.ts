import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;  // optional user property with Prisma User type
    }
  }
}
