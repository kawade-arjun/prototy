export type UserRole = 'student' | 'college' | 'recruiter' | 'government';

export type StudentTab = 
  | 'recommendations' 
  | 'sandbox' 
  | 'freelance' 
  | 'internships' 
  | 'jobs' 
  | 'organisations' 
  | 'profile' 
  | 'settings';

export type AcademicStream = 
  | 'tech_ai' 
  | 'commerce_finance' 
  | 'ui_ux' 
  | 'law_governance' 
  | 'healthcare_bio';

export interface StreamMetadata {
  id: AcademicStream;
  name: string;
  badge: string;
  institution: string;
  sandboxTitle: string;
  targetRoles: string[];
  icon: string;
}

export interface AtsDiagnosticResult {
  overallScore: number;
  quantifiedMetricsScore: number;
  keywordDensityScore: number;
  formattingParsabilityScore: number;
  strengths: string[];
  weaknesses: string[];
  actionableSuggestions: string[];
}

export interface SkillGapItem {
  skill: string;
  category: string;
  status: 'matched' | 'missing';
  matchPercent: number;
}

export interface SkillBridgeAction {
  type: 'certification' | 'course' | 'portfolio_project';
  title: string;
  provider: string;
  duration: string;
  roiImpact: string;
  blueprintUrl?: string;
}

export interface EmergingSkillPrediction {
  skill: string;
  growthRate: string; // e.g. "+340%"
  trend: 'exploding' | 'declining';
  category: string;
  impactScore: number;
  description: string;
}

export interface OpportunityListing {
  id: string; // e.g. 'JOB-MSFT-901', 'INT-MSFT-101'
  title: string;
  organization: string;
  orgLogo?: string;
  type: 'gig' | 'internship' | 'job';
  location: string;
  stipendOrSalary: string;
  stream: AcademicStream;
  tags: string[];
  cutoffScore: number; // minimum verified assessment score
  deadline: string;
  description: string;
  responsibilities: string[];
  interviewTips?: string[];
  budget?: string;
  duration?: string;
}

export interface AntiCheatTelemetry {
  pasteAttemptsBlocked: number;
  tabSwitches: number;
  windowBlurs: number;
  timeRemainingSeconds: number;
  pasteGuardActive: boolean;
  keystrokeCadence: 'normal' | 'suspicious' | 'irregular';
  sessionLocked: boolean;
}

export interface CredentialAudit {
  tier1_xmpTimestamp: {
    verified: boolean;
    timestamp: string;
    engine: 'pyHanko PKI Validator';
    certAuthority: string;
    status: 'AUTHENTIC' | 'REVOKED' | 'INVALID';
  };
  tier2_opencvELA: {
    verified: boolean;
    errorLevelScore: number; // 0.0 to 100.0 (lower is better, e.g. < 4.5 is pristine)
    alteredPixelsDetected: number;
    engine: 'OpenCV Error Level Analysis (ELA)';
    status: 'PRISTINE_ORIGINAL' | 'ALTERATION_DETECTED';
  };
  tier3_sovereignPKI: {
    verified: boolean;
    digiLockerId: string;
    ledgerHash: string;
    status: 'VERIFIED_SOVEREIGN';
  };
}

export interface DailyQuest {
  id: string;
  title: string;
  xp: number;
  progress: number;
  total: number;
  completed: boolean;
  rewardBadge: string;
}
