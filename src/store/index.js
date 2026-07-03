import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '../utils/helpers';
import { SUBJECTS } from '../utils/constants';

// Slices
import { createSubjectSlice } from './slices/subjectSlice';
import { createTopicSlice } from './slices/topicSlice';
import { createFormulaSlice } from './slices/formulaSlice';
import { createPYQSlice } from './slices/pyqSlice';
import { createMistakeSlice } from './slices/mistakeSlice';
import { createNoteSlice } from './slices/noteSlice';
import { createRevisionSlice } from './slices/revisionSlice';
import { createMockSlice } from './slices/mockSlice';
import { createUiSlice } from './slices/uiSlice';

import { 
  INITIAL_TASKS, INITIAL_PRIORITY_BOARD, INITIAL_REMINDERS, 
  INITIAL_MILESTONES, DEFAULT_SETTINGS, INITIAL_MASTERY 
} from '../utils/initialData';

export const useStore = create(
  persist(
    (set, get) => ({
      ...createSubjectSlice(set, get),
      ...createTopicSlice(set, get),
      ...createFormulaSlice(set, get),
      ...createPYQSlice(set, get),
      ...createMistakeSlice(set, get),
      ...createNoteSlice(set, get),
      ...createRevisionSlice(set, get),
      ...createMockSlice(set, get),
      ...createUiSlice(set, get),

      // ── Hydrate / Initialize ─────────────────────────────────────────────────
      hydrateState: (newState) => set((s) => ({ ...s, ...newState })),

      initializeData: () =>
        set((s) => {
          if (s.settings.firstLaunchDone) return s;
          
          // Seed subjects
          const initialSubjects = SUBJECTS.map(name => ({ id: generateId(), name, weightage: 10 }));
          
          // Seed topics from INITIAL_MASTERY
          const initialTopics = INITIAL_MASTERY.map(m => ({
            id: m.id,
            subject: m.subject, // Map to subject name for now
            topic: m.topic,
            mastery: m.mastery,
            notes: m.notes
          }));

          return {
            subjects: initialSubjects,
            topics: initialTopics,
            tasks: INITIAL_TASKS,
            priorityBoard: INITIAL_PRIORITY_BOARD,
            reminders: INITIAL_REMINDERS,
            milestones: INITIAL_MILESTONES,
            settings: { ...s.settings, firstLaunchDone: true },
          };
        }),
    }),
    {
      name: 'gate_store_v2', // bumped version
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      migrate: (persistedState, version) => {
        if (version < 2) {
          // Perform migration from unstructured v1 to entity v2
          const s = persistedState;
          
          // Initialize empty entities
          const subjects = SUBJECTS.map(name => ({ id: generateId(), name, weightage: 10 }));
          
          // Migrate old mastery to topics
          const topics = (s.mastery || []).map(m => ({
            id: m.id,
            subject: m.subject,
            topic: m.topic,
            mastery: m.mastery || 0,
            notes: m.notes || ''
          }));

          // Formulas can largely stay the same, map properties correctly
          const formulas = (s.formulas || []).map(f => ({
            id: f.id,
            topic: f.topic || 'General',
            title: f.title || f.formulaName,
            expression: f.expression || f.formula,
            explanation: f.explanation || f.notes,
            difficulty: f.difficulty || 'Medium',
            confidence: f.confidence || 'Learning'
          }));

          // Convert old pyqLogs to pyqs entity
          const pyqs = (s.pyqLogs || []).map(p => ({
            id: p.id,
            year: p.year,
            subject: p.subject,
            topic: p.topic,
            marks: p.marks,
            difficulty: p.difficulty || 'Medium',
            solved: true,
            correct: p.result === 'Correct ✅',
            bookmarked: p.bookmarked || false,
          }));

          // Convert old errors to mistakes entity
          const mistakes = (s.errors || []).map(e => ({
            id: e.id,
            subject: e.subject,
            topic: e.topic,
            pyqId: null, // Hard to map without explicit pyqId
            mistakeCategory: e.errorType,
            reason: e.mistake,
            correction: e.correction,
            resolved: e.status === 'Mastered'
          }));

          // Mocks
          const mocks = (s.mocks || []).map(m => ({
            id: m.id,
            date: m.date,
            score: m.score,
            accuracy: m.accuracy,
            timeTaken: m.timeTaken
          }));

          // Notes
          const notes = (s.notes || []).map(n => ({
            id: n.id,
            subject: n.subject || 'General',
            topic: n.topic || 'General',
            title: n.title || 'Note',
            content: n.content,
            type: n.type
          }));

          // Revisions
          // Re-map formula srs into revisions
          const revisions = [];
          (s.formulas || []).forEach(f => {
            if (f.srs) {
              revisions.push({
                id: generateId(),
                entityType: 'Formula',
                entityId: f.id,
                nextReview: f.srs.nextReviewDate,
                interval: f.srs.interval,
                easeFactor: f.srs.efactor,
                repetitions: f.srs.repetition
              });
            }
          });

          return {
            ...s,
            subjects,
            topics,
            formulas,
            pyqs,
            mistakes,
            mocks,
            notes,
            revisions,
            // clean up old unstructured arrays to save space if needed
            // pyqLogs: undefined, errors: undefined, mastery: undefined
          };
        }
        return persistedState;
      },
    }
  )
);
