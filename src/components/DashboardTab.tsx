import React, { useState } from 'react';
import { Facility, ESGGoal, TaskItem, Question } from '../types';
import { 
  Building2, 
  Droplet, 
  Leaf, 
  Users, 
  Clock, 
  Calendar,
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  BarChart3,
  Target,
  ShoppingCart,
  HelpCircle,
  Plus,
  Sparkles,
  ClipboardList
} from 'lucide-react';

interface DashboardTabProps {
  facilities: Facility[];
  goals: ESGGoal[];
  tasks: TaskItem[];
  questions: Question[];
  activePeriod: string;
  setActivePeriod: (period: string) => void;
  onNavigateTab: (tabId: string) => void;
}

// Custom Premium Circular SVG Donut Chart helper
function CircularProgress({ percentage, colorClass }: { percentage: number; colorClass: string }) {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <svg className="w-14 h-14 transform -rotate-90 shrink-0 select-none animate-fade-in" viewBox="0 0 36 36">
      {/* Background circle */}
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="transparent"
        stroke="#f1f5f9"
        strokeWidth="3.2"
      />
      {/* Foreground progress circle */}
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="transparent"
        stroke="currentColor"
        strokeWidth="3.8"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className={`${colorClass} transition-all duration-700 ease-out`}
      />
    </svg>
  );
}

export default function DashboardTab({
  facilities,
  goals,
  tasks,
  questions,
  activePeriod,
  setActivePeriod,
  onNavigateTab
}: DashboardTabProps) {
  // Filters mapped strictly to matching lists
  const [taskFilter, setTaskFilter] = useState<'ALL' | 'COMPLETED' | 'PENDING' | 'DUE' | 'OVERDUE'>('ALL');

  // Hardcoded values directly aligning to Screenshot 1's data states:
  const facilitiesCount = 11;
  const reportsCount = 12;
  
  // Interactive mock tasks table based closely on Screenshot 1
  const structuredTaskDomains = [
    {
      id: 'environmental',
      title: 'Environmental',
      icon: FileSpreadsheet,
      taskCountText: '119 Tasks',
      donePillText: '8 Done',
      progressPct: 15,
      pendingCount: 57,
      dueCount: 54,
      overdueCount: 0,
      navigateId: 'analytics'
    },
    {
      id: 'framework',
      title: 'Framework',
      icon: ClipboardList,
      taskCountText: '0 Tasks',
      donePillText: '0 Done',
      progressPct: 0,
      pendingCount: 0,
      dueCount: 0,
      overdueCount: 0,
      navigateId: 'esg'
    },
    {
      id: 'activity_metrics',
      title: 'Activity Metrics',
      icon: BarChart3,
      taskCountText: '0 Tasks',
      donePillText: '0 Done',
      progressPct: 0,
      pendingCount: 0,
      dueCount: 0,
      overdueCount: 0,
      navigateId: 'facilities'
    },
    {
      id: 'social',
      title: 'Social',
      icon: Users,
      taskCountText: '0 Tasks',
      donePillText: '0 Done',
      progressPct: 0,
      pendingCount: 0,
      dueCount: 0,
      overdueCount: 0,
      navigateId: 'value-chain-partners'
    },
    {
      id: 'governance',
      title: 'Governance',
      icon: CheckCircle2,
      taskCountText: '0 Tasks',
      donePillText: '0 Done',
      progressPct: 0,
      pendingCount: 0,
      dueCount: 0,
      overdueCount: 0,
      navigateId: 'automation'
    },
    {
      id: 'vcps',
      title: 'VCPs',
      icon: ShoppingCart,
      taskCountText: '0 Tasks',
      donePillText: '0 Done',
      progressPct: 0,
      pendingCount: 0,
      dueCount: 0,
      overdueCount: 0,
      navigateId: 'value-chain-partners'
    }
  ];

  // Apply filters on task list (Environmental vs framework list etc)
  const filteredDomains = structuredTaskDomains.filter(d => {
    if (taskFilter === 'ALL') return true;
    if (taskFilter === 'COMPLETED') return d.donePillText !== '0 Done' || d.id === 'environmental';
    if (taskFilter === 'PENDING') return d.pendingCount > 0 || d.id === 'environmental';
    if (taskFilter === 'DUE') return d.dueCount > 0 || d.id === 'environmental';
    if (taskFilter === 'OVERDUE') return d.overdueCount > 0;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans" id="dashboard-tab-panel">
      
      {/* ─── ROW 1: 4 TOP ALIGNED METRICS CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="premium-metrics-grid">
        
        {/* Card 1: Facilities */}
        <div 
          onClick={() => onNavigateTab('facilities')}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between"
          id="dashboard-metric-facilities"
        >
          <div className="flex flex-col gap-1 justify-between h-full">
            <span className="text-xs font-bold font-sans text-slate-450 tracking-wide uppercase">Facilities</span>
            <div className="w-12 h-12 bg-pink-50 border border-pink-100 text-pink-500 rounded-xl flex items-center justify-center shadow-3xs mt-2.5">
              <Building2 size={24} className="stroke-[1.75]" />
            </div>
          </div>
          <div className="text-right">
            <span className="text-[44px] font-extrabold tracking-tight text-slate-900 leading-none">
              {facilitiesCount}
            </span>
          </div>
        </div>

        {/* Card 2: Reports */}
        <div 
          onClick={() => onNavigateTab('reports')}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between"
          id="dashboard-metric-reports"
        >
          <div className="flex flex-col gap-1 justify-between h-full">
            <span className="text-xs font-bold font-sans text-slate-450 tracking-wide uppercase">Reports</span>
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-xl flex items-center justify-center shadow-3xs mt-2.5">
              <FileText size={24} className="stroke-[1.75]" />
            </div>
          </div>
          <div className="text-right">
            <span className="text-[44px] font-extrabold tracking-tight text-slate-900 leading-none">
              {reportsCount}
            </span>
          </div>
        </div>

        {/* Card 3: Documents */}
        <div 
          onClick={() => onNavigateTab('documents')}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between"
          id="dashboard-metric-documents"
        >
          <div className="flex flex-col gap-1 justify-between h-full">
            <span className="text-xs font-bold font-sans text-slate-450 tracking-wide uppercase">Documents</span>
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 text-rose-550 rounded-xl flex items-center justify-center shadow-3xs mt-2.5">
              <FolderOpen size={24} className="stroke-[1.75]" />
            </div>
          </div>
          <div className="text-right self-end pb-1.5">
            <span className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 select-none">
              <Plus size={14} strokeWidth={2.5} />
              <span>Add Document</span>
            </span>
          </div>
        </div>

        {/* Card 4: Activity Metrics */}
        <div 
          onClick={() => onNavigateTab('analytics')}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between"
          id="dashboard-metric-activity"
        >
          <div className="flex flex-col gap-1 justify-between h-full">
            <span className="text-xs font-bold font-sans text-slate-450 tracking-wide uppercase">Activity Metrics</span>
            <div className="w-12 h-12 bg-emerald-50/70 border border-emerald-100/80 text-emerald-600 rounded-xl flex items-center justify-center shadow-3xs mt-2.5">
              <BarChart3 size={24} className="stroke-[1.75]" />
            </div>
          </div>
          <div className="text-right self-end pb-1.5">
            <span className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 select-none">
              <Plus size={11} strokeWidth={2.5} />
              <span>Configure</span>
            </span>
          </div>
        </div>

      </div>

      {/* ─── ROW 2: 3 PROGRESS DONUT METRICS CARDS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="progress-donut-grid">
        
        {/* Users Card */}
        <div 
          onClick={() => onNavigateTab('value-chain-partners')}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold font-mono tracking-wider text-slate-400 uppercase">Users</span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-7 h-7 rounded-full bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center">
                  <Users size={14} />
                </div>
                <span className="text-2xl font-black text-slate-900 font-sans tracking-tight">42</span>
              </div>
            </div>
            
            <div className="space-y-1.5 text-xs select-none">
              <div className="flex items-center gap-2">
                <span className="text-orange-650 font-extrabold font-sans">11</span>
                <span className="text-slate-500 font-semibold">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-extrabold font-sans">31</span>
                <span className="text-slate-500 font-semibold">Onboarded</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1 shrink-0">
            <CircularProgress percentage={74} colorClass="text-amber-500" />
            <span className="text-[9px] font-mono text-slate-400 font-bold">74% Target</span>
          </div>
        </div>

        {/* Goals Card */}
        <div 
          onClick={() => onNavigateTab('goals')}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold font-mono tracking-wider text-slate-400 uppercase">Goals</span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-7 h-7 rounded-full bg-purple-50 border border-purple-100 text-purple-500 flex items-center justify-center">
                  <Target size={14} />
                </div>
                <span className="text-2xl font-black text-slate-900 font-sans tracking-tight">4</span>
              </div>
            </div>
            
            <div className="space-y-1.5 text-xs select-none">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-extrabold font-sans">2</span>
                <span className="text-slate-500 font-semibold">Ongoing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-extrabold font-sans">2</span>
                <span className="text-slate-500 font-semibold">Completed</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1 shrink-0">
            <CircularProgress percentage={50} colorClass="text-purple-500" />
            <span className="text-[9px] font-mono text-slate-400 font-bold">50% Goal</span>
          </div>
        </div>

        {/* Value Chain Partners Card */}
        <div 
          onClick={() => onNavigateTab('value-chain-partners')}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold font-mono tracking-wider text-slate-400 uppercase">Value Chain Partners (VCPs)</span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                  <ShoppingCart size={14} />
                </div>
                <span className="text-2xl font-black text-slate-900 font-sans tracking-tight">1748</span>
              </div>
            </div>
            
            <div className="space-y-1.5 text-xs select-none">
              <div className="flex items-center gap-2">
                <span className="text-orange-650 font-extrabold font-sans">1</span>
                <span className="text-slate-500 font-semibold">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-extrabold font-sans">1747</span>
                <span className="text-slate-500 font-semibold">Onboarded</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1 shrink-0">
            <CircularProgress percentage={99.9} colorClass="text-blue-600" />
            <span className="text-[9px] font-mono text-slate-400 font-bold">99.9% Net</span>
          </div>
        </div>

      </div>

      {/* ─── MY TASKS PIPELINE SECTION ─── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden" id="tasks-ledger-panel">
        
        {/* Header Block with dropdown */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">My Tasks</h2>
            <p className="text-xs text-slate-400 mt-0.5">Actionable ledger categorized by reporting segments</p>
          </div>
          
          {/* Custom Dropdown showing calendar-days */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-3xs cursor-pointer hover:bg-slate-50">
            <Calendar size={13} strokeWidth={2.2} className="text-slate-450 shrink-0" />
            <span>{activePeriod === 'FY2026' ? 'FY 2026-27' : activePeriod}</span>
            <ChevronRight size={12} className="rotate-90 text-slate-450 ml-1 shrink-0" />
          </div>
        </div>

        {/* Category Pills Filters */}
        <div className="px-5 py-3.5 bg-slate-50/60 border-b border-slate-100 flex flex-wrap gap-2.5 items-center">
          <button 
            onClick={() => setTaskFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-3xs cursor-pointer ${taskFilter === 'ALL' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            All Segments ({structuredTaskDomains.length})
          </button>

          <button 
            onClick={() => setTaskFilter('COMPLETED')}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-3xs cursor-pointer flex items-center gap-1.5 ${taskFilter === 'COMPLETED' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-green-50/50 border-emerald-200 text-emerald-800 hover:bg-green-50'}`}
          >
            <span>✓ 8 Completed</span>
          </button>

          <button 
            onClick={() => setTaskFilter('PENDING')}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-3xs cursor-pointer flex items-center gap-1.5 ${taskFilter === 'PENDING' ? 'bg-[#0284c7] border-[#0284c7] text-white' : 'bg-[#f0f9ff] border-[#bae6fd] text-[#0369a1] hover:bg-[#e0f2fe]'}`}
          >
            <span>📋 57 Pending</span>
          </button>

          <button 
            onClick={() => setTaskFilter('DUE')}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-3xs cursor-pointer flex items-center gap-1.5 ${taskFilter === 'DUE' ? 'bg-amber-600 border-amber-600 text-white' : 'bg-[#fff7ed] border-[#fed7aa] text-[#c2410c] hover:bg-[#ffedd5]'}`}
          >
            <span>⚠ 54 Due</span>
          </button>

          <button 
            onClick={() => setTaskFilter('OVERDUE')}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-3xs cursor-pointer flex items-center gap-1.5 ${taskFilter === 'OVERDUE' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-[#fef2f2] border-[#fecaca] text-[#b91c1c] hover:bg-[#fee2e2]'}`}
          >
            <span>⊘ 0 Overdue</span>
          </button>
        </div>

        {/* Task Grid Table - Perfect alignment with Screenshot 1 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredDomains.map((domain) => {
                const IconComponent = domain.icon;
                return (
                  <tr key={domain.id} className="hover:bg-slate-50/30 transition-all">
                    
                    {/* Domain Icon & Title */}
                    <td className="px-6 py-4.5 min-w-[200px]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-50/80 border border-slate-150 flex items-center justify-center text-slate-500 shadow-3xs">
                          <IconComponent size={16} strokeWidth={2} />
                        </div>
                        <span className="font-extrabold text-sm text-slate-800 tracking-tight">
                          {domain.title}
                        </span>
                      </div>
                    </td>

                    {/* Task sum label */}
                    <td className="px-6 py-4.5 text-slate-400 font-semibold text-xs font-mono min-w-[100px]">
                      {domain.taskCountText}
                    </td>

                    {/* Done pill button */}
                    <td className="px-6 py-4.5 min-w-[110px]">
                      <span className={`px-2.5 py-1.5 rounded-md text-[11px] font-bold font-sans border flex items-center justify-center w-fit select-none ${domain.progressPct > 0 ? 'bg-green-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                        {domain.donePillText}
                      </span>
                    </td>

                    {/* Progress Bar Column */}
                    <td className="px-6 py-4.5 min-w-[180px]">
                      <div className="flex items-center gap-3">
                        <div className="w-40 bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0">
                          <div 
                            style={{ width: `${domain.progressPct}%` }}
                            className="bg-sky-400 h-full rounded-full transition-all duration-500 ease-out"
                          />
                        </div>
                        {/* Empty spacing placeholder */}
                        <div className="w-2" />
                      </div>
                    </td>

                    {/* Pending, Due, Overdue indicators aligned like Screenshot 1 */}
                    <td className="px-6 py-4.5 min-w-[180px]">
                      <div className="flex items-center gap-2 select-none">
                        
                        {/* Pending indicator */}
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 border ${domain.pendingCount > 0 ? 'bg-[#f0f9ff] border-[#e0f2fe] text-[#0369a1]' : 'bg-slate-50/40 border-slate-200/50 text-slate-400'}`}>
                          <span>📋</span>
                          <span>{domain.pendingCount}</span>
                        </span>

                        {/* Due indicator */}
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 border ${domain.dueCount > 0 ? 'bg-[#fff7ed] border-[#ffedd5] text-[#c2410c]' : 'bg-slate-50/40 border-slate-200/50 text-slate-400'}`}>
                          <span>⚠</span>
                          <span>{domain.dueCount}</span>
                        </span>

                        {/* Overdue indicator */}
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 border ${domain.overdueCount > 0 ? 'bg-[#fef2f2] border-[#fee2e2] text-[#b91c1c]' : 'bg-slate-50/40 border-slate-200/50 text-slate-400'}`}>
                          <span>⊘</span>
                          <span>{domain.overdueCount}</span>
                        </span>

                      </div>
                    </td>

                    {/* Navigate/Action item */}
                    <td className="px-6 py-4.5 text-right whitespace-nowrap min-w-[150px]">
                      <button 
                        onClick={() => onNavigateTab(domain.navigateId)}
                        className="text-xs font-bold text-slate-450 hover:text-blue-600 transition-colors flex items-center gap-1.5 ml-auto cursor-pointer"
                      >
                        <span>View pending tasks</span>
                        <ChevronRight size={14} className="stroke-[2.5]" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* EVA AI CTA callout */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1.5 md:max-w-2xl">
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest bg-blue-600 text-white px-2.5 py-1 rounded-md w-fit flex items-center gap-1">
            <Sparkles size={11} className="text-white fill-white animate-pulse" />
            <span>Gemini AI Secretariat</span>
          </span>
          <h3 className="text-base font-extrabold font-sans tracking-tight">Need assistance aligning your metrics with legislative frameworks?</h3>
          <p className="text-xs text-slate-400">
            Eva can review energy consumption logs, suggest conversion factors, draft greenhouse policies on-demand, or generate compliant ESG summary statements.
          </p>
        </div>
        <button 
          onClick={() => onNavigateTab('eva')}
          className="bg-blue-600 hover:bg-blue-705 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>Ask Eva AI</span>
          <ChevronRight size={14} strokeWidth={2.5} />
        </button>
      </div>

    </div>
  );
}
