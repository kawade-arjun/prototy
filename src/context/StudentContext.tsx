import React, { createContext, useContext, useState } from 'react';
import { AcademicStream, StudentProfile } from '../types';
import { STUDENT_PROFILES, DEFAULT_STUDENT, ALL_STUDENT_PROFILES } from '../mock/studentProfiles';

interface StudentContextType {
  activeStudent: StudentProfile;
  selectedStream: AcademicStream;
  setStudentStream: (stream: AcademicStream) => void;
  allStudents: StudentProfile[];
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedStream, setSelectedStream] = useState<AcademicStream>('tech_ai');

  const activeStudent = STUDENT_PROFILES[selectedStream] || DEFAULT_STUDENT;

  const setStudentStream = (stream: AcademicStream) => {
    setSelectedStream(stream);
  };

  return (
    <StudentContext.Provider
      value={{
        activeStudent,
        selectedStream,
        setStudentStream,
        allStudents: ALL_STUDENT_PROFILES
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
