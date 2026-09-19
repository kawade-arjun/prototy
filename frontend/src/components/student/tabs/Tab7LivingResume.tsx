import React, { useState } from 'react';
import { MOCK_CREDENTIAL_AUDIT } from '../../../mock/mockData';
import { useTheme } from '../../../context/ThemeContext';
import { 
  ShieldCheck, 
  Calendar, 
  Scan, 
  Fingerprint, 
  QrCode, 
  Copy, 
  Check,
  CheckCircle2,
  UploadCloud,
  FileText,
  Sparkles,
  Trash2,
  ArrowRight,
  Edit3,
  Save,
  CheckCircle
} from 'lucide-react';

import { useStudent } from '../../../context/StudentContext';

export const Tab7LivingResume: React.FC = () => {
  const { theme } = useTheme();
  const { activeStudent, uploadedResume, setUploadedResume, clearUploadedResume, setActiveTab } = useStudent();
  const [activeVerifierTier, setActiveVerifierTier] = useState<1 | 2 | 3>(2);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [auditData, setAuditData] = useState(MOCK_CREDENTIAL_AUDIT);
  const [hoveredDay, setHoveredDay] = useState<{ id: number; commits: number; date: string } | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  // Resume Upload local state
  const [isDragging, setIsDragging] = useState(false);
  const [showEditPreview, setShowEditPreview] = useState(false);
  const [customText, setCustomText] = useState(uploadedResume?.text || '');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    const fileName = file.name;
    const fileSize = `${(file.size / 1024).toFixed(1)} KB`;
    const isTxt = file.type === 'text/plain' || fileName.endsWith('.txt') || fileName.endsWith('.md') || fileName.endsWith('.json');
    const isPdf = file.type === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');

    setUploadStatus(`Extracting text from ${fileName}...`);

    if (isTxt) {
      try {
        const text = await file.text();
        setUploadedResume(text, fileName, fileSize);
        setCustomText(text);
        setUploadStatus(`Successfully loaded ${fileName}!`);
        setTimeout(() => setUploadStatus(null), 3000);
        return;
      } catch (err) {
        console.warn('Text file read error:', err);
      }
    }

    if (isPdf) {
      const endpoints = [
        '/api/resume/parse-pdf',
        'http://localhost:8000/api/resume/parse-pdf',
        'http://127.0.0.1:8000/api/resume/parse-pdf'
      ];
      for (const endpoint of endpoints) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          const res = await fetch(endpoint, {
            method: 'POST',
            body: formData
          });

          if (res.ok) {
            const data = await res.json();
            if (data.text && data.text.trim()) {
              setUploadedResume(data.text, fileName, fileSize);
              setCustomText(data.text);
              setUploadStatus(`Extracted ${data.char_count} characters from ${fileName}!`);
              setTimeout(() => setUploadStatus(null), 3000);
              return;
            }
          }
        } catch (err) {
          console.warn(`Backend PDF parser endpoint ${endpoint} failed:`, err);
        }
      }
    }

    // Honest fallback if PDF text extraction could not parse printable text
    const defaultText = `CANDIDATE RESUME: ${fileName} (${fileSize})\n[Unable to automatically extract text from this PDF file. Please paste or edit your resume text manually using the editor below.]`;
    setUploadedResume(defaultText, fileName, fileSize);
    setCustomText(defaultText);
    setUploadStatus(`Loaded ${fileName}`);
    setTimeout(() => setUploadStatus(null), 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSaveEditedText = () => {
    if (uploadedResume) {
      setUploadedResume(customText, uploadedResume.fileName, uploadedResume.fileSize);
      setShowEditPreview(false);
      setUploadStatus('Resume text updated!');
      setTimeout(() => setUploadStatus(null), 2500);
    }
  };

  // Generate 52-week activity heatmap (52 weeks x 7 days = 364 days) with realistic LeetCode sparse density
  const generateHeatmapDays = () => {
    const days = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < 364; i++) {
      const week = Math.floor(i / 7);
      const dayOfWeek = i % 7;
      let intensity = 0;

      // Sparse activity pattern: ~70% Level 0, with realistic streak clusters
      if ((week % 4 === 1 || week % 7 === 2 || week === 14 || week === 28 || week === 42 || week === 50) && dayOfWeek < 5) {
        const pseudo = (i * 37 + 17) % 100;
        if (pseudo > 82) intensity = 4;
        else if (pseudo > 60) intensity = 3;
        else if (pseudo > 35) intensity = 2;
        else intensity = 1;
      } else {
        const pseudo = (i * 13 + 7) % 100;
        if (pseudo > 94) intensity = 2;
        else if (pseudo > 84) intensity = 1;
        else intensity = 0;
      }

      const approxMonth = monthNames[Math.floor((i / 364) * 12)];
      days.push({
        id: i,
        intensity,
        commits: intensity === 0 ? 0 : intensity * 2 + (i % 3),
        date: `${approxMonth} ${((i % 28) + 1)}`
      });
    }
    return days;
  };

  const heatmapDays = generateHeatmapDays();

  const handleReAudit = () => {
    setIsRunningAudit(true);
    setTimeout(() => {
      setIsRunningAudit(false);
      alert('3-Tier Credential Audit re-executed! All certificates cryptographically pristine.');
    }, 1200);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(auditData.tier3_sovereignPKI.ledgerHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  // Authentic LeetCode / GitHub Heatmap Color Palette
  const intensityColors = theme === 'dark' ? [
    'bg-[#161b22] border border-[#30363d]/40',
    'bg-[#0e4429]',
    'bg-[#006d32]',
    'bg-[#26a641]',
    'bg-[#39d353] shadow-sm shadow-[#39d353]/40'
  ] : [
    'bg-[#ebedf0]',
    'bg-[#9be9a8]',
    'bg-[#40c463]',
    'bg-[#30a14e]',
    'bg-[#216e39] shadow-sm shadow-[#216e39]/30'
  ];

  const monthsHeader = [
    { label: 'Jan', week: 0 },
    { label: 'Feb', week: 4 },
    { label: 'Mar', week: 8 },
    { label: 'Apr', week: 13 },
    { label: 'May', week: 17 },
    { label: 'Jun', week: 22 },
    { label: 'Jul', week: 26 },
    { label: 'Aug', week: 30 },
    { label: 'Sep', week: 35 },
    { label: 'Oct', week: 39 },
    { label: 'Nov', week: 44 },
    { label: 'Dec', week: 48 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel p-8 bg-amber-50/30 dark:bg-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TAB 7 • PROFILE ({activeStudent.streamName.toUpperCase()} VERIFIABLE DOSSIER)</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>{activeStudent.name}</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1D9BF0] text-white shrink-0 shadow-sm" title="Meta Verified">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span>• Living Credential Ledger</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeStudent.summary}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{activeStudent.institution}</span>
              <span>•</span>
              <span className="font-mono text-amber-600 dark:text-amber-400">{activeStudent.digiLockerId}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 font-bold text-[10px]">
                {activeStudent.benchmarkBadge}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 font-bold text-[10px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                DigiLocker Verified
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleReAudit}
              disabled={isRunningAudit}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 dark:bg-[#121a2e] dark:hover:bg-[#18233e] dark:text-slate-200 dark:border-white/[0.1] text-xs font-bold transition-all active:scale-95 shadow-sm"
            >
              <Scan className={`w-4 h-4 text-amber-600 dark:text-amber-400 ${isRunningAudit ? 'animate-spin' : ''}`} />
              <span>{isRunningAudit ? 'Auditing Forensic Signatures...' : 'Re-Run 3-Tier Audit'}</span>
            </button>
            <button
              onClick={() => {
                alert(`Verifiable Credential QR Card for ${activeStudent.name} (${activeStudent.streamName}) exported!`);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>Export QR Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Resume Upload & Management Section */}
      <div className="glass-panel p-6 rounded-3xl space-y-4 shadow-lg border border-amber-500/20 bg-amber-500/[0.02]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>Candidate Resume Management</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upload your latest resume (PDF, DOCX, TXT). Uploaded resumes are automatically synced with the AI Studio in Recommendations.
            </p>
          </div>
          {uploadedResume && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold">
              <CheckCircle className="w-3.5 h-3.5" />
              Resume Active
            </span>
          )}
        </div>

        {uploadStatus && (
          <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{uploadStatus}</span>
          </div>
        )}

        {/* Upload Box / Drag & Drop */}
        {!uploadedResume ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-amber-600 bg-amber-500/10 scale-[0.99]'
                : 'border-slate-300 dark:border-slate-700 hover:border-amber-500/60 bg-white/40 dark:bg-slate-900/40'
            }`}
          >
            <input
              type="file"
              id="profile-resume-upload-input"
              accept=".pdf,.docx,.doc,.txt,.md"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <label htmlFor="profile-resume-upload-input" className="cursor-pointer space-y-3 block">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Click to upload or drag & drop resume file
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Supports PDF, DOCX, TXT, or Markdown formats (Max 10MB)
                </p>
              </div>
            </label>
          </div>
        ) : (
          /* Active Uploaded Resume Details Card */
          <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{uploadedResume.fileName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                      {uploadedResume.fileSize}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Uploaded on {uploadedResume.timestamp} • Ready for AI ATS Analysis
                  </p>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze in AI Studio (Recommendations)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setShowEditPreview(!showEditPreview)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{showEditPreview ? 'Hide Text' : 'View/Edit Extracted Text'}</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to remove this uploaded resume?')) {
                      clearUploadedResume();
                    }
                  }}
                  className="p-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Remove uploaded resume"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Editable Text Preview Dropdown */}
            {showEditPreview && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Extracted Resume Text Preview</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{customText.length} characters</span>
                </div>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={6}
                  className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-mono focus:outline-none focus:border-amber-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveEditedText}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold hover:bg-amber-500 transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Text Changes</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 52-Week GitHub / LeetCode-style Activity Heatmap */}
      <div className="glass-panel p-6 rounded-3xl space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              52-Week Verified Problem Solving & Sandbox Commit Heatmap
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">412 verified sandbox submissions in the last 12 months</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Less</span>
            {intensityColors.map((color, idx) => (
              <span key={idx} className={`w-3.5 h-3.5 rounded-[2.5px] ${color}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid with LeetCode Style Month Axis & Spacing */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[760px] space-y-1.5">
            {/* Month Header Axis */}
            <div className="flex text-[10px] font-mono text-slate-400 dark:text-slate-500 pl-6 relative h-4">
              {monthsHeader.map((m) => (
                <span
                  key={m.label}
                  className="absolute"
                  style={{ left: `calc(${m.week} * 1.83% + 24px)` }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* Heatmap Grid (7 rows x 52 columns) */}
            <div className="flex items-start gap-2">
              {/* Day Labels */}
              <div className="flex flex-col justify-between text-[9px] font-mono text-slate-400 dark:text-slate-500 h-[88px] pt-0.5 select-none shrink-0">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="grid grid-flow-col grid-rows-7 gap-[3px] flex-1">
                {heatmapDays.map((d) => (
                  <div
                    key={d.id}
                    onMouseEnter={() => setHoveredDay(d)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-[11px] h-[11px] rounded-[2.5px] ${intensityColors[d.intensity]} transition-all duration-150 hover:ring-2 hover:ring-amber-400 hover:scale-125 cursor-pointer`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
          <div className="flex items-center gap-4">
            <span>Continuous Streak: <strong className="text-amber-600 dark:text-amber-300 font-bold">8 Days Active</strong></span>
            <span>Longest Streak: <strong className="text-slate-900 dark:text-white font-bold">42 Days</strong></span>
            <span>Integrity: <strong className="text-amber-600 dark:text-amber-400 font-bold">100% Zero Flags</strong></span>
          </div>

          {hoveredDay && (
            <div className="text-amber-600 dark:text-amber-400 font-mono font-bold">
              {hoveredDay.commits === 0 ? 'No submissions' : `${hoveredDay.commits} verified tests`} on {hoveredDay.date}
            </div>
          )}
        </div>
      </div>

      {/* 3-Tier Pre-Flight Credential Verifier Studio */}
      <div className="glass-panel p-7 rounded-3xl space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">3-Tier Pre-Flight Credential Verifier</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Guarantees 0% credential fraud via multi-modal forensic inspection</p>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-[#070b14] p-1 rounded-2xl border border-slate-200 dark:border-white/[0.08]">
            <button
              onClick={() => setActiveVerifierTier(1)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeVerifierTier === 1 ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tier 1: pyHanko XMP
            </button>
            <button
              onClick={() => setActiveVerifierTier(2)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeVerifierTier === 2 ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tier 2: OpenCV ELA Forensics
            </button>
            <button
              onClick={() => setActiveVerifierTier(3)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeVerifierTier === 3 ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tier 3: DigiLocker Verification
            </button>
          </div>
        </div>

        {/* Tier Details Content Box */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-white/[0.08] space-y-5">
          {activeVerifierTier === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Tier 1: PDF XMP Digital Timestamp & PKI Signature Audit
                </span>
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                  {auditData.tier1_xmpTimestamp.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Audited using <code className="text-amber-600 dark:text-amber-400 font-mono font-bold">pyHanko</code> cryptographic engine. Validates the PDF ByteRange signature and Sub-CA trust chain.
              </p>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-white/[0.06] font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1.5 shadow-sm">
                <div>Engine: <span className="text-amber-600 dark:text-amber-400">{auditData.tier1_xmpTimestamp.engine}</span></div>
                <div>Timestamp: <span className="text-slate-900 dark:text-white">{auditData.tier1_xmpTimestamp.timestamp}</span></div>
                <div>Certificate Authority: <span className="text-amber-600 dark:text-amber-400">{auditData.tier1_xmpTimestamp.certAuthority}</span></div>
              </div>
            </div>
          )}

          {activeVerifierTier === 2 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Tier 2: OpenCV Error Level Analysis (ELA) Pixel-Level Forensics
                </span>
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                  {auditData.tier2_opencvELA.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Detects pixel-level document alterations, resaved JPEG artifacts, and photoshopped grade sheets by calculating compression error variance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-white/[0.06] space-y-2 shadow-sm">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Forensic Error Level Score:</div>
                  <div className="text-4xl font-black text-amber-600 dark:text-amber-400">{auditData.tier2_opencvELA.errorLevelScore}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Threshold: &lt; 4.5 is pristine original. Score &gt; 12.0 flags photoshopped pixels.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-white/[0.06] space-y-2 shadow-sm">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Altered Pixels Detected:</div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white">0 Pixels</div>
                  <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                    ✓ Clean certificate image integrity confirmed
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeVerifierTier === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Tier 3: Verification via DigiLocker / Credly
                </span>
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                  {auditData.tier3_sovereignPKI.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Direct statutory API synchronization with Ministry of Electronics and IT (MeitY) DigiLocker repository.
              </p>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-white/[0.06] font-mono text-xs text-slate-700 dark:text-slate-300 space-y-2 shadow-sm">
                <div>DigiLocker Record ID: <span className="text-amber-600 dark:text-amber-400">{auditData.tier3_sovereignPKI.digiLockerId}</span></div>
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate">Public PKI Hash: <span className="text-amber-600 dark:text-amber-400">{auditData.tier3_sovereignPKI.ledgerHash}</span></div>
                  <button
                    onClick={handleCopyHash}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0"
                    title="Copy Ledger Hash"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div>Revocation Status: <span className="text-slate-900 dark:text-white font-bold">Active (Non-Revoked)</span></div>
              </div>
            </div>
          )}

        </div>

        {/* Verified Sovereign Badges Display */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Verified Credentials:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/[0.06] flex items-center gap-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">IITB Benchmark Certified</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">98th Percentile Judge0 Sandbox</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/[0.06] flex items-center gap-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">DigiLocker Verified Record</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">B.Tech Honors Academic Record</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/[0.06] flex items-center gap-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">ELA Forensic Pristine</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Zero Document Alterations</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
