import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Building, 
  Filter, 
  RotateCcw, 
  Download, 
  Check, 
  ChevronDown, 
  ArrowDownRight, 
  BarChart3, 
  CalendarDays,
  Grid,
  Info,
  Layers,
  Zap,
  Truck,
  Factory,
  ChevronRight,
  TrendingDown,
  Eye,
  Activity,
  Award
} from 'lucide-react';

export default function AnalyticsTab() {
  const [activeSubTab, setActiveSubTab] = useState<'Emissions' | 'Energy' | 'Air Emissions' | 'Water' | 'Waste' | 'Activity Metrics' | 'Social' | 'Governance'>('Emissions');
  const [activeChartScale, setActiveChartScale] = useState<'By Month' | 'By Quarter' | 'By Year' | 'By Scope (Month)' | 'By Scope (Quarter)' | 'By Scope (Year)'>('By Month');
  const [activeSourceType, setActiveSourceType] = useState<string>('Total Energy Breakdown');
  
  // Custom states for filter UI matching AJANTA layout
  const [selectedPeriod, setSelectedPeriod] = useState('FY 2026-27');
  const [selectedFacility, setSelectedFacility] = useState('Ajanta Pharma Export warehouse and 10 others');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Emissions Subtab Data Metrics
  const emissionsMetrics = [
    { 
      title: 'Total Emissions KgCO2e', 
      value: '3,027,145.86', 
      unit: 'kgCO2e', 
      change: '-97.43%', 
      icon: Factory, 
      color: 'text-indigo-500 bg-indigo-50/50 border-indigo-100' 
    },
    { 
      title: 'Scope 1 Emissions KgCO2e', 
      value: '28,808.84', 
      unit: 'kgCO2e', 
      change: '-99.14%', 
      icon: Layers, 
      color: 'text-emerald-500 bg-emerald-50/50 border-emerald-100' 
    },
    { 
      title: 'Scope 2 Emissions KgCO2e', 
      value: '2,998,337.02', 
      unit: 'kgCO2e', 
      change: '-93.56%', 
      icon: Zap, 
      color: 'text-blue-500 bg-blue-50/50 border-blue-105' 
    },
    { 
      title: 'Scope 3 Emissions KgCO2e', 
      value: '0.00', 
      unit: 'kgCO2e', 
      change: '-100.00%', 
      icon: Truck, 
      color: 'text-slate-550 bg-slate-100/50 border-slate-200' 
    }
  ];

  // Energy Subtab Data Metrics
  const energyMetrics = [
    { title: 'Total Energy', value: '18,476,978.66', unit: 'MJ', change: '-94.95%' },
    { title: 'Scope 1 Energy', value: '2,604,751.47', unit: 'MJ', change: '-96.91%' },
    { title: 'Scope 2 Energy', value: '14,847,335.99', unit: 'MJ', change: '-93.56%' },
    { title: 'Scope 2 Renewable Source', value: '1,024,891.20', unit: 'MJ', change: '-97.98%' },
    { title: 'Scope 2 Non-Renewable Source', value: '14,847,335.99', unit: 'MJ', change: '-93.56%' },
    { title: '% Renewable Energy', value: '5.55', unit: '%', change: '-59.99%' },
    { title: '% Scope 2 Renewable Energy', value: '6.90', unit: '%', change: '-68.60%' }
  ];

  // Months labels mapped directly to target year order
  const monthLabels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  // Total Energy stacked heights matching Screenshot 5 & May's electricity spike!
  const energyBreakdownData = [
    { label: 'Apr 2026', electricity: 6860000, stationary: 2600000, renewable: 600000 },
    { label: 'May 2026', electricity: 7920100, stationary: 120000, renewable: 600000 }, // tallest
    { label: 'Jun 2026', electricity: 140000, stationary: 20000, renewable: 50000 },
    { label: 'Jul 2026', electricity: 40000, stationary: 10000, renewable: 10000 },
    { label: 'Aug 2026', electricity: 30000, stationary: 5000, renewable: 5000 },
    { label: 'Sep 2026', electricity: 20000, stationary: 2000, renewable: 2000 },
    { label: 'Oct 2026', electricity: 15000, stationary: 1000, renewable: 1000 },
    { label: 'Nov 2026', electricity: 12000, stationary: 1000, renewable: 1000 },
    { label: 'Dec 2026', electricity: 14000, stationary: 1000, renewable: 1000 },
    { label: 'Jan 2027', electricity: 18000, stationary: 2000, renewable: 2000 },
    { label: 'Feb 2027', electricity: 20000, stationary: 3000, renewable: 2000 },
    { label: 'Mar 2027', electricity: 25000, stationary: 4000, renewable: 3000 }
  ];

  // Grouped Comparison data matching Screenshot 4/6 (3 side-by-side bars for 3 years)
  // For Month Wise Comparison Across Years MJ
  const multiYearEnergyData = [
    { label: 'Apr', y24: 27500000, y25: 28800000, y26: 10000000 },
    { label: 'May', y24: 30000000, y25: 32600000, y26: 8500000 },
    { label: 'Jun', y24: 30400000, y25: 31400000, y26: 0 },
    { label: 'Jul', y24: 30400000, y25: 32500000, y26: 0 },
    { label: 'Aug', y24: 31300000, y25: 31400000, y26: 0 },
    { label: 'Sep', y24: 29800000, y25: 30500000, y26: 0 },
    { label: 'Oct', y24: 28000000, y25: 29100000, y26: 0 },
    { label: 'Nov', y24: 25000000, y25: 29200000, y26: 0 },
    { label: 'Dec', y24: 25200000, y25: 29400000, y26: 0 },
    { label: 'Jan', y24: 26200000, y25: 28900000, y26: 0 },
    { label: 'Feb', y24: 24500000, y25: 31300000, y26: 0 },
    { label: 'Mar', y24: 26800000, y25: 31400000, y26: 0 }
  ];

  // Emissions Bar Breakdown Data
  const emissionBarData = [
    { label: 'Apr 25', s1: 22000, s2: 1250000 },
    { label: 'May 25', s1: 4000, s2: 1450000 },
    { label: 'Jun 25', s1: 0, s2: 0 },
    { label: 'Jul 25', s1: 0, s2: 0 },
    { label: 'Aug 25', s1: 0, s2: 0 },
    { label: 'Sep 25', s1: 0, s2: 0 },
    { label: 'Oct 25', s1: 0, s2: 0 },
    { label: 'Nov 25', s1: 0, s2: 0 },
    { label: 'Dec 25', s1: 0, s2: 0 },
    { label: 'Jan 26', s1: 0, s2: 0 },
    { label: 'Feb 26', s1: 0, s2: 0 },
    { label: 'Mar 26', s1: 0, s2: 0 }
  ];

  const handleApply = () => {
    showToast(`Successfully filtered system indicators using Period: "${selectedPeriod}"`);
  };

  const handleReset = () => {
    setSelectedPeriod('FY 2026-27');
    setSelectedFacility('Ajanta Pharma Export warehouse and 10 others');
    showToast('Filters restored successfully to default Ajanta Pharma baseline.');
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans" id="analytics-tab-panel">
      
      {/* Toast Prompt */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-850">
          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">✓</div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── HORIZONTAL BRAND SUB-NAVBAR ─── */}
      <div className="border-b border-slate-200 select-none bg-white px-2 rounded-lg py-1.5 shadow-3xs">
        <nav className="flex flex-wrap gap-1">
          {[
            { id: 'Emissions', label: '☁ Emissions' },
            { id: 'Energy', label: '⚡ Energy' },
            { id: 'Air Emissions', label: '💨 Air Emissions' },
            { id: 'Water', label: '💧 Water' },
            { id: 'Waste', label: '♻ Waste' },
            { id: 'Activity Metrics', label: '📊 Activity Metrics' },
            { id: 'Social', label: '👥 Social' },
            { id: 'Governance', label: '🏛 Governance' }
          ].map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(domainIdMapping(tab.id));
                  showToast(`Selected workspace tab: ${tab.id}`);
                }}
                className={`py-2 px-3.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${isActive ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ─── FILTER CONTROL PANEL BAR (AJANTA DESIGN) ─── */}
      <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-3xs flex flex-col md:flex-row flex-wrap items-center gap-4">
        
        {/* Period Selection */}
        <div className="w-full md:w-auto min-w-[180px]">
          <label className="text-[10px] font-bold font-mono text-slate-400 block uppercase mb-1.5">Period</label>
          <div className="relative">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-850 outline-none appearance-none cursor-pointer hover:bg-slate-100/50 transition-colors"
            >
              <option value="FY 2026-27">FY 2026-27</option>
              <option value="FY 2025-26">FY 2025-26</option>
              <option value="FY 2024-25">FY 2024-25</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Facility selection */}
        <div className="w-full md:w-auto flex-1 min-w-[270px]">
          <label className="text-[10px] font-bold font-mono text-slate-400 block uppercase mb-1.5">Facilities</label>
          <div className="relative">
            <select 
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-850 outline-none appearance-none cursor-pointer truncate hover:bg-slate-100/50 transition-colors"
            >
              <option value="Ajanta Pharma Export warehouse and 10 others">Ajanta Pharma Export warehouse and 10 others Selection</option>
              <option value="Ajanta Pharma Ltd - Dahej Factory">Ajanta Pharma Ltd - Dahej Factory</option>
              <option value="Ajanta Pharma Ltd - Paithan Unit">Ajanta Pharma Ltd - Paithan Unit</option>
              <option value="Ajanta Pharma Ltd - Guwahati Facility">Ajanta Pharma Ltd - Guwahati Facility</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Control Button Actions */}
        <div className="flex gap-2.5 w-full md:w-auto items-end self-stretch md:self-auto justify-end pt-2 md:pt-0">
          
          <button 
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer h-9 shrink-0"
          >
            Apply
          </button>
          
          <button 
            onClick={handleReset}
            className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-extrabold text-xs px-4 py-2.5 rounded-lg transition-all h-9 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            title="Reset to Baseline"
          >
            <RotateCcw size={13} strokeWidth={2.5} />
            <span>Reset</span>
          </button>

          <button 
            onClick={() => showToast('Advanced diagnostic filter triggers opened.')}
            className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-extrabold text-xs px-4 py-2.5 rounded-lg transition-all h-9 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Filter size={13} strokeWidth={2.5} />
            <span>Filters <span className="bg-slate-100 text-slate-500 font-black px-1.5 py-0.5 rounded-full text-[9px] ml-0.5">0</span></span>
          </button>

          <button 
            onClick={() => alert('Excel/CSV structural emission report compiled successfully and queued for local storage download.')}
            className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-extrabold text-xs px-4 py-2.5 rounded-lg transition-all h-9 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Download size={13} strokeWidth={2.5} />
            <span>Export</span>
          </button>

        </div>
      </div>

      {/* ACTIVE FILTERS SUMMARY TEXT ROW */}
      <div className="flex items-center gap-2 px-1 text-slate-400 font-semibold text-[11px] select-none">
        <span>Active Filters:</span>
        <div className="bg-[#f0f9ff] border border-blue-150 text-blue-705 px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-3xs">
          <span>Facilities: 11 selections</span>
          <button 
            onClick={() => {
              setSelectedFacility('Ajanta Pharma Export warehouse and 10 others');
              showToast('Facility boundaries synchronized.');
            }} 
            className="font-bold hover:text-blue-900 leading-none pl-1"
          >
            ×
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          TAB SECTION A: EMISSIONS DASHBOARD TAB VIEW (SCREENSHOT 3)
          ─────────────────────────────────────────────────────────── */}
      {activeSubTab === 'Emissions' && (
        <div className="space-y-6 animate-fade-in" id="emissions-governance-view">
          
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider pl-1 select-none">
            Emissions Overview
          </h2>

          {/* 4 TOP EMISSIONS METRIC CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {emissionsMetrics.map((met, i) => {
              const Icon = met.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs relative flex items-center gap-4">
                  
                  {/* Left Side Icon Area */}
                  <div className={`w-13 h-13 rounded-full flex items-center justify-center border ${met.color.split(' ').slice(1).join(' ')} shrink-0 shadow-3xs`}>
                    <Icon size={20} className={met.color.split(' ')[0]} />
                  </div>
                  
                  {/* Right Side Metrics text */}
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">
                      {met.title}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight font-sans">
                        {met.value}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase font-mono">
                        {met.unit}
                      </span>
                    </div>
                    {/* Trend Percentages in beautiful blue downwards pointing */}
                    <div className="flex items-center gap-1 text-[10px] text-blue-650 font-bold select-none">
                      <TrendingDown size={11} strokeWidth={2.5} className="text-blue-600" />
                      <span>{met.change} from previous year</span>
                      <Info size={11} className="text-slate-350 ml-1 hover:text-slate-500 cursor-pointer" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* MIDDLE GRID: PURCHASED ELECTRICITY INDEX AND BREAKDOWNS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Scope 2 Purchased Electricity Column */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold font-mono tracking-wider text-slate-400 uppercase">
                  Scope 2 Purchased Electricity
                </span>
                <div className="h-4" />
                <div className="space-y-4">
                  {/* Location-Based Row */}
                  <div className="bg-slate-50/70 border border-slate-150 rounded-lg p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block">LOCATION-BASED</span>
                      <span className="text-base font-extrabold text-slate-900 mt-1 block">2,998,337.02 kgCO2e</span>
                    </div>
                    <div className="text-right text-[10px] text-blue-605 font-bold flex items-center gap-0.5 select-none shrink-0 bg-blue-50 px-2 py-0.5 rounded">
                      <TrendingDown size={10} strokeWidth={3} />
                      <span>-93.56% from previous year</span>
                    </div>
                  </div>

                  {/* Market-Based Row */}
                  <div className="bg-slate-50/70 border border-slate-150 rounded-lg p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block">MARKET-BASED</span>
                      <span className="text-base font-extrabold text-slate-900 mt-1 block">2,998,337.02 kgCO2e</span>
                    </div>
                    <div className="text-right text-[10px] text-blue-605 font-bold flex items-center gap-0.5 select-none shrink-0 bg-blue-50 px-2 py-0.5 rounded">
                      <TrendingDown size={10} strokeWidth={3} />
                      <span>-93.56% from previous year</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-100 pt-3 mt-4 text-[11px] text-slate-400 flex items-center gap-1.5 select-none">
                <Info size={12} className="text-blue-500" />
                <span>Computed natively under SmartEase Carbon Logic Engine</span>
              </div>
            </div>

            {/* Scope Wise Emission Breakdown Donut Panel */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold font-mono tracking-wider text-slate-400 uppercase block">
                  Scope Wise Emission Breakdown kgCO2e
                </span>
                <div className="h-2" />
                <EmissionsDonut />
              </div>
            </div>

            {/* Total Emission Breakdown Bar Panel */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-1 border-b border-slate-100 select-none">
                  <div>
                    <span className="text-[11px] font-bold font-mono tracking-wider text-slate-400 uppercase">
                      Total Emission Breakdown kgCO2e
                    </span>
                  </div>
                  
                  {/* Mini Period Toggles */}
                  <div className="bg-slate-100/50 rounded-md p-0.5 text-[9px] font-black tracking-tight text-slate-500">
                    <span className="bg-white text-slate-800 rounded px-1.5 py-0.5 shadow-3xs">Month</span>
                    <span className="px-1.5 cursor-pointer">Quarter</span>
                    <span className="px-1.5 cursor-pointer">Year</span>
                  </div>
                </div>

                {/* SVG Column Chart representation under Emissions */}
                <div className="relative w-full h-44 pt-4 bg-slate-50/20 rounded-lg border border-slate-100 pl-8 pr-4">
                  {/* Y Axis legends */}
                  <div className="absolute left-1.5 top-0 bottom-6 text-[8px] font-mono font-bold text-slate-400 flex flex-col justify-between text-right leading-none select-none">
                    <span>1.8M</span>
                    <span>1.2M</span>
                    <span>600k</span>
                    <span>0</span>
                  </div>

                  <div className="absolute inset-x-8 top-0 bottom-6 flex items-end justify-between px-2">
                    {emissionBarData.map((b, i) => {
                      const totalVal = 1800000;
                      // Heights relative to May & April values
                      const hS2 = (b.s2 / totalVal) * 100;
                      const hS1 = (b.s1 / totalVal) * 100;
                      
                      const showLabel = b.label === 'Apr 25' || b.label === 'May 25';

                      return (
                        <div key={i} className="flex-1 flex flex-col h-full justify-end items-center group relative cursor-pointer">
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-1.5 bg-slate-900 border border-slate-800 text-white rounded p-2 text-[9px] font-mono leading-relaxed shadow-lg hidden group-hover:block z-45 shrink-0 select-none w-36">
                            <p className="font-extrabold border-b border-slate-750 pb-0.5 mb-1 text-sky-400">{b.label}</p>
                            <p className="flex justify-between"><span>Scope 2:</span> <span>{b.s2.toLocaleString()}</span></p>
                            {b.s1 > 0 && <p className="flex justify-between"><span>Scope 1:</span> <span>{b.s1.toLocaleString()}</span></p>}
                          </div>

                          {/* Bars */}
                          <div className="w-3 md:w-5 flex flex-col justify-end h-full">
                            {b.s2 > 0 && (
                              <div style={{ height: `${hS2}%` }} className="w-full bg-cyan-400/90 rounded-t-xs" />
                            )}
                            {b.s1 > 0 && (
                              <div style={{ height: `${hS1}%` }} className="w-full bg-blue-500 rounded-b-xs" />
                            )}
                          </div>

                          <span className="absolute top-full mt-1.5 text-[8px] font-bold text-slate-400 font-mono tracking-tighter uppercase whitespace-nowrap">
                            {b.label}
                          </span>

                          {showLabel && (
                            <span className="absolute top-0 text-[8px] font-extrabold text-slate-500 font-mono">
                              {( (b.s1 + b.s2) / 1000).toFixed(0)}k
                            </span>
                          )}

                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legends */}
                <div className="flex items-center gap-3 text-[10px] font-bold font-sans text-slate-500 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-blue-505 bg-blue-500 rounded-xs" />
                    <span>Scope 1</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-cyan-400 rounded-xs" />
                    <span>Scope 2 (Location-Based)</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          TAB SECTION B: ENERGY DASHBOARD TAB VIEW (SCREENSHOT 4,5,6)
          ─────────────────────────────────────────────────────────── */}
      {activeSubTab === 'Energy' && (
        <div className="space-y-6 animate-fade-in" id="energy-sustainability-view">
          
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider pl-1 select-none">
            Energy consumption indicators
          </h2>

          {/* 7 ENERGY METRIC SUMMARY CARDS SCROLLABLE/WRAP GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-7 gap-3">
            {energyMetrics.map((met, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-28 hover:border-blue-200 transition-colors">
                <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block leading-snug">
                  {met.title}
                </span>
                <div>
                  <div className="flex items-baseline gap-0.5 mt-2">
                    <span className="text-sm md:text-sm font-black text-slate-850 font-sans tracking-tight">
                      {met.value}
                    </span>
                    <span className="text-[9px] font-bold font-mono text-slate-400 truncate uppercase ml-0.5">
                      {met.unit}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-0.5 text-[9.5px] text-blue-650 font-bold bg-blue-50/50 w-fit px-1 rounded-sm select-none">
                    <TrendingDown size={10} strokeWidth={2.5} />
                    <span>{met.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL ENERGY BREAKDOWN MJ (STCKD) CHART - SCREENSHOT 5 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
            
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-sm text-slate-850 tracking-tight">Total Energy Breakdown MJ</h3>
                <p className="text-[10px] text-slate-400">Monthly reporting categorized by combustion levels</p>
              </div>

              {/* Chart Scale toggles */}
              <div className="flex bg-slate-100 rounded-lg p-0.5 text-[10px] font-black shrink-0 font-sans">
                {(['By Month', 'By Quarter', 'By Scope (Month)'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setActiveChartScale(opt as any)}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeChartScale === opt ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </header>

            {/* Group classification toggles inside chart panel */}
            <div className="flex flex-wrap gap-1.5 select-none">
              {['By Activity Type', 'By Scope 2 Energy Source', 'By Direct Combustion Source'].map((tabOpt) => (
                <button
                  key={tabOpt}
                  onClick={() => {
                    setActiveSourceType(tabOpt);
                    showToast(`Visualization metrics scaled dynamically to: ${tabOpt}`);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${activeSourceType === tabOpt ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  {tabOpt}
                </button>
              ))}
            </div>

            {/* Stacked Chart Panel with beautiful Iris purple bar in May 2026 */}
            <div className="relative w-full h-80 pt-6 bg-slate-50/20 border border-slate-100 rounded-xl p-4 pl-12 pr-6">
              
              {/* Vertical Y-Axis numbers */}
              <div className="absolute left-1.5 top-8 bottom-12 text-[9px] font-mono font-bold text-slate-400 flex flex-col justify-between text-right leading-none select-none">
                <span>8,000,000</span>
                <span>6,000,000</span>
                <span>4,000,000</span>
                <span>2,000,000</span>
                <span>0</span>
              </div>

              {/* Grid Horizontal Guidelines */}
              <div className="absolute inset-x-12 top-8 bottom-12 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
              </div>

              {/* Dynamic plotting bar elements */}
              <div className="absolute inset-x-12 top-8 bottom-12 flex justify-between items-end gap-1.5 px-3 z-10 h-64">
                {energyBreakdownData.map((item, idx) => {
                  const maxVal = 8000000;
                  const totalSum = item.electricity + item.stationary + item.renewable;
                  
                  // Compute vertical heights
                  const hElec = (item.electricity / maxVal) * 100;
                  const hStat = (item.stationary / maxVal) * 100;
                  const hRen = (item.renewable / maxVal) * 100;

                  const isMayTall = item.label === 'May 2026';

                  return (
                    <div key={idx} className="flex-1 flex flex-col h-full justify-end items-center group relative cursor-pointer">
                      
                      {/* Tooltip on Hover */}
                      <div className="absolute bottom-full mb-2 bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 text-[9px] font-mono leading-relaxed shadow-xl hidden group-hover:block z-45 shrink-0 select-none w-48">
                        <p className="font-extrabold border-b border-slate-750 pb-1 mb-1 text-indigo-400">{item.label}</p>
                        <p className="flex justify-between"><span>Purchased Electricity:</span> <span className="font-bold">{item.electricity.toLocaleString()} MJ</span></p>
                        <p className="flex justify-between"><span>Stationary Carb:</span> <span className="font-bold">{item.stationary.toLocaleString()} MJ</span></p>
                        <p className="flex justify-between"><span>Solar Renewable:</span> <span className="font-bold">{item.renewable.toLocaleString()} MJ</span></p>
                        <p className="flex justify-between border-t border-slate-700 pt-1 mt-1 font-bold text-emerald-400">
                          <span>Total MJ:</span> <span>{totalSum.toLocaleString()}</span>
                        </p>
                      </div>

                      {/* Bar columns */}
                      <div className="w-5 md:w-7 flex flex-col justify-end h-full">
                        {item.stationary > 0 && (
                          <div style={{ height: `${hStat}%` }} className="w-full bg-[#7fa5c4]" />
                        )}
                        {item.electricity > 0 && (
                          <div style={{ height: `${hElec}%` }} className="w-full bg-[#7886f9]" />
                        )}
                        {item.renewable > 0 && (
                          <div style={{ height: `${hRen}%` }} className="w-full bg-[#52b788]" />
                        )}
                      </div>

                      {/* Display coordinate label on top of May spike */}
                      {isMayTall && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                          <span className="bg-slate-900 text-white font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-slate-900">
                            7,920,100.00
                          </span>
                        </div>
                      )}

                      {/* X Axis Monthly caption label */}
                      <span className="absolute top-full mt-2 text-[9px] font-bold text-slate-500 font-mono tracking-tight shrink-0">
                        {item.label}
                      </span>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* CLASS LEGENDS MUSHED IN METRIC CLASSIFICATIONS */}
            <div className="border-t border-slate-100 pt-4 select-none">
              <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block mb-3">Classification Legends</span>
              <div className="flex flex-wrap gap-x-5 gap-y-2 max-w-full">
                {[
                  { label: 'Stationary Combustion', color: 'bg-[#7fa5c4]' },
                  { label: 'Mobile Combustion', color: 'bg-[#4d5eae]' },
                  { label: 'Industrial Process', color: 'bg-[#efa04c]' },
                  { label: 'Fugitive Emissions', color: 'bg-[#db4c77]' },
                  { label: 'Purchased Electricity', color: 'bg-[#7886f9]' },
                  { label: 'Renewable Energy', color: 'bg-[#52b788]' },
                  { label: 'Purchased Heat & Steam', color: 'bg-[#a370f7]' },
                  { label: 'Purchased Cooling', color: 'bg-[#f3c02c]' },
                  { label: 'Contractual Instruments', color: 'bg-[#4ea8de]' }
                ].map((leg, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] text-slate-600 font-bold font-sans">
                    <span className={`w-3 h-3 rounded-xs shrink-0 block ${leg.color}`} />
                    <span className="truncate">{leg.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* MONTH WISE COMPARISON ACROSS YEARS MJ - SCREENSHOT 6 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
            
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-1 border-b border-slate-100 select-none">
              <div>
                <h3 className="font-extrabold text-sm text-slate-850 tracking-tight">Month Wise Comparison Across Years MJ</h3>
              </div>

              {/* Sub classifications dropdown selection mimicking screenshot 4 top right filters */}
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold font-sans text-slate-500 shrink-0">
                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded cursor-pointer border border-blue-100 font-extrabold">By Energy</span>
                <span className="px-1.5 py-0.5 hover:text-slate-800 cursor-pointer">By Stationary Combustion</span>
                <span className="px-1.5 py-0.5 hover:text-slate-800 cursor-pointer">By Mobile Combustion</span>
                <span className="px-1.5 py-0.5 hover:text-slate-800 cursor-pointer">By Scope 2 Renewable</span>
              </div>
            </header>

            {/* Stacked multi column side-by-side bar plots */}
            <div className="relative w-full h-[320px] pt-6 bg-slate-50/10 border border-slate-100 rounded-xl p-4 pl-12 pr-6">
              
              {/* Vertical Y-Axis scale numbers */}
              <div className="absolute left-1.5 top-8 bottom-12 text-[9px] font-mono font-bold text-slate-400 flex flex-col justify-between text-right leading-none select-none">
                <span>35,000,000</span>
                <span>30,000,000</span>
                <span>25,000,000</span>
                <span>20,000,000</span>
                <span>15,000,000</span>
                <span>10,000,000</span>
                <span>5,000,000</span>
                <span>0</span>
              </div>

              {/* Guidelines */}
              <div className="absolute inset-x-12 top-8 bottom-12 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
                <div className="border-t border-slate-200 w-full h-px" />
              </div>

              {/* Plot bars Side by side */}
              <div className="absolute inset-x-12 top-8 bottom-12 flex justify-between items-end gap-1 px-2.5 z-10 h-72">
                {multiYearEnergyData.map((item, idx) => {
                  const maxVal = 35000000;
                  // Side by side percentages
                  const p24 = (item.y24 / maxVal) * 105;
                  const p25 = (item.y25 / maxVal) * 105;
                  const p26 = (item.y26 / maxVal) * 105;

                  return (
                    <div key={idx} className="flex-1 flex flex-col h-full justify-end items-center group relative cursor-pointer">
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 bg-slate-900 border border-slate-800 text-white rounded p-2 text-[9px] font-mono leading-relaxed shadow-lg hidden group-hover:block z-45 shrink-0 select-none w-36">
                        <p className="font-extrabold pb-0.5 border-b border-slate-750 text-sky-400 mb-1">{item.label}</p>
                        <p className="flex justify-between"><span>2024-25:</span> <span>{item.y24.toLocaleString()}</span></p>
                        <p className="flex justify-between"><span>2025-26:</span> <span>{item.y25.toLocaleString()}</span></p>
                        {item.y26 > 0 && <p className="flex justify-between"><span>2026-27:</span> <span>{item.y26.toLocaleString()}</span></p>}
                      </div>

                      {/* Side by side capsule column cluster */}
                      <div className="flex items-end gap-0.5 h-full w-[17px] md:w-[24px]">
                        {/* 2024-25 (Sky Blue) */}
                        <div style={{ height: `${p24}%` }} className="flex-1 bg-[#62ccf4] rounded-t-xs" />
                        {/* 2025-26 (Iris Slate Blue) */}
                        <div style={{ height: `${p25}%` }} className="flex-1 bg-[#7285ea] rounded-t-xs" />
                        {/* 2026-27 (Yellow/Orange) */}
                        {p26 > 0 && (
                          <div style={{ height: `${p26}%` }} className="flex-1 bg-[#f3c252] rounded-t-xs" />
                        )}
                      </div>

                      <span className="absolute top-full mt-2 text-[9px] font-bold text-slate-500 font-mono rotate-12 shrink-0">
                        {item.label}
                      </span>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Year Legends */}
            <div className="flex items-center gap-4 text-[10px] font-extrabold font-sans text-slate-650 justify-center select-none border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#62ccf4] rounded-xs" />
                <span>2024 - 2025</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#7285ea] rounded-xs" />
                <span>2025 - 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#f3c252] rounded-xs" />
                <span>2026 - 2027</span>
              </div>
            </div>

          </div>

          {/* LOWER LARGE CONTAINER: Energy Breakdown MJ - Facility Selection block */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
            <span className="text-[11px] font-bold font-mono tracking-wider text-slate-400 uppercase block">
              Energy Breakdown MJ
            </span>
            
            {/* Custom vector block representing AJANTA PHARMA LTD- DAHEJ from Screenshot 4 */}
            <div 
              onClick={() => alert('Facility detail breakdown drawer loaded for Dahej Unit.')}
              className="bg-[#5a76c8] text-white hover:bg-[#4661b3] transition-all rounded-xl p-8 shadow-sm flex items-center justify-center cursor-pointer font-bold relative overflow-hidden group select-none min-h-[160px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
              
              <div className="flex items-center gap-3 relative z-10 text-center flex-col sm:flex-row">
                <Activity size={20} className="text-white animate-pulse" />
                <span className="text-sm md:text-base font-extrabold tracking-wide uppercase">
                  ▶ Facility :: AJANTA PHARMA LTD- DAHEJ
                </span>
              </div>
              
              <div className="absolute bottom-4 right-4 text-[9px] font-mono text-white/50">
                CLICK TO INTERACT DISCLOSURE GRID
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ─── TAB SECTION C: FALLBACK WARNING DISCLOSURE FOR OTHER SUBTABS ─── */}
      {activeSubTab !== 'Emissions' && activeSubTab !== 'Energy' && (
        <div className="bg-white border border-slate-105 rounded-xl p-16 text-center shadow-3xs animate-fade-in">
          <Award size={36} className="text-blue-500 mx-auto stroke-[1.5] mb-2" />
          <h3 className="text-sm font-extrabold text-slate-805 tracking-tight">Segment Audit Workspace</h3>
          <p className="text-xs text-slate-450 mt-1 max-w-md mx-auto">
            The database is currently pre-loaded and optimized for reporting indicators under "☁ Emissions" and "⚡ Energy" segments conforming with regulatory standards.
          </p>
          <button 
            onClick={() => setActiveSubTab('Emissions')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer shadow-3xs"
          >
            Review Emissions Data
          </button>
        </div>
      )}

    </div>
  );
}

// Map the input sub-tab clicks correctly
function domainIdMapping(tabId: string): any {
  if (tabId.includes('Emissions') && !tabId.includes('Air')) return 'Emissions';
  if (tabId.includes('Energy')) return 'Energy';
  return tabId;
}

// Mini customized svg circular/semi-segment breakdown ring for Scope wise emissions
function EmissionsDonut() {
  return (
    <div className="flex flex-col items-center justify-center p-3 font-sans">
      
      {/* Circle center with floating data details */}
      <div className="relative w-40 h-40 flex items-center justify-center select-none mb-4">
        <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f8fafc" strokeWidth="3" />
          
          {/* Legend 1: Scope 2 location-based (Yellow orange components: 49.76% ~ 50 value) */}
          <circle cx="18" cy="18" r="15.915" strokeDasharray="50 100" strokeDashoffset="0" strokeLinecap="round" fill="transparent" stroke="#f59e0b" strokeWidth="3.6" />
          
          {/* Legend 2: Scope 1 (Light blue segment: 0.48% ~ 1 value) */}
          <circle cx="18" cy="18" r="15.915" strokeDasharray="1 100" strokeDashoffset="-50" strokeLinecap="round" fill="transparent" stroke="#3b82f6" strokeWidth="4.2" />
          
          {/* Legend 3: Scope 2 other (Sky blue fragment components: Rest of the circle 49.76% ~ roughly 49) */}
          <circle cx="18" cy="18" r="15.915" strokeDasharray="49 100" strokeDashoffset="-51.5" strokeLinecap="round" fill="transparent" stroke="#0ea5e9" strokeWidth="3.6" />
        </svg>
        
        {/* Core display caption inside circle center */}
        <div className="absolute text-center">
          <span className="text-[9px] text-slate-400 font-extrabold tracking-wider block leading-none">TOTAL SCOPES</span>
          <span className="text-sm font-black text-slate-800 leading-none block mt-1.5">3.03M kg</span>
          <span className="text-[9px] font-mono font-bold text-slate-450 block mt-1">CO2e</span>
        </div>
      </div>

      {/* Legends aligned exactly like Screenshot 3 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-bold text-slate-650 w-full pt-3 border-t border-slate-100 select-none">
        
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#3b82f6] shrink-0" />
          <span className="truncate">Scope 1 (0.48%)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b] shrink-0" />
          <span className="truncate">Scope 2 (Location-Based) (49.76%)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#ec4899] shrink-0" />
          <span className="truncate">Scope 2 (Market-Based)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#0ea5e9] shrink-0" />
          <span className="truncate">Scope 2 (Other) (49.76%)</span>
        </div>

      </div>

    </div>
  );
}
