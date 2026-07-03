import { generateId } from '../../utils/helpers';

export const createRevisionSlice = (set, get) => ({
  revisions: [], // { id, entityType: 'Formula'|'Mistake'|'Topic', entityId, nextReview, previousReview, easeFactor, interval, repetitions }
  
  addRevision: (revision) => 
    set((state) => ({ 
      revisions: [...state.revisions, { ...revision, id: revision.id || generateId() }] 
    })),
    
  updateRevision: (id, updates) => 
    set((state) => ({ 
      revisions: state.revisions.map(r => r.id === id ? { ...r, ...updates } : r) 
    })),
    
  deleteRevision: (id) => 
    set((state) => ({ 
      revisions: state.revisions.filter(r => r.id !== id) 
    })),
    
  // Helper to schedule the next review based on user's feedback (e.g. 0-5 quality score)
  // SuperMemo-2 algorithm simplified
  processRevision: (id, quality) => 
    set((state) => {
      const rev = state.revisions.find(r => r.id === id);
      if (!rev) return state;
      
      let { easeFactor, interval, repetitions } = rev;
      
      if (quality >= 3) {
        if (repetitions === 0) interval = 1;
        else if (repetitions === 1) interval = 6;
        else interval = Math.round(interval * easeFactor);
        repetitions += 1;
        easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      } else {
        repetitions = 0;
        interval = 1;
      }
      
      if (easeFactor < 1.3) easeFactor = 1.3;
      
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + interval);
      
      return {
        revisions: state.revisions.map(r => 
          r.id === id 
            ? { ...r, easeFactor, interval, repetitions, previousReview: new Date().toISOString(), nextReview: nextDate.toISOString() } 
            : r
        )
      };
    })
});
