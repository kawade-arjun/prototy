const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5005/api';

export interface User {
  id: string;
  email: string;
  role: 'student' | 'recruiter' | 'institution' | 'government' | 'college';
  full_name?: string;
  created_at?: string;
}

export interface StudentProfileData {
  id?: string;
  user_id?: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  discipline?: string;
  stream?: string;
  technical_skills?: string[];
  soft_skills?: string[];
  custom_skills?: string[];
  institution_name?: string;
  degree?: string;
  passing_year?: number | null;
  cgpa_or_percentage?: number | string | null;
  resume_url?: string;
  resume_extracted_skills?: string[];
  aspirations_text?: string;
  completion_percentage?: number;
}

export const getToken = (): string | null => {
  return localStorage.getItem('careeroptic_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('careeroptic_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('careeroptic_token');
  localStorage.removeItem('careeroptic_user');
};

export const getSavedUser = (): User | null => {
  const userStr = localStorage.getItem('careeroptic_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setSavedUser = (user: User): void => {
  localStorage.setItem('careeroptic_user', JSON.stringify(user));
};

const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Check backend server availability
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  // User Registration
  async register(email: string, password: string, role = 'student', full_name?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role, full_name })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      if (data.token) {
        setToken(data.token);
      }
      if (data.user) {
        setSavedUser(data.user);
      }
      return data;
    } catch (err: any) {
      if (err.name === 'TypeError' || err.message?.includes('Failed to fetch')) {
        console.warn('Backend server offline/unreachable. Creating client-side session:', err);
        const mockUser: User = {
          id: `user-${Date.now()}`,
          email,
          role: role as any,
          full_name: full_name || email.split('@')[0]
        };
        const mockData = {
          token: 'mock-sovereign-jwt-token-2026',
          user: mockUser,
          profile: null
        };
        setToken(mockData.token);
        setSavedUser(mockUser);
        return mockData;
      }
      throw err;
    }
  },

  // User Login
  async login(email: string, password: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      if (data.token) {
        setToken(data.token);
      }
      if (data.user) {
        setSavedUser(data.user);
      }
      return data;
    } catch (err: any) {
      if (err.name === 'TypeError' || err.message?.includes('Failed to fetch')) {
        console.warn('Backend server offline/unreachable. Creating client-side session:', err);
        const detectedRole = email.includes('tpo') || email.includes('iit') ? 'college'
          : email.includes('google') || email.includes('talent') ? 'recruiter'
          : email.includes('aicte') || email.includes('gov') ? 'government'
          : 'student';
        const mockUser: User = {
          id: `user-${Date.now()}`,
          email,
          role: detectedRole,
          full_name: email.split('@')[0].toUpperCase()
        };
        const mockData = {
          token: 'mock-sovereign-jwt-token-2026',
          user: mockUser,
          profile: null
        };
        setToken(mockData.token);
        setSavedUser(mockUser);
        return mockData;
      }
      throw err;
    }
  },

  // Get current user and profile
  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch user session');
    }
    return data;
  },

  // Get student profile
  async getStudentProfile(): Promise<StudentProfileData | null> {
    const res = await fetch(`${API_BASE_URL}/student/profile`, {
      method: 'GET',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(data.message || 'Failed to fetch student profile');
    }
    return data.profile;
  },

  // Save/Update student onboarding & profile
  async saveStudentOnboarding(profileData: StudentProfileData) {
    const res = await fetch(`${API_BASE_URL}/student/onboarding`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to save student profile');
    }
    return data;
  },

  // Logout
  logout() {
    removeToken();
  }
};
