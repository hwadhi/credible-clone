import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Building2, 
  MessageSquare, 
  Target, 
  ClipboardCheck, 
  BarChart3, 
  FileText, 
  Cpu, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Award,
  LineChart,
  Globe,
  Users,
  FolderOpen,
  BookOpen,
  LogOut,
  Eye,
  EyeOff,
  Lock,
  Mail
} from 'lucide-react';

// Types
import { Facility, ESGGoal, TaskItem, Question, AutomationRule, AuditLog } from './types';

// Mock Defaults
import { 
  initialFacilities, 
  initialGoals, 
  initialTasks, 
  initialQuestions, 
  initialAutomationRules, 
  initialAuditLogs 
} from './mockData';

// Tab components
import DashboardTab from './components/DashboardTab';
import FacilitiesTab from './components/FacilitiesTab';
import AskEvaTab from './components/AskEvaTab';
import GoalsTab from './components/GoalsTab';
import AssessmentTab from './components/AssessmentTab';
import BenchmarkingTab from './components/BenchmarkingTab';
import ReportsTab from './components/ReportsTab';
import AutomationTab from './components/AutomationTab';
import SettingsTab from './components/SettingsTab';
import AnalyticsTab from './components/AnalyticsTab';
import ESGTab from './components/ESGTab';
import DocumentsTab from './components/DocumentsTab';
import ValueChainPartnersTab from './components/ValueChainPartnersTab';

export default function App() {
  // App-wide Centralized Reactive State
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [goals, setGoals] = useState<ESGGoal[]>(initialGoals);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [rules, setRules] = useState<AutomationRule[]>(initialAutomationRules);
  const [logs, setLogs] = useState<AuditLog[]>(initialAuditLogs);
  
  // Custom Naming & Period State
  const [orgName, setOrgName] = useState('AJANTA PHARMA LTD');
  const [activePeriod, setActivePeriod] = useState('FY2026');

  // Navigation Panel Controls
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lifted Profile / Personal Info State
  const [personalInfo, setPersonalInfo] = useState(() => {
    const cached = localStorage.getItem('credibl_user_personal_profile');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
    return {
      firstName: 'Jamie',
      lastName: 'Taylor',
      designation: 'IT Infrastructure & ESG Audit Lead',
      email: 'jamie.taylor@sustaincorp.com',
      contactNo: '+1 202 555 0199',
      currentPassword: 'sustainability99'
    };
  });

  // Authentication & Session States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('jamie.taylor@sustaincorp.com');
  const [loginPassword, setLoginPassword] = useState('sustainability99');
  const [loginStep, setLoginStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcomeBackToast, setShowWelcomeBackToast] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportForm, setSupportForm] = useState({ subject: '', priority: 'Medium', message: '' });
  const [ticketRaisedRef, setTicketRaisedRef] = useState<string | null>(null);

  // Restore defaults
  const handleResetData = () => {
    setFacilities(initialFacilities);
    setGoals(initialGoals);
    setTasks(initialTasks);
    setQuestions(initialQuestions);
    setRules(initialAutomationRules);
    setLogs(initialAuditLogs);
    setOrgName('AJANTA PHARMA LTD');
    setActivePeriod('FY2026');
    setActiveTab('dashboard');
    alert('System datasets successfully refreshed to original baseline specifications. Logged in session stays active.');
  };

  // Sidebar link map with sublabels for hover descriptions
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', description: 'Carbon score & ESG overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', description: 'Visual emissions profiling', icon: LineChart },
    { id: 'esg', label: 'ESG', description: 'Audit compliance index metrics', icon: Globe },
    { id: 'facilities', label: 'Facilities', description: 'Manage utility meters & areas', icon: Building2 },
    { id: 'goals', label: 'Project & Goals', description: 'Sustainability targets & pathways', icon: Target },
    { id: 'eva', label: 'Ask Eva', description: 'AI assistant carbon analyst', icon: MessageSquare, badge: 'Gemini' },
    { id: 'benchmarking', label: 'Benchmarking', description: 'Compare peer & site scores', icon: BarChart3 },
    { id: 'value-chain-partners', label: 'Value Chain Partners', description: 'Disperse vendor questionnaires', icon: Users },
    { id: 'reports', label: 'Reports', description: 'Publish audit-ready pdf files', icon: FileText },
    { id: 'documents', label: 'Documents', description: 'Secure bill & filing storage', icon: FolderOpen },
    { id: 'automation', label: 'Automation', description: 'Background alert rules & logs', icon: Cpu },
    { id: 'settings', label: 'Settings', description: 'Configure corporate details', icon: Settings }
  ];

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginStep === 1) {
      setLoginStep(2);
    } else {
      setIsAuthenticated(true);
      setShowWelcomeBackToast(true);
      setTimeout(() => {
        setShowWelcomeBackToast(false);
      }, 5000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full relative flex items-center justify-center bg-slate-950 font-sans text-slate-800 antialiased overflow-hidden">
        {/* Background sunbeams filtering through rich green forest display */}
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
          <img 
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85"
            alt="Majestic Forest Sunbeams Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-102 opacity-55 transition-all duration-1000 select-none pointer-events-none"
          />
          {/* Subtle radial center lighting accent */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] opacity-80"></div>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/85 to-slate-900/40 z-0"></div>

        {/* credibl Floating Brand Logo top left */}
        <div className="absolute top-8 left-8 flex items-center gap-2 select-none z-15">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50,10 A 40,40 0 0 0 50,90 A 30,30 0 0 1 50,10" fill="#ffffff" />
            <path d="M 50,22 A 28,28 0 0 1 50,78 A 18,18 0 0 0 50,22" fill="#2563eb" />
          </svg>
          <span className="font-sans font-black text-white text-xl tracking-tight">credibl</span>
        </div>

        {/* Floating background decorative indicators */}
        <div className="absolute bottom-8 left-8 text-slate-400 text-[11px] font-mono select-none hidden md:block">
          <span>PORT: 3000 // SYSTEM_SECURE_SSL // RECONFIGURED FOR AJANTA PHARMA</span>
        </div>

        {/* Login White Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[400px] mx-4 bg-white rounded-xl shadow-2xl p-8 border border-slate-100"
        >
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-extrabold text-slate-900 font-sans tracking-tight">
              Sign in to your account
            </h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-snug">
              Secure governance portal managed by CREDIBL ESG engine
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginStep === 1 ? (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <Mail size={16} />
                    </span>
                    <input 
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@organization.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 block text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center mt-3 cursor-pointer"
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {/* Prefilled email card back button */}
                <div className="bg-slate-50 border border-slate-150 p-2.5 rounded-lg flex items-center justify-between">
                  <div className="truncate pr-2">
                    <span className="text-[10px] text-slate-400 font-mono block leading-none">WELCOME BACK</span>
                    <span className="text-xs font-bold text-slate-700 truncate block mt-0.5">{loginEmail}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setLoginStep(1)}
                    className="text-[10px] font-extrabold text-blue-600 hover:underline px-2 py-1 bg-white border border-slate-200 rounded-md shrink-0 cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Password
                    </label>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] font-bold text-blue-600 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <Lock size={16} />
                    </span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 block text-slate-800"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-650 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input 
                    id="remember_me"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-xs font-semibold text-slate-600 select-none cursor-pointer">
                    Remember me for 30 days
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center mt-3 cursor-pointer"
                >
                  Sign in with Password
                </button>
              </div>
            )}
          </form>

          <div className="text-center mt-6 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400">New User? </span>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-bold text-blue-650 hover:underline">
              Signup
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-850 antialiased overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* ─── GLOBAL PRO TOPBAR ────────────────────────────────── */}
      <header className="h-14 bg-white border-b border-slate-200 sticky top-0 z-40 px-4 flex items-center justify-between shadow-xs select-none">
        
        {/* Left Side Branding Split - credibl & Ajanta Pharma */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger controls */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800"
            title="Toggle Menu"
          >
            <Menu size={18} />
          </button>

          {/* credibl Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" className="shrink-0">
              <path d="M 50,10 A 40,40 0 0 0 50,90 A 30,30 0 0 1 50,10" fill="#09090b" />
              <path d="M 50,22 A 28,28 0 0 1 50,78 A 18,18 0 0 0 50,22" fill="#2563eb" />
            </svg>
            <span className="font-sans font-extrabold text-slate-900 text-[18px] tracking-tight">credibl</span>
          </div>

          {/* Separator line */}
          <div className="h-6 w-px bg-slate-250 mx-1"></div>

          {/* Client Logo & Name (Ajanta Pharma Ltd) */}
          <div className="flex items-center gap-2 select-none">
            {/* Custom vector representation of Ajanta blue infinity-orbit symbol */}
            <svg width="22" height="14" viewBox="0 0 80 50" className="shrink-0">
              <path d="M 20,25 C 20,10 40,10 40,25 C 40,40 60,40 60,25 C 60,10 40,10 40,25 C 40,40 20,40 20,25 Z" fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
              <circle cx="40" cy="25" r="4" fill="#1d4ed8" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">CLIENT SYSTEM</span>
              <span className="text-[10px] text-slate-800 font-extrabold tracking-tight uppercase leading-none mt-0.5">AJANTA PHARMA LTD</span>
            </div>
          </div>
        </div>

        {/* Right Info User - Jamie Taylor in custom layout */}
        <div className="flex items-center gap-3">
          {/* Active Period Pill */}
          <div className="hidden md:flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-wider text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>PERIOD: {activePeriod}</span>
          </div>

          {/* Book / Notebook help center shortcut */}
          <button 
            onClick={() => {
              alert(`AJANTA PHARMA LTD Core ESG Registry. Current Local UTC Time is logged: ${new Date().toISOString()}`);
            }}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
            title="Docs Center"
          >
            <HelpCircle size={15} />
          </button>

          {/* Vertical divider */}
          <div className="h-4 w-px bg-slate-200"></div>

          {/* User Account Panel with dynamic avatar initials and name */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-200 px-3 py-1.5 rounded-lg text-xs select-none">
              <BookOpen size={13} className="text-slate-400" />
              <span className="font-bold text-slate-800">{personalInfo.firstName} {personalInfo.lastName}</span>
              {/* Colored Avatar */}
              <div className="w-6 h-6 rounded-full bg-fuchsia-700 text-white font-extrabold text-[10px] font-mono flex items-center justify-center select-none shadow-3xs ml-1 shrink-0 uppercase">
                {(personalInfo.firstName[0] || '') + (personalInfo.lastName[0] || '')}
              </div>
            </div>

            {/* Logout controls */}
            <button 
              onClick={() => {
                if(confirm('Are you sure you want to sign out?')) {
                  setIsAuthenticated(false);
                  setLoginStep(1);
                }
              }}
              className="p-2 hover:bg-red-50 hover:text-red-650 text-slate-400 rounded-lg transition-colors"
              title="Logout session"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── SHELL CONTAINER BODY ───────────────────────── */}
      <div className="flex-1 flex min-h-0 relative">
        
        {/* COLLAPSIBLE DESKTOP SIDEBAR */}
        <aside 
          className={`hidden md:flex flex-col justify-between bg-white border-r border-slate-200 sticky top-14 h-[calc(100vh-56px)] shrink-0 transition-all duration-200 ${sidebarCollapsed ? 'w-16' : 'w-56'}`}
          id="sidebar-panel"
        >
          {/* Navigation link stacks */}
          <nav className="p-3 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full p-2 rounded-lg flex items-center gap-3 transition-all relative group text-left ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-blue-605 hover:bg-slate-50'}`}
                >
                  <Icon size={16} className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`} />
                  
                  {!sidebarCollapsed && (
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-xs leading-normal">
                        {item.label}
                      </span>
                      <span className={`text-[9px] font-semibold leading-none mt-0.5 transition-colors duration-150 truncate max-w-[155px] ${isActive ? 'text-blue-100' : 'text-slate-400 group-hover:text-slate-500'}`}>
                        {item.description}
                      </span>
                    </div>
                  )}

                  {/* Sidebar Badge (for Gemini etc.) */}
                  {!sidebarCollapsed && item.badge && (
                    <span className="ml-auto text-[8px] font-extrabold font-mono tracking-wider bg-blue-500 text-white px-1.5 py-0.5 rounded-sm uppercase shrink-0">
                      {item.badge}
                    </span>
                  )}

                  {/* Hover indicator tooltip when collapsed */}
                  {sidebarCollapsed && (
                    <div className="absolute left-16 bg-slate-900 text-white text-[10px] font-semibold rounded-md px-3 py-2 shadow-md scale-0 group-hover:scale-100 origin-left transition-all duration-150 z-50 whitespace-nowrap pointer-events-none">
                      <div className="font-bold text-[11px]">{item.label}</div>
                      <div className="text-[9px] text-slate-400 font-normal mt-0.5">{item.description}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Toggle sidebar state controls */}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="border-t border-slate-150 p-3 hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-700 transition-colors cursor-pointer text-xs font-bold font-mono tracking-widest gap-2"
          >
            {sidebarCollapsed ? <ChevronRight size={15} /> : <><ChevronLeft size={15} /> <span>COLLAPSE</span></>}
          </button>
        </aside>

        {/* MOBILE MENU NAV DRAWER OVERLAY */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900"
              />

              {/* Drawer Container */}
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="fixed inset-y-0 left-0 bg-white shadow-xl max-w-xs w-64 flex flex-col justify-between z-50"
              >
                <div className="p-4 space-y-4">
                  {/* Brand close */}
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-extrabold text-slate-800 tracking-tight text-sm uppercase">
                      CREDIBL ESG
                    </span>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-slate-400 hover:text-slate-650"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <nav className="space-y-1">
                    {menuItems.map(item => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full min-h-9 p-2.5 rounded-lg flex items-center gap-3 font-semibold text-xs relative ${isActive ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-550 hover:text-slate-800'}`}
                        >
                          <Icon size={16} />
                          <div className="flex flex-col text-left">
                            <span>{item.label}</span>
                            <span className="text-[9px] font-normal text-slate-400 leading-none mt-0.5">{item.description}</span>
                          </div>
                          {item.badge && (
                            <span className="ml-auto text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-mono font-bold">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="p-4 border-t border-slate-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">
                    Auditor Roster Active
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MAIN BODY FRAMEWORK */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f8fafc] relative min-w-0" id="main-content-flow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {activeTab === 'dashboard' && (
                <DashboardTab 
                  facilities={facilities}
                  goals={goals}
                  tasks={tasks}
                  questions={questions}
                  activePeriod={activePeriod}
                  setActivePeriod={setActivePeriod}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsTab />
              )}

              {activeTab === 'esg' && (
                <ESGTab />
              )}

              {activeTab === 'facilities' && (
                <FacilitiesTab 
                  facilities={facilities}
                  setFacilities={setFacilities}
                  logs={logs}
                  setLogs={setLogs}
                />
              )}

              {activeTab === 'goals' && (
                <GoalsTab 
                  goals={goals}
                  setGoals={setGoals}
                />
              )}

              {activeTab === 'eva' && (
                <AskEvaTab />
              )}

              {activeTab === 'benchmarking' && (
                <BenchmarkingTab 
                  facilities={facilities}
                />
              )}

              {activeTab === 'value-chain-partners' && (
                <ValueChainPartnersTab />
              )}

              {activeTab === 'reports' && (
                <ReportsTab />
              )}

              {activeTab === 'documents' && (
                <DocumentsTab />
              )}

              {activeTab === 'automation' && (
                <AutomationTab 
                  rules={rules}
                  setRules={setRules}
                  logs={logs}
                  setLogs={setLogs}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsTab 
                  orgName={orgName}
                  setOrgName={setOrgName}
                  onResetData={handleResetData}
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Persistent Capsule Support Button representing Screenshot 2 */}
      {isAuthenticated && (
        <button 
          onClick={() => {
            setIsSupportOpen(true);
            setTicketRaisedRef(null);
          }}
          className="fixed bottom-4 right-4 z-40 bg-[#0f2d59] text-white hover:bg-[#071d3d] px-4.5 py-2.5 rounded-full flex items-center gap-2 text-xs font-bold font-sans shadow-lg select-none cursor-pointer transition-all hover:scale-105 active:scale-95 border border-[#1d3d6d]"
          id="ap-support-button"
        >
          <HelpCircle size={15} strokeWidth={2.5} className="text-white shrink-0 animate-bounce" />
          <span>Support</span>
        </button>
      )}

      {/* Interactive Support Popover Modal Overlay */}
      <AnimatePresence>
        {isSupportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSupportOpen(false)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs"
            />

            {/* Modal Dialog Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-[450px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            >
              {/* Header */}
              <div className="bg-[#0f2d59] p-5 text-white flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-blue-300 animate-pulse" />
                  <div>
                    <h3 className="font-extrabold text-sm tracking-tight">AJANTA ESG Support</h3>
                    <p className="text-[10px] text-slate-300 mt-0.5">Submit technical audit or disclosure queries</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSupportOpen(false)}
                  className="w-7 h-7 rounded-full bg-black/15 hover:bg-black/25 text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Form Content body */}
              <div className="p-6">
                {ticketRaisedRef ? (
                  <div className="text-center py-6 space-y-4 animate-fade-in">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <span className="text-xl font-bold">✓</span>
                    </div>
                    <div className="space-y-1.5 h-auto">
                      <h4 className="font-black text-slate-850 text-sm">Support Ticket Logged!</h4>
                      <p className="text-xs text-slate-450 max-w-sm mx-auto leading-relaxed">
                        Your inquiry has been cataloged under reference ID <strong className="text-blue-600 font-mono font-bold leading-normal">{ticketRaisedRef}</strong>. An Ajanta IT architect will contact you.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button 
                        onClick={() => setIsSupportOpen(false)}
                        className="bg-[#0f2d59] hover:bg-[#071d3d] text-white font-bold text-xs px-5 py-2 rounded-lg cursor-pointer transition-colors shadow-3xs"
                      >
                        Dismiss Portal
                      </button>
                    </div>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Generate ticket ref AP-XXXXX
                      const randomRef = 'AP-' + Math.floor(10000 + Math.random() * 90000);
                      setTicketRaisedRef(randomRef);
                      // Clear form
                      setSupportForm({ subject: '', priority: 'Medium', message: '' });
                    }}
                    className="space-y-4 text-xs font-sans"
                  >
                    
                    {/* Logged user email (disabled for transparency) */}
                    <div>
                      <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wide mb-1.5">User Context</label>
                      <input 
                        type="text" 
                        disabled 
                        value={personalInfo.email}
                        className="w-full bg-slate-50 border border-slate-150 rounded-lg px-3 py-2 font-mono text-slate-450 outline-none"
                      />
                    </div>

                    {/* Subject Line */}
                    <div>
                      <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wide mb-1.5">Subject</label>
                      <input 
                        type="text" 
                        required
                        value={supportForm.subject}
                        onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                        placeholder="e.g. Discrepancy in Dahej Stationary Combustion factor"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold placeholder:text-slate-350 focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>

                    {/* Priority select */}
                    <div>
                      <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wide mb-1.5">Seveirty Priority</label>
                      <select 
                        value={supportForm.priority}
                        onChange={(e) => setSupportForm({ ...supportForm, priority: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 font-bold focus:outline-none focus:border-blue-500 font-sans cursor-pointer"
                      >
                        <option value="Low">Low - Informational Query</option>
                        <option value="Medium">Medium - Standard Audit Assistance</option>
                        <option value="High">High - Missing Utility Logs</option>
                        <option value="Urgent">Urgent - Legislative Filing Deadline Block</option>
                      </select>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wide mb-1.5">Description details</label>
                      <textarea 
                        required
                        rows={3}
                        value={supportForm.message}
                        onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                        placeholder="Please supply any meter coordinates, error prompts, or timeline targets clearly..."
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium placeholder:text-slate-350 focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>

                    {/* Action controls */}
                    <div className="flex gap-2.5 justify-end pt-2">
                      <button 
                        type="button"
                        onClick={() => setIsSupportOpen(false)}
                        className="border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-50 text-slate-650 font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="bg-[#0f2d59] hover:bg-[#071d3d] text-white rounded-lg px-5 py-2 font-black transition-colors shadow-xs cursor-pointer"
                      >
                        File Ticket
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Welcome Back Toast Popup matching Screenshot 2 design */}
      <AnimatePresence>
        {showWelcomeBackToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-750 font-semibold text-xs"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs select-none">
              ✓
            </div>
            <span>Welcome back, {personalInfo.firstName} {personalInfo.lastName}! System metrics synchronized successfully.</span>
            <button 
              onClick={() => setShowWelcomeBackToast(false)}
              className="ml-3 hover:text-slate-300 text-slate-450 text-[11px] font-mono leading-none font-bold"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
