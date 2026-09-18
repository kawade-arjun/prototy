import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './db.js';
import authRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    platform: 'CareerOptic API',
    timestamp: new Date().toISOString()
  });
});

// Database connectivity check endpoint
app.get('/api/db-check', async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT NOW() as db_time, current_database() as db_name, version() as version;');
    res.json({
      success: true,
      message: 'Database connected and query succeeded.',
      db_time: result.rows[0].db_time,
      db_name: result.rows[0].db_name,
      version: result.rows[0].version
    });
  } catch (error: any) {
    console.error('Database connection error in /api/db-check:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to connect to PostgreSQL database.',
      error: error.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 CareerOptic Server is running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Database check: http://localhost:${PORT}/api/db-check`);
});
