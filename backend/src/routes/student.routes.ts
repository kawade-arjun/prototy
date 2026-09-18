import { Router, Response } from 'express';
import { query } from '../db.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware.js';

const router = Router();

// Helper to calculate profile completion percentage
const calculateCompletion = (data: any): number => {
  let score = 20; // base for registration
  if (data.discipline && data.stream) score += 20;
  if ((data.technical_skills && data.technical_skills.length > 0) || (data.custom_skills && data.custom_skills.length > 0)) score += 20;
  if (data.soft_skills && data.soft_skills.length > 0) score += 10;
  if (data.institution_name && data.passing_year) score += 15;
  if (data.resume_url) score += 10;
  if (data.aspirations_text && data.aspirations_text.trim().length > 10) score += 5;
  return Math.min(100, score);
};

// GET current student's profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const result = await query('SELECT * FROM student_profiles WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Student profile not found.' });
      return;
    }

    res.json({ success: true, profile: result.rows[0] });
  } catch (error: any) {
    console.error('Fetch student profile error:', error);
    res.status(500).json({ success: false, message: 'Error retrieving profile.' });
  }
});

// POST / PUT Save / Update Onboarding & Profile Info
router.put('/onboarding', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const {
      full_name,
      phone,
      discipline = 'Engineering',
      stream,
      technical_skills = [],
      soft_skills = [],
      custom_skills = [],
      institution_name,
      degree,
      passing_year,
      cgpa_or_percentage,
      resume_url,
      resume_extracted_skills = [],
      aspirations_text
    } = req.body;

    const completion_percentage = calculateCompletion(req.body);

    // Upsert student profile
    const updateResult = await query(
      `INSERT INTO student_profiles (
        user_id, full_name, phone, discipline, stream,
        technical_skills, soft_skills, custom_skills,
        institution_name, degree, passing_year, cgpa_or_percentage,
        resume_url, resume_extracted_skills, aspirations_text,
        completion_percentage, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8,
        $9, $10, $11, $12,
        $13, $14, $15,
        $16, NOW()
      )
      ON CONFLICT (user_id) DO UPDATE SET
        full_name = COALESCE($2, student_profiles.full_name),
        phone = COALESCE($3, student_profiles.phone),
        discipline = COALESCE($4, student_profiles.discipline),
        stream = COALESCE($5, student_profiles.stream),
        technical_skills = COALESCE($6, student_profiles.technical_skills),
        soft_skills = COALESCE($7, student_profiles.soft_skills),
        custom_skills = COALESCE($8, student_profiles.custom_skills),
        institution_name = COALESCE($9, student_profiles.institution_name),
        degree = COALESCE($10, student_profiles.degree),
        passing_year = COALESCE($11, student_profiles.passing_year),
        cgpa_or_percentage = COALESCE($12, student_profiles.cgpa_or_percentage),
        resume_url = COALESCE($13, student_profiles.resume_url),
        resume_extracted_skills = COALESCE($14, student_profiles.resume_extracted_skills),
        aspirations_text = COALESCE($15, student_profiles.aspirations_text),
        completion_percentage = $16,
        updated_at = NOW()
      RETURNING *`,
      [
        userId,
        full_name || 'Student Scholar',
        phone || null,
        discipline,
        stream || null,
        technical_skills,
        soft_skills,
        custom_skills,
        institution_name || null,
        degree || null,
        passing_year ? parseInt(passing_year, 10) : null,
        cgpa_or_percentage ? parseFloat(cgpa_or_percentage) : null,
        resume_url || null,
        resume_extracted_skills,
        aspirations_text || null,
        completion_percentage
      ]
    );

    res.json({
      success: true,
      message: 'Student profile updated successfully.',
      profile: updateResult.rows[0]
    });
  } catch (error: any) {
    console.error('Update student profile error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error updating student profile.' });
  }
});

export default router;
