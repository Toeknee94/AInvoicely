import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [];

export function getAllUsers(): User[] {
  return users;
}

export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function createUser(name: string, email: string): User {
  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    role: 'USER',          // or 'ADMIN'
  plan: 'free',          // default or from logic
  createdAt: new Date(),
  updatedAt: new Date(),
  };
  users.push(newUser);
  return newUser;
}

export function deleteUser(id: string): boolean {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
}
