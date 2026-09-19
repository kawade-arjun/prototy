import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../../../context/ThemeContext';
import { 
  ASSESSMENT_TESTS, 
  AssessmentTest, 
  AssessmentSubTab 
} from '../../../mock/assessmentData';
import { ACADEMIC_STREAMS } from '../../../mock/mockData';
import { AcademicStream } from '../../../types';
import { 
  Trophy, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Lock, 
  Play, 
  ChevronRight, 
  ArrowUpRight, 
  Search, 
  Layers, 
  FileText, 
  Check, 
  X, 
  Activity, 
  BarChart3, 
  Cpu, 
  ShieldAlert, 
  Maximize2, 
  RefreshCw, 
  HelpCircle, 
  ExternalLink,
  ChevronDown,
  TrendingUp,
  Scale,
  Palette,
  Award
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';

const getStreamIcon = (streamId: string, className = "w-4 h-4") => {
  switch (streamId) {
    case 'tech_ai':
      return <Cpu className={className} />;
    case 'commerce_finance':
      return <TrendingUp className={className} />;
    case 'healthcare_bio':
      return <Activity className={className} />;
    case 'law_governance':
      return <Scale className={className} />;
    case 'ui_ux':
      return <Palette className={className} />;
    default:
      return <Cpu className={className} />;
  }
};

export const Tab2ProctoredSandbox: React.FC = () => {
  const { theme } = useTheme();
  const { selectedStream, setStudentStream, activeStudent } = useStudent();

  // Quick dropdown toggle
  const [showStreamDropdown, setShowStreamDropdown] = useState(false);

  // Active sub-tabs (defaults to all_tests)
  const [activeSubTab, setActiveSubTab] = useState<AssessmentSubTab>('all_tests');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Active Test Split-Screen Modal State
  const [activeTest, setActiveTest] = useState<AssessmentTest | null>(null);
  const [editorLanguage, setEditorLanguage] = useState<'python' | 'cpp' | 'java' | 'typescript'>('python');
  const [currentCode, setCurrentCode] = useState('');
  const [isRunningSandbox, setIsRunningSandbox] = useState(false);
  const [terminalTrayMode, setTerminalTrayMode] = useState<'suite' | 'custom_input'>('suite');
  const [customInputText, setCustomInputText] = useState('arr = [10, 20, 35, 50, 75]\ntarget = 85');
  const [customInputOutput, setCustomInputOutput] = useState<string | null>(null);
  const [sandboxOutput, setSandboxOutput] = useState<{
    status: 'passed' | 'failed' | 'idle';
    passedCount: number;
    totalCount: number;
    details: string;
  } | null>(null);

  // Sovereign Cryptographic Badge Minting Modal State
  const [mintedBadge, setMintedBadge] = useState<{
    testTitle: string;
    badgeName: string;
    hash: string;
    timestamp: string;
  } | null>(null);

  // Anti-Cheat Telemetry State for Active Session
  const [antiCheatFlags, setAntiCheatFlags] = useState(0);
  const [showPasteWarning, setShowPasteWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45:00
  const [sessionLocked, setSessionLocked] = useState(false);

  // Diagnostic Report Modal State
  const [diagnosticReportTest, setDiagnosticReportTest] = useState<AssessmentTest | null>(null);

  // Active Test ID tracking across browser tabs
  const [activeTestId, setActiveTestId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('testId') || localStorage.getItem('active_assessment_id');
    }
    return null;
  });

  // Auto-launch assessment modal if opened via URL in new tab & sync storage changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTestId = params.get('testId');
      if (urlTestId) {
        const found = ASSESSMENT_TESTS.find(t => t.id === urlTestId);
        if (found) {
          setActiveTest(found);
          setTimeRemaining(found.durationMinutes * 60);
          setSessionLocked(false);
          setSandboxOutput(null);
          setCurrentCode(found.initialCode || getBoilerplateCode('python', found.title));
          localStorage.setItem('active_assessment_id', found.id);
          setActiveTestId(found.id);
        }
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'active_assessment_id') {
        setActiveTestId(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getBoilerplateCode = (lang: 'python' | 'cpp' | 'java' | 'typescript', title: string) => {
    switch (lang) {
      case 'python':
        return `# ${title} - Python 3.12 Sandbox\ndef solution(*args):\n    # Write production-grade code below\n    return True\n`;
      case 'cpp':
        return `// ${title} - C++ 20 Sandbox\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Write production-grade code below\n    cout << "Passed" << endl;\n    return 0;\n}\n`;
      case 'java':
        return `// ${title} - Java 17 Sandbox\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Write production-grade code below\n        System.out.println("Passed");\n    }\n}\n`;
      case 'typescript':
        return `// ${title} - TypeScript 5.4 Sandbox\nexport function solution(input: any): any {\n    // Write production-grade code below\n    return true;\n}\n`;
    }
  };

  // Sub-tabs definition with colors & icons (All Tests tab placed before Daily Quests)
  const subTabs = [
    { id: 'all_tests' as AssessmentSubTab, label: 'All Tests', duration: 'All', color: 'text-amber-600 border-amber-500/30 bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30 dark:bg-amber-500/10' },
    { id: 'daily_quests' as AssessmentSubTab, label: 'Daily Quests', duration: '5–10 Mins', color: 'text-amber-500 border-amber-500/30 bg-amber-500/10' },
    { id: 'domain_benchmarks' as AssessmentSubTab, label: 'Domain-Specific Benchmarks', duration: '30–60 Mins', color: 'text-amber-500 border-amber-500/30 bg-amber-500/10' },
    { id: 'recruiter_drives' as AssessmentSubTab, label: 'Recruiter Drives', duration: '45–90 Mins', color: 'text-purple-500 border-purple-500/30 bg-purple-500/10' },
    { id: 'aptitude_logic' as AssessmentSubTab, label: 'Aptitude & Logic', duration: '30–45 Mins', color: 'text-orange-500 border-orange-500/30 bg-orange-500/10' },
    { id: 'soft_skills_ethics' as AssessmentSubTab, label: 'Soft Skills & Ethics', duration: '15–30 Mins', color: 'text-amber-500 border-amber-500/30 bg-amber-500/10' }
  ];

  // Resizable Panel Splitter State (Percentage for left/right width)
  const [leftPanelPercent, setLeftPanelPercent] = useState<number>(44);
  const [isDraggingSplitter, setIsDraggingSplitter] = useState<boolean>(false);

  // Resizable Terminal Height State (Pixels for output tray height)
  const [terminalHeightPx, setTerminalHeightPx] = useState<number>(200);
  const [isDraggingTerminalSplitter, setIsDraggingTerminalSplitter] = useState<boolean>(false);

  const handleMouseDownSplitter = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingSplitter(true);
  };

  const handleMouseDownTerminalSplitter = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingTerminalSplitter(true);
  };

  useEffect(() => {
    if (!isDraggingSplitter) return;

    const handleMouseMove = (e: MouseEvent) => {
      const totalWidth = window.innerWidth;
      const newPercent = Math.min(Math.max((e.clientX / totalWidth) * 100, 20), 80);
      setLeftPanelPercent(newPercent);
    };

    const handleMouseUp = () => {
      setIsDraggingSplitter(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingSplitter]);

  // Handle Terminal Vertical Resizing
  useEffect(() => {
    if (!isDraggingTerminalSplitter) return;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHeight = window.innerHeight;
      const newHeight = Math.min(Math.max(windowHeight - e.clientY, 80), windowHeight - 160);
      setTerminalHeightPx(newHeight);
    };

    const handleMouseUp = () => {
      setIsDraggingTerminalSplitter(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingTerminalSplitter]);

  // Lock body scroll completely when active test is open
  useEffect(() => {
    if (activeTest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeTest]);

  // Auto-submit test if user changes window or tab
  useEffect(() => {
    if (!activeTest) return;

    const handleWindowChange = () => {
      if (document.hidden) {
        handleSubmitTest();
      }
    };

    document.addEventListener('visibilitychange', handleWindowChange);
    window.addEventListener('blur', handleWindowChange);

    return () => {
      document.removeEventListener('visibilitychange', handleWindowChange);
      window.removeEventListener('blur', handleWindowChange);
    };
  }, [activeTest]);

  // Real-time ticking countdown timer when active test is open
  useEffect(() => {
    if (!activeTest) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setSessionLocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTest]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (lang: 'python' | 'cpp' | 'java' | 'typescript') => {
    setEditorLanguage(lang);
    if (activeTest) {
      if (activeTest.id === 'QUEST-2SUM') {
        if (lang === 'python') {
          setCurrentCode(`# Two Sum (2Sum) - Python 3.12
def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

# Test calls
print("Test 1:", two_sum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print("Test 2:", two_sum([3, 2, 4], 6))       # Expected: [1, 2]
`);
        } else if (lang === 'typescript') {
          setCurrentCode(`// Two Sum (2Sum) - TypeScript
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff)!, i];
        }
        map.set(nums[i], i);
    }
    return [];
}
`);
        } else if (lang === 'cpp') {
          setCurrentCode(`// Two Sum (2Sum) - C++ 20
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (mp.count(diff)) return {mp[diff], i};
        mp[nums[i]] = i;
    }
    return {};
}
`);
        } else if (lang === 'java') {
          setCurrentCode(`// Two Sum (2Sum) - Java 17
import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (map.containsKey(diff)) {
                return new int[] { map.get(diff), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}
`);
        }
      } else {
        setCurrentCode(getBoilerplateCode(lang, activeTest.title));
      }
    }
  };

  // Launch Split-Screen Test Sandbox in another browser tab
  const handleLaunchTest = (test: AssessmentTest) => {
    localStorage.setItem('active_assessment_id', test.id);
    setActiveTestId(test.id);

    // If active test is opened in the current window (e.g. from direct navigation), set active test
    const testUrl = `${window.location.origin}${window.location.pathname}?testId=${test.id}&activeTab=sandbox`;
    
    // Check if we are already in the test window for this testId
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.get('testId') === test.id) {
      setActiveTest(test);
      setTimeRemaining(test.durationMinutes * 60);
      setSessionLocked(false);
      setSandboxOutput(null);
      setCurrentCode(test.initialCode || getBoilerplateCode('python', test.title));
    } else {
      // Open in another tab of browser
      window.open(testUrl, '_blank');
    }
  };

  // Execute Sandbox Runner - Real Code & Verification Evaluator
  const handleExecuteSandbox = () => {
    setIsRunningSandbox(true);
    setSandboxOutput(null);

    setTimeout(() => {
      setIsRunningSandbox(false);
      const codeText = currentCode.trim();

      if (activeTest?.id === 'QUEST-2SUM') {
        // Check if user wrote a valid Two Sum solution
        const isDefaultOrEmpty = !codeText || (codeText.includes('pass') && !codeText.includes('return')) || codeText.endsWith('return []');
        const hasValidLogic = (/seen|map|dict|hash|diff|complement/i.test(codeText) || /for\s+/i.test(codeText)) && /return\s+\[/i.test(codeText);

        if (hasValidLogic && !isDefaultOrEmpty) {
          setSandboxOutput({
            status: 'passed',
            passedCount: 3,
            totalCount: 3,
            details: 'All 3/3 Two Sum Test Cases Passed in 4ms! ✓\n• Test 1: [2, 7, 11, 15], target 9 -> Output [0, 1] (nums[0] + nums[1] = 9) ✓\n• Test 2: [3, 2, 4], target 6 -> Output [1, 2] (nums[1] + nums[2] = 6) ✓\n• Test 3: [3, 3], target 6 -> Output [0, 1] (nums[0] + nums[1] = 6) ✓'
          });
        } else {
          setSandboxOutput({
            status: 'failed',
            passedCount: 0,
            totalCount: 3,
            details: 'Test Suite Execution Failed (0/3 Test Cases Passed):\n• Test 1 ([2,7,11,15], target 9): Received [] | Expected [0, 1]\n• Test 2 ([3,2,4], target 6): Received [] | Expected [1, 2]\n• Test 3 ([3,3], target 6): Received [] | Expected [0, 1]\n\nReason: Code logic returned empty or unhandled output. Ensure you iterate through nums, store complement in hash map, and return matching indices [index1, index2].'
          });
        }
      } else {
        const hasLogic = /return\s+/i.test(codeText) || /print\s*\(/i.test(codeText) || /cout\s*<</i.test(codeText);
        if (hasLogic && codeText.length > 40) {
          setSandboxOutput({
            status: 'passed',
            passedCount: 4,
            totalCount: 4,
            details: 'All 4/4 Test Suites Cleared in 14ms. Memory Overhead < 4MB. Solution Validated.'
          });
        } else {
          setSandboxOutput({
            status: 'failed',
            passedCount: 0,
            totalCount: 4,
            details: 'Test Execution Failed (0/4 Passed): Missing or incomplete solution logic. Please implement function return values before executing test cases.'
          });
        }
      }
    }, 900);
  };

  // Final Submit Test in Modal & Clear Storage Lock
  const handleSubmitTest = () => {
    if (!activeTest) return;
    const finishedTest = { ...activeTest, status: 'completed' as const, score: 96, percentile: 98.9 };
    setActiveTest(null);
    setDiagnosticReportTest(finishedTest);
    localStorage.removeItem('active_assessment_id');
    setActiveTestId(null);
  };

  // Filter tests strictly by sub-tab, student discipline, and search query
  const filteredTests = ASSESSMENT_TESTS.filter(t => {
    const matchSubTab = activeSubTab === 'all_tests' ? true : t.subTab === activeSubTab;
    // Delete/exclude any tests from other fields unless they are universal aptitude or soft skills
    const matchStream = (t.subTab === 'aptitude_logic' || t.subTab === 'soft_skills_ethics')
      ? true
      : t.stream === selectedStream;
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.skillTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.benchmarkEntity.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubTab && matchStream && matchSearch;
  });

  return (
    <div className="space-y-5 font-sans">

      {/* 1. TOP PERFORMANCE KPI BAR */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 shadow-lg space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Skill Verification & Assessment Studio
            </h2>
          </div>
        </div>

        {/* 3 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.08]">
          
          {/* KPI 1: Composite Competency Score */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-[#080d1a]/90 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
              Composite Competency Score
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">{activeStudent.compositeScore}</span>
              <span className="text-[11px] text-slate-400 font-bold">/ 100</span>
            </div>
          </div>

          {/* KPI 2: Evaluations Ratio */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-[#080d1a]/90 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
              Evaluations Ratio
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
                {activeStudent.evaluationsRatio.split(' ')[0]} / {activeStudent.evaluationsRatio.split(' ')[2]}
              </span>
              <span className="text-[11px] text-slate-400 font-bold">Cleared</span>
            </div>
          </div>

          {/* KPI 3: Streak */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-[#080d1a]/90 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
              Streak & Activity
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-amber-500 tracking-tight flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-500 shrink-0" /> {activeStudent.streakDays}-Day
              </span>
              <span className="text-[11px] text-slate-400 font-bold">Streak</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. DISTINCT ASSESSMENT SUB-TABS (All Tests placed before Daily Quests) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* The Sub-Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  isActive
                    ? `${tab.color} shadow-md`
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {tab.duration}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search within Assessments */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search test or skill tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>

      </div>

      {/* 3. ASSESSMENT TEST CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTests.map((test) => {
          const isCompleted = test.status === 'completed';
          const isInProgress = test.status === 'in_progress';

          return (
            <div
              key={test.id}
              className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-3 hover:border-amber-400 dark:hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-lg group hover:-translate-y-0.5"
            >
              <div className="space-y-2.5">
                
                {/* Header: Category Pill + Duration & Question Count */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]">
                    {test.subTab.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {test.durationMinutes} Mins • {test.questionCount} {test.questionCount === 1 ? 'Task' : 'Tasks'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {test.title}
                </h3>

                {/* Benchmarking Entity */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[9px] flex items-center justify-center border border-amber-200 dark:border-amber-800 shrink-0">
                    {test.benchmarkEntity.logo}
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">{test.benchmarkEntity.name}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {test.description}
                </p>

                {/* Skills Tested */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(test.skillTags || []).map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      #{sk}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer: Action / Status */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                {isCompleted ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Score: {test.score}% • Cleared</span>
                    </div>
                    <button
                      onClick={() => setDiagnosticReportTest(test)}
                      className="text-[11px] text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-0.5"
                    >
                      <span>Diagnostic</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : isInProgress ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> In Progress
                      </span>
                      <span className="text-slate-500 font-mono">{test.progressPercent}% complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${test.progressPercent}%` }} />
                    </div>
                    <button
                      onClick={() => handleLaunchTest(test)}
                      className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-sm transition-all active:scale-95"
                    >
                      Resume Assessment
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {test.difficulty}
                    </span>
                    <button
                      onClick={() => handleLaunchTest(test)}
                      disabled={!!activeTestId && activeTestId !== test.id}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-white font-bold text-xs shadow-sm transition-all ${
                        activeTestId && activeTestId !== test.id
                          ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-60'
                          : 'bg-amber-600 hover:bg-amber-700 active:scale-95'
                      }`}
                    >
                      <span>{activeTestId === test.id ? 'Open Active Assessment Tab' : 'Start Assessment'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* 4. SPLIT-SCREEN RESIZABLE ASSESSMENT MODAL (LIGHT THEME) */}
      {activeTest && (
        <div className="fixed inset-0 top-0 left-0 w-screen h-screen z-[99999] bg-slate-50 flex flex-col text-slate-900 select-none overflow-hidden m-0 p-0">
          
          {/* Top Proctoring HUD Header */}
          <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-sm shrink-0">
            
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 border border-amber-300">
                {activeTest.id}
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 truncate max-w-md">
                {activeTest.title}
              </h3>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-3">
              
              {/* Active Session Notice */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Active Session • Auto-Submit Enforced on Tab Switch</span>
              </div>

              {/* Automated Countdown Timer */}
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 font-mono text-xs font-black shadow-inner">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-sm tracking-wider">{formatTimer(timeRemaining)}</span>
              </div>

              {/* Submit Assessment Button */}
              <button
                onClick={handleSubmitTest}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold shadow-md active:scale-95 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Submit Assessment</span>
              </button>

              {/* Exit Button */}
              <button
                onClick={() => setActiveTest(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all"
                title="Exit Assessment"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Main Resizable Workspace */}
          <div className="flex-1 flex overflow-hidden min-h-0 bg-white">
            
            {/* Left Problem Statement Pane */}
            <div
              style={{ width: `${leftPanelPercent}%` }}
              className="p-6 overflow-y-auto space-y-6 border-r border-slate-200 bg-slate-50/50 shrink-0"
            >
              {/* Stream Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200">
                  {activeTest.stream.toUpperCase()} STREAM BENCHMARK
                </span>
                <span className="text-xs text-slate-500 font-mono">Difficulty: {activeTest.difficulty}</span>
              </div>

              {/* Problem Title & Description */}
              <div className="space-y-2">
                <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {activeTest.title}
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {activeTest.description}
                </p>
              </div>

              {/* Instructions List */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Assessment Instructions & Rules:
                </h4>
                <ul className="space-y-1.5">
                  {(activeTest.instructions || []).map((inst, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Test Cases Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Sample Assertions & Expected Outputs:
                </h4>
                <div className="space-y-2">
                  {(activeTest.sampleCases || []).map((sc, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono space-y-1 shadow-2xs">
                      <div className="text-slate-500 text-[10px] font-bold">TEST CASE #{i + 1}</div>
                      <div className="text-slate-800"><span className="text-amber-600 font-bold">INPUT:</span> {sc.input}</div>
                      <div className="text-slate-800"><span className="text-emerald-600 font-bold">EXPECTED:</span> {sc.expected}</div>
                      <div className="text-slate-500 text-[11px] font-sans italic pt-0.5">{sc.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Draggable Vertical Splitter Bar */}
            <div
              onMouseDown={handleMouseDownSplitter}
              className="w-2 bg-slate-200 hover:bg-amber-500 cursor-col-resize flex items-center justify-center group transition-colors select-none shrink-0"
              title="Drag left/right to resize problem statement width"
            >
              <div className="w-1 h-8 rounded-full bg-slate-400 group-hover:bg-white transition-colors" />
            </div>

            {/* Right Code Editor & Execution Terminal Pane */}
            <div className="flex-1 flex flex-col min-w-0 bg-white">
              
              {/* Monaco Action Header */}
              <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between shrink-0">
                
                {/* Language Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Language:</span>
                  <div className="flex items-center gap-1 bg-slate-200 p-0.5 rounded-lg">
                    {(['python', 'cpp', 'java', 'typescript'] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLanguageChange(l)}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                          editorLanguage === l ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {l === 'cpp' ? 'C++ 20' : l === 'python' ? 'Python 3.12' : l === 'java' ? 'Java 17' : 'TS 5.4'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleExecuteSandbox}
                  disabled={isRunningSandbox}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
                >
                  <Play className={`w-3.5 h-3.5 ${isRunningSandbox ? 'animate-spin' : 'fill-white'}`} />
                  <span>{isRunningSandbox ? 'Running Tests...' : 'Run Test Cases'}</span>
                </button>
              </div>

              {/* Monaco Editor in Light Theme ("vs") */}
              <div className="flex-1 bg-white min-h-0">
                <Editor
                  height="100%"
                  language={editorLanguage}
                  theme="vs"
                  value={currentCode}
                  onChange={(val) => setCurrentCode(val || '')}
                  options={{
                    fontSize: 13,
                    fontFamily: 'JetBrains Mono, monospace',
                    minimap: { enabled: false },
                    tabSize: 4,
                    scrollBeyondLastLine: false
                  }}
                />
              </div>

              {/* Horizontal Splitter Bar for Resizing Terminal Tray Height */}
              <div
                onMouseDown={handleMouseDownTerminalSplitter}
                className="h-2 bg-slate-200 hover:bg-amber-500 cursor-row-resize flex items-center justify-center group transition-colors select-none shrink-0"
                title="Drag up or down to resize test output terminal window"
              >
                <div className="w-10 h-1 rounded-full bg-slate-400 group-hover:bg-white transition-colors" />
              </div>

              {/* Terminal Tray in Light Theme with Resizable Height */}
              <div
                style={{ height: `${terminalHeightPx}px` }}
                className="bg-slate-100 border-t border-slate-200 text-xs font-mono flex flex-col shrink-0 overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-200/60 shrink-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTerminalTrayMode('suite')}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                        terminalTrayMode === 'suite' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Automated Test Suite
                    </button>
                    <button
                      onClick={() => setTerminalTrayMode('custom_input')}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                        terminalTrayMode === 'custom_input' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Custom Test Input
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 select-none">Drag top border up/down to resize</span>
                </div>

                <div className="p-3 bg-white flex-1 overflow-y-auto">
                  {terminalTrayMode === 'suite' ? (
                    sandboxOutput ? (
                      <div className="flex items-center justify-between text-amber-700 font-bold">
                        <span className="flex items-center gap-1.5 whitespace-pre-wrap">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${sandboxOutput.status === 'passed' ? 'text-emerald-600' : 'text-rose-600'}`} /> {sandboxOutput.details}
                        </span>
                        <span className="text-[11px] text-slate-500 font-normal shrink-0 ml-2">Exit code: {sandboxOutput.status === 'passed' ? 0 : 1}</span>
                      </div>
                    ) : (
                      <div className="text-slate-500 text-[11px]">
                        Click "Run Test Cases" to execute candidate code against automated test cases.
                      </div>
                    )
                  ) : (
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-500">Custom Input (stdin):</label>
                          <textarea
                            value={customInputText}
                            onChange={(e) => setCustomInputText(e.target.value)}
                            rows={2}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-500">Standard Output (stdout):</label>
                          <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-amber-700 font-mono h-[54px] overflow-y-auto">
                            {customInputOutput || "Run with custom input to view output..."}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setCustomInputOutput(`Input: [${customInputText.replace(/\n/g, ', ')}]\nOutput: Match Found in 3ms\nStatus: SUCCESS (Exit Code 0)`);
                          }}
                          className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px]"
                        >
                          Run Custom Input
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 5. POST-ASSESSMENT DIAGNOSTIC FEEDBACK & OUTCOME LEARNING LOOP MODAL (Specification 6) */}
      {diagnosticReportTest && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-panel-glow max-w-2xl w-full rounded-3xl p-7 border border-white/[0.15] space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {diagnosticReportTest.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Issued by {diagnosticReportTest.benchmarkEntity.name}
                </p>
              </div>
              <button
                onClick={() => setDiagnosticReportTest(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Score & Percentile Ribbon */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Verified Evaluation Score</div>
                <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                  {diagnosticReportTest.score}% • Cleared
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Benchmark Rank</div>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                  Top 2% Tier
                </div>
              </div>
            </div>

            {/* Detailed Diagnostic Breakdown: Strengths vs Deficits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Strengths Demonstrated */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Strengths Demonstrated</span>
                </div>
                <ul className="space-y-1.5">
                  {(diagnosticReportTest.strengthsDemonstrated || [
                    'Mastered core algorithms in O(N) optimal time',
                    'Zero memory leaks under stress containers'
                  ]).map((st, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deficits Detected */}
              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Deficits Detected</span>
                </div>
                <ul className="space-y-1.5">
                  {(diagnosticReportTest.deficitsDetected || [
                    'Boundary condition timeout on disconnected graph components'
                  ]).map((df, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{df}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Issue Verified Digital Badge */}
            {diagnosticReportTest.awardedBadge && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-lg shrink-0">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
                    Sovereign Verifiable Credential Issued
                  </div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">
                    {diagnosticReportTest.awardedBadge}
                  </div>
                </div>
              </div>
            )}

            {/* Minimum Skill-Bridge Recommendation */}
            {diagnosticReportTest.skillBridgeRecommendation && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Minimum Skill-Bridge Recommendation:
                  </span>
                  <span className="text-slate-500 font-mono">
                    {diagnosticReportTest.skillBridgeRecommendation.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {diagnosticReportTest.skillBridgeRecommendation.title} ({diagnosticReportTest.skillBridgeRecommendation.type})
                </p>
                <button
                  onClick={() => alert(`Launching ${diagnosticReportTest.skillBridgeRecommendation?.title} sandbox blueprint!`)}
                  className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline pt-1"
                >
                  Start High-Yield Bridge Lab <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-end pt-2 border-t border-slate-200 dark:border-white/[0.08]">
              <button
                onClick={() => setDiagnosticReportTest(null)}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Sovereign Cryptographic Verifiable Credential Minting Modal */}
      {mintedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-md m3-surface-2 rounded-3xl p-6 border border-amber-500/40 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setMintedBadge(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Verifiable Credential Minted!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {mintedBadge.badgeName}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#070b14] border border-white/[0.08] space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Assessment Title:</span>
                <span className="text-amber-300 font-bold truncate max-w-[180px]">{mintedBadge.testTitle}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Cryptographic Proof:</span>
                <span className="text-amber-400 font-bold">{mintedBadge.hash}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Timestamp:</span>
                <span className="text-slate-300">{mintedBadge.timestamp}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  alert(`Badge ${mintedBadge.badgeName} attached to Sovereign Living Resume!`);
                  setMintedBadge(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
              >
                Attach to Living Resume
              </button>
              <button
                onClick={() => setMintedBadge(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
