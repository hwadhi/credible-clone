import { Facility, ESGGoal, TaskItem, Question, AutomationRule, AuditLog } from './types';

export const initialFacilities: Facility[] = [
  {
    id: 'fac-1',
    name: 'Ajanta Pharma Export Warehouse',
    location: 'Waluj Aurangabad',
    type: 'Warehouse',
    sqft: 120000,
    scope1: 240.5,
    scope2: 450.2,
    scope3: 680.0,
    waterM3: 5400,
    energyKwh: 1200000,
    hasSolar: true,
    status: 'Active'
  },
  {
    id: 'fac-2',
    name: 'AJANTA PHARMA LIMITED -PITHAMPUR',
    location: 'PITHAMPUR SEZ AREA',
    type: 'Manufacturing',
    sqft: 350000,
    scope1: 1150.8,
    scope2: 1890.4,
    scope3: 2450.0,
    waterM3: 21400,
    energyKwh: 5400000,
    hasSolar: false,
    status: 'Active'
  },
  {
    id: 'fac-3',
    name: 'Ajanta Pharma Limited CWH-Domestic',
    location: 'Waluj',
    type: 'Warehouse',
    sqft: 95000,
    scope1: 85.4,
    scope2: 195.6,
    scope3: 310.2,
    waterM3: 3100,
    energyKwh: 580000,
    hasSolar: false,
    status: 'Active'
  },
  {
    id: 'fac-4',
    name: 'Ajanta Pharma Ltd (ARC)',
    location: 'Kandivali , Mumbai',
    type: 'Office',
    sqft: 45000,
    scope1: 12.2,
    scope2: 145.8,
    scope3: 220.5,
    waterM3: 1800,
    energyKwh: 410000,
    hasSolar: false,
    status: 'Active'
  },
  {
    id: 'fac-5',
    name: 'AJANTA PHARMA LTD- CHITEGAON',
    location: 'CHITEGAON MIDC',
    type: 'Manufacturing',
    sqft: 210000,
    scope1: 750.3,
    scope2: 1050.2,
    scope3: 1420.0,
    waterM3: 13500,
    energyKwh: 2850000,
    hasSolar: true,
    status: 'Active'
  },
  {
    id: 'fac-6',
    name: 'AJANTA PHARMA LTD- DAHEJ',
    location: 'DAHEJ SEZ',
    type: 'Manufacturing',
    sqft: 290000,
    scope1: 940.6,
    scope2: 1490.8,
    scope3: 1980.5,
    waterM3: 18200,
    energyKwh: 4100000,
    hasSolar: false,
    status: 'Active'
  },
  {
    id: 'fac-7',
    name: 'AJANTA PHARMA LTD- GUWAHATI',
    location: 'MRIZA PALASHBARI ROAD',
    type: 'Manufacturing',
    sqft: 275000,
    scope1: 880.2,
    scope2: 1320.5,
    scope3: 1740.0,
    waterM3: 16800,
    energyKwh: 3650000,
    hasSolar: true,
    status: 'Active'
  },
  {
    id: 'fac-8',
    name: 'AJANTA PHARMA LTD- WALUJ',
    location: 'WALUJ MIDC',
    type: 'Manufacturing',
    sqft: 420000,
    scope1: 1520.4,
    scope2: 2280.9,
    scope3: 3100.8,
    waterM3: 26500,
    energyKwh: 6250000,
    hasSolar: true,
    status: 'Active'
  },
  {
    id: 'fac-9',
    name: 'AJANTA PHARMA LTD-CHIKALTHANA',
    location: 'CHIKALTHANA MIDC',
    type: 'Manufacturing',
    sqft: 230000,
    scope1: 715.0,
    scope2: 980.4,
    scope3: 1360.2,
    waterM3: 11900,
    energyKwh: 2480000,
    hasSolar: false,
    status: 'Active'
  },
  {
    id: 'fac-10',
    name: 'Ajanta Pharma Ltd-Paithan',
    location: 'Paithan MIDC , Aurangabad',
    type: 'Manufacturing',
    sqft: 315000,
    scope1: 1050.2,
    scope2: 1640.4,
    scope3: 2180.0,
    waterM3: 19400,
    energyKwh: 4680000,
    hasSolar: true,
    status: 'Active'
  },
  {
    id: 'fac-11',
    name: 'Head Office',
    location: 'Kandivali',
    type: 'Office',
    sqft: 65000,
    scope1: 18.4,
    scope2: 180.6,
    scope3: 290.5,
    waterM3: 2400,
    energyKwh: 510000,
    hasSolar: false,
    status: 'Active'
  }
];

export const initialGoals: ESGGoal[] = [
  {
    id: 'goal-1',
    title: 'Reduce Scope 1 & 2 Emissions by 40%',
    category: 'Environment',
    targetValue: 60, // reduction target remaining (as current percentage baseline)
    currentValue: 82, // current baseline tracking progress (18% reduced)
    unit: '% of 2024 emissions',
    targetYear: 2030,
    owner: 'Sarah Connor (Sustainability VP)',
    status: 'Ongoing',
    notes: 'Primary strategy includes solar panel installation, heating conversion to heat pumps, and energy conservation.'
  },
  {
    id: 'goal-2',
    title: 'Achieve 100% Renewable Sourced Electricity',
    category: 'Environment',
    targetValue: 100,
    currentValue: 65,
    unit: '% of total load',
    targetYear: 2028,
    owner: 'Mark Johnson (Energy Ops)',
    status: 'Ongoing',
    notes: 'Power Purchase Agreements (PPAs) signed in several European centers. Moving US facilities to green tariffs.'
  },
  {
    id: 'goal-3',
    title: 'Implement Supply Chain Diversity Code',
    category: 'Social',
    targetValue: 100,
    currentValue: 100,
    unit: '% of Tier 1 suppliers',
    targetYear: 2026,
    owner: 'Elena Rostova (Compliance)',
    status: 'Completed',
    notes: 'Successfully achieved full onboarding and signed compliance certificates from all active Tier 1 providers.'
  },
  {
    id: 'goal-4',
    title: 'Publish Annual SEC Climate Disclosure',
    category: 'Governance',
    targetValue: 100,
    currentValue: 40,
    unit: '% complete',
    targetYear: 2026,
    owner: 'David Vance (General Counsel)',
    status: 'Delayed',
    notes: 'Gathering Scope 3 downstream emission coefficients is taking longer than expected.'
  }
];

export const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Verify Natural Gas Consumption Accounts',
    section: 'Scope 1 footprinting',
    tasksDone: 3,
    tasksTotal: 5,
    dueDate: '2026-06-15',
    status: 'Pending'
  },
  {
    id: 'task-2',
    title: 'Upload Energy Green Certificates (I-RECs)',
    section: 'Scope 2 tracking',
    tasksDone: 0,
    tasksTotal: 2,
    dueDate: '2026-06-01',
    status: 'Overdue'
  },
  {
    id: 'task-3',
    title: 'Onboard Singapore DC Consumption Meters',
    section: 'Onboarding Disclosures',
    tasksDone: 1,
    tasksTotal: 3,
    dueDate: '2026-06-20',
    status: 'Pending'
  },
  {
    id: 'task-4',
    title: 'Complete BRSR Section A General Details',
    section: 'BRSR Framework',
    tasksDone: 10,
    tasksTotal: 10,
    dueDate: '2026-05-30',
    status: 'Completed'
  },
  {
    id: 'task-5',
    title: 'Audit Tier-1 Worker Safety Protocol Training',
    section: 'Social Indicators',
    tasksDone: 4,
    tasksTotal: 8,
    dueDate: '2026-06-12',
    status: 'Due'
  }
];

export const initialQuestions: Question[] = [
  {
    id: 'q-1',
    category: 'Environment',
    text: 'Does your legal entity actively track and measure Scope 1 (Direct GHG) and Scope 2 (Indirect GHG) emissions?',
    options: [
      { value: 'yes_verified', label: 'Yes, fully tracked and verified by third-party auditors (100 pts)', score: 100 },
      { value: 'yes_unverified', label: 'Yes, tracked internally but not verified (60 pts)', score: 60 },
      { value: 'no_partial', label: 'Partial tracking of some offices (20 pts)', score: 20 },
      { value: 'no', label: 'No tracking currently in place (0 pts)', score: 0 }
    ],
    selectedAnswer: 'yes_unverified',
    evidenceRequired: true,
    evidenceFile: 'scope1_invoice_summary.pdf'
  },
  {
    id: 'q-2',
    category: 'Environment',
    text: 'What percentage of your corporate facility floor space is covered under active water conservation or circular graywater recycling policies?',
    options: [
      { value: 'above_80', label: 'Above 80% of entire global floor space (100 pts)', score: 100 },
      { value: '50_80', label: 'Between 50% and 80% (70 pts)', score: 70 },
      { value: '10_50', label: 'Between 10% and 50% (30 pts)', score: 30 },
      { value: 'below_10', label: 'None, or less than 10% (0 pts)', score: 0 }
    ],
    selectedAnswer: '10_50',
    evidenceRequired: false
  },
  {
    id: 'q-3',
    category: 'Social',
    text: 'Do you maintain formal policies and audit systems to enforce modern slavery compliance and human rights protections across your supplier supply chain?',
    options: [
      { value: 'all_suppliers', label: 'Yes, full modern slavery policy integrated in all Tier 1 and 2 procurement (100 pts)', score: 100 },
      { value: 'tier_1_only', label: 'Yes, strictly enforced across Tier 1 suppliers only (60 pts)', score: 60 },
      { value: 'policy_only', label: 'We have a policy but do not run audits (30 pts)', score: 30 },
      { value: 'no_policy', label: 'No explicit standard is formally required (0 pts)', score: 0 }
    ],
    selectedAnswer: 'tier_1_only',
    evidenceRequired: true,
    evidenceFile: 'supplier_code_draft.pdf'
  },
  {
    id: 'q-4',
    category: 'Social',
    text: 'What is the average worker training duration (hours per FTE) on technical safety, general wellness, or technical capability enhancements?',
    options: [
      { value: 'above_40', label: 'More than 40 hours per year per worker (100 pts)', score: 100 },
      { value: '20_40', label: 'Between 20 and 40 hours per year (70 pts)', score: 70 },
      { value: '10_20', label: 'Between 10 and 20 hours per year (40 pts)', score: 40 },
      { value: 'below_10', label: 'Fewer than 10 hours per year (10 pts)', score: 10 }
    ],
    selectedAnswer: '20_40',
    evidenceRequired: false
  },
  {
    id: 'q-5',
    category: 'Governance',
    text: 'Does your board maintain a dedicated ESG, Safety, and Ethical Sustainability Committee that meets regularly with executive leadership?',
    options: [
      { value: 'active', label: 'Yes, formal committee established with public charter, meeting quarterly (100 pts)', score: 100 },
      { value: 'executive_lead', label: 'Managed by executive leadership but no board sub-committee (50 pts)', score: 50 },
      { value: 'none', label: 'No specific committee tracks sustainable performance currently (0 pts)', score: 0 }
    ],
    selectedAnswer: 'active',
    evidenceRequired: false
  }
];

export const initialAutomationRules: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Automatic Scope 2 Warning Trigger',
    trigger: 'Facility energy exceeds baseline deviation by 15%',
    action: 'Send urgent emission warning email to facility manager & post to #esg-alerts Slack channel',
    status: true
  },
  {
    id: 'rule-2',
    name: 'Daily Invoice OCR Parsing Automation',
    trigger: 'New PDF or Excel file uploaded to Documents folder',
    action: 'Queue OCR and auto-populate natural gas/power consumption metrics in Chicago Facility logs',
    status: true
  },
  {
    id: 'rule-3',
    name: 'BRSR Indicator Report Dispatcher',
    trigger: 'Rolling quarter performance changes by more than 5%',
    action: 'Refresh CSRD double-materiality CSV and sync values to live Google Sheet',
    status: false
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-06-09 16:30:12',
    user: 'Sarah Connor (Sustainability VP)',
    action: 'Added fuel consumption metrics (450 Therms natural gas)',
    category: 'Scope 1 Carbon',
    facility: 'Chicago Assembly Plant'
  },
  {
    id: 'log-2',
    timestamp: '2026-06-09 14:15:40',
    user: 'Mark Johnson (Energy Ops)',
    action: 'Triggered automation diagnostic for solar intake meters',
    category: 'Renewable Power',
    facility: 'Berlin Gigafactory'
  },
  {
    id: 'log-3',
    timestamp: '2026-06-08 09:22:15',
    user: 'Demo Intern User',
    action: 'Uploaded water conservation certification proof',
    category: 'Regulatory Evidence',
    facility: 'London Corporate HQ'
  },
  {
    id: 'log-4',
    timestamp: '2026-06-07 11:45:00',
    user: 'System Webhook',
    action: 'Auto-linked SG grid carbon coefficients',
    category: 'Scope 2 Coefficient',
    facility: 'Singapore Datacenter'
  },
  {
    id: 'log-5',
    timestamp: '2026-06-06 17:05:33',
    user: 'David Vance (General Counsel)',
    action: 'Completed BRSR Section A survey checklist',
    category: 'Legislative Compliance',
    facility: 'All Sites'
  }
];
