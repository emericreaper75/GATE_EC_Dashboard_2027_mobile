import { generateId } from '../../utils/helpers';
import { DEFAULT_SETTINGS } from '../../utils/initialData';

export const createUiSlice = (set, get) => ({
  // Legacy arrays kept for UI features that aren't strictly main entities
  tasks: [],
  priorityBoard: [],
  reminders: [],
  milestones: [],
  weeklyReviews: [],
  settings: DEFAULT_SETTINGS,

  // Tasks
  addTask: (task) => set((s) => ({ tasks: [...s.tasks, { ...task, id: task.id || generateId() }] })),
  updateTask: (id, updates) => set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)) })),
  deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

  // Priority Board
  addPriorityCard: (card) => set((s) => ({ priorityBoard: [...s.priorityBoard, { ...card, id: card.id || generateId() }] })),
  updatePriorityCard: (id, updates) => set((s) => ({ priorityBoard: s.priorityBoard.map((c) => (c.id === id ? { ...c, ...updates } : c)) })),
  deletePriorityCard: (id) => set((s) => ({ priorityBoard: s.priorityBoard.filter((c) => c.id !== id) })),

  // Reminders
  addReminder: (reminder) => set((s) => ({ reminders: [...s.reminders, { ...reminder, id: reminder.id || generateId() }] })),
  updateReminder: (id, updates) => set((s) => ({ reminders: s.reminders.map((r) => (r.id === id ? { ...r, ...updates } : r)) })),
  deleteReminder: (id) => set((s) => ({ reminders: s.reminders.filter((r) => r.id !== id) })),

  // Milestones
  addMilestone: (milestone) => set((s) => ({ milestones: [...s.milestones, { ...milestone, id: milestone.id || generateId() }] })),
  updateMilestone: (id, updates) => set((s) => ({ milestones: s.milestones.map((m) => (m.id === id ? { ...m, ...updates } : m)) })),
  deleteMilestone: (id) => set((s) => ({ milestones: s.milestones.filter((m) => m.id !== id) })),

  // Weekly Reviews
  addWeeklyReview: (review) => set((s) => ({ weeklyReviews: [...s.weeklyReviews, { ...review, id: review.id || generateId() }] })),
  deleteWeeklyReview: (id) => set((s) => ({ weeklyReviews: s.weeklyReviews.filter((r) => r.id !== id) })),

  // Settings
  updateSettings: (updates) => set((s) => ({ settings: { ...s.settings, ...updates } })),
});
