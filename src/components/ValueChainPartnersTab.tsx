import React, { useState } from 'react';
import { 
  Users, 
  Send, 
  Plus, 
  Search, 
  CheckCircle, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Trash2,
  Workflow,
  ArrowUpRight,
  ShieldAlert,
  X
} from 'lucide-react';

interface AssessmentRecord {
  id: string;
  name: string;
  period: string;
  type: string;
  status: 'Published' | 'In Review' | 'Completed';
  responsesCount: string;
}

export default function ValueChainPartnersTab() {
  const [activeSubsection, setActiveSubsection] = useState<'LAUNCHED' | 'RECEIVED'>('LAUNCHED');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLaunchModal, setShowLaunchModal] = useState(false);

  // Modal form input states
  const [newSurveyName, setNewSurveyName] = useState('');
  const [newSurveyPeriod, setNewSurveyPeriod] = useState('FY 2026 - 2027');
  const [newSurveyType, setNewSurveyType] = useState('Custom Assessment');

  // Initial datasets matching Screenshot 4 exactly
  const [launchedAssessments, setLaunchedAssessments] = useState<AssessmentRecord[]>([
    {
      id: 'vcp-1',
      name: "Ajanta Pharma- Value Chain Partners Assessment 25-26 (Brsr Core)",
      period: "FY 2025 - 2026",
      type: "Custom Assessment",
      status: 'Published',
      responsesCount: '12 / 15 partners'
    },
    {
      id: 'vcp-2',
      name: "Ajanta Pharma-Value Chain Assessment 24-25 (Brsr Core)",
      period: "FY 2024 - 2025",
      type: "Custom Assessment",
      status: 'Completed',
      responsesCount: '15 / 15 partners'
    },
    {
      id: 'vcp-3',
      name: "Brsr Core Vcp Assessment Fy 2023-24",
      period: "FY 2023 - 2024",
      type: "Custom Assessment",
      status: 'Completed',
      responsesCount: '14 / 14 partners'
    }
  ]);

  const [receivedAssessments, setReceivedAssessments] = useState<AssessmentRecord[]>([
    {
      id: 'rec-1',
      name: "Annual Carbon Footprint Audit - APL WALUJ",
      period: "FY 2025 - 2026",
      type: "Mandate Survey",
      status: 'In Review',
      responsesCount: 'Completed'
    },
    {
      id: 'rec-2',
      name: "Water Stewardship & Safety Compliance 25",
      period: "FY 2024 - 2025",
      type: "Global Standards Survey",
      status: 'Completed',
      responsesCount: 'Completed'
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLaunchAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSurveyName) return;

    const newRecord: AssessmentRecord = {
      id: `vcp-${Date.now()}`,
      name: newSurveyName,
      period: newSurveyPeriod,
      type: newSurveyType,
      status: 'Published',
      responsesCount: '0 / 8 partners'
    };

    setLaunchedAssessments([newRecord, ...launchedAssessments]);
    setShowLaunchModal(false);
    setNewSurveyName('');
    showToast(`Survey "${newRecord.name}" successfully active and dispatched to vendors.`);
  };

  const handleDeleteAssessment = (id: string, name: string) => {
    if (confirm(`Are you sure you want to retract value chain survey: "${name}"?`)) {
      setLaunchedAssessments(launchedAssessments.filter(a => a.id !== id));
      showToast('Assessment retracted from vendor hubs.');
    }
  };

  // Filter list
  const filteredLaunched = launchedAssessments.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.period.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in" id="vcp-tab-panel">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs text-slate-500 font-mono tracking-wider block uppercase">Tier-3 Scope 3 Tracking</span>
          <h1 className="text-2xl font-bold font-display text-slate-900">Value Chain Partners</h1>
        </div>

        <button 
          onClick={() => setShowLaunchModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>LAUNCH ASSESSMENT</span>
        </button>
      </div>

      {/* HORIZONTAL MINI SUB-TABS (LAUNCHED / RECEIVED) */}
      <div className="flex border-b border-slate-200 bg-slate-50/50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveSubsection('LAUNCHED')}
          className={`px-5 py-2 font-bold font-mono tracking-wider text-[11px] rounded-lg transition-all ${activeSubsection === 'LAUNCHED' ? 'bg-white text-blue-700 shadow-3xs' : 'text-slate-500 hover:text-slate-800'}`}
        >
          ASSESSMENTS LAUNCHED
        </button>
        <button
          onClick={() => setActiveSubsection('RECEIVED')}
          className={`px-5 py-2 font-bold font-mono tracking-wider text-[11px] rounded-lg transition-all ${activeSubsection === 'RECEIVED' ? 'bg-white text-blue-700 shadow-3xs' : 'text-slate-500 hover:text-slate-800'}`}
        >
          ASSESSMENTS RECEIVED
        </button>
      </div>

      {/* Search Filter input */}
      <div className="relative w-full sm:w-80">
        <input 
          type="text"
          placeholder="Search assessments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold pl-9 outline-none text-slate-850"
        />
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      {/* Table listing assessments */}
      <div className="bg-white border border-slate-201 rounded-xl shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="px-6 py-4">Sr. No.</th>
                <th className="px-6 py-4">Assessment Name</th>
                <th className="px-6 py-4">Assessment Period</th>
                <th className="px-6 py-4">Assessment Type</th>
                <th className="px-6 py-4">Response Integrity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
              {activeSubsection === 'LAUNCHED' ? (
                filteredLaunched.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-xs text-slate-400 font-mono">
                      No launched Scope 3 supplier surveys fit this criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLaunched.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-all text-xs">
                      <td className="px-6 py-4 text-slate-400 font-mono leading-none font-bold">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-extrabold text-slate-850">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-600 font-mono">
                        {item.period}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-500">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-600 font-semibold">
                        {item.responsesCount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          'bg-blue-50 text-blue-700 border border-blue-100'
                        }`}>
                          <span className={`w-1 h-1 rounded-full ${
                            item.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'
                          }`} />
                          <span>{item.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2.5 justify-end">
                          <button 
                            onClick={() => alert(`Reviewing Scope 3 partner response metrics grid for survey: "${item.name}"...`)}
                            className="text-blue-600 hover:text-blue-800 font-bold text-[10px] font-mono hover:underline flex items-center gap-0.5"
                          >
                            <span>Details</span>
                            <ChevronRight size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeleteAssessment(item.id, item.name)}
                            className="text-slate-400 hover:text-red-500 hover:bg-slate-50 p-1 rounded"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                /* RECEIVED ASSESSMENTS PART */
                receivedAssessments.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-all text-xs">
                    <td className="px-6 py-4 text-slate-400 font-mono font-bold leading-none">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-850">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-650 font-mono">
                      {item.period}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-500">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-400">
                      Completed
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full uppercase">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        <span>Submitted</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => alert('Reviewing your submission file summary...')}
                        className="text-blue-600 hover:text-blue-800 font-bold text-[10px] uppercase font-mono hover:underline"
                      >
                        Review Form
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LAUNCH SURV POPUP MODAL */}
      {showLaunchModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
          <form 
            onSubmit={handleLaunchAssessment} 
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4 m-4"
          >
            <div className="flex justify-between items-center border-b border-light pb-2">
              <h2 className="text-xs font-bold font-display uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Workflow size={14} className="text-blue-600" />
                <span>Launch Supplier assessment</span>
              </h2>
              <button 
                type="button" 
                onClick={() => setShowLaunchModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Assessment Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. FY26 Tier-1 Supplier Gas & Energy survey"
                  required
                  value={newSurveyName}
                  onChange={(e) => setNewSurveyName(e.target.value)}
                  className="w-full border border-slate-205 rounded-lg px-3 py-2 outline-none font-sans font-semibold text-slate-800 shadow-3xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Evaluation Period</label>
                <select 
                  value={newSurveyPeriod}
                  onChange={(e) => setNewSurveyPeriod(e.target.value)}
                  className="w-full border border-slate-205 rounded-lg px-3 py-2 bg-white outline-none font-sans font-semibold text-slate-850 cursor-pointer"
                >
                  <option value="FY 2026 - 2027">FY 2026 - 2027</option>
                  <option value="FY 2025 - 2026">FY 2025 - 2026</option>
                  <option value="FY 2024 - 2025">FY 2024 - 2025</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Assessment Type Standard</label>
                <select 
                  value={newSurveyType}
                  onChange={(e) => setNewSurveyType(e.target.value)}
                  className="w-full border border-slate-205 rounded-lg px-3 py-2 bg-white outline-none font-sans font-semibold text-slate-850 cursor-pointer"
                >
                  <option value="Custom Assessment">Custom Assessment (BRSR aligned)</option>
                  <option value="Scope 3 Boiler survey">Scope 3 Boiler survey</option>
                  <option value="Whistleblower Policy Signoff">Whistleblower Policy Signoff</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3 text-xs">
              <button 
                type="button" 
                onClick={() => setShowLaunchModal(false)}
                className="px-4 py-1.5 border border-slate-200 rounded-lg text-slate-500 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded-lg hover:bg-blue-750 transition-all cursor-pointer"
              >
                Dispatch Survey
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
