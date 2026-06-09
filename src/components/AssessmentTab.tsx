import React, { useState } from 'react';
import { Question } from '../types';
import { 
  ClipboardCheck, 
  HelpCircle, 
  Plus, 
  Trash2, 
  CheckCircle2,
  AlertTriangle,
  Upload,
  Calendar,
  Sparkles,
  FileText
} from 'lucide-react';

interface AssessmentTabProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export default function AssessmentTab({
  questions,
  setQuestions
}: AssessmentTabProps) {
  const [selectedPillar, setSelectedPillar] = useState<'ALL' | 'Environment' | 'Social' | 'Governance'>('ALL');
  const [evidenceMappingId, setEvidenceMappingId] = useState<string | null>(null);
  const [fileNameInput, setFileNameInput] = useState('');

  // Answer changer
  const handleSelectAnswer = (id: string, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        return {
          ...q,
          selectedAnswer: value
        };
      }
      return q;
    }));
  };

  // Upload evidence simulation
  const handleAttachEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceMappingId || !fileNameInput) return;

    setQuestions(questions.map(q => {
      if (q.id === evidenceMappingId) {
        return {
          ...q,
          evidenceFile: fileNameInput
        };
      }
      return q;
    }));

    setFileNameInput('');
    setEvidenceMappingId(null);
    alert('Evidence document linked successfully to disclosure. Audit trail updated.');
  };

  const handleRemoveEvidence = (id: string) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        return {
          ...q,
          evidenceFile: undefined
        };
      }
      return q;
    }));
  };

  // Dynamic scores
  const filteredQuestions = questions.filter(q => {
    if (selectedPillar === 'ALL') return true;
    return q.category === selectedPillar;
  });

  const totalPossibleScore = questions.length * 100;
  const answeredCount = questions.filter(q => q.selectedAnswer).length;
  
  let currentScoreSum = 0;
  questions.forEach(q => {
    if (q.selectedAnswer) {
      const selectedOpt = q.options.find(o => o.value === q.selectedAnswer);
      if (selectedOpt) {
        currentScoreSum += selectedOpt.score;
      }
    }
  });

  const esgPercentage = totalPossibleScore > 0 
    ? Math.round((currentScoreSum / totalPossibleScore) * 100) 
    : 0;

  return (
    <div className="space-y-6 animate-fade-in" id="assessment-tab-panel">
      <div>
        <span className="text-xs text-slate-500 font-mono tracking-wider block uppercase">Disclosures & Auditing</span>
        <h1 className="text-2xl font-bold font-display text-slate-900">Legislative Auditing & BRSR Survey</h1>
      </div>

      {/* Overview Cards & Score Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="survey-aggregate-panels">
        {/* Readiness Index */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between col-span-1 md:col-span-2">
          <div className="space-y-1.5 flex-1 pr-6">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">Aggregate Directive Score</span>
            <h2 className="text-3xl font-extrabold text-slate-850 font-display">
              {currentScoreSum} <span className="text-sm text-slate-550 font-sans font-normal">out of {totalPossibleScore} points</span>
            </h2>
            <p className="text-xs text-slate-500 max-w-md">
              Your overall BRSR aligning coefficient aggregates to <strong className="text-blue-600">{esgPercentage}%</strong>. Complete unanswered indicators and supply missing documentation to secure a perfect rating.
            </p>
          </div>

          <div className="w-24 h-24 rounded-full border-4 border-slate-100 flex items-center justify-center relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600" style={{ clipPath: `polygon(0 0, 100% 0, 100% ${esgPercentage}%, 0 ${esgPercentage}%)` }}></div>
            <span className="text-xl font-black font-display text-indigo-700">{esgPercentage}%</span>
          </div>
        </div>

        {/* Survey Completion Progress */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">Assessment Progress</span>
            <span className="text-2xl font-extrabold text-slate-800 font-mono block">
              {answeredCount} / {questions.length} <span className="text-xs text-slate-500 font-normal">disclosures answered</span>
            </span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full relative overflow-hidden my-3">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            ></div>
          </div>

          <span className="text-[10px] font-bold font-mono text-slate-500 uppercase flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Framework: SEBI BRSR Indicators</span>
          </span>
        </div>
      </div>

      {/* Tabs list filter */}
      <div className="flex gap-1.5 bg-white border border-slate-200 rounded-xl p-1 w-fit text-xs">
        {['ALL', 'Environment', 'Social', 'Governance'].map(domain => (
          <button 
            key={domain}
            onClick={() => setSelectedPillar(domain as any)}
            className={`px-4 py-2 rounded-lg font-bold font-semibold transition-all ${selectedPillar === domain ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-550 hover:text-slate-800'}`}
          >
            {domain === 'ALL' ? 'All Disclosures' : domain}
          </button>
        ))}
      </div>

      {/* Questions Stack */}
      <div className="space-y-4" id="questions-survey-feed">
        {filteredQuestions.map((q, idx) => {
          return (
            <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs transition-all space-y-4">
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-slate-100 rounded-md px-2 py-0.5 text-slate-500 font-bold uppercase tracking-wider">
                      {q.category} Indicator
                    </span>
                    <span className="text-xs text-slate-350 font-mono uppercase font-bold text-slate-405">Q #{idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {q.text}
                  </h3>
                </div>

                {q.selectedAnswer ? (
                  <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full uppercase">
                    <CheckCircle2 size={11} /> Saved
                  </span>
                ) : (
                  <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full uppercase">
                    <AlertTriangle size={11} /> Action Needed
                  </span>
                )}
              </div>

              {/* Multiple Choice Radio buttons */}
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {q.options.map(opt => {
                  const isChecked = q.selectedAnswer === opt.value;
                  return (
                    <label 
                      key={opt.value}
                      onClick={() => handleSelectAnswer(q.id, opt.value)}
                      className={`text-xs p-3.5 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${isChecked ? 'bg-blue-50/50 border-blue-400 text-slate-900 font-semibold' : 'bg-slate-50/20 border-slate-200 text-slate-650 hover:bg-slate-550/10 hover:bg-slate-50'}`}
                    >
                      <input 
                        type="radio" 
                        name={`q-${q.id}`}
                        checked={isChecked}
                        readOnly
                        className="w-4 h-4 text-blue-600 mt-0.5 border-slate-300 accent-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="flex-1">{opt.label}</span>
                    </label>
                  );
                })}
              </div>

              {/* Evidence Documentation Section */}
              <div className="bg-slate-50 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-slate-400 shrink-0" />
                  <div>
                    <span className="font-semibold block text-slate-700">Audit Documentation Trial:</span>
                    {q.evidenceFile ? (
                      <span className="font-mono text-[10px] text-emerald-600 font-bold block">
                        Linked: "{q.evidenceFile}"
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-slate-400 block">
                        No verification certificate attached.
                      </span>
                    )}
                  </div>
                </div>

                {q.evidenceFile ? (
                  <button 
                    onClick={() => handleRemoveEvidence(q.id)}
                    className="text-red-500 hover:text-red-700 font-bold font-semibold uppercase text-[10px] font-mono hover:underline"
                  >
                    Unlink Document
                  </button>
                ) : (
                  <button 
                    onClick={() => setEvidenceMappingId(q.id)}
                    className="text-blue-600 hover:text-blue-800 font-bold font-semibold uppercase text-[10px] font-mono hover:underline flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg hover:shadow-3xs transition-all"
                  >
                    <Upload size={10} />
                    <span>Attach Evidence Doc</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Attach Evidence Modal popup simulation */}
      {evidenceMappingId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
          <form 
            onSubmit={handleAttachEvidence}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4 m-4"
          >
            <div className="flex justify-between items-center border-b border-light pb-2">
              <h2 className="text-sm font-bold font-display text-slate-800">Attach Audit Verification Proof</h2>
              <button 
                type="button" 
                onClick={() => setEvidenceMappingId(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-500 leading-normal">
                Auditors require invoice summaries, renewable purchase receipts (I-RECs), or published policy manuals.
              </p>

              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Document File Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. CSRD_safety_workbook_Q1.pdf"
                  required
                  value={fileNameInput}
                  onChange={(e) => setFileNameInput(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none font-mono font-bold font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3 text-xs">
              <button 
                type="button" 
                onClick={() => setEvidenceMappingId(null)}
                className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-slate-500 font-semibold"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-blue-600 text-white font-bold px-3.5 py-1.5 rounded-lg hover:bg-blue-750 transition-all"
              >
                Verify & Attach File
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// Simple absolute cross-close X icon since lucide-react is imported differently
function X({ size, className }: { size?: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 16} height={size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
