import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware.js';

const router = Router();

// Register new user
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role = 'student', full_name } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    // Check if user exists
    const existing = await query('SELECT id FROM public.users WHERE email = $1', [email.toLowerCase().trim()]);
    if (existing.rows.length > 0) {
      res.status(409).json({ success: false, message: 'An account with this email already exists.' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user
    const userResult = await query(
      'INSERT INTO public.users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at',
      [email.toLowerCase().trim(), passwordHash, role]
    );
    const newUser = userResult.rows[0];

    // If student, create initial student_profile record
    if (role === 'student') {
      await query(
        'INSERT INTO public.student_profiles (user_id, full_name, completion_percentage) VALUES ($1, $2, $3)',
        [newUser.id, full_name || email.split('@')[0], 15]
      );
    }

    // Generate JWT
    const secret = process.env.JWT_SECRET || 'careeroptic_default_secret_key_2026';
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      secret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        full_name: full_name || email.split('@')[0]
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error during registration.' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    const userResult = await query(
      'SELECT id, email, password_hash, role FROM public.users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (userResult.rows.length === 0) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    // Fetch profile if student
    let profile = null;
    if (user.role === 'student') {
      const profileResult = await query('SELECT * FROM public.student_profiles WHERE user_id = $1', [user.id]);
      if (profileResult.rows.length > 0) {
        profile = profileResult.rows[0];
      }
    }

    // Generate JWT
    const secret = process.env.JWT_SECRET || 'careeroptic_default_secret_key_2026';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      profile
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error during login.' });
  }
});

// Current authenticated user & profile
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const userResult = await query('SELECT id, email, role, created_at FROM public.users WHERE id = $1', [userId]);

    if (userResult.rows.length === 0) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }

    const user = userResult.rows[0];
    let profile = null;

    if (user.role === 'student') {
      const profileResult = await query('SELECT * FROM public.student_profiles WHERE user_id = $1', [userId]);
      if (profileResult.rows.length > 0) {
        profile = profileResult.rows[0];
      }
    }

    res.json({
      success: true,
      user,
      profile
    });
  } catch (error: any) {
    console.error('Fetch me error:', error);
    res.status(500).json({ success: false, message: 'Internal server error fetching profile.' });
  }
});

export default router;
