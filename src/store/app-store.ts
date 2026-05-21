import { create } from 'zustand';

export type Page = 'onboarding' | 'child-profile' | 'home' | 'triage' | 'care' | 'nutrition' | 'vaccination' | 'learn' | 'history' | 'facility' | 'myth' | 'community' | 'prenatal' | 'admin';

export interface ChildData {
  id: string;
  name: string;
  dateOfBirth: string | null;
  edd: string | null;
  sex: 'male' | 'female';
  birthWeight: number | null;
  isPrenatal: boolean;
  completedVaccines: string[];
  completedMilestones: string[];
  growthRecords: { weight: number; height: number; date: string }[];
  medicalEvents: { type: string; description: string; date: string }[];
  symptomChecks: { symptoms: string[]; urgencyLevel: number; date: string; action: string }[];
}

export interface ParentData {
  id: string;
  phone: string;
  name: string;
  language: 'bn' | 'en';
  division: string;
  district: string;
  upazila: string;
}

interface AppState {
  currentPage: Page;
  language: 'bn' | 'en';
  parent: ParentData | null;
  children: ChildData[];
  selectedChildId: string | null;
  isAuthenticated: boolean;
  triageState: { symptoms: string[]; urgencyLevel: number | null; result: string | null } | null;
  adminMode: boolean;

  setPage: (page: Page) => void;
  setLanguage: (lang: 'bn' | 'en') => void;
  setParent: (parent: ParentData) => void;
  addChild: (child: ChildData) => void;
  updateChild: (id: string, updates: Partial<ChildData>) => void;
  selectChild: (id: string) => void;
  setAuthenticated: (auth: boolean) => void;
  setTriageState: (state: { symptoms: string[]; urgencyLevel: number | null; result: string | null } | null) => void;
  markVaccineReceived: (childId: string, vaccineId: string) => void;
  markMilestoneComplete: (childId: string, milestoneId: string) => void;
  addGrowthRecord: (childId: string, record: { weight: number; height: number; date: string }) => void;
  addMedicalEvent: (childId: string, event: { type: string; description: string; date: string }) => void;
  addSymptomCheck: (childId: string, check: { symptoms: string[]; urgencyLevel: number; date: string; action: string }) => void;
  setAdminMode: (mode: boolean) => void;
  reset: () => void;
}

const initialState = {
  currentPage: 'onboarding' as Page,
  language: 'bn' as const,
  parent: null,
  children: [],
  selectedChildId: null,
  isAuthenticated: false,
  triageState: null,
  adminMode: false,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,

  setPage: (page) => set({ currentPage: page }),
  setLanguage: (language) => set({ language }),
  setParent: (parent) => set({ parent, isAuthenticated: true }),

  addChild: (child) => set((state) => ({
    children: [...state.children, child],
    selectedChildId: child.id,
  })),

  updateChild: (id, updates) => set((state) => ({
    children: state.children.map((c) => c.id === id ? { ...c, ...updates } : c),
  })),

  selectChild: (id) => set({ selectedChildId: id }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  setTriageState: (triageState) => set({ triageState }),
  setAdminMode: (adminMode) => set({ adminMode }),

  markVaccineReceived: (childId, vaccineId) => set((state) => ({
    children: state.children.map((c) =>
      c.id === childId
        ? { ...c, completedVaccines: [...c.completedVaccines, vaccineId] }
        : c
    ),
  })),

  markMilestoneComplete: (childId, milestoneId) => set((state) => ({
    children: state.children.map((c) =>
      c.id === childId
        ? { ...c, completedMilestones: [...c.completedMilestones, milestoneId] }
        : c
    ),
  })),

  addGrowthRecord: (childId, record) => set((state) => ({
    children: state.children.map((c) =>
      c.id === childId
        ? { ...c, growthRecords: [...c.growthRecords, record] }
        : c
    ),
  })),

  addMedicalEvent: (childId, event) => set((state) => ({
    children: state.children.map((c) =>
      c.id === childId
        ? { ...c, medicalEvents: [...c.medicalEvents, event] }
        : c
    ),
  })),

  addSymptomCheck: (childId, check) => set((state) => ({
    children: state.children.map((c) =>
      c.id === childId
        ? { ...c, symptomChecks: [...c.symptomChecks, check] }
        : c
    ),
  })),

  reset: () => set(initialState),
}));

export function getChildAge(child: ChildData): { months: number; weeks: number; isPrenatal: boolean; prenatalWeek: number } {
  if (child.isPrenatal && child.edd) {
    const edd = new Date(child.edd);
    const now = new Date();
    const diffDays = Math.floor((edd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const weeksRemaining = Math.max(0, Math.floor(diffDays / 7));
    const prenatalWeek = 40 - weeksRemaining;
    return { months: 0, weeks: 0, isPrenatal: true, prenatalWeek: Math.max(4, prenatalWeek) };
  }
  if (child.dateOfBirth) {
    const dob = new Date(child.dateOfBirth);
    const now = new Date();
    const diffMs = now.getTime() - dob.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const months = Math.floor(diffDays / 30.44);
    return { months, weeks, isPrenatal: false, prenatalWeek: 0 };
  }
  return { months: 0, weeks: 0, isPrenatal: false, prenatalWeek: 0 };
}
