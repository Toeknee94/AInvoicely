import { Request, Response } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser } from './user.service';

export function getUsers(req: Request, res: Response) {
  res.json(getAllUsers());
}

export function getUser(req: Request, res: Response) {
  const user = getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

export function postUser(req: Request, res: Response) {
  const { name, email } = req.body;
  const newUser = createUser(name, email);
  res.status(201).json(newUser);
}

export function removeUser(req: Request, res: Response) {
  const deleted = deleteUser(req.params.id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}
