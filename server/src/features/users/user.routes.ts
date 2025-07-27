import express from 'express';
import { getUsers, getUser, postUser, removeUser } from './user.controller';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.delete('/:id', removeUser);

export default router;
