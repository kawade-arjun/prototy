import React, { useState, useMemo } from 'react';
import { useStudent } from '../../../context/StudentContext';
import { 
  X, 
  Check, 
  Plus, 
  Upload, 
  FileText, 
  GraduationCap, 
  Cpu, 
  BookOpen, 
  Award, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Building,
  Target,
  Sparkles,
  BrainCircuit
} from 'lucide-react';
import { ALL_DISCIPLINES, DisciplineConfig } from '../../../mock/mockData';
import { AcademicStream } from '../../../types';

// Engineering branches configuration
export const ENGINEERING_BRANCHES = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering (CSE)',
    skills: ['Data Structures & Algorithms', 'Python', 'C++', 'Java', 'React.js', 'Node.js', 'PostgreSQL', 'Docker', 'System Design']
  },
  {
    id: 'ai_ds',
    name: 'Artificial Intelligence & Data Science',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Machine Learning', 'NLP / Transformers', 'Computer Vision', 'vLLM', 'Pandas / NumPy', 'SQL']
  },
  {
    id: 'ece',
    name: 'Electronics & Communication (ECE)',
    skills: ['Embedded C', 'VLSI Design', 'Verilog / VHDL', 'Microcontrollers (ARM/ESP32)', 'Signal Processing', 'PCB Design', 'IoT Protocols']
  },
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    skills: ['SolidWorks / CAD', 'Finite Element Analysis (FEA)', 'ANSYS', 'Thermodynamics', 'Robotics & Kinematics', 'CNC Machining', 'MATLAB']
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    skills: ['AutoCAD', 'STAAD Pro', 'Structural Analysis', 'Revit / BIM', 'Geotechnical Engineering', 'Project Scheduling', 'GIS Mapping']
  },
  {
    id: 'electrical',
    name: 'Electrical Engineering',
    skills: ['Power Systems', 'Control Systems', 'MATLAB / Simulink', 'PLC & SCADA', 'Power Electronics', 'High Voltage Engineering']
  },
  {
    id: 'chemical',
    name: 'Chemical & Materials Engineering',
    skills: ['Process Simulation (Aspen Plus)', 'Chemical Reaction Engineering', 'Thermodynamics', 'Polymer Science', 'Process Safety']
  }
];

export const SOFT_SKILLS_LIST = [
  'Analytical Problem Solving',
  'System Architecture & Design',
  'Cross-Functional Collaboration',
  'Written Technical Communication',
  'Agile / Scrum Methodologies',
  'Leadership & Initiative',
  'Critical Thinking',
  'Adaptability & Rapid Learning'
];

interface StudentOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentOnboardingModal: React.FC<StudentOnboardingModalProps> = ({
  isOpen,
  onClose
}) => {
  const { activeStudent, customProfile, saveOnboarding } = useStudent();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form State - Dynamic 5-Discipline Streams
  const [selectedDiscipline, setSelectedDiscipline] = useState<AcademicStream>(() => {
    const saved = localStorage.getItem('careeroptic_selected_discipline') as AcademicStream;
    return saved && ALL_DISCIPLINES.some(d => d.id === saved) ? saved : 'tech_ai';
  });

  const [isChangingDiscipline, setIsChangingDiscipline] = useState<boolean>(() => {
    return !localStorage.getItem('careeroptic_selected_discipline');
  });

  const activeDisciplineConfig = useMemo(() => {
    return ALL_DISCIPLINES.find(d => d.id === selectedDiscipline) || ALL_DISCIPLINES[0];
  }, [selectedDiscipline]);

  const availableBranches = activeDisciplineConfig.branches;

  const [selectedBranch, setSelectedBranch] = useState<string>(
    customProfile?.stream || availableBranches[0].name
  );
  const [selectedTechSkills, setSelectedTechSkills] = useState<string[]>(
    customProfile?.technical_skills || availableBranches[0].skills.slice(0, 3)
  );
  const [customSkillInput, setCustomSkillInput] = useState<string>('');
  const [customSkills, setCustomSkills] = useState<string[]>(
    customProfile?.custom_skills || []
  );
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>(
    customProfile?.soft_skills || ['Analytical Problem Solving', 'Cross-Functional Collaboration']
  );

  // Academic Details
  const [schoolName, setSchoolName] = useState<string>('Junior College / Higher Secondary');
  const [institutionName, setInstitutionName] = useState<string>(
    customProfile?.institution_name || activeStudent.institution || ''
  );
  const [degree, setDegree] = useState<string>(
    customProfile?.degree || activeStudent.degree || 'B.Tech in Computer Engineering'
  );
  const [passingYear, setPassingYear] = useState<number>(
    customProfile?.passing_year || 2026
  );
  const [cgpaOrPercentage, setCgpaOrPercentage] = useState<string>(
    customProfile?.cgpa_or_percentage ? String(customProfile.cgpa_or_percentage) : '9.1'
  );

  // Resume Upload Simulation
  const [uploadedResumeName, setUploadedResumeName] = useState<string | null>(null);
  const [extractedSkills, setExtractedSkills] = useState<string[]>(
    customProfile?.resume_extracted_skills || []
  );
  const [isExtractingResume, setIsExtractingResume] = useState<boolean>(false);

  // Future Aspirations (CareerOptic AI Context)
  const [aspirations, setAspirations] = useState<string>(
    customProfile?.aspirations_text || ''
  );

  // Active branch metadata
  const currentBranchData = useMemo(() => {
    return availableBranches.find(b => b.name === selectedBranch) || availableBranches[0];
  }, [selectedBranch, availableBranches]);

  // Real-time Completion Percentage Calculation (NO XP)
  const completionPercentage = useMemo(() => {
    let score = 20; // base signup
    if (selectedBranch) score += 20;
    if (selectedTechSkills.length > 0 || customSkills.length > 0) score += 20;
    if (selectedSoftSkills.length > 0) score += 10;
    if (institutionName && institutionName.trim().length > 2) score += 15;
    if (uploadedResumeName || extractedSkills.length > 0) score += 10;
    if (aspirations && aspirations.trim().length > 15) score += 5;
    return Math.min(100, score);
  }, [selectedBranch, selectedTechSkills, customSkills, selectedSoftSkills, institutionName, uploadedResumeName, extractedSkills, aspirations]);

  if (!isOpen) return null;

  // Toggle Technical Skill
  const toggleTechSkill = (skill: string) => {
    setSelectedTechSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Add Custom Skill
  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    const trimmed = customSkillInput.trim();
    if (!customSkills.includes(trimmed) && !selectedTechSkills.includes(trimmed)) {
      setCustomSkills(prev => [...prev, trimmed]);
    }
    setCustomSkillInput('');
  };

  const removeCustomSkill = (skill: string) => {
    setCustomSkills(prev => prev.filter(s => s !== skill));
  };

  // Toggle Soft Skill
  const toggleSoftSkill = (skill: string) => {
    setSelectedSoftSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Simulate Resume Upload & AI Extraction
  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedResumeName(file.name);
    setIsExtractingResume(true);

    // Simulate smart resume parsing after 1 second
    setTimeout(() => {
      const mockExtracted = ['Git & GitHub CI/CD', 'REST APIs', 'Postman Testing', 'Cloud Architecture (AWS)'];
      setExtractedSkills(mockExtracted);
      setIsExtractingResume(false);
    }, 1100);
  };

  // Save to backend and complete
  const handleSaveAndComplete = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      localStorage.setItem('careeroptic_selected_discipline', selectedDiscipline);
      await saveOnboarding({
        full_name: activeStudent.name,
        discipline: activeDisciplineConfig.name,
        stream: selectedBranch,
        technical_skills: selectedTechSkills,
        custom_skills: customSkills,
        soft_skills: selectedSoftSkills,
        institution_name: institutionName,
        degree: degree,
        passing_year: passingYear,
        cgpa_or_percentage: parseFloat(cgpaOrPercentage) || 9.0,
        resume_url: uploadedResumeName ? `https://careeroptic.in/resumes/${uploadedResumeName}` : undefined,
        resume_extracted_skills: extractedSkills,
        aspirations_text: aspirations,
        completion_percentage: completionPercentage
      });

      onClose();
    } catch (err: any) {
      console.error('Save onboarding error:', err);
      setSubmitError(err.message || 'Failed to save onboarding details to database.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/[0.09] shadow-2xl overflow-hidden transition-all">
        
        {/* Top Header: Title & Dynamic Status Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-slate-900/60 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white">
                  Student Profile Builder
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Engineering discipline, tailored skill matrix, and AI expectations
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Completion Status Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                Profile Completion Status:
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {completionPercentage}% Complete
              </span>
            </div>
            
            {/* Progress Track */}
            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-amber-600 transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Step Pill Navigation */}
          <div className="flex items-center justify-between pt-3 gap-1 overflow-x-auto pb-1 text-[11px] font-semibold">
            {[
              { num: 1, label: 'Branch' },
              { num: 2, label: 'Tech Skills' },
              { num: 3, label: 'Soft Skills' },
              { num: 4, label: 'Resume (Opt)' },
              { num: 5, label: 'Academics' },
              { num: 6, label: 'Aspirations' }
            ].map(step => (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  currentStep === step.num
                    ? 'bg-amber-600 text-white shadow-sm font-bold'
                    : currentStep > step.num
                    ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {currentStep > step.num ? <Check className="w-3 h-3 text-amber-500" /> : <span>{step.num}.</span>}
                <span>{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* STEP 1: 5-Disciplinary Stream & Branch Selection */}
          {currentStep === 1 && (
            <div className="space-y-5">
              {/* 1. Pre-Selected Track Card or Full Selector Grid */}
              {!isChangingDiscipline ? (
                <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-600/15 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center text-xl font-bold shadow-md shrink-0">
                      {activeDisciplineConfig.icon === 'Cpu' ? '💻' : activeDisciplineConfig.icon === 'TrendingUp' ? '📊' : activeDisciplineConfig.icon === 'Palette' ? '🎨' : activeDisciplineConfig.icon === 'Scale' ? '⚖️' : '🔬'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">
                          {activeDisciplineConfig.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                          Pre-Selected during Signup
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {activeDisciplineConfig.badge} • {activeDisciplineConfig.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsChangingDiscipline(true)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 font-bold text-xs border border-amber-500/30 transition-all cursor-pointer whitespace-nowrap self-end sm:self-center"
                  >
                    Change Track
                  </button>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>1. Select Your Primary Disciplinary Track:</span>
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400">Sovereign National Benchmarks</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {ALL_DISCIPLINES.map((d) => {
                      const isSelected = selectedDiscipline === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            setSelectedDiscipline(d.id);
                            localStorage.setItem('careeroptic_selected_discipline', d.id);
                            const firstBranch = d.branches[0];
                            setSelectedBranch(firstBranch.name);
                            setSelectedTechSkills(firstBranch.skills.slice(0, 3));
                            setIsChangingDiscipline(false);
                          }}
                          className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                            isSelected
                              ? 'border-amber-600 bg-amber-500/10 dark:bg-amber-600/20 dark:border-amber-500 text-amber-900 dark:text-white shadow-md shadow-amber-500/10'
                              : 'border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-amber-500/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1.5 mb-1">
                            <p className="text-xs font-extrabold flex items-center gap-1.5">
                              <span className="text-base">{d.icon === 'Cpu' ? '💻' : d.icon === 'TrendingUp' ? '📊' : d.icon === 'Palette' ? '🎨' : d.icon === 'Scale' ? '⚖️' : '🔬'}</span>
                              <span>{d.name}</span>
                            </p>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5" />
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {d.description}
                          </p>
                          <span className="mt-2 inline-block px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                            {d.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Branch / Specialization Selector */}
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-amber-500" />
                  <span>2. Select Specific Branch / Specialization ({activeDisciplineConfig.name}):</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availableBranches.map((b) => {
                    const isSelected = selectedBranch === b.name;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setSelectedBranch(b.name);
                          setSelectedTechSkills(b.skills.slice(0, 3));
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/80 dark:bg-amber-600/20 dark:border-amber-500 text-amber-900 dark:text-white font-bold shadow-sm'
                            : 'border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/[0.15]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold">{b.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            {b.skills.slice(0, 3).join(', ')}...
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Technical Skills & Custom "Other" Skills */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Technical Skills for {selectedBranch}</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Click to select the competencies you have experience with:
                </p>
              </div>

              {/* Branch Presets */}
              <div className="flex flex-wrap gap-2">
                {currentBranchData.skills.map((skill) => {
                  const isSelected = selectedTechSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleTechSkill(skill)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom / "Other" Skills Section */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] space-y-3">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  None of the above or have additional skills? Add "Other" Custom Skills:
                </label>
                <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                  <input
                    type="text"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    placeholder="e.g. LLM Fine-Tuning, Rust, WebAssembly, Solana..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/[0.1] bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>

                {customSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {customSkills.map((cSkill) => (
                      <span
                        key={cSkill}
                        className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <span>{cSkill}</span>
                        <button
                          type="button"
                          onClick={() => removeCustomSkill(cSkill)}
                          className="hover:text-rose-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Soft Skills */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Professional & Soft Skills</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select key behavioral and engineering practices you excel at:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SOFT_SKILLS_LIST.map((skill) => {
                  const isSelected = selectedSoftSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSoftSkill(skill)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/80 dark:bg-amber-600/20 dark:border-amber-500 text-amber-900 dark:text-white font-bold shadow-sm'
                          : 'border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/[0.15]'
                      }`}
                    >
                      <span className="text-xs">{skill}</span>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-amber-600 text-white' : 'border border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Optional Resume Upload & Extraction */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>Upload Resume (Optional)</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Our parser will automatically extract your verified skills and accomplishments.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div className="relative border-2 border-dashed border-slate-300 dark:border-white/[0.15] rounded-3xl p-6 text-center hover:border-amber-500 transition-colors bg-slate-50/50 dark:bg-slate-900/40">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleResumeFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {uploadedResumeName ? uploadedResumeName : 'Drop your resume here, or click to browse'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Supports PDF, DOCX (Max 10MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Extraction State */}
              {isExtractingResume && (
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                    Extracting technical competencies and credentials from {uploadedResumeName}...
                  </span>
                </div>
              )}

              {/* Extracted Skills Preview */}
              {extractedSkills.length > 0 && !isExtractingResume && (
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Automatically Extracted Skills:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {extractedSkills.map(skill => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[11px] font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Academic Details */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-500" />
                  <span>Academic Background</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Enter your university, degree, and current academic standing:
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College / University Name
                  </label>
                  <input
                    type="text"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. Veermata Jijabai Technological Institute (VJTI), Mumbai"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Degree / Program
                    </label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. B.Tech Computer Engineering"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Graduation / Passing Year
                    </label>
                    <select
                      value={passingYear}
                      onChange={(e) => setPassingYear(parseInt(e.target.value, 10))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value={2024}>2024 (Graduated)</option>
                      <option value={2025}>2025 (Final Year)</option>
                      <option value={2026}>2026 (Third Year)</option>
                      <option value={2027}>2027 (Second Year)</option>
                      <option value={2028}>2028 (First Year)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      CGPA / Aggregate Percentage
                    </label>
                    <input
                      type="text"
                      value={cgpaOrPercentage}
                      onChange={(e) => setCgpaOrPercentage(e.target.value)}
                      placeholder="e.g. 9.1 or 88%"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Junior College / Higher Secondary
                    </label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g. National Public School"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Future Aspirations / Dreams (For CareerOptic AI) */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-sm mb-1">
                  <BrainCircuit className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>CareerOptic AI Context Model</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  This optional section directly teaches our AI models your career dreams, ideal company culture, and long-term ambitions so it can personalize job matches and roadmap recommendations.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center justify-between">
                  <span>What are your future expectations or your dream?</span>
                  <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                </label>
                <textarea
                  rows={5}
                  value={aspirations}
                  onChange={(e) => setAspirations(e.target.value)}
                  placeholder="e.g. In the next 3 years, I want to become a core contributor to distributed ML systems, build foundational LLM infrastructure, or work on robotics automation. I prefer high-growth deep-tech teams with hands-on technical mentors..."
                  className="w-full p-3.5 rounded-2xl border border-slate-300 dark:border-white/[0.1] bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs">
                  {submitError}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between gap-3 flex-shrink-0">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep < 6 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-600/20 flex items-center gap-1.5 transition-all"
              >
                <span>Continue to {currentStep === 1 ? 'Skills' : currentStep === 2 ? 'Soft Skills' : currentStep === 3 ? 'Resume' : currentStep === 4 ? 'Academics' : 'Aspirations'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSaveAndComplete}
                className={`px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-600/20 flex items-center gap-2 transition-all ${
                  submitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Syncing with Cloud Database...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Onboarding & Sync Profile</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
