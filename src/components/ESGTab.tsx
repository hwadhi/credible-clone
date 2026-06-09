import React, { useState } from 'react';
import { 
  Globe, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Download, 
  ChevronDown, 
  Info,
  Compass,
  Zap,
  TrendingDown,
  Droplet,
  Trash2,
  Wind,
  CheckCircle2
} from 'lucide-react';

export default function ESGTab() {
  const [activePillar, setActivePillar] = useState<'Environmental' | 'Social' | 'Governance'>('Environmental');
  const [selectedPeriod, setSelectedPeriod] = useState('FY 2026 - 2027');
  const [selectedFramework, setSelectedFramework] = useState('GRI');

  // Framework list details matching Screenshot 10
  const frameworks = [
    { id: 'GRI', title: 'GRI', desc: 'Report on the Global Reporting Initiative Standards framework.' },
    { id: 'BRSR', title: 'BRSR', desc: 'Report on the Business Responsibility and Sustainability Reporting framework.' },
    { id: 'TCFD', title: 'T.C.F.D', desc: 'Task-force on Climate related Financial Disclosures.' },
    { id: 'ESRS', title: 'ESRS', desc: 'Report on European Sustainability Reporting Standards.' },
    { id: 'Ecovadis', title: 'Ecovadis', desc: "Ecovadis is a global assessment that rates businesses' sustainability." },
    { id: 'DJSI', title: 'DJSI', desc: 'Dow Jones Sustainability Index - A global benchmark for corporate sustainability.' }
  ];

  // Helper alert or download simulator
  const handleExport = () => {
    alert(`Exporting high-fidelity raw ESG dataset for reporting period "${selectedPeriod}" complete. Verified against active ESG Frameworks.`);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="esg-metrics-panel">
      {/* HEADER SECTION WITH NAVIGATION ROW */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <span className="text-xs text-slate-500 font-mono tracking-wider block uppercase">Compliance & Frameworks</span>
          <h1 className="text-2xl font-bold font-display text-slate-900">ESG Disclosures & Parameters</h1>
        </div>

        {/* Floating actions right side */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 font-semibold font-mono text-xs rounded-lg px-3 py-2 pr-8 appearance-none outline-none cursor-pointer w-full"
            >
              <option value="FY 2026 - 2027">FY 2026 - 2027</option>
              <option value="FY 2025 - 2026">FY 2025 - 2026</option>
              <option value="FY 2024 - 2025">FY 2024 - 2025</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <button 
            onClick={handleExport}
            className="bg-white hover:bg-slate-50 border border-slate-230 text-slate-650 font-bold text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Download size={13} />
            <span>Export Raw Data</span>
          </button>
        </div>
      </div>

      {/* THREE INTERACTIVE PILLAR TABS (ENVIRONMENTAL, SOCIAL, GOVERNANCE) */}
      <div className="flex gap-1.5 bg-white border border-slate-200 rounded-xl p-1 w-fit text-xs">
        {(['Environmental', 'Social', 'Governance'] as const).map((pillar) => {
          const isActive = activePillar === pillar;
          return (
            <button
              key={pillar}
              onClick={() => setActivePillar(pillar)}
              className={`px-4 py-2 rounded-lg font-bold font-semibold transition-all ${isActive ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-550 hover:text-slate-800'}`}
            >
              {pillar}
            </button>
          );
        })}
      </div>

      {/* CORE WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: PRIMARY ESG PARAMETER GROUPS */}
        <div className="lg:col-span-3 space-y-8 min-w-0">
          
          {activePillar === 'Environmental' ? (
            <div className="space-y-6">
              
              {/* EMISSION parameters group */}
              <section className="space-y-3">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <Leaf size={14} className="text-emerald-500" />
                  <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest font-mono">Emission</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Scope 1 card */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-28 hover:shadow-2xs transition-all">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">Scope 1</span>
                    <div className="space-y-1">
                      <span className="text-sm md:text-base font-black text-slate-850 font-mono tracking-tight block">28,808.84 kgCO2e</span>
                      <span className="text-[10px] text-red-600 font-mono font-medium block bg-red-50/50 w-fit px-1 rounded">-3,335,126.26 from previous year</span>
                    </div>
                  </div>

                  {/* Scope 2 card */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-28 hover:shadow-2xs transition-all">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">Scope 2 (Location Based)</span>
                    <div className="space-y-1">
                      <span className="text-sm md:text-base font-black text-slate-850 font-mono tracking-tight block">2,998,337.02 kgCO2e</span>
                      <span className="text-[10px] text-red-600 font-mono font-medium block bg-red-50/50 w-fit px-1 rounded">-43,577,402.16 from previous year</span>
                    </div>
                  </div>

                  {/* Scope 3 card */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-28 hover:shadow-2xs transition-all">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">Scope 3</span>
                    <div className="space-y-1">
                      <span className="text-sm font-black text-slate-400 font-mono tracking-tight block">-</span>
                      <span className="text-[10px] text-slate-400 font-mono font-medium block">No Data Entries</span>
                    </div>
                  </div>

                  {/* Total emission card */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 border-l-4 border-l-blue-600 shadow-3xs flex flex-col justify-between h-28 hover:shadow-2xs transition-all">
                    <span className="text-[10px] font-bold text-blue-600 font-mono uppercase tracking-wider block">Total Emission</span>
                    <div className="space-y-1">
                      <span className="text-base font-black text-blue-900 font-display tracking-tight block">3,027,145.86 kgCO2e</span>
                      <span className="text-[10px] text-red-600 font-mono font-medium block bg-red-50/50 w-fit px-1 rounded">-114,696,978.36 from previous year</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* ENERGY parameters group */}
              <section className="space-y-3">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <Zap size={14} className="text-amber-500" />
                  <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest font-mono">Energy</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Energy Scope 1 */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-24 hover:shadow-2xs transition-all">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Scope 1 Energy</span>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-850 font-mono block">2,604,751.47 MJ</span>
                      <span className="text-[9px] text-red-600 font-mono font-medium block">-81,779,779.38 from previous year</span>
                    </div>
                  </div>

                  {/* Energy Scope 2 */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-24 hover:shadow-2xs transition-all">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Scope 2 Energy (Location Based)</span>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-850 font-mono block">15,872,227.19 MJ</span>
                      <span className="text-[9px] text-red-600 font-mono font-medium block">-265,467,838.47 from previous year</span>
                    </div>
                  </div>

                  {/* Total Energy */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 border-l-4 border-l-amber-500 shadow-3xs flex flex-col justify-between h-24 hover:shadow-2xs transition-all">
                    <span className="text-[10px] font-bold text-amber-600 font-mono uppercase block">Total Energy</span>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-850 font-mono block">18,476,978.66 MJ</span>
                      <span className="text-[9px] text-red-600 font-mono font-medium block">-347,241,617.85 from previous year</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* AIR EMISSION section */}
              <section className="space-y-3">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <Wind size={14} className="text-sky-500" />
                  <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest font-mono">Air Emission</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-24">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Total Air Emission</span>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-850 font-mono block">0.0000000 tons/yr</span>
                      <span className="text-[9px] text-slate-400 font-mono block font-bold font-medium">No previous year data</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* WATER section */}
              <section className="space-y-3">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <Droplet size={14} className="text-blue-500" />
                  <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest font-mono">Water</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Withdrawal */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-24 opacity-80">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Total Water Withdrawal</span>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-400 font-mono block">-</span>
                      <span className="text-[9px] text-slate-400 font-mono block">No Data Entries</span>
                    </div>
                  </div>

                  {/* Discharge */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-24 opacity-80">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Total Water Discharge</span>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-400 font-mono block">-</span>
                      <span className="text-[9px] text-slate-400 font-mono block">No Data Entries</span>
                    </div>
                  </div>

                  {/* Consumption */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-24 opacity-80">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Total Water Consumption</span>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-400 font-mono block">-</span>
                      <span className="text-[9px] text-slate-400 font-mono block">No Data Entries</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* WASTE section */}
              <section className="space-y-3">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <Trash2 size={14} className="text-rose-500" />
                  <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest font-mono">Waste</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Total */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-24 opacity-80">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Total Waste</span>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-400 font-mono block">-</span>
                      <span className="text-[9px] text-slate-400 font-mono block">No Data Entries</span>
                    </div>
                  </div>

                  {/* Diverted */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-24 opacity-80">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Total Waste Diverted From Disposal</span>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-400 font-mono block">-</span>
                      <span className="text-[9px] text-slate-400 font-mono block">No Data Entries</span>
                    </div>
                  </div>

                  {/* Directed */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex flex-col justify-between h-24 opacity-80">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Total Waste Directed To Disposal</span>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-400 font-mono block">-</span>
                      <span className="text-[9px] text-slate-400 font-mono block">No Data Entries</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          ) : activePillar === 'Social' ? (
            <div className="space-y-6">
              
              {/* SOCIAL PARAMETERS */}
              <section className="space-y-3">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <Users size={14} className="text-blue-500" />
                  <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest font-mono">Social & Workforce Disclosures</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Row 1 */}
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Gender Diversity Ratio</span>
                      <span className="text-lg font-bold text-slate-800 font-display">25.4% Female FTE</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+2.4% YoY</span>
                  </div>

                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Workplace Incident Rate</span>
                      <span className="text-lg font-bold text-slate-800 font-display">Zero Critical Harm (LTR)</span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold leading-none">Healthy</span>
                  </div>

                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Sustainable Training</span>
                      <span className="text-lg font-bold text-slate-800 font-display">28.4 Hrs / Worker average</span>
                    </div>
                    <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs font-bold leading-none">Benchmark: 20h</span>
                  </div>

                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Human Rights Auditing</span>
                      <span className="text-lg font-bold text-slate-800 font-display">100% Tier-1 Suppliers Enforced</span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold leading-none">Perfect Score</span>
                  </div>
                </div>
              </section>

            </div>
          ) : (
            <div className="space-y-6">
              
              {/* GOVERNANCE PARAMETERS */}
              <section className="space-y-3">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <ShieldCheck size={14} className="text-purple-500" />
                  <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest font-mono">Governance & Ethics Metrics</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs space-y-2">
                    <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Anti-Corruption & Bribery Controls</span>
                    <span className="text-base font-bold text-slate-850 block">100% Employee Certification Complete</span>
                    <p className="text-[10px] text-slate-450 leading-relaxed">Annual general ethics training series successfully signed by all primary office and plant FTE audit nodes.</p>
                  </div>

                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs space-y-2">
                    <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Board Composition Independency</span>
                    <span className="text-base font-bold text-slate-850 block">62.5% Independent Representatives</span>
                    <p className="text-[10px] text-slate-450 leading-relaxed">Exceeds basic legislative thresholds requiring minimum 50% non-executive audit representation chairs.</p>
                  </div>

                  <div className="bg-white border border-slate-210 rounded-xl p-4 shadow-3xs space-y-2 col-span-1 md:col-span-2">
                    <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Double-Materiality ESG Committee meetings</span>
                    <div className="flex items-center gap-6">
                      <span className="text-xl font-black text-blue-600 font-display">4 meetings / year</span>
                      <span className="text-xs text-slate-500">Board subcommittee chaired directly by EVP of Compliance. Fully archived meeting minutes available in secure folders.</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: FRAMEWORKS LISTING PANEL matching Screenshot 10 */}
        <div className="col-span-1 space-y-4" id="frameworks-sidebar-panel">
          <div className="bg-white border border-slate-205 rounded-xl p-4 shadow-3xs space-y-3.5">
            <div>
              <h3 className="font-bold text-xs text-slate-900 uppercase font-display tracking-wide">Frameworks</h3>
              <p className="text-[10px] text-slate-400 leading-snug">Switch compliance standards to filter parameters criteria</p>
            </div>

            {/* Clickable Card-like buttons mapping to frameworks in Screenshot 10 */}
            <div className="space-y-2">
              {frameworks.map((fw) => {
                const isSelected = selectedFramework === fw.id;
                return (
                  <button
                    key={fw.id}
                    onClick={() => {
                      setSelectedFramework(fw.id);
                      alert(`Selected reporting framework standard: ${fw.id}. Highlighting associated taxonomy directives.`);
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex flex-col gap-1 cursor-pointer hover:shadow-3xs ${isSelected ? 'border-blue-500 bg-blue-50/10 shadow-3xs' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-extrabold font-mono tracking-widest text-slate-800 bg-slate-100 rounded px-1.5 py-0.5 uppercase">
                        {fw.title}
                      </span>
                      {isSelected && (
                        <span className="text-[8px] bg-blue-600 text-white font-mono font-black rounded-lg px-1 py-px leading-none tracking-wider uppercase">Active</span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium leading-relaxed block leading-normal pt-0.5">
                      {fw.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
              <span className="text-[9px] font-semibold text-slate-500 font-mono uppercase tracking-wider">SEC Compliant Taxonomies</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
