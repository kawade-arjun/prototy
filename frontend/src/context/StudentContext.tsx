import React, { createContext, useContext, useState, useEffect } from 'react';
import { AcademicStream, StudentProfile } from '../types';
import { STUDENT_PROFILES, DEFAULT_STUDENT, ALL_STUDENT_PROFILES } from '../mock/studentProfiles';
import { api, getToken, getSavedUser, setToken, setSavedUser, removeToken, User, StudentProfileData } from '../services/api';

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
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedStream, setSelectedStream] = useState<AcademicStream>('tech_ai');
  const [authToken, setAuthToken] = useState<string | null>(() => getToken());
  const [currentUser, setCurrentUser] = useState<User | null>(() => getSavedUser());
  const [customProfile, setCustomProfile] = useState<StudentProfileData | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

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
    const data = await api.login(email, password);
    setAuthToken(data.token);
    setCurrentUser(data.user);
    if (data.profile) {
      setCustomProfile(data.profile);
      // If profile is incomplete (< 80%), prompt onboarding
      if (data.profile.completion_percentage && data.profile.completion_percentage < 80) {
        setIsOnboardingOpen(true);
      }
    } else {
      setIsOnboardingOpen(true);
    }
    return data;
  };

  const register = async (email: string, password: string, role = 'student', full_name?: string) => {
    const data = await api.register(email, password, role, full_name);
    setAuthToken(data.token);
    setCurrentUser(data.user);
    if (role === 'student') {
      setIsOnboardingOpen(true);
    }
    return data;
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
        refreshProfile
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
