import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
import { findUserByName } from '../models/get.model.js';
import { createUser } from '../models/post.model.js';

const router = Router();
interface User {
  name : string,
  password: string
}
router.post('/register', async (req: Request, res: Response) => {
  const { name, password }:User = req.body;

  // Validate request body
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await findUserByName(name);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this name already exists' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    await createUser({ name, passwordHash });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/login - User login and JWT token generation
router.post('/login', async (req: Request, res: Response) => {

  const { name, password }:User = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    // Find user by name
    const user = await findUserByName(name);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.passwordhash);
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Invalid name or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '48h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;