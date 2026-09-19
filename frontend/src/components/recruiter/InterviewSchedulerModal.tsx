import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  User, 
  CheckCircle2, 
  X, 
  Send, 
  ShieldCheck,
  Link,
  ChevronRight
} from 'lucide-react';
import { RecruiterCandidate } from '../../mock/recruiterData';

interface InterviewSchedulerModalProps {
  candidate: RecruiterCandidate;
  onClose: () => void;
  onSchedule: (candidateId: string, interviewDetails: {
    date: string;
    time: string;
    round: string;
    meetingUrl: string;
    interviewer: string;
  }) => void;
}

export const InterviewSchedulerModal: React.FC<InterviewSchedulerModalProps> = ({
  candidate,
  onClose,
  onSchedule
}) => {
  const [selectedRound, setSelectedRound] = useState<'round_1' | 'round_2' | 'exec'>('round_1');
  const [selectedDate, setSelectedDate] = useState('2026-09-21');
  const [selectedTime, setSelectedTime] = useState('14:00 IST');
  const [interviewerName, setInterviewerName] = useState('Dr. Satya Ramanathan (Principal Research Lead)');
  const [meetingUrl, setMeetingUrl] = useState(`meet.google.com/careeroptic-${candidate.id.toLowerCase()}-r1`);

  const handleConfirm = () => {
    onSchedule(candidate.id, {
      date: selectedDate,
      time: selectedTime,
      round: selectedRound === 'round_1' 
        ? 'Round 1: Domain & Algorithmic Concurrency' 
        : selectedRound === 'round_2' 
          ? 'Round 2: Architecture & System Design' 
          : 'Executive Leadership Sync',
      meetingUrl,
      interviewer: interviewerName
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-amber-500/30 bg-white dark:bg-[#090e1a]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-600 text-white shadow-md shadow-amber-600/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                DIRECT INTERVIEW SCHEDULER • ENCRYPTED CALENDAR SYNC
              </div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                Schedule Interview with {candidate.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          
          {/* Candidate Fast-Track Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-xs">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="text-amber-800 dark:text-amber-300">
              <strong>Resume Screening Waived:</strong> Candidate verified with <strong>{candidate.scores.sandbox}% Sandbox Score</strong> and <strong>{candidate.scores.composite} Composite Score</strong>. Jumping directly to technical interview panels.
            </div>
          </div>

          {/* Round Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Select Evaluation Round
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedRound('round_1')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRound === 'round_1'
                    ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="text-xs font-bold">Round 1</div>
                <div className="text-[10px] opacity-80">Technical Sandbox</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRound('round_2')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRound === 'round_2'
                    ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="text-xs font-bold">Round 2</div>
                <div className="text-[10px] opacity-80">System Architecture</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRound('exec')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRound === 'exec'
                    ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="text-xs font-bold">Round 3</div>
                <div className="text-[10px] opacity-80">Culture / Leadership</div>
              </button>
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Time Slot</span>
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              >
                <option value="10:00 IST">10:00 AM IST (45 Mins)</option>
                <option value="11:30 IST">11:30 AM IST (45 Mins)</option>
                <option value="14:00 IST">02:00 PM IST (60 Mins)</option>
                <option value="15:30 IST">03:30 PM IST (45 Mins)</option>
                <option value="17:00 IST">05:00 PM IST (60 Mins)</option>
              </select>
            </div>
          </div>

          {/* Interviewer */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-500" />
              <span>Assigned Panel Interviewer</span>
            </label>
            <input
              type="text"
              value={interviewerName}
              onChange={(e) => setInterviewerName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Auto Video URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-amber-500" />
              <span>Auto-Generated Video Conference Bridge</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
                className="flex-1 font-mono px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-amber-600 dark:text-amber-400 focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setMeetingUrl(`meet.google.com/careeroptic-${Math.random().toString(36).substring(7)}`)}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                Regenerate
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Auto-synced with college placement officer calendar.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Confirm & Dispatch Invitation</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
