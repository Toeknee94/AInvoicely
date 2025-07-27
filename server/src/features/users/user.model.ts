export interface User {
  id: string;             // UUID from Prisma
  email: string;
  name?: string | null;   // optional user name, nullable in DB
  password?: string | null; // hashed password or null if using Firebase
  role: 'ADMIN' | 'USER';  // match your Prisma enum UserRole
  plan: 'free' | 'paid';   // your app subscription plan logic
  trialEndsAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
