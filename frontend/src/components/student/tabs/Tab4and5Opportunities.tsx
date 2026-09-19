import React, { useState } from 'react';
import { MOCK_OPPORTUNITIES } from '../../../mock/mockData';
import { OpportunityListing } from '../../../types';
import { 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Building 
} from 'lucide-react';

import { useStudent } from '../../../context/StudentContext';

interface OpportunitiesProps {
  mode: 'internships' | 'jobs';
}

export const Tab4and5Opportunities: React.FC<OpportunitiesProps> = ({ mode }) => {
  const { activeStudent, selectedStream } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpp, setSelectedOpp] = useState<OpportunityListing | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [onlyMyField, setOnlyMyField] = useState(true);

  const isInternship = mode === 'internships';
  
  // Filter out opportunities not related to the active student's disciplinary field
  const opportunities = MOCK_OPPORTUNITIES
    .filter(o => isInternship ? o.type === 'internship' : o.type === 'job')
    .filter(o => onlyMyField ? o.stream === selectedStream : true);

  const filtered = opportunities.filter(o => 
    o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const candidateScore = activeStudent.compositeScore;

  const handleOpenAnalysis = (opp: OpportunityListing) => {
    setSelectedOpp(opp);
  };

  const handleFastTrackApply = (id: string) => {
    setAppliedJobs(prev => [...prev, id]);
    alert(`Application submitted for ${id}! Your verified credentials (${activeStudent.degree}) bypassed Round 1.`);
    setSelectedOpp(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`rounded-3xl glass-panel p-8 ${
        isInternship
          ? 'bg-amber-50/40 dark:bg-slate-900'
          : 'bg-orange-50/40 dark:bg-slate-900'
      }`}>
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400 text-xs font-bold">
            {isInternship ? <GraduationCap className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
            <span>{isInternship ? 'TAB 4 • INTERNSHIPS HUB' : 'TAB 5 • JOBS HUB'}</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isInternship ? 'Verified University & Industry Internships' : 'High-Impact Full-Time Engineering & Finance Roles'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Every listing carries a traceable ID (e.g. <span className="font-mono text-amber-600 dark:text-amber-300 font-bold">INT-MSFT-101</span>, <span className="font-mono text-amber-600 dark:text-amber-300 font-bold">JOB-RZP-402</span>) with click-to-analyze AI cutoff score comparison.
          </p>
        </div>
      </div>

      {/* Search and Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by Traceable ID (e.g. JOB-MSFT-901), title, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyMyField(!onlyMyField)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              onlyMyField 
                ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-600/20 dark:text-amber-300 dark:border-amber-500/30 shadow-sm' 
                : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-white/[0.08]'
            }`}
          >
            {onlyMyField ? `✓ Only ${activeStudent.streamName}` : 'Showing All Disciplines'}
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-400">Listings:</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            {filtered.length} Active
          </span>
        </div>
      </div>

      {/* Opportunity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((opp) => {
          const isEligible = candidateScore >= opp.cutoffScore;
          const isApplied = appliedJobs.includes(opp.id);

          return (
            <div
              key={opp.id}
              className="glass-panel p-6 rounded-2xl hover:border-amber-400 transition-all space-y-4 flex flex-col justify-between shadow-sm hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800">
                    {opp.id}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Deadline: {opp.deadline}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                    {opp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <Building className="w-3.5 h-3.5" />
                    <span>{opp.organization}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{opp.location}</span>
                  </div>
                </div>

                <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400">{opp.stipendOrSalary}</div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{opp.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {opp.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cutoff & AI Analysis Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    Required Cutoff: <span className="font-bold text-slate-900 dark:text-white">{opp.cutoffScore}%</span>
                  </span>
                  <span className={`font-semibold flex items-center gap-1 ${
                    isEligible ? 'text-amber-600 dark:text-amber-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {isEligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {isEligible ? `Score (${candidateScore}%) Qualified` : `Below Cutoff`}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => handleOpenAnalysis(opp)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-amber-600 border border-amber-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-amber-400 dark:border-amber-900/40 text-xs font-bold transition-all"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Run AI Skill & Test Analysis</span>
                  </button>

                  <button
                    onClick={() => handleFastTrackApply(opp.id)}
                    disabled={isApplied}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                      isApplied 
                        ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed'
                        : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20 active:scale-95'
                    }`}
                  >
                    {isApplied ? 'Applied ✓' : 'Direct Apply'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Skill & Test Analysis Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="glass-panel-glow max-w-xl w-full rounded-3xl p-7 border space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
                  {selectedOpp.id}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">{selectedOpp.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedOpp.organization}</p>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Your Proctored Sandbox Score:</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{candidateScore}% (Top 2%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Employer Cutoff Threshold:</span>
                <span className="text-slate-900 dark:text-white font-bold">{selectedOpp.cutoffScore}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${candidateScore}%` }} />
              </div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold pt-1">
                ✓ Eligibility Confirmed: You qualify for direct Round-1 bypass via Gale-Shapley matching!
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Tailored Interview Preparation Tips
              </h4>
              <ul className="space-y-2">
                {(selectedOpp.interviewTips || [
                  'Expect direct Monaco code execution questions on concurrency and latency',
                  'Be prepared to explain your tamper-proof sovereign badge credentials'
                ]).map((tip, idx) => (
                  <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedOpp(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs font-medium"
              >
                Close
              </button>
              <button
                onClick={() => handleFastTrackApply(selectedOpp.id)}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/30"
              >
                Fast-Track Direct Apply
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
