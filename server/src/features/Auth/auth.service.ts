import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users: { email: string; passwordHash: string }[] = [];

export async function registerUser(email: string, password: string) {
  const existingUser = users.find(u => u.email === email);
  if (existingUser) throw new Error('Email already in use');

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = { email, passwordHash };
  users.push(newUser);
  return { email };
}

export async function loginUser(email: string, password: string) {
  const user = users.find(u => u.email === email);
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error('Invalid credentials');

  const token = jwt.sign(
  { email },
  process.env.JWT_SECRET!, // The exclamation tells TypeScript you *promise* it's defined
  { expiresIn: '1h' }
);

  return token;
}
