import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Building, 
  Globe, 
  ShieldCheck, 
  Trash2, 
  FolderSync, 
  Database,
  Calendar,
  Lock,
  User,
  Users,
  Search,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  Key,
  Mail,
  Phone,
  Briefcase,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  X,
  RefreshCw,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, doc, writeBatch, setDoc, updateDoc, getDocs, onSnapshot } from 'firebase/firestore';

interface SettingsTabProps {
  orgName: string;
  setOrgName: (name: string) => void;
  onResetData: () => void;
  personalInfo: {
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
    contactNo: string;
    currentPassword: string;
  };
  setPersonalInfo: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
    contactNo: string;
    currentPassword: string;
  }>>;
}

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'On boarded' | 'Inactive';
}

export default function SettingsTab({
  orgName,
  setOrgName,
  onResetData,
  personalInfo,
  setPersonalInfo
}: SettingsTabProps) {
  // Navigation Section (subTab)
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'users'>('profile');

  // PROFILE sub-section states
  const [tempOrgName, setTempOrgName] = useState(orgName);
  const [orgSector, setOrgSector] = useState('Pharmaceuticals & Life Sciences');
  const [orgHQ, setOrgHQ] = useState('Mumbai, Maharashtra, India');
  const [orgEcosystem, setOrgEcosystem] = useState('Consolidated Audit Basis');

  const [showPassword, setShowPassword] = useState(false);

  // USERS sub-section states
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'On boarded' as const
  });

  // Sync / Load Initial Users
  useEffect(() => {
    // Generate the 49 compliance audit participants from the screenshot + extra realistic ones to match the screenshot count
    const screenshotUsers: UserRecord[] = [
      { id: '1', name: 'LIAM JOHNSON', email: 'liam.johnson@sustaincorp.com', role: 'User', status: 'On boarded' },
      { id: '2', name: 'OLIVIA SMITH', email: 'olivia.smith@sustaincorp.com', role: 'User', status: 'On boarded' },
      { id: '3', name: 'NOAH WILLIAMS', email: 'noah.williams@veritas-audit.org', role: 'User', status: 'On boarded' },
      { id: '4', name: 'EMMA BROWN', email: 'emma.brown@veritas-audit.org', role: 'User', status: 'On boarded' },
      { id: '5', name: 'OLIVER JONES', email: 'oliver.jones@sustaincorp.com', role: 'User', status: 'On boarded' },
      { id: '6', name: 'AVA GARCIA', email: 'ava.garcia@sustaincorp.com', role: 'User', status: 'On boarded' },
      { id: '7', name: 'ELIJAH MILLER', email: 'esg@compliance-esg.net', role: 'User', status: 'On boarded' },
      { id: '8', name: 'CHARLOTTE DAVIS', email: 'charlotte.davis@sustaincorp.com', role: 'User', status: 'On boarded' },
      { id: '9', name: 'WILLIAM RODRIGUEZ', email: 'william.rodriguez@sustaincorp.com', role: 'User', status: 'On boarded' },
      { id: '10', name: 'SOPHIA MARTINEZ', email: 'sophia.martinez@sustaincorp.com', role: 'User', status: 'On boarded' }
    ];

    // Seed realistic names to reach exactly 49 results to match "Showing 1 to 10 of 49 results"
    const additionalNames = [
      'James Hernandez', 'Amelia Lopez', 'Benjamin Gonzalez', 'Isabella Wilson', 'Lucas Anderson',
      'Mia Thomas', 'Henry Taylor', 'Evelyn Moore', 'Alexander Jackson', 'Harper Martin',
      'Michael Lee', 'Amara Patel', 'David Thompson', 'Luna White', 'Danielle Harris',
      'Joseph Sanchez', 'Ella Clark', 'Samuel Ramirez', 'Elena Lewis', 'Jack Robinson',
      'Chloe Walker', 'Owen Young', 'Aria Allen', 'Sebastian King', 'Zoey Wright',
      'Matthew Scott', 'Grace Torres', 'John Nguyen', 'Nora Hill', 'Luke Flores',
      'Lily Green', 'Gabriel Adams', 'Zoe Nelson', 'Carter Baker', 'Hannah Hall',
      'Wyatt Rivera', 'Mila Campbell', 'Dylan Mitchell', 'Avery Carter'
    ];

    const generatedUsers: UserRecord[] = [...screenshotUsers];
    additionalNames.forEach((name, index) => {
      const emailName = name.toLowerCase().replace(/\s+/g, '.');
      generatedUsers.push({
        id: `gen-${index + 11}`,
        name: name.toUpperCase(),
        email: `${emailName}@sustaincorp.com`,
        role: index % 4 === 0 ? 'Admin' : index % 3 === 0 ? 'Auditor' : 'User',
        status: (index === 3 || index === 8) ? 'Inactive' : 'On boarded'
      });
    });

    // Check localStorage fallback
    const cachedUsers = localStorage.getItem('smartease_governed_users');
    if (cachedUsers) {
      try {
        setUsers(JSON.parse(cachedUsers));
      } catch (e) {
        setUsers(generatedUsers);
      }
    } else {
      setUsers(generatedUsers);
      localStorage.setItem('smartease_governed_users', JSON.stringify(generatedUsers));
    }

    // Try loading from Firebase if configured
    if (isFirebaseConfigured && db) {
      const fetchFirebaseUsers = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'users'));
          if (!snapshot.empty) {
            const firebaseList: UserRecord[] = [];
            snapshot.forEach(doc => {
              firebaseList.push(doc.data() as UserRecord);
            });
            setUsers(firebaseList);
          } else {
            // Seed firebase
            const batch = writeBatch(db);
            generatedUsers.slice(0, 15).forEach(user => {
              const uRef = doc(db, 'users', user.id);
              batch.set(uRef, user);
            });
            await batch.commit();
          }
        } catch (err) {
          console.error("Failed to seed firebase users:", err);
        }
      };
      fetchFirebaseUsers();
    }
  }, []);

  // Sync users to LocalStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('smartease_governed_users', JSON.stringify(users));
    }
  }, [users]);

  // Handle Org Demographics update
  const handleUpdateOrgSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempOrgName.trim()) return;
    setOrgName(tempOrgName);
    alert('Organization settings saved successfully in operational context.');
  };

  // Handle personal profile details update
  const handleUpdateMyProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('smartease_user_personal_profile', JSON.stringify(personalInfo));
    alert('Personal information & authentication safeguards saved successfully.');
  };

  // Action: Toggle onboard/inactive state
  const handleToggleUserStatus = async (userId: string) => {
    const updated = users.map(user => {
      if (user.id === userId) {
        const nextStatus = user.status === 'On boarded' ? 'Inactive' as const : 'On boarded' as const;
        return { ...user, status: nextStatus };
      }
      return user;
    });
    setUsers(updated);

    // Save in Firebase if configured
    if (isFirebaseConfigured && db) {
      try {
        const u = updated.find(user => user.id === userId);
        if (u) {
          await setDoc(doc(db, 'users', userId), u, { merge: true });
        }
      } catch (err) {
        console.error("Firebase status sync failed:", err);
      }
    }
  };

  // Action: Onboard New User Form Submit
  const handleOnboardUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.name.trim() || !newUserData.email.trim()) return;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newUserData.email)) {
      alert("Please provide a valid official email address.");
      return;
    }

    const newUser: UserRecord = {
      id: `usr-${Date.now()}`,
      name: newUserData.name.toUpperCase().trim(),
      email: newUserData.email.toLowerCase().trim(),
      role: newUserData.role,
      status: newUserData.status
    };

    const updated = [newUser, ...users];
    setUsers(updated);
    setShowOnboardModal(false);
    // Reset Form Input
    setNewUserData({ name: '', email: '', role: 'User', status: 'On boarded' });

    alert(`Successfully onboarded compliance user ${newUser.name}.`);

    // Sync to Firestore
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'users', newUser.id), newUser);
      } catch (err) {
        console.error("Firebase write failed during onboarding:", err);
      }
    }
  };

  // Filter users based on query
  const filteredUsers = users.filter(user => {
    const term = searchQuery.toLowerCase().trim();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  // Calculate pagination variables
  const totalCount = filteredUsers.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  // Handle Page Selector changes
  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  // Reset page position if search updates or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, pageSize]);

  return (
    <div className="space-y-6" id="settings-tab-panel">
      
      {/* Settings Navigation Sub-Tabs matching Screenshot Header */}
      <div className="border-b border-slate-200 bg-white -mx-6 -mt-6 px-6 pt-5 pb-0 flex items-center justify-between select-none shadow-3xs">
        <div className="flex gap-8">
          <button 
            onClick={() => setActiveSubTab('profile')}
            className={`pb-3 text-[11px] font-bold tracking-widest uppercase transition-all relative cursor-pointer ${
              activeSubTab === 'profile' 
                ? 'text-blue-600 font-extrabold border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            PROFILE
          </button>
          <button 
            onClick={() => setActiveSubTab('users')}
            className={`pb-3 text-[11px] font-bold tracking-widest uppercase transition-all relative sorted-users-tab cursor-pointer ${
              activeSubTab === 'users' 
                ? 'text-blue-600 font-extrabold border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            USERS
          </button>
        </div>

        {/* Integration indicators */}
        <div className="pb-3 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
          <Database size={11} className={isFirebaseConfigured ? 'text-emerald-500 animate-pulse' : 'text-slate-300'} />
          <span>FIREBASE STATUS: {isFirebaseConfigured ? 'CONNECTED' : 'STANDBY'}</span>
        </div>
      </div>

      {/* SUBTAB 1: PROFILE SECTION */}
      {activeSubTab === 'profile' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <span className="text-xs text-slate-400 font-mono tracking-widest block uppercase">Compliance Domain</span>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Governance Settings & Profile</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1 & 2: Forms */}
            <div className="lg:col-span-2 space-y-6">

              {/* Personal Information (My Profile) Form */}
              <form onSubmit={handleUpdateMyProfile} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                    <User size={16} className="text-blue-600" />
                    <span>My Profile (Personal Information)</span>
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">Control your technical auditor credentials and contact records</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 bg-white font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Last Name</label>
                    <input 
                      type="text" 
                      required
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 bg-white font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Designation</label>
                    <input 
                      type="text" 
                      required
                      value={personalInfo.designation}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, designation: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 bg-white font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Official Email ID</label>
                    <input 
                      type="email" 
                      required
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 bg-white font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Contact No</label>
                    <input 
                      type="text" 
                      required
                      value={personalInfo.contactNo}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, contactNo: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 bg-white font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Current Account Password</label>
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[10px] font-semibold text-blue-600 hover:underline"
                      >
                        {showPassword ? 'Hide' : 'Reveal'}
                      </button>
                    </div>
                    <div className="relative">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        required
                        value={personalInfo.currentPassword}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, currentPassword: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 bg-white font-mono font-semibold focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save size={14} />
                    <span>Save My Profile</span>
                  </button>
                </div>
              </form>

              {/* Corporate Demographics (Org Settings) Form */}
              <form onSubmit={handleUpdateOrgSettings} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                    <Building size={16} className="text-blue-600" />
                    <span>Organization Settings (Company Demographics)</span>
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">Define corporate entity dimensions and BRSR report labels</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Corporate Title</label>
                    <input 
                      type="text" 
                      required
                      value={tempOrgName}
                      onChange={(e) => setTempOrgName(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 bg-white font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Principal Industry Sector</label>
                    <select 
                      value={orgSector}
                      onChange={(e) => setOrgSector(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none font-semibold text-slate-850 cursor-pointer"
                    >
                      <option value="Pharmaceuticals & Life Sciences">Pharmaceuticals & Life Sciences</option>
                      <option value="Chemical Manufacturing">Chemical Manufacturing</option>
                      <option value="Heavy Engineering & Metals">Heavy Engineering & Metals</option>
                      <option value="Information Systems & Tech">Information Systems & Tech</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Principal Operations HQ</label>
                    <input 
                      type="text" 
                      required
                      value={orgHQ}
                      onChange={(e) => setOrgHQ(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 bg-white font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Regulatory Assurance Perimeter</label>
                    <input 
                      type="text" 
                      disabled
                      value={orgEcosystem}
                      className="w-full border border-slate-200 bg-slate-50 text-slate-400 rounded-lg px-3 py-2 font-mono text-[10px]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button 
                    type="submit"
                    className="bg-[#0f2d59] hover:bg-[#071d3d] text-white font-bold text-xs px-5 py-2 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Building size={14} />
                    <span>Update Corporate Profile</span>
                  </button>
                </div>
              </form>

            </div>

            {/* Column 3: Credentials and Danger zones */}
            <div className="space-y-6">
              
              {/* API and Integration details */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Key size={14} className="text-indigo-500" />
                  <span>Integration Keys</span>
                </h3>

                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-150 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-700">GEMINI_API_KEY</span>
                    <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">LIVE</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                    Configured server-side to coordinate Ask Eva (Gemini 3.5 Flash) without security disclosures.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-150 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-700">FIRESTORE_DB</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${isFirebaseConfigured ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {isFirebaseConfigured ? 'ACTIVE' : 'STANDBY'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                    {isFirebaseConfigured 
                      ? 'Durable cloud-sync enabled for chat logs and on-boarded system users.'
                      : 'Standby mode. Complete firebase console agreement from the workspace to initiate live sync.'
                    }
                  </p>
                </div>
              </div>

              {/* Data Purge Controls */}
              <div className="bg-red-50/40 border border-red-200 rounded-xl p-6 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                  <Trash2 size={15} />
                  <span>Administrative Actions</span>
                </h3>
                <p className="text-[10px] text-red-700 leading-normal">
                  Resynchronize all global greenhouse indices, factory units, goals, and alert settings to default baseline values.
                </p>
                <button 
                  type="button"
                  onClick={() => {
                    if (confirm("Executing factory clean resets is immediate and irreversible. Clear user lists and restore data packages?")) {
                      localStorage.removeItem('smartease_governed_users');
                      onResetData();
                      window.location.reload();
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 rounded-lg shadow-2xs transition-all cursor-pointer"
                >
                  Factory Clean Reset Datasets
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: USERS SECTION */}
      {activeSubTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden pb-4 space-y-0.5 animate-fade-in" id="users-tab-panel">
          
          {/* Top Panel Controls Header containing search bar & onboard user button matching SS */}
          <div className="px-6 py-5 border-b border-slate-150 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
            
            {/* Search Input Filter */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <Search size={15} />
              </span>
              <input 
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/30 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs font-semibold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-sans"
              />
            </div>

            {/* "ONBOARD USER" Button with Chevron dropdown matching the layout in SS */}
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => setShowOnboardModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4.5 py-2.5 rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>ONBOARD USER</span>
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Users Table matching the screenshot Columns, Icons, and Switch Actions */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans text-slate-700">
              <thead>
                <tr className="bg-slate-50/70 text-slate-450 text-[10px] font-mono tracking-wider border-b border-slate-150 select-none uppercase">
                  <th className="px-6 py-3.5 font-bold">Name</th>
                  <th className="px-6 py-3.5 font-bold">Email</th>
                  <th className="px-6 py-3.5 font-bold">Role</th>
                  <th className="px-6 py-3.5 font-bold">Status</th>
                  <th className="px-6 py-3.5 font-bold text-right pr-12">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                      No matching registered auditors or stakeholders located in registry list.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className="hover:bg-slate-50/50 transition-colors animate-fade-in group"
                    >
                      {/* Name column */}
                      <td className="px-6 py-4.5">
                        <span className="text-slate-900 font-extrabold tracking-tight block">
                          {user.name}
                        </span>
                      </td>

                      {/* Email column */}
                      <td className="px-6 py-4.5 font-medium text-slate-550 lowercase">
                        {user.email}
                      </td>

                      {/* Role column */}
                      <td className="px-6 py-4.5 text-slate-650">
                        {user.role}
                      </td>

                      {/* Status Check indicator matching SS */}
                      <td className="px-6 py-4.5 select-none">
                        {user.status === 'On boarded' ? (
                          <span className="flex items-center gap-1.5 text-blue-600 font-bold text-[11px]">
                            <svg className="w-4 h-4 text-blue-500 fill-blue-50" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
                            </svg>
                            <span>On boarded</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-slate-450 font-medium text-[11px]">
                            <AlertCircle size={14} className="text-slate-400" />
                            <span>Inactive</span>
                          </span>
                        )}
                      </td>

                      {/* Switch and toggle match SS */}
                      <td className="px-6 py-4.5 text-right pr-12 select-none">
                        <div className="flex justify-end">
                          <button 
                            type="button"
                            onClick={() => handleToggleUserStatus(user.id)}
                            className="focus:outline-none transition-transform active:scale-95 cursor-pointer text-blue-600 hover:text-blue-700"
                            title="Toggle User Onboard Status"
                          >
                            {user.status === 'On boarded' ? (
                              <svg className="w-11 h-6 text-blue-600" viewBox="0 0 44 24" fill="none">
                                <rect width="44" height="24" rx="12" fill="#2563eb" />
                                <circle cx="32" cy="12" r="9" fill="white" className="shadow" />
                                <path d="M29 12l2 2 4-4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : (
                              <svg className="w-11 h-6 text-slate-300" viewBox="0 0 44 24" fill="none">
                                <rect width="44" height="24" rx="12" fill="#cbd5e1" />
                                <circle cx="12" cy="12" r="9" fill="white" className="shadow" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls Footer matching screenshot exactly */}
          <div className="px-6 py-4 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold select-none">
            
            {/* Rows selector */}
            <div className="flex items-center gap-2">
              <select 
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 outline-none cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>Showing {totalCount === 0 ? 0 : startIndex + 1} to {endIndex} of {totalCount} results</span>
            </div>

            {/* Pagination buttons array like 1 2 3 4 5 */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Dynamic numeric list buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1.5 border rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    currentPage === pageNum 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-slate-200 bg-white text-slate-650 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Onboard User Popover Modal Backdrop */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setShowOnboardModal(false)}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs cursor-pointer"
          />

          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-slide-up">
            
            {/* Modal Header */}
            <div className="bg-[#0f2d59] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-blue-300" />
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight">Onboard Compliance Participant</h3>
                  <p className="text-[10px] text-slate-350">Register dynamic stakeholder auditor profiles</p>
                </div>
              </div>
              <button 
                onClick={() => setShowOnboardModal(false)}
                className="w-7 h-7 rounded-full bg-black/15 hover:bg-black/25 text-white flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form content */}
            <form onSubmit={handleOnboardUserSubmit} className="p-6 space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5 font-mono">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. BIKASH KHANIKAR"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 bg-white font-bold placeholder:text-slate-350 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5 font-mono">Official Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. name@sustaincorp.com"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 bg-white font-bold placeholder:text-slate-350 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5 font-mono">Role Category</label>
                  <select 
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-slate-900 font-bold focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Auditor">Auditor</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5 font-mono">Status Initializer</label>
                  <select 
                    value={newUserData.status}
                    onChange={(e) => setNewUserData({ ...newUserData, status: e.target.value as any })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-slate-900 font-bold focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="On boarded">On boarded</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 justify-end pt-3 text-xs">
                <button 
                  type="button"
                  onClick={() => setShowOnboardModal(false)}
                  className="border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-50 text-slate-600 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-black shadow-xs cursor-pointer"
                >
                  Confirm Onboard
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
