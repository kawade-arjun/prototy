import React, { createContext, useContext, useState, useEffect } from 'react';
import { AcademicStream, StudentProfile, StudentTab } from '../types';
import { STUDENT_PROFILES, DEFAULT_STUDENT, ALL_STUDENT_PROFILES } from '../mock/studentProfiles';
import { api, getToken, getSavedUser, setToken, setSavedUser, removeToken, User, StudentProfileData } from '../services/api';

export interface UploadedResumeData {
  fileName: string;
  text: string;
  timestamp: string;
  fileSize?: string;
}

interface StudentContextType {
  activeStudent: StudentProfile;
  selectedStream: AcademicStream;
  setStudentStream: (stream: AcademicStream) => void;
  allStudents: StudentProfile[];
  
  // Real backend integration state
  currentUser: User | null;
  authToken: string | null;
  customProfile: StudentProfileData | null;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, role?: string, full_name?: string) => Promise<any>;
  logout: () => void;
  saveOnboarding: (data: StudentProfileData) => Promise<any>;
  refreshProfile: () => Promise<void>;

  // Uploaded Resume State for AI Studio Analysis
  uploadedResume: UploadedResumeData | null;
  setUploadedResume: (text: string, fileName: string, fileSize?: string) => void;
  clearUploadedResume: () => void;

  // Global Tab Navigation state
  activeTab: StudentTab;
  setActiveTab: (tab: StudentTab) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedStream, setSelectedStream] = useState<AcademicStream>('tech_ai');
  const [authToken, setAuthToken] = useState<string | null>(() => getToken());
  const [currentUser, setCurrentUser] = useState<User | null>(() => getSavedUser());
  const [customProfile, setCustomProfile] = useState<StudentProfileData | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<StudentTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('activeTab');
      if (tabParam) return tabParam as StudentTab;
      if (params.get('testId')) return 'sandbox';
    }
    return 'recommendations';
  });

  // Load saved resume from localStorage on init
  const [uploadedResume, setUploadedResumeState] = useState<UploadedResumeData | null>(() => {
    try {
      const saved = localStorage.getItem('user_uploaded_resume');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.text && (
          parsed.text.includes('IIT Bombay') || 
          parsed.text.includes('PyTorch & Triton') || 
          parsed.text.includes('vLLM PagedAttention') ||
          parsed.text.includes('Distributed systems and GenAI engineer') ||
          parsed.text.includes('STU-TECH-001') ||
          parsed.text.includes('Unable to automatically extract text')
        )) {
          localStorage.removeItem('user_uploaded_resume');
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const setUploadedResume = (text: string, fileName: string, fileSize?: string) => {
    const data: UploadedResumeData = {
      text,
      fileName,
      timestamp: new Date().toLocaleString(),
      fileSize: fileSize || 'Uploaded Document'
    };
    setUploadedResumeState(data);
    try {
      localStorage.setItem('user_uploaded_resume', JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save resume to localStorage', e);
    }
  };

  const clearUploadedResume = () => {
    setUploadedResumeState(null);
    try {
      localStorage.removeItem('user_uploaded_resume');
    } catch (e) {
      console.warn('Failed to remove resume from localStorage', e);
    }
  };

  // Load profile on initial mount if token exists
  useEffect(() => {
    if (authToken) {
      refreshProfile();
    }
  }, [authToken]);

  const refreshProfile = async () => {
    try {
      const profile = await api.getStudentProfile();
      if (profile) {
        setCustomProfile(profile);
      }
    } catch (err) {
      console.warn('Could not fetch cloud profile, using offline session:', err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await api.login(email, password);
      setAuthToken(data?.token || 'mock-sovereign-jwt-token-2026');
      setCurrentUser(data?.user || { id: 'mock-user-101', email, role: 'student' });
      if (data?.profile) setCustomProfile(data.profile);
      return data;
    } catch {
      const mockUser = { id: `user-${Date.now()}`, email, role: 'student' as any };
      setAuthToken('mock-sovereign-jwt-token-2026');
      setCurrentUser(mockUser);
      return { token: 'mock-sovereign-jwt-token-2026', user: mockUser };
    }
  };

  const register = async (email: string, password: string, role = 'student', full_name?: string) => {
    try {
      const data = await api.register(email, password, role, full_name);
      setAuthToken(data?.token || 'mock-sovereign-jwt-token-2026');
      setCurrentUser(data?.user || { id: 'mock-user-101', email, role: role as any, full_name });
      return data;
    } catch {
      const mockUser = { id: `user-${Date.now()}`, email, role: role as any, full_name };
      setAuthToken('mock-sovereign-jwt-token-2026');
      setCurrentUser(mockUser);
      return { token: 'mock-sovereign-jwt-token-2026', user: mockUser };
    }
  };

  const logout = () => {
    api.logout();
    setAuthToken(null);
    setCurrentUser(null);
    setCustomProfile(null);
  };

  const saveOnboarding = async (data: StudentProfileData) => {
    const res = await api.saveStudentOnboarding(data);
    if (res.profile) {
      setCustomProfile(res.profile);
    }
    return res;
  };

  const setStudentStream = (stream: AcademicStream) => {
    setSelectedStream(stream);
  };

  // Base profile from mock data
  const baseProfile = STUDENT_PROFILES[selectedStream] || DEFAULT_STUDENT;

  // Merge real cloud database fields into activeStudent if customProfile exists
  const activeStudent: StudentProfile = customProfile ? {
    ...baseProfile,
    name: customProfile.full_name || currentUser?.full_name || baseProfile.name,
    degree: customProfile.degree || (customProfile.stream ? `B.Tech in ${customProfile.stream}` : baseProfile.degree),
    institution: customProfile.institution_name || baseProfile.institution,
    verifiedSkills: [
      ...(customProfile.technical_skills || []),
      ...(customProfile.custom_skills || []),
      ...(customProfile.resume_extracted_skills || [])
    ].length > 0
      ? [
          ...(customProfile.technical_skills || []),
          ...(customProfile.custom_skills || []),
          ...(customProfile.resume_extracted_skills || [])
        ]
      : baseProfile.verifiedSkills,
    summary: customProfile.aspirations_text || baseProfile.summary,
    avatarInitials: (customProfile.full_name || currentUser?.full_name || baseProfile.name)
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  } : baseProfile;

  return (
    <StudentContext.Provider
      value={{
        activeStudent,
        selectedStream,
        setStudentStream,
        allStudents: ALL_STUDENT_PROFILES,
        currentUser,
        authToken,
        customProfile,
        isOnboardingOpen,
        setIsOnboardingOpen,
        login,
        register,
        logout,
        saveOnboarding,
        refreshProfile,
        uploadedResume,
        setUploadedResume,
        clearUploadedResume,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
