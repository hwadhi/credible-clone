import React, { useState } from 'react';
import { Facility } from '../types';
import { 
  BarChart3, 
  Building, 
  HelpCircle, 
  Layers, 
  Percent, 
  Plus, 
  TrendingDown, 
  Video, 
  X,
  Gauge
} from 'lucide-react';

interface BenchmarkingTabProps {
  facilities: Facility[];
}

interface PeerCompany {
  name: string;
  energyIntensity: number; // kWh/sqft
  carbonIntensity: number; // kg CO2e/sqft
  isTarget?: boolean;
}

export default function BenchmarkingTab({ facilities }: BenchmarkingTabProps) {
  const [showAddPeer, setShowAddPeer] = useState(false);
  const [peerName, setPeerName] = useState('');
  const [peerEnergy, setPeerEnergy] = useState<number>(18.5);
  const [peerCarbon, setPeerCarbon] = useState<number>(4.2);

  const [peers, setPeers] = useState<PeerCompany[]>([
    { name: 'Commercial Sector Avg (US)', energyIntensity: 22.4, carbonIntensity: 5.8 },
    { name: 'S&P 500 ESG Target 2026', energyIntensity: 14.0, carbonIntensity: 3.1, isTarget: true },
    { name: 'E-Commerce Peer Org', energyIntensity: 28.5, carbonIntensity: 7.2 }
  ]);

  // Demo Org Intensity Math
  const totalSqft = facilities.reduce((sum, f) => sum + f.sqft, 0);
  const totalEnergy = facilities.reduce((sum, f) => sum + f.energyKwh, 0);
  const totalCarbon = facilities.reduce((sum, f) => sum + (f.scope1 + f.scope2 + f.scope3), 0) * 1000; // in kg

  const demoEnergyIntensity = totalSqft > 0 ? totalEnergy / totalSqft : 0;
  const demoCarbonIntensity = totalSqft > 0 ? totalCarbon / totalSqft : 0;

  // Append new Peer simulation
  const handleAddPeer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!peerName) return;

    setPeers([...peers, {
      name: peerName,
      energyIntensity: peerEnergy,
      carbonIntensity: peerCarbon
    }]);

    setPeerName('');
    setShowAddPeer(false);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="benchmarking-tab-panel">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <span className="text-xs text-slate-500 font-mono tracking-wider block uppercase">Intensity Indexes</span>
          <h1 className="text-2xl font-bold font-display text-slate-900">Corporate Benchmarking</h1>
        </div>

        <button 
          onClick={() => setShowAddPeer(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-xs"
        >
          <Plus size={16} />
          <span>Simulate Peer Corporation</span>
        </button>
      </div>

      {/* Bento Intensity Metrics Cards Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Energy Intensity Block */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block">Energy Intensity Index</span>
              <h2 className="text-lg font-bold font-semibold text-slate-800">Electricity Load per Gross Floor Area</h2>
            </div>
            <span className="text-sm font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              Target: 14.0
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {/* Demo Org Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>DEMO ORG (Your active portfolio)</span>
                <span className="font-mono">{demoEnergyIntensity.toFixed(2)} kWh / sqft</span>
              </div>
              <div className="w-full bg-slate-150 h-6 rounded-lg relative overflow-hidden border border-slate-200">
                <div className="bg-blue-600 h-full rounded-lg" style={{ width: `${Math.min(100, (demoEnergyIntensity / 35) * 100)}%` }}></div>
                <span className="absolute inset-y-0 left-3 flex items-center text-[10px] font-black text-white uppercase font-mono">YOUR LEAGUE</span>
              </div>
            </div>

            {/* Peer Bars */}
            {peers.map((p, idx) => {
              const widthPct = Math.min(100, (p.energyIntensity / 35) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500 font-medium">
                    <span>{p.name} {p.isTarget && '🎯'}</span>
                    <span className="font-mono">{p.energyIntensity.toFixed(2)} kWh / sqft</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-md overflow-hidden relative border border-slate-200">
                    <div className={`h-full rounded-md ${p.isTarget ? 'bg-emerald-500' : 'bg-slate-400'}`} style={{ width: `${widthPct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carbon Footprint Intensity Block */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block">Emissions Performance Index</span>
              <h2 className="text-lg font-bold font-semibold text-slate-800">Carbon Footprint density</h2>
            </div>
            <span className="text-sm font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              Target: 3.1
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {/* Demo Org Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>DEMO ORG (Your active portfolio)</span>
                <span className="font-mono">{demoCarbonIntensity.toFixed(2)} kg CO2e / sqft</span>
              </div>
              <div className="w-full bg-slate-150 h-6 rounded-lg relative overflow-hidden border border-slate-200">
                <div className="bg-indigo-600 h-full rounded-lg" style={{ width: `${Math.min(100, (demoCarbonIntensity / 9) * 100)}%` }}></div>
                <span className="absolute inset-y-0 left-3 flex items-center text-[10px] font-black text-white uppercase font-mono">YOUR LEAGUE</span>
              </div>
            </div>

            {/* Peer Bars */}
            {peers.map((p, idx) => {
              const widthPct = Math.min(100, (p.carbonIntensity / 9) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500 font-medium">
                    <span>{p.name} {p.isTarget && '🎯'}</span>
                    <span className="font-mono">{p.carbonIntensity.toFixed(2)} kg CO2e / sqft</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-md overflow-hidden relative border border-slate-200">
                    <div className={`h-full rounded-md ${p.isTarget ? 'bg-teal-500' : 'bg-slate-400'}`} style={{ width: `${widthPct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Advisory Callout Panel on ESG positioning */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs text-slate-700 space-y-3">
        <h3 className="font-bold flex items-center gap-1.5 text-slate-900 text-sm">
          <Layers size={16} className="text-orange-600" />
          <span>Industry Standing Diagnostics Brief</span>
        </h3>
        <p className="text-xs leading-relaxed max-w-4xl text-slate-650">
          Your current energy intensity metrics of <strong>{demoEnergyIntensity.toFixed(1)} kWh/sqft</strong> rank in the <strong>top 40%</strong> of similar size tech-office/logistics portfolios on CREDIBL ESG. This performance is primarily driven by efficient rooftop solar offsets installed at your Berlin and Tokyo sites.
        </p>
        <p className="text-xs leading-relaxed max-w-4xl text-slate-650">
          To optimize carbon foot intensity down from <strong>{demoCarbonIntensity.toFixed(1)} kg/sqft</strong> toward your target threshold of <strong>3.1 kg/sqft</strong>, consider auditing natural gas heating operations at the Chicago Factory assembling line, or purchasing high-volume Renewable Energy Certificates (RECs).
        </p>
      </div>

      {/* Peer addition modal */}
      {showAddPeer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
          <form 
            onSubmit={handleAddPeer}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4 m-4"
          >
            <div className="flex justify-between items-center border-b border-light pb-2">
              <h2 className="text-sm font-bold font-display text-slate-800">Simulate Competitor Index</h2>
              <button 
                type="button" 
                onClick={() => setShowAddPeer(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Company Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Retail Consortium Peer"
                  required
                  value={peerName}
                  onChange={(e) => setPeerName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none font-sans text-xs focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all shadow-3xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Energy (kWh/sqft)</label>
                  <input 
                    type="number"
                    step="0.1"
                    min="1"
                    max="100"
                    required
                    value={peerEnergy}
                    onChange={(e) => setPeerEnergy(parseFloat(e.target.value) || 15)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Emissions (kg/sqft)</label>
                  <input 
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="50"
                    required
                    value={peerCarbon}
                    onChange={(e) => setPeerCarbon(parseFloat(e.target.value) || 3)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3 text-xs">
              <button 
                type="button" 
                onClick={() => setShowAddPeer(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-500 font-semibold"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg"
              >
                Verify & Add Peer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
