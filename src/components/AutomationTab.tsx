import React, { useState } from 'react';
import { AutomationRule, AuditLog } from '../types';
import { 
  Cpu, 
  ToggleLeft, 
  ToggleRight, 
  Trash2, 
  Plus, 
  X, 
  Clock, 
  User, 
  Activity,
  Layers
} from 'lucide-react';

interface AutomationTabProps {
  rules: AutomationRule[];
  setRules: React.Dispatch<React.SetStateAction<AutomationRule[]>>;
  logs: AuditLog[];
  setLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;
}

export default function AutomationTab({
  rules,
  setRules,
  logs,
  setLogs
}: AutomationTabProps) {
  const [showAddRule, setShowAddRule] = useState(false);
  const [ruleName, setRuleName] = useState('');
  const [ruleTrigger, setRuleTrigger] = useState('');
  const [ruleAction, setRuleAction] = useState('');

  // Toggle rule
  const handleToggleRule = (id: string) => {
    setRules(rules.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: !r.status
        };
      }
      return r;
    }));
  };

  // Delete rule
  const handleDeleteRule = (id: string) => {
    if (confirm("Are you sure you want to delete this operational rule?")) {
      setRules(rules.filter(r => r.id !== id));
    }
  };

  // Add customized automation rule
  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName || !ruleTrigger || !ruleAction) return;

    const newRule: AutomationRule = {
      id: `rule-${Date.now()}`,
      name: ruleName,
      trigger: ruleTrigger,
      action: ruleAction,
      status: true
    };

    setRules([...rules, newRule]);
    
    // Log action
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Demo Intern User',
      action: `Created new automated rule pipeline: "${ruleName}"`,
      category: 'Data Engineering',
      facility: 'All Sites'
    };
    setLogs([newLog, ...logs]);

    setRuleName('');
    setRuleTrigger('');
    setRuleAction('');
    setShowAddRule(false);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="automation-tab-panel">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <span className="text-xs text-slate-500 font-mono tracking-wider block uppercase">Data Pipes</span>
          <h1 className="text-2xl font-bold font-display text-slate-900">Automation & Audit Integrity</h1>
        </div>

        <button 
          onClick={() => setShowAddRule(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-xs"
        >
          <Plus size={16} />
          <span>Add Automated Sensor Rule</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active sensor rules */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div>
              <h2 className="text-sm font-bold font-semibold text-slate-800 flex items-center gap-1.5">
                <Cpu size={16} className="text-blue-600 animate-spin" />
                <span>Automated Data Stream Tunnels</span>
              </h2>
              <p className="text-xs text-slate-500">Enable automatic Slack dispatches or OCR utility uploads</p>
            </div>

            <div className="divide-y divide-slate-100 space-y-3">
              {rules.map((rule, idx) => (
                <div key={rule.id} className="pt-3 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-slate-100 rounded-md px-2 py-0.5 text-slate-500 font-bold uppercase tracking-wider font-mono">
                      TUNNEL #{idx + 1}
                    </span>
                    <h3 className="font-bold font-sans text-slate-850 text-sm leading-tight">{rule.name}</h3>
                    <div className="text-xs flex flex-col gap-1 text-slate-550 pt-1">
                      <span><strong className="text-slate-700 font-mono text-[10px] uppercase">If:</strong> {rule.trigger}</span>
                      <span><strong className="text-blue-600 font-mono text-[10px] uppercase">Do:</strong> {rule.action}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleToggleRule(rule.id)}
                      className={`text-slate-650 transition-colors p-1`}
                      title={rule.status ? 'Deactivate rule' : 'Activate rule'}
                    >
                      {rule.status ? (
                        <ToggleRight size={24} className="text-blue-600" />
                      ) : (
                        <ToggleLeft size={24} className="text-slate-400" />
                      )}
                    </button>

                    <button 
                      onClick={() => handleDeleteRule(rule.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action log trail */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold font-semibold text-slate-800 flex items-center gap-1.5">
              <Activity size={16} className="text-emerald-700" />
              <span>Full Audit Trail</span>
            </h2>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Signed SEC compliance logger</p>
          </div>

          <div className="space-y-4 h-96 overflow-y-auto pr-1">
            {logs.map((log) => (
              <div key={log.id} className="border-l-2 border-emerald-500 pl-3.5 space-y-1.5 text-xs text-slate-700 font-medium leading-normal relative group">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <Clock size={11} />
                  <span>{log.timestamp}</span>
                </div>
                
                <p className="font-semibold text-slate-800 leading-tight">
                  {log.action}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 bg-slate-100 rounded-sm text-slate-500">
                    {log.category}
                  </span>
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 bg-slate-100 rounded-sm text-slate-550">
                    {log.facility}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add sensor modal */}
      {showAddRule && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
          <form 
            onSubmit={handleAddRule}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4 m-4"
          >
            <div className="flex justify-between items-center border-b border-light pb-2">
              <h2 className="text-sm font-bold font-display text-slate-800">Add Automated Data Tunnel</h2>
              <button 
                type="button" 
                onClick={() => setShowAddRule(false)}
                className="text-slate-400 hover:text-slate-650"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Rule Pipeline Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Scope 1 Methane Threshold Check"
                  required
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Trigger Condition (IF)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Natural gas consumption exceeds 5000 Th"
                  required
                  value={ruleTrigger}
                  onChange={(e) => setRuleTrigger(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 font-bold block uppercase font-mono text-[10px]">Automated Action (DO)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Trigger audit alert and send to VP Sarah"
                  required
                  value={ruleAction}
                  onChange={(e) => setRuleAction(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3 text-xs">
              <button 
                type="button" 
                onClick={() => setShowAddRule(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-500 font-semibold"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg"
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
