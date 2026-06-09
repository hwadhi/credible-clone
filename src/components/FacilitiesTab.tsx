import React, { useState } from 'react';
import { Facility, AuditLog } from '../types';
import { 
  Building2, 
  MapPin, 
  Plus, 
  Search, 
  Database, 
  ChevronRight, 
  CheckCircle,
  ToggleLeft,
  X,
  Gauge,
  Calculator,
  Flame,
  Zap,
  Globe,
  Droplet,
  Grid,
  List,
  Filter
} from 'lucide-react';

interface FacilitiesTabProps {
  facilities: Facility[];
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>;
  logs: AuditLog[];
  setLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;
}

export default function FacilitiesTab({
  facilities,
  setFacilities,
  logs,
  setLogs
}: FacilitiesTabProps) {
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [solarFilter, setSolarFilter] = useState<'ALL' | 'SOLAR' | 'NON_SOLAR'>('ALL');

  // New facility form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState<'Office' | 'Manufacturing' | 'Warehouse' | 'Data Center'>('Office');
  const [newSqft, setNewSqft] = useState<number>(30000);
  const [newHasSolar, setNewHasSolar] = useState(false);

  // Active facility details being edited
  const selectedFacility = facilities.find(f => f.id === selectedFacilityId) || null;

  // Local editing states for selected facility consumption
  const [editGasTherms, setEditGasTherms] = useState<number>(0);
  const [editElectricityKwh, setEditElectricityKwh] = useState<number>(0);
  const [editEmployeeCommuteMiles, setEditEmployeeCommuteMiles] = useState<number>(0);
  const [editWaterM3, setEditWaterM3] = useState<number>(0);

  // Active GHG factors
  const FACTOR_NATURAL_GAS = 5.3; // kg CO2e / Therm (Scope 1)
  const FACTOR_ELECTRICITY = 0.38; // kg CO2e / kWh (Scope 2)
  const FACTOR_COMMUTE = 0.32; // kg CO2e / Mile (Scope 3)

  // Initialize edit inputs when a facility is selected
  const handleSelectFacility = (facility: Facility) => {
    setSelectedFacilityId(facility.id);
    // Estimate components back for UI convenience
    setEditGasTherms(Math.round((facility.scope1 * 1000) / FACTOR_NATURAL_GAS));
    setEditElectricityKwh(facility.energyKwh);
    setEditEmployeeCommuteMiles(Math.round((facility.scope3 * 1000) / FACTOR_COMMUTE));
    setEditWaterM3(facility.waterM3);
  };

  // Live metric preview before saving
  const previewScope1 = (editGasTherms * FACTOR_NATURAL_GAS) / 1000;
  const previewScope2 = (editElectricityKwh * FACTOR_ELECTRICITY) / 1000;
  const previewScope3 = (editEmployeeCommuteMiles * FACTOR_COMMUTE) / 1000;
  const previewTotalFootprint = previewScope1 + previewScope2 + previewScope3;

  // Save changes to central state
  const handleSaveChanges = () => {
    if (!selectedFacility) return;

    const updatedFacilities = facilities.map(f => {
      if (f.id === selectedFacility.id) {
        return {
          ...f,
          scope1: parseFloat(previewScope1.toFixed(1)),
          scope2: parseFloat(previewScope2.toFixed(1)),
          scope3: parseFloat(previewScope3.toFixed(1)),
          energyKwh: editElectricityKwh,
          waterM3: editWaterM3
        };
      }
      return f;
    });

    setFacilities(updatedFacilities);

    // Append to audit log
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Demo Intern User',
      action: `Updated utility invoice metrics (Scope 1: ${previewScope1.toFixed(1)}t, Scope 2: ${previewScope2.toFixed(1)}t)`,
      category: 'Manual Ledger Update',
      facility: selectedFacility.name
    };
    setLogs([newLog, ...logs]);

    // Show indicator
    alert(`Metrics for ${selectedFacility.name} successfully re-calculated and pushed to central model.`);
    setSelectedFacilityId(null);
  };

  // Add facility controller
  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newLocation) return;

    const newFacility: Facility = {
      id: `fac-${Date.now()}`,
      name: newName,
      location: newLocation,
      type: newType,
      sqft: newSqft,
      scope1: 0,
      scope2: 0,
      scope3: 0,
      waterM3: 0,
      energyKwh: 0,
      hasSolar: newHasSolar,
      status: 'Onboarding'
    };

    setFacilities([...facilities, newFacility]);
    setNewName('');
    setNewLocation('');
    setShowAddModal(false);

    // Log action
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Demo Intern User',
      action: `Provisioned and onboarded new facility: "${newName}" (${newType})`,
      category: 'Onboarding',
      facility: newName
    };
    setLogs([newLog, ...logs]);
  };

  // Toggle onboarding active status
  const handleToggleStatus = (id: string) => {
    setFacilities(facilities.map(f => {
      if (f.id === id) {
        const nextStatus = f.status === 'Active' ? 'Review' : 'Active';
        return { ...f, status: nextStatus };
      }
      return f;
    }));
  };

  // Filter listings
  const filteredFacilities = facilities.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'ALL' || f.type === typeFilter;
    const matchesSolar = solarFilter === 'ALL' || 
                         (solarFilter === 'SOLAR' && f.hasSolar) || 
                         (solarFilter === 'NON_SOLAR' && !f.hasSolar);
    return matchesSearch && matchesType && matchesSolar;
  });

  return (
    <div className="space-y-6">
      {/* Tab Navigation header mimicking screenshot 4 */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-0 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="border-b-2 border-blue-600 pb-3">
            <span className="text-sm font-bold tracking-wider text-blue-600 font-sans cursor-pointer uppercase">
              Facilities
            </span>
            <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-mono font-bold rounded-full">
              {filteredFacilities.length}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pb-2">
          {/* Add Facility Button */}
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-xs uppercase tracking-wider"
          >
            <Plus size={14} />
            <span>Add Facility</span>
          </button>

          {/* Filters Toggle Button */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all border ${showFilters ? 'bg-blue-50 text-blue-700 border-blue-250 shadow-3xs' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-250 shadow-3xs'}`}
          >
            <Filter size={14} />
            <span>Filters</span>
          </button>

          {/* Grid View Select */}
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg border transition-all ${viewMode === 'grid' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-slate-400 border-slate-250 hover:bg-slate-50'}`}
            title="Grid View"
          >
            <Grid size={15} />
          </button>

          {/* List View Select */}
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg border transition-all ${viewMode === 'list' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-slate-400 border-slate-250 hover:bg-slate-50'}`}
            title="List View"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Advanced Filter Collapse Panel */}
      {showFilters && (
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase font-mono mb-1.5">Facility Type Office/Plant</label>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 p-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Operational Types</option>
              <option value="Office">Office & Corporate HQ</option>
              <option value="Manufacturing font-semibold">Manufacturing Plants</option>
              <option value="Warehouse">Distribution & Warehouses</option>
              <option value="Data Center">High Density Data Centers</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase font-mono mb-1.5">Solar Panel Integration</label>
            <select 
              value={solarFilter}
              onChange={(e) => setSolarFilter(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 p-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Energy Profiles</option>
              <option value="SOLAR">Active Solar Equipping Enabled</option>
              <option value="NON_SOLAR">Grid-Only Facilities</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase font-mono mb-1.5">Facility Scope 1 Threshold</label>
            <div className="text-xs text-slate-500 p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono">
              Dynamic threshold auditing available in active ledger below.
            </div>
          </div>
        </div>
      )}

      {/* Filter and search bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Search by facility name, city, location or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
          />
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="facilities-bento-grid">
          {filteredFacilities.map(f => {
            const totalFacScope = f.scope1 + f.scope2 + f.scope3;
            
            return (
              <div 
                key={f.id}
                className={`bg-white border text-slate-800 rounded-lg shadow-sm hover:shadow-md hover:border-slate-350 transition-all p-4.5 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${selectedFacilityId === f.id ? 'ring-2 ring-blue-600 border-transparent bg-slate-50/55' : 'border-slate-200'}`}
                onClick={() => handleSelectFacility(f)}
              >
                {f.hasSolar && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white font-extrabold text-[8px] font-mono uppercase px-2 py-0.5 rounded-bl shadow-3xs tracking-wider">
                    SOLAR
                  </div>
                )}

                <div>
                  <div className="flex items-start gap-3 mb-2.5">
                    {/* Rounded light gray avatar with building icon */}
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-150">
                      <Building2 size={18} className="text-slate-500" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-xs leading-snug tracking-tight font-sans line-clamp-2" title={f.name}>
                        {f.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 mt-1">
                        <span className="font-semibold text-slate-700">Location: </span>
                        <span>{f.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-slate-400 font-mono block uppercase text-[8px]">Gross area</span>
                      <strong className="text-slate-700 font-semibold">{f.sqft.toLocaleString()} sqft</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-mono block uppercase text-[8px]">Facility Type</span>
                      <strong className="text-slate-750 font-semibold bg-slate-100 px-1.5 py-0.5 rounded text-[9px] inline-block">
                        {f.type}
                      </strong>
                    </div>
                  </div>

                  <div className="mt-3 bg-slate-50 select-none p-2.5 rounded border border-slate-150/60 font-mono space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-450">Scope 1</span>
                      <strong className="text-slate-700 font-semibold">{f.scope1.toFixed(1)} t</strong>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-450">Scope 2</span>
                      <strong className="text-slate-700 font-semibold">{f.scope2.toFixed(1)} t</strong>
                    </div>
                    <div className="flex justify-between text-[10px] pt-1 border-t border-slate-200">
                      <span className="text-slate-600 font-bold">Total Code</span>
                      <strong className="text-blue-600 font-bold">{totalFacScope.toFixed(1)} t</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-600 uppercase tracking-wider text-[9px]">{f.status}</span>
                  </div>

                  <span className="font-bold text-blue-600 hover:underline flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Metric ledger <ChevronRight size={11} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List Mode */}
      {viewMode === 'list' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-[10px] font-bold text-slate-450 uppercase font-mono tracking-wider">
                  <th className="py-3 px-4">Facility Name & Location</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Area (sqft)</th>
                  <th className="py-3 px-4">Scope 1 Greenhouse</th>
                  <th className="py-3 px-4">Scope 2 Electricity</th>
                  <th className="py-3 px-4">Water Consumption</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-xs">
                {filteredFacilities.map(f => (
                  <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="font-bold text-slate-900">{f.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{f.location}</div>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-650">
                        {f.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono font-semibold text-slate-700">
                      {f.sqft.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-600">{f.scope1.toFixed(1)} t</td>
                    <td className="py-2.5 px-4 font-mono text-slate-600">{f.scope2.toFixed(1)} t</td>
                    <td className="py-2.5 px-4 font-mono text-slate-600">{f.waterM3.toLocaleString()} m³</td>
                    <td className="py-2.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-55 text-emerald-800 text-[9px] font-bold font-mono rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {f.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button 
                        onClick={() => handleSelectFacility(f)}
                        className="text-blue-605 font-bold hover:underline"
                      >
                        Configure
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selected Facility Energy Conversion Detail Box */}
      {selectedFacility && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md animate-slide-up space-y-6">
          <div className="flex justify-between items-start border-b border-light pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md uppercase font-mono tracking-wider">
                  GHG Protocol Formula Ledger
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 uppercase font-mono tracking-wider">Site ID: {selectedFacility.id}</span>
              </div>
              <h2 className="text-lg font-bold font-semibold text-slate-800 mt-1">
                Configure Consumption and Emissions coefficients: {selectedFacility.name}
              </h2>
            </div>
            <button 
              onClick={() => setSelectedFacilityId(null)}
              className="text-slate-450 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full"
            >
              <X size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input fields with active slider */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Gauge size={16} className="text-blue-600" />
                <span>Adjust Resource Stream Quantities:</span>
              </h3>

              {/* Natural Gas (Scope 1) */}
              <div className="border border-slate-150 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Flame size={15} className="text-orange-500" />
                    <span>NATURAL GAS (Scope 1)</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-600">
                    Factor: {FACTOR_NATURAL_GAS} kg/Therm
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <input 
                    type="range"
                    min="0"
                    max="100000"
                    step="100"
                    value={editGasTherms}
                    onChange={(e) => setEditGasTherms(parseInt(e.target.value) || 0)}
                    className="w-full accent-orange-500 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <input 
                    type="number"
                    value={editGasTherms}
                    onChange={(e) => setEditGasTherms(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-24 border border-slate-200 rounded-md px-2 py-1 text-xs text-center font-mono font-bold font-semibold text-slate-800 bg-slate-50 inline-block focus:bg-white"
                  />
                  <span className="text-xs text-slate-500 font-mono">Therms</span>
                </div>
              </div>

              {/* Electricity (Scope 2) */}
              <div className="border border-slate-150 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Zap size={15} className="text-amber-500" />
                    <span>ELECTRICITY CONSUMED (Scope 2)</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-600">
                    Factor: {FACTOR_ELECTRICITY} kg/kWh
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <input 
                    type="range"
                    min="0"
                    max="10000000"
                    step="5000"
                    value={editElectricityKwh}
                    onChange={(e) => setEditElectricityKwh(parseInt(e.target.value) || 0)}
                    className="w-full accent-amber-550 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <input 
                    type="number"
                    value={editElectricityKwh}
                    onChange={(e) => setEditElectricityKwh(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-28 border border-slate-200 rounded-md px-2 py-1 text-xs text-center font-mono font-bold font-semibold text-slate-800 bg-slate-50 inline-block focus:bg-white"
                  />
                  <span className="text-xs text-slate-500 font-mono">kWh</span>
                </div>
              </div>

              {/* Commutes (Scope 3) */}
              <div className="border border-slate-150 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Globe size={15} className="text-blue-500" />
                    <span>EMPLOYEE VEHICLE COMMUTE (Scope 3)</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-600">
                    Factor: {FACTOR_COMMUTE} kg/Mile
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <input 
                    type="range"
                    min="0"
                    max="500000"
                    step="1000"
                    value={editEmployeeCommuteMiles}
                    onChange={(e) => setEditEmployeeCommuteMiles(parseInt(e.target.value) || 0)}
                    className="w-full accent-blue-500 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <input 
                    type="number"
                    value={editEmployeeCommuteMiles}
                    onChange={(e) => setEditEmployeeCommuteMiles(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-24 border border-slate-200 rounded-md px-2 py-1 text-xs text-center font-mono font-bold font-semibold text-slate-800 bg-slate-50 inline-block focus:bg-white"
                  />
                  <span className="text-xs text-slate-500 font-mono font-normal">Miles</span>
                </div>
              </div>

              {/* Water */}
              <div className="border border-slate-150 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Droplet size={15} className="text-blue-400" />
                    <span>MUNICIPAL WATER WITHDRAWAL</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-600">
                    Unit Intake Volume Metrics
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <input 
                    type="range"
                    min="0"
                    max="50000"
                    step="100"
                    value={editWaterM3}
                    onChange={(e) => setEditWaterM3(parseInt(e.target.value) || 0)}
                    className="w-full accent-sky-400 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <input 
                    type="number"
                    value={editWaterM3}
                    onChange={(e) => setEditWaterM3(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-24 border border-slate-200 rounded-md px-2 py-1 text-xs text-center font-mono font-bold font-semibold text-slate-800 bg-slate-50 inline-block focus:bg-white"
                  />
                  <span className="text-xs text-slate-500 font-mono">m³</span>
                </div>
              </div>
            </div>

            {/* GHG Protocol live calculations side card */}
            <div className="bg-slate-550 border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-4 h-fit">
              <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 border-b border-light pb-2 uppercase tracking-wider font-mono">
                <Calculator size={15} className="text-indigo-600" />
                <span>Live GHG Output Preview</span>
              </h3>

              <div className="space-y-3">
                {/* Scope 1 Output */}
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Calculated Scope 1:</span>
                    <span className="font-mono text-slate-700">
                      {(editGasTherms * FACTOR_NATURAL_GAS).toLocaleString()} kg CO2e
                    </span>
                  </div>
                  <div className="text-right text-sm font-bold text-slate-900 font-mono">
                    {previewScope1.toFixed(2)} <span className="text-xs text-slate-400">tCO2e</span>
                  </div>
                </div>

                {/* Scope 2 Output */}
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Calculated Scope 2:</span>
                    <span className="font-mono text-slate-700">
                      {(editElectricityKwh * FACTOR_ELECTRICITY).toLocaleString()} kg CO2e
                    </span>
                  </div>
                  <div className="text-right text-sm font-bold text-slate-900 font-mono">
                    {previewScope2.toFixed(2)} <span className="text-xs text-slate-400">tCO2e</span>
                  </div>
                </div>

                {/* Scope 3 Output */}
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Calculated Scope 3:</span>
                    <span className="font-mono text-slate-700">
                      {(editEmployeeCommuteMiles * FACTOR_COMMUTE).toLocaleString()} kg CO2e
                    </span>
                  </div>
                  <div className="text-right text-sm font-bold text-slate-900 font-mono">
                    {previewScope3.toFixed(2)} <span className="text-xs text-slate-400">tCO2e</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-2 pt-3">
                  <div className="flex justify-between text-xs font-bold text-slate-650">
                    <span>AGREGATED TOTAL CO2e:</span>
                  </div>
                  <div className="text-right text-2xl font-extrabold text-blue-700 font-display leading-none mt-1">
                    {previewTotalFootprint.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-xs text-blue-500 font-mono font-normal">tCO2e</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button 
                  onClick={handleSaveChanges}
                  className="w-full bg-indigo-650 hover:bg-indigo-700 text-white font-bold bg-indigo-600 hover:bg-indigo-700 text-xs py-2.5 rounded-lg shadow-xs transition-all tracking-wider text-center block"
                >
                  Save and PUSH to Model
                </button>
                <button 
                  onClick={() => {
                    if (confirm(`Are you sure you want to toggle the status of ${selectedFacility.name}?`)) {
                      handleToggleStatus(selectedFacility.id);
                      setSelectedFacilityId(null);
                    }
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 font-bold text-[10px] py-1.5 rounded-md uppercase text-center block transition-all tracking-wider"
                >
                  Toggle Site On/Off Boarding
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Facility Dialog / Modal backdrop */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
          <form 
            onSubmit={handleAddFacility} 
            className="bg-white border border-slate-200 rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 m-4"
          >
            <div className="flex justify-between items-center border-b border-light pb-2">
              <h2 className="text-base font-bold font-display text-slate-800">Add Operational Site</h2>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-650 block">FACILITY NAME</label>
                <input 
                  type="text" 
                  placeholder="e.g. Frankfurt Warehouses"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 shadow-3xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-650 block">LOCATION / COUNTRY</label>
                <input 
                  type="text" 
                  placeholder="e.g. Frankfurt, Germany"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 shadow-3xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-650 block">FACILITY TYPE</label>
                  <select 
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 shadow-3xs"
                  >
                    <option value="Office">Office</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Data Center">Data Center</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-650 block">SIZE (SQFT)</label>
                  <input 
                    type="number"
                    required
                    value={newSqft}
                    onChange={(e) => setNewSqft(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <label className="text-xs font-bold text-slate-650 flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={newHasSolar}
                    onChange={(e) => setNewHasSolar(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 accent-blue-600"
                  />
                  <span>Equipped with solar array grid</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-550 font-semibold text-xs hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-xs transition-all"
              >
                Confirm Setup
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
