import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Upload, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Eye, 
  FolderOpen,
  Filter,
  Check,
  Building,
  User,
  Calendar,
  X
} from 'lucide-react';

interface DocumentRecord {
  id: string;
  name: string;
  type: 'Certificates' | 'Evidences' | 'Policies';
  facility: string;
  uploadedBy: string;
  file: string;
  dateAdded: string;
  status: 'Approved' | 'In Review' | 'Verified';
}

export default function DocumentsTab() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'Certificates' | 'Evidences' | 'Policies'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form input states
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState<'Certificates' | 'Evidences' | 'Policies'>('Evidences');
  const [newDocFacility, setNewDocFacility] = useState('AJANTA PHARMA LTD- DAHEJ');
  const [newDocUploadedBy, setNewDocUploadedBy] = useState('Morgan Vance');
  const [newDocFile, setNewDocFile] = useState('');

  // Initial Document dataset matching Screenshot 2 exactly
  const [documents, setDocuments] = useState<DocumentRecord[]>([
    {
      id: 'doc-1',
      name: "TORRENT POWER LTD MAY'26",
      type: 'Evidences',
      facility: 'AJANTA PHARMA LTD- DAHEJ',
      uploadedBy: 'Morgan Vance',
      file: "TORRENT POWER LTD MAY'26.pdf",
      dateAdded: '08 Jun, 2026',
      status: 'Verified'
    },
    {
      id: 'doc-2',
      name: "API MSEDCL Bill Oct-2025",
      type: 'Evidences',
      facility: 'AJANTA PHARMA LTD- WALUJ',
      uploadedBy: 'Jamie Taylor',
      file: "API MSEDCL Bill Oct-2025.pdf",
      dateAdded: '19 May, 2026',
      status: 'Approved'
    },
    {
      id: 'doc-3',
      name: "MARUTI CORPORATION_PO_4100328633_Diesal_ (08-04-2026)",
      type: 'Evidences',
      facility: 'AJANTA PHARMA LTD- DAHEJ',
      uploadedBy: 'Morgan Vance',
      file: "MARUTI CORPORATION_PO_4100328633_Diesal_ (08-04-2026).PDF",
      dateAdded: '19 May, 2026',
      status: 'Verified'
    },
    {
      id: 'doc-4',
      name: "GREEN FIELD SUPPLIERS_PO_4100330177 (20-04-2026)",
      type: 'Evidences',
      facility: 'AJANTA PHARMA LTD- DAHEJ',
      uploadedBy: 'Morgan Vance',
      file: "GREEN FIELD SUPPLIERS_PO_4100330177 (20-04-2026).PDF",
      dateAdded: '19 May, 2026',
      status: 'Verified'
    },
    {
      id: 'doc-5',
      name: "ISO 14001 Env Certification Plan",
      type: 'Certificates',
      facility: 'AJANTA PHARMA LIMITED - PITHAMPUR',
      uploadedBy: 'Taylor Smith',
      file: "ISO_14001_Pithampur_25-26.pdf",
      dateAdded: '12 Apr, 2026',
      status: 'Approved'
    },
    {
      id: 'doc-6',
      name: "Renewable Energy Procurement Charter",
      type: 'Policies',
      facility: 'AJANTA PHARMA LTD- CHITEGAON',
      uploadedBy: 'Jamie Taylor',
      file: "RE_Procurement_Charter_V2.pdf",
      dateAdded: '24 Jan, 2026',
      status: 'Approved'
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName || !newDocFile) return;

    const newRecord: DocumentRecord = {
      id: `doc-${Date.now()}`,
      name: newDocName,
      type: newDocType,
      facility: newDocFacility,
      uploadedBy: newDocUploadedBy,
      file: newDocFile.endsWith('.pdf') || newDocFile.endsWith('.PDF') ? newDocFile : `${newDocFile}.pdf`,
      dateAdded: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'In Review'
    };

    setDocuments([newRecord, ...documents]);
    setShowAddModal(false);
    
    // reset form fields
    setNewDocName('');
    setNewDocFile('');
    showToast(`Successfully registered, secure checksum stored for file "${newRecord.file}".`);
  };

  const handleDeleteDoc = (id: string, name: string) => {
    if (confirm(`Do you want to permanently withdraw compliance record: "${name}"?`)) {
      setDocuments(documents.filter(d => d.id !== id));
      showToast('Document record deleted from audit vault.');
    }
  };

  // Logical filter rules
  const filteredDocuments = documents.filter(doc => {
    const matchesTab = activeTab === 'ALL' ? true : doc.type.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.file.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in" id="documents-tab-panel">
      {/* Toast Announcement */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs text-slate-500 font-mono tracking-wider block uppercase">Compliance Audit Trail</span>
          <h1 className="text-2xl font-bold font-display text-slate-900">Assurance Document Library</h1>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-1 transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>ADD NEW DOCUMENT</span>
        </button>
      </div>

      {/* Search and Tabs line controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-3xs">
        {/* Category Tabs */}
        <div className="flex gap-1.5 bg-slate-100 rounded-lg p-0.5 text-xs font-bold w-fit">
          {['ALL', 'Certificates', 'Evidences', 'Policies'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-1.5 px-3.5 rounded-md font-semibold transition-all ${isActive ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab === 'ALL' ? 'All' : tab.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Search Input Filter */}
        <div className="relative w-full md:w-80">
          <input 
            type="text"
            placeholder="Search by name, facility or uploader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold pl-9 outline-none text-slate-800"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Main ledger Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Facility</th>
                <th className="px-6 py-4">Uploaded By</th>
                <th className="px-6 py-4">File</th>
                <th className="px-6 py-4">Date Added</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-xs text-slate-400 font-mono">
                    No verified assurance documents matched your query criteria.
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-550/10 hover:bg-slate-50/50 transition-all text-xs">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {doc.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[9px] uppercase tracking-wider ${
                        doc.type === 'Certificates' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        doc.type === 'Evidences' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                        'bg-slate-100 text-slate-650 border border-slate-150'
                      }`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium font-sans">
                      {doc.facility}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {doc.uploadedBy}
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-blue-600 font-bold">
                      <a 
                        href={`/files/${doc.file}`} 
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Reading and evaluating checksum for file "${doc.file}".`);
                        }}
                        className="hover:underline flex items-center gap-1"
                      >
                        <FileText size={12} className="text-slate-400 shrink-0" />
                        <span>{doc.file}</span>
                      </a>
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-slate-400">
                      {doc.dateAdded}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        doc.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        doc.status === 'Verified' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${
                          doc.status === 'Approved' ? 'bg-emerald-500' :
                          doc.status === 'Verified' ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`} />
                        <span>{doc.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2.5 justify-end">
                        <button 
                          onClick={() => alert(`Reviewing document OCR mapping for "${doc.name}"...`)}
                          className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-all"
                          title="View OCR Parsed Data"
                        >
                          <Eye size={13} />
                        </button>
                        <button 
                          onClick={() => handleDeleteDoc(doc.id, doc.name)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-all"
                          title="Withdraw Record"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD DOCUMENT FLOW POPUP MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
          <form 
            onSubmit={handleAddDocument}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4 m-4"
          >
            <div className="flex justify-between items-center border-b border-light pb-2">
              <h2 className="text-sm font-bold font-display text-slate-800 uppercase flex items-center gap-1.5">
                <Upload size={14} className="text-blue-600" />
                <span>Upload Assurance Document</span>
              </h2>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Document Label Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. MSEDCL Solar Utility Invoice"
                  required
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full border border-slate-205 rounded-lg px-3 py-2 outline-none font-sans font-semibold text-slate-800"
                />
              </div>

              {/* Type Category selection */}
              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Taxonomy Category</label>
                <select 
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value as any)}
                  className="w-full border border-slate-205 rounded-lg px-3 py-2 bg-white outline-none font-sans font-semibold text-slate-800 cursor-pointer"
                >
                  <option value="Evidences">Evidences (Invoices, Receipts, Audits)</option>
                  <option value="Certificates">Certificates (ISO Awards, Accreditations)</option>
                  <option value="Policies">Policies (Green Charters, Whistleblower files)</option>
                </select>
              </div>

              {/* Facility assignment */}
              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Assigned Facility Node</label>
                <select
                  value={newDocFacility}
                  onChange={(e) => setNewDocFacility(e.target.value)}
                  className="w-full border border-slate-205 rounded-lg px-3 py-2 bg-white outline-none font-sans font-semibold text-slate-800 cursor-pointer"
                >
                  <option value="AJANTA PHARMA LTD- DAHEJ">AJANTA PHARMA LTD- DAHEJ</option>
                  <option value="AJANTA PHARMA LTD- WALUJ">AJANTA PHARMA LTD- WALUJ</option>
                  <option value="AJANTA PHARMA LIMITED - PITHAMPUR">AJANTA PHARMA LIMITED - PITHAMPUR</option>
                  <option value="AJANTA PHARMA LTD- CHITEGAON">AJANTA PHARMA LTD- CHITEGAON</option>
                </select>
              </div>

              {/* Uploader Name */}
              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Uploader / Auditor Name</label>
                <input 
                  type="text"
                  required
                  value={newDocUploadedBy}
                  onChange={(e) => setNewDocUploadedBy(e.target.value)}
                  className="w-full border border-slate-205 rounded-lg px-3 py-2 outline-none font-sans font-semibold text-slate-800"
                />
              </div>

              {/* File reference name */}
              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">PDF Filename Coordinate</label>
                <input 
                  type="text" 
                  placeholder="e.g. MSEDCL_bill_chicago_may26.pdf"
                  required
                  value={newDocFile}
                  onChange={(e) => setNewDocFile(e.target.value)}
                  className="w-full border border-slate-205 rounded-lg px-3 py-2 outline-none font-mono font-bold font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3 text-xs">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-slate-500 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-blue-600 text-white font-bold px-3.5 py-1.5 rounded-lg hover:bg-blue-750 transition-all cursor-pointer"
              >
                Verify & Vault File
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
