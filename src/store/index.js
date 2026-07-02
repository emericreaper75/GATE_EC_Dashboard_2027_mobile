import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  INITIAL_TASKS,
  INITIAL_PRIORITY_BOARD,
  INITIAL_FORMULAS,
  INITIAL_REMINDERS,
  INITIAL_MASTERY,
  INITIAL_MILESTONES,
  DEFAULT_SETTINGS,
} from '../utils/initialData';
import { generateId } from '../utils/helpers';

export const useStore = create(
  persist(
    (set, get) => ({
      // ── State ────────────────────────────────────────────────────────────────
      tasks: [],
      pyqLogs: [],
      mocks: [],
      formulas: [],
      errors: [],
      weeklyReviews: [],
      mastery: [],
      priorityBoard: [],
      reminders: [],
      milestones: [],
      notes: [],
      settings: DEFAULT_SETTINGS,

      // ── Tasks ────────────────────────────────────────────────────────────────
      addTask: (task) =>
        set((s) => ({ tasks: [...s.tasks, { ...task, id: task.id || generateId() }] })),
      updateTask: (id, updates) =>
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)) })),
      deleteTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      // ── PYQ Logs ─────────────────────────────────────────────────────────────
      addPYQLog: (log) =>
        set((s) => ({ pyqLogs: [...s.pyqLogs, { ...log, id: log.id || generateId() }] })),
      updatePYQLog: (id, updates) =>
        set((s) => ({ pyqLogs: s.pyqLogs.map((l) => (l.id === id ? { ...l, ...updates } : l)) })),
      deletePYQLog: (id) =>
        set((s) => ({ pyqLogs: s.pyqLogs.filter((l) => l.id !== id) })),

      // ── Mocks ────────────────────────────────────────────────────────────────
      addMock: (mock) =>
        set((s) => ({ mocks: [...s.mocks, { ...mock, id: mock.id || generateId() }] })),
      deleteMock: (id) =>
        set((s) => ({ mocks: s.mocks.filter((m) => m.id !== id) })),

      // ── Formulas ─────────────────────────────────────────────────────────────
      addFormula: (formula) =>
        set((s) => ({ formulas: [...s.formulas, { ...formula, id: formula.id || generateId() }] })),
      updateFormula: (id, updates) =>
        set((s) => ({
          formulas: s.formulas.map((f) => {
            if (f.id !== id) return f;
            const updated = { ...f, ...updates };
            // SRS scheduling when confidence changes
            if (updates.confidence && updates.confidence !== f.confidence) {
              const nextDate = new Date();
              nextDate.setDate(nextDate.getDate() + 1);
              updated.srs = {
                interval: 1,
                repetition: 0,
                efactor: 2.5,
                nextReviewDate: nextDate.toISOString().split('T')[0],
              };
            }
            return updated;
          }),
        })),
      deleteFormula: (id) =>
        set((s) => ({ formulas: s.formulas.filter((f) => f.id !== id) })),

      // ── Errors ───────────────────────────────────────────────────────────────
      addErrorLog: (error) =>
        set((s) => ({ errors: [...s.errors, { ...error, id: error.id || generateId() }] })),
      updateErrorLog: (id, updates) =>
        set((s) => ({ errors: s.errors.map((e) => (e.id === id ? { ...e, ...updates } : e)) })),
      deleteErrorLog: (id) =>
        set((s) => ({ errors: s.errors.filter((e) => e.id !== id) })),

      // ── Weekly Reviews ───────────────────────────────────────────────────────
      addWeeklyReview: (review) =>
        set((s) => ({ weeklyReviews: [...s.weeklyReviews, { ...review, id: review.id || generateId() }] })),
      deleteWeeklyReview: (id) =>
        set((s) => ({ weeklyReviews: s.weeklyReviews.filter((r) => r.id !== id) })),

      // ── Mastery ──────────────────────────────────────────────────────────────
      updateMastery: (id, updates) =>
        set((s) => ({
          mastery: s.mastery.map((m) => {
            if (m.id !== id) return m;
            const updated = { ...m, ...updates };
            if (updates.mastery === 100 && m.mastery !== 100) {
              const nextDate = new Date();
              nextDate.setDate(nextDate.getDate() + 1);
              updated.srs = {
                interval: 1,
                repetition: 0,
                efactor: 2.5,
                nextReviewDate: nextDate.toISOString().split('T')[0],
              };
            }
            return updated;
          }),
        })),

      // ── Priority Board ───────────────────────────────────────────────────────
      addPriorityCard: (card) =>
        set((s) => ({ priorityBoard: [...s.priorityBoard, { ...card, id: card.id || generateId() }] })),
      updatePriorityCard: (id, updates) =>
        set((s) => ({
          priorityBoard: s.priorityBoard.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),
      deletePriorityCard: (id) =>
        set((s) => ({ priorityBoard: s.priorityBoard.filter((c) => c.id !== id) })),

      // ── Reminders ────────────────────────────────────────────────────────────
      addReminder: (reminder) =>
        set((s) => ({ reminders: [...s.reminders, { ...reminder, id: reminder.id || generateId() }] })),
      updateReminder: (id, updates) =>
        set((s) => ({
          reminders: s.reminders.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        })),
      deleteReminder: (id) =>
        set((s) => ({ reminders: s.reminders.filter((r) => r.id !== id) })),

      // ── Milestones ───────────────────────────────────────────────────────────
      addMilestone: (milestone) =>
        set((s) => ({ milestones: [...s.milestones, { ...milestone, id: milestone.id || generateId() }] })),
      updateMilestone: (id, updates) =>
        set((s) => ({
          milestones: s.milestones.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        })),
      deleteMilestone: (id) =>
        set((s) => ({ milestones: s.milestones.filter((m) => m.id !== id) })),

      // ── Notes ────────────────────────────────────────────────────────────────
      addNote: (note) =>
        set((s) => ({ notes: [...s.notes, { ...note, id: note.id || generateId() }] })),
      updateNote: (id, updates) =>
        set((s) => ({ notes: s.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)) })),
      deleteNote: (id) =>
        set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),

      // ── Settings ─────────────────────────────────────────────────────────────
      updateSettings: (updates) =>
        set((s) => ({ settings: { ...s.settings, ...updates } })),

      // ── Hydrate / Initialize ─────────────────────────────────────────────────
      hydrateState: (newState) => set((s) => ({ ...s, ...newState })),

      initializeData: () =>
        set((s) => {
          if (s.settings.firstLaunchDone) return s;
          return {
            tasks: INITIAL_TASKS,
            priorityBoard: INITIAL_PRIORITY_BOARD,
            formulas: INITIAL_FORMULAS,
            reminders: INITIAL_REMINDERS,
            mastery: INITIAL_MASTERY,
            milestones: INITIAL_MILESTONES,
            settings: { ...s.settings, firstLaunchDone: true },
          };
        }),
    }),
    {
      name: 'gate_store_v1',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          return { ...persistedState, notes: [], formulas: [] };
        }
        return persistedState;
      },
    }
  )
);
