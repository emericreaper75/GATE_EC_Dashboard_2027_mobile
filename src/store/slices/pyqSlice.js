import { generateId } from '../../utils/helpers';

export const createPYQSlice = (set, get) => ({
  pyqs: [], // { id, year, subjectId, topicId, marks, difficulty, solved, correct, bookmarked, linkedNotes }
  
  addPYQ: (pyq) => 
    set((state) => ({ 
      pyqs: [...state.pyqs, { ...pyq, id: pyq.id || generateId() }] 
    })),
    
  updatePYQ: (id, updates) => 
    set((state) => ({ 
      pyqs: state.pyqs.map(p => p.id === id ? { ...p, ...updates } : p) 
    })),
    
  deletePYQ: (id) => 
    set((state) => ({ 
      pyqs: state.pyqs.filter(p => p.id !== id) 
    })),
});
