export interface Facility {
  id: string;
  name: string;
  location: string;
  type: 'Office' | 'Manufacturing' | 'Warehouse' | 'Data Center';
  sqft: number;
  scope1: number; // in tCO2e
  scope2: number; // in tCO2e
  scope3: number; // in tCO2e
  waterM3: number;
  energyKwh: number;
  hasSolar: boolean;
  status: 'Active' | 'Onboarding' | 'Review';
}

export interface ESGGoal {
  id: string;
  title: string;
  category: 'Environment' | 'Social' | 'Governance';
  targetValue: number;
  currentValue: number;
  unit: string;
  targetYear: number;
  owner: string;
  status: 'Ongoing' | 'Completed' | 'Delayed';
  notes: string;
}

export interface TaskItem {
  id: string;
  title: string;
  section: string;
  tasksDone: number;
  tasksTotal: number;
  dueDate: string;
  status: 'Pending' | 'Due' | 'Overdue' | 'Completed';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Question {
  id: string;
  category: 'Environment' | 'Social' | 'Governance';
  text: string;
  options: { value: string; label: string; score: number }[];
  selectedAnswer?: string;
  evidenceRequired: boolean;
  evidenceFile?: string;
}

export interface BRSRCategory {
  id: string;
  title: string;
  questions: Question[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: string;
  facility: string;
}
