import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Search, 
  Globe2, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Lock,
  Layers,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NAMASTE_TO_ICD11_ONTOLOGY, NamasteIcd11Mapping } from '../../mock/governmentData';

interface NamasteIcd11ModalProps {
  onClose: () => void;
}

export const NamasteIcd11Modal: React.FC<NamasteIcd11ModalProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMapping, setSelectedMapping] = useState<NamasteIcd11Mapping>(NAMASTE_TO_ICD11_ONTOLOGY[0]);
  const [isExporting, setIsExporting] = useState(false);

  const filteredMappings = NAMASTE_TO_ICD11_ONTOLOGY.filter(m => 
    m.namasteTerm.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.namasteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.icd11EntityTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.icd11Tm2Code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportOntology = () => {
    setIsExporting(true);
    confetti({ particleCount: 70, spread: 80 });
    setTimeout(() => {
      setIsExporting(false);
      alert('WHO ICD-11 Traditional Medicine Module 2 & Ministry of Ayush NAMASTE Crosswalk Specification exported with international cryptographic seal.');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-emerald-500/30 bg-white dark:bg-[#090e1a]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/80 dark:bg-emerald-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  MINISTRY OF AYUSH MANDATE • SIH PS 26044
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  WHO ICD-11 TM-2 Crosswalk
                </span>
              </div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                NAMASTE-to-ICD-11 Dual-Ontology Standardization & Scholar Registry
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
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* SIH Mandate Purpose Banner */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3.5">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <div className="font-extrabold text-sm">
                Global Employability for Indian Ayush Scholars (WHO ICD-11 Integration)
              </div>
              <p>
                CareerLens standardizes classical Indian traditional medicine concepts from the Ministry of Ayush <strong>NAMASTE portal</strong> into the World Health Organization's <strong>ICD-11 Traditional Medicine Module 2 (TM-2)</strong>. Certified Indian BAMS & MD graduates gain verified credentials accepted by global healthcare systems, research registries, and insurance underwriters worldwide.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Ayush term (e.g., Amavata, Prameha) or ICD-11 code (TM2-MG20)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-sm font-medium"
            />
          </div>

          {/* Ontology Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* List of Concepts */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Standardized Crosswalk Entities ({filteredMappings.length})
              </div>

              <div className="space-y-2">
                {filteredMappings.map((item) => {
                  const isSelected = selectedMapping.namasteCode === item.namasteCode;
                  return (
                    <button
                      key={item.namasteCode}
                      onClick={() => setSelectedMapping(item)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-white/[0.08] bg-slate-50/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                          {item.namasteTerm}
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                          {item.icd11Tm2Code}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {item.ayurvedaConcept}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1 border-t border-slate-200/60 dark:border-white/[0.04]">
                        <span>NAMASTE: {item.namasteCode}</span>
                        <span className="text-emerald-600 font-bold">{item.certifiedScholarsCount} Certified Scholars</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Dual-Ontology Inspector */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-slate-400">Ontology Detail View</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 font-bold">
                  WHO Verified ✓
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">Classical Traditional Medicine Term (Ayush)</div>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {selectedMapping.namasteTerm}
                </div>
                <div className="text-xs font-mono text-indigo-600 dark:text-cyan-400 font-bold">
                  {selectedMapping.namasteCode}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {selectedMapping.ayurvedaConcept}
                </p>
              </div>

              <div className="flex items-center justify-center py-1 text-emerald-500">
                <ArrowRight className="w-5 h-5 rotate-90 lg:rotate-0" />
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">World Health Organization Standard (ICD-11 TM-2)</div>
                <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  {selectedMapping.icd11EntityTitle}
                </div>
                <div className="text-xs font-mono font-black text-slate-900 dark:text-white">
                  Entity Code: {selectedMapping.icd11Tm2Code}
                </div>
                <div className="text-[11px] text-slate-500 pt-1">
                  {selectedMapping.globalEquivalentCategory}
                </div>
              </div>

              {/* Certified Scholars Status */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                <span className="text-slate-700 dark:text-slate-300 font-bold">Scholars Certified in this Module:</span>
                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  {selectedMapping.certifiedScholarsCount.toLocaleString()} Scholars
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Ministry of Ayush & WHO Global Centre for Traditional Medicine (GCTM) Standard</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Close
            </button>
            <button
              onClick={handleExportOntology}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Exporting Specification...' : 'Export WHO ICD-11 Crosswalk (.json / .pdf)'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
