import React, { useState } from 'react';
import { ESGGoal } from '../types';
import { 
  Target, 
  Plus, 
  Flame, 
  Trash2, 
  Bot, 
  Users, 
  CheckCircle,
  HelpCircle,
  TrendingDown,
  X,
  PlusCircle,
  Calendar,
  Layers,
  FolderDot,
  Search,
  Grid,
  List,
  FolderOpen
} from 'lucide-react';

interface GoalsTabProps {
  goals: ESGGoal[];
  setGoals: React.Dispatch<React.SetStateAction<ESGGoal[]>>;
}

interface ProjectRecord {
  id: string;
  name: string;
  domain: 'Environmental' | 'Social' | 'Governance';
  budget: string;
  startDate: string;
  status: 'In Progress' | 'Planned' | 'Completed';
  carbonSaving: string;
}

export default function GoalsTab({
  goals,
  setGoals
}: GoalsTabProps) {
  const [activeSubsection, setActiveSubsection] = useState<'Goals' | 'Projects'>('Goals');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'Environment' | 'Social' | 'Governance'>('ALL');
  const [goalSearchQuery, setGoalSearchQuery] = useState('');
  
  // Create goal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Environment' | 'Social' | 'Governance'>('Environment');
  const [newTargetVal, setNewTargetVal] = useState<number>(100);
  const [newCurrentVal, setNewCurrentVal] = useState<number>(0);
  const [newUnit, setNewUnit] = useState('% reduced');
  const [newYear, setNewYear] = useState<number>(2530);
  const [newOwner, setNewOwner] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Project state
  const [projectsList, setProjectsList] = useState<ProjectRecord[]>([]);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDomain, setProjectDomain] = useState<'Environmental' | 'Social' | 'Governance'>('Environmental');
  const [projectBudget, setProjectBudget] = useState('$50,000');
  const [projectSaving, setProjectSaving] = useState('2,500 kgCO2e/yr');

  // Add goal
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const goal: ESGGoal = {
      id: `goal-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      targetValue: newTargetVal,
      currentValue: newCurrentVal,
      unit: newUnit,
      targetYear: newYear || 2030,
      owner: newOwner || 'General Corporate Board',
      status: 'Ongoing',
      notes: newNotes
    };

    setGoals([...goals, goal]);
    setNewTitle('');
    setNewNotes('');
    setShowAddModal(false);
  };

  // Add project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName) return;

    const proj: ProjectRecord = {
      id: `proj-${Date.now()}`,
      name: projectName,
      domain: projectDomain,
      budget: projectBudget,
      startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Planned',
      carbonSaving: projectSaving
    };

    setProjectsList([...projectsList, proj]);
    setProjectName('');
    setShowAddProjectModal(false);
  };

  // Adjust completion slide percentage
  const handleIncrementProgress = (id: string, amount: number) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        const nextVal = Math.min(g.targetValue, Math.max(0, g.currentValue + amount));
        const nextStatus = nextVal >= g.targetValue ? 'Completed' : 'Ongoing';
        return {
          ...g,
          currentValue: nextVal,
          status: nextStatus
        };
      }
      return g;
    }));
  };

  // Delete goal
  const handleDeleteGoal = (id: string) => {
    if (confirm("Are you sure you want to remove this sustainability objective?")) {
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project initiative?")) {
      setProjectsList(projectsList.filter(p => p.id !== id));
    }
  };

  const filteredGoals = goals.filter(g => {
    const matchesCat = selectedCategory === 'ALL' ? true : g.category === selectedCategory;
    const matchesSearch = g.title.toLowerCase().includes(goalSearchQuery.toLowerCase()) ||
                          g.owner.toLowerCase().includes(goalSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in" id="goals-tab-panel">
      {/* SECTION EXPLANATION BAR */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <span className="text-xs text-slate-500 font-mono tracking-wider block uppercase">Secretariat Targets</span>
          <h1 className="text-2xl font-bold font-display text-slate-900">Project & Goals Manager</h1>
        </div>

        <div className="flex items-center gap-2">
          {activeSubsection === 'Goals' ? (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Plus size={15} />
              <span>FORMULATE NEW TARGET</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowAddProjectModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Plus size={15} />
              <span>CREATE PROJECT</span>
            </button>
          )}
        </div>
      </div>

      {/* DUAL MODE CONTROL TAB WITH PROJECTS & GOALS */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveSubsection('Goals')}
          className={`pb-3 px-5 font-bold font-display text-sm tracking-wide border-b-2 transition-all ${activeSubsection === 'Goals' ? 'border-blue-600 text-blue-650' : 'border-transparent text-slate-450 hover:text-slate-800'}`}
        >
          Goals
        </button>
        <button
          onClick={() => setActiveSubsection('Projects')}
          className={`pb-3 px-5 font-bold font-display text-sm tracking-wide border-b-2 transition-all ${activeSubsection === 'Projects' ? 'border-blue-600 text-blue-650' : 'border-transparent text-slate-450 hover:text-slate-800'}`}
        >
          Projects
        </button>
      </div>

      {activeSubsection === 'Goals' ? (
        <div className="space-y-6">
          {/* SEARCH & FILTERS CONTROLS */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-3xs">
            {/* Goal Filters pill list */}
            <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5 text-xs font-bold w-full sm:w-auto">
              {['ALL', 'Environment', 'Social', 'Governance'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat as any)}
                  className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md font-semibold transition-all ${selectedCategory === cat ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-705'}`}
                >
                  {cat === 'ALL' ? 'All Pillars' : cat}
                </button>
              ))}
            </div>

            {/* Simple Search bar */}
            <div className="relative w-full sm:w-80">
              <input 
                type="text"
                placeholder="Search by name..."
                value={goalSearchQuery}
                onChange={(e) => setGoalSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 pl-9 text-xs font-semibold text-slate-800 outline-none"
              />
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Goals Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGoals.map(item => {
              const rawProgressPct = item.targetValue > 0 ? (item.currentValue / item.targetValue) * 100 : 0;
              const progressPct = Math.min(100, Math.max(0, Math.round(rawProgressPct)));

              return (
                <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between h-fit hover:shadow-2xs transition-all">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className={`text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-md ${item.category === 'Environment' ? 'bg-emerald-50 text-emerald-700' : item.category === 'Social' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                        {item.category} Target
                      </span>
                      
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : item.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-850 text-sm md:text-base font-semibold leading-tight">{item.title}</h3>
                      <span className="text-[10px] text-slate-400 font-mono uppercase block mt-1">Responsible Officer: {item.owner}</span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed italic bg-slate-50 p-2.5 rounded-lg border-l-2 border-slate-300">
                      {item.notes || 'No supplementary strategy briefs declared for this objective.'}
                    </p>

                    {/* Progress Indicators */}
                    <div className="space-y-1.5 pt-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Target Year: {item.targetYear}</span>
                        <span className="font-mono">{item.currentValue} / {item.targetValue} {item.unit}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${item.category === 'Environment' ? 'bg-emerald-550 bg-emerald-600' : item.category === 'Social' ? 'bg-blue-600' : 'bg-purple-600'}`}
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 block text-right">
                        CONGRUENCE COEFFICIENT: {progressPct}% COMPLETE
                      </span>
                    </div>
                  </div>

                  {/* Adjust and controls */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => handleIncrementProgress(item.id, -10)}
                        disabled={item.currentValue <= 0}
                        className="hover:bg-slate-100 border border-slate-200 text-slate-500 rounded px-2 py-1 font-bold font-mono text-[10px] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        title="Decrease Progress (10%)"
                      >
                        -10%
                      </button>
                      <button 
                        onClick={() => handleIncrementProgress(item.id, 10)}
                        disabled={item.currentValue >= item.targetValue}
                        className="hover:bg-slate-100 border border-slate-200 text-slate-500 rounded px-2 py-1 font-bold font-mono text-[10px] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        title="Increase Progress (10%)"
                      >
                        +10%
                      </button>
                    </div>

                    <button 
                      onClick={() => handleDeleteGoal(item.id)}
                      className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-slate-50 transition-all cursor-pointer"
                      title="Remove Goal"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* PROJECTS PAGE SUB-TAB matching Screenshot 8 exactly */
        <div className="space-y-6">
          {projectsList.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-xl mx-auto flex flex-col items-center justify-center space-y-5 shadow-3xs" id="empty-projects-panel">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-3xs">
                <FolderOpen size={30} />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-base font-extrabold font-display text-slate-900">
                  Let's Get Started on Your First ESG Project!
                </h3>
                <p className="text-xs text-slate-500 leading-normal max-w-md">
                  Projects help you track and manage your environmental, social, and governance initiatives. Build timelines, attach teams, and record projected carbon reduction offsets.
                </p>
              </div>

              <button
                onClick={() => setShowAddProjectModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer uppercase tracking-wider"
              >
                CREATE PROJECT
              </button>
            </div>
          ) : (
            /* Active Projects listing */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="active-projects-grid">
              {projectsList.map((p) => (
                <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between h-44 hover:shadow-2xs transition-all">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded ${
                        p.domain === 'Environmental' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        p.domain === 'Social' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        'bg-purple-50 text-purple-700 border border-purple-100'
                      }`}>
                        {p.domain}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{p.startDate}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-850 text-sm md:text-base leading-snug">{p.name}</h4>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-550 font-mono">
                    <div>
                      <span className="block text-[8px] uppercase text-slate-400 font-bold block">Carbon Savings</span>
                      <span className="font-bold text-blue-600 text-[10px]">{p.carbonSaving}</span>
                    </div>

                    <div>
                      <span className="block text-[8px] uppercase text-slate-400 font-bold block">Allocated Budget</span>
                      <span className="font-bold text-slate-700 text-[10px]">{p.budget}</span>
                    </div>

                    <button 
                      onClick={() => handleDeleteProject(p.id)}
                      className="text-slate-400 hover:text-red-500 p-1 cursor-pointer hover:bg-slate-50 rounded"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* NEW GOAL MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
          <form 
            onSubmit={handleAddGoal} 
            className="bg-white border border-slate-210 rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4 m-4"
          >
            <div className="flex justify-between items-center border-b border-light pb-2">
              <h2 className="text-xs font-bold font-display uppercase tracking-wider text-slate-800">Formulate Sustainability Objective</h2>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Objective Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Upgrade 90% space to smart LED induction"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none font-sans font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Pillar Category</label>
                  <select 
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none font-sans font-semibold text-slate-800 cursor-pointer"
                  >
                    <option value="Environment">Environment</option>
                    <option value="Social">Social</option>
                    <option value="Governance">Governance</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Target Year</label>
                  <input 
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(parseInt(e.target.value) || 2030)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 font-mono font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Current Val</label>
                  <input 
                    type="number"
                    value={newCurrentVal}
                    onChange={(e) => setNewCurrentVal(parseInt(e.target.value) || 0)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono text-slate-850"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Target Val</label>
                  <input 
                    type="number"
                    value={newTargetVal}
                    onChange={(e) => setNewTargetVal(parseInt(e.target.value) || 100)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono text-slate-850"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Unit Type</label>
                  <input 
                    type="text"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Assignee Owner Designation</label>
                <input 
                  type="text" 
                  placeholder="e.g. Morgan Vance (Energy)"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none font-sans font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Action Plan Brief</label>
                <textarea 
                  placeholder="Describe timeline metrics or strategic transitions..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none h-16 resize-none text-[11px] text-slate-700"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-1.5 border border-slate-200 rounded-lg text-slate-550 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 font-bold text-white px-4 py-1.5 rounded-lg cursor-pointer"
              >
                Create Objective
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
          <form 
            onSubmit={handleAddProject} 
            className="bg-white border border-slate-210 rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4 m-4"
          >
            <div className="flex justify-between items-center border-b border-light pb-2">
              <h2 className="text-xs font-bold font-display uppercase tracking-wider text-slate-800">Launch ESG Project Initiative</h2>
              <button 
                type="button" 
                onClick={() => setShowAddProjectModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Project Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Waluj Rooftop Solar Array Stage I"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none font-sans font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">ESG Domain Pillar</label>
                <select 
                  value={projectDomain}
                  onChange={(e: any) => setProjectDomain(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none font-sans font-semibold text-slate-800"
                >
                  <option value="Environmental">Environmental Pillar (Net-Zero, Solar, Water)</option>
                  <option value="Social">Social Pillar (Labor training, Safety, Ergonomics)</option>
                  <option value="Governance">Governance Pillar (Board Independence, Auditing)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Allocated Budget</label>
                  <input 
                    type="text"
                    required
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 font-semibold text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 font-mono uppercase block">Expected CO2 Offset</label>
                  <input 
                    type="text"
                    required
                    value={projectSaving}
                    onChange={(e) => setProjectSaving(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3">
              <button 
                type="button" 
                onClick={() => setShowAddProjectModal(false)}
                className="px-4 py-1.5 border border-slate-200 rounded-lg text-slate-550 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 font-bold text-white px-4 py-1.5 rounded-lg cursor-pointer"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

