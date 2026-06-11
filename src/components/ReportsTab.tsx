import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Layers, 
  Trash2, 
  Plus, 
  Clock, 
  FileSpreadsheet, 
  CloudLightning,
  AlertCircle,
  HelpCircle,
  FolderSync
} from 'lucide-react';

interface ReportsTabProps {}

interface ReportFile {
  id: string;
  name: string;
  framework: string;
  date: string;
  size: string;
  status: 'Ready' | 'Compiling' | 'Failed';
}

export default function ReportsTab({}: ReportsTabProps) {
  const [reports, setReports] = useState<ReportFile[]>([
    { id: 'rep-1', name: 'DEMO-ORG_BRSR_SectionC_Essential_Indicators_FY2026.pdf', framework: 'SEBI BRSR Standards', date: '2026-06-09', size: '2.4 MB', status: 'Ready' },
    { id: 'rep-2', name: 'Scope1_Natural_Gas_Carbon_Footprint_Audit_Logs.xlsx', framework: 'GHG Protocol Standard', date: '2026-06-08', size: '840 KB', status: 'Ready' },
    { id: 'rep-3', name: 'Water_Withdrawal_Intensity_Compliance_Roster_Frankfurt.pdf', framework: 'CSRD Directive 2024', date: '2026-06-02', size: '1.2 MB', status: 'Ready' }
  ]);

  const [activeFramework, setActiveFramework] = useState('BRSR');
  const [isCompiling, setIsCompiling] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, date: string, size: string}[]>([
    { name: 'electric_invoice_may_chicago.pdf', date: '2026-06-09', size: '320 KB' },
    { name: 'berlin_solar_panel_feed_logs.csv', date: '2026-06-08', size: '1.8 MB' }
  ]);

  // Generate simulated PDF report
  const handleCompileReport = () => {
    setIsCompiling(true);
    
    setTimeout(() => {
      let docName = '';
      let frameworkLabel = '';

      if (activeFramework === 'BRSR') {
        docName = `SmartEase_BRSR_SecC_Performance_Compliance_${Date.now().toString().substring(8)}.pdf`;
        frameworkLabel = 'SEBI BRSR Standards';
      } else if (activeFramework === 'CSRD') {
        docName = `CSRD_Double_Materiality_Metric_Export_${Date.now().toString().substring(8)}.pdf`;
        frameworkLabel = 'CSRD ESG Directive';
      } else {
        docName = `GHG_Scope_1_2_Footprint_Summary_${Date.now().toString().substring(8)}.pdf`;
        frameworkLabel = 'GHG Carbon Protocol';
      }

      const newReport: ReportFile = {
        id: `rep-${Date.now()}`,
        name: docName,
        framework: frameworkLabel,
        date: new Date().toISOString().substring(0, 10),
        size: '1.5 MB',
        status: 'Ready'
      };

      setReports([newReport, ...reports]);
      setIsCompiling(false);
      alert(`Framework compiling completed! Successfully saved "${docName}" to report library.`);
    }, 2000);
  };

  const handleDeleteReport = (id: string) => {
    if (confirm("Are you sure you want to delete this generated report schedule?")) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  // Drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const newFile = {
        name: file.name,
        date: new Date().toISOString().substring(0, 10),
        size: `${Math.round(file.size / 1024)} KB`
      };
      setUploadedFiles([newFile, ...uploadedFiles]);
      alert(`Successfully processed bill invoice: "${file.name}"! Values are queued for OCR collection.`);
    }
  };

  const triggerMockUpload = () => {
    const fileNames = [
      'boiler_emissions_certified_test.pdf',
      'waste_landfill_receipt_tokyo.csv',
      'water_usage_london_invoice_q1.xlsx'
    ];
    const picked = fileNames[Math.floor(Math.random() * fileNames.length)];
    const newFile = {
      name: picked,
      date: new Date().toISOString().substring(0, 10),
      size: '410 KB'
    };
    setUploadedFiles([newFile, ...uploadedFiles]);
    alert(`Document "${picked}" attached successfully! Operational metrics are linked.`);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="reports-tab-panel">
      <div>
        <span className="text-xs text-slate-500 font-mono tracking-wider block uppercase">Export Center</span>
        <h1 className="text-2xl font-bold font-display text-slate-900">Legislative Frameworks & Documents</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compiler controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div>
              <h2 className="text-sm font-bold font-semibold text-slate-800">Assurance Framework Dispatcher</h2>
              <p className="text-xs text-slate-500">Select standard compliance structures to compile active metrics</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label 
                className={`p-4 border rounded-xl flex flex-col justify-between h-24 cursor-pointer transition-all ${activeFramework === 'BRSR' ? 'border-indigo-500 bg-indigo-50/20' : 'border-slate-200 hover:bg-slate-50'}`}
                onClick={() => setActiveFramework('BRSR')}
              >
                <span className="text-xs font-bold font-mono text-indigo-700">SEBI BRSR</span>
                <span className="text-[10px] text-slate-500 font-medium font-sans">Essential indicators for Indian top listed portfolios</span>
              </label>

              <label 
                className={`p-4 border rounded-xl flex flex-col justify-between h-24 cursor-pointer transition-all ${activeFramework === 'CSRD' ? 'border-emerald-500 bg-emerald-50/10' : 'border-slate-200 hover:bg-slate-50'}`}
                onClick={() => setActiveFramework('CSRD')}
              >
                <span className="text-xs font-bold font-mono text-emerald-700">ESG CSRD</span>
                <span className="text-[10px] text-slate-500 font-medium font-sans">European Union Directive dual-materiality structures</span>
              </label>

              <label 
                className={`p-4 border rounded-xl flex flex-col justify-between h-24 cursor-pointer transition-all ${activeFramework === 'GHG' ? 'border-blue-500 bg-blue-50/10' : 'border-slate-200 hover:bg-slate-50'}`}
                onClick={() => setActiveFramework('GHG')}
              >
                <span className="text-xs font-bold font-mono text-blue-700">GHG PROTOCOL</span>
                <span className="text-[10px] text-slate-500 font-medium font-sans">Detailed Scope 1, 2, and 3 global carbon schedules</span>
              </label>
            </div>

            <button 
              onClick={handleCompileReport}
              disabled={isCompiling}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg shadow-sm tracking-wider flex items-center justify-center gap-1.5 disabled:bg-slate-200 disabled:text-slate-500 transition-all"
            >
              <FolderSync size={15} className={isCompiling ? 'animate-spin' : ''} />
              <span>{isCompiling ? 'Compiling physical assets and calculating CO2e...' : 'Generate and Compile PDF Report'}</span>
            </button>
          </div>

          {/* Report files library list */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <header className="px-5 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold font-display text-slate-800 text-sm">Compiled Schedules & PDFs</h2>
              <p className="text-[10px] font-mono text-slate-400">Archived report runs available for download</p>
            </header>

            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="px-5 py-2.5">Document Details</th>
                  <th className="px-5 py-2.5">Compliance framework</th>
                  <th className="px-5 py-2.5">Audit Stamp</th>
                  <th className="px-5 py-2.5 text-right">Delete / Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
                {reports.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all text-xs">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <FileText size={15} className="text-red-500 shrink-0" />
                        <div>
                          <span className="font-semibold block text-slate-850 truncate max-w-[280px]">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono block">{item.size}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-semibold text-slate-650 font-sans">
                      {item.framework}
                    </td>
                    <td className="px-5 py-3 font-mono text-[10px] text-slate-500">
                      {item.date}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex gap-2.5 justify-end items-center">
                        <a 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Downloading file: ${item.name} from cloud run archive.`);
                          }}
                          className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                        >
                          <Download size={13} />
                          <span>Save</span>
                        </a>

                        <button 
                          onClick={() => handleDeleteReport(item.id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drag & drop utility invoice uploader */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div>
              <h2 className="text-sm font-bold font-semibold text-slate-800">Evidence OCR Parser</h2>
              <p className="text-xs text-slate-500">Drop utility invoices or fuel records directly</p>
            </div>

            {/* Drag Area */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerMockUpload}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center h-44 ${dragActive ? 'border-blue-500 bg-blue-50/20' : 'border-slate-350 bg-slate-50/50 border-slate-300 hover:bg-slate-50'}`}
            >
              <CloudLightning size={32} className="text-blue-600 animate-pulse mb-2" />
              <p className="text-xs font-bold text-slate-700">Drag & Drop utility bills here</p>
              <p className="text-[10px] text-slate-400 mt-1 select-none">Or click anywhere to simulate PDF upload</p>
            </div>

            {/* Uploaded invoices ledger */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">Recent Audited uploads</span>
              <div className="divide-y divide-slate-100">
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 text-xs">
                    <div className="space-y-0.5 truncate max-w-[150px]">
                      <span className="font-semibold block text-slate-800 truncate">{file.name}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">{file.size} • Verified</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{file.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
