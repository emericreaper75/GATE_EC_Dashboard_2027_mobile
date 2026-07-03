import { generateId } from '../../utils/helpers';

export const createMistakeSlice = (set, get) => ({
  mistakes: [], // { id, subjectId, topicId, pyqId, formulaId, noteId, mistakeCategory, reason, correction, resolved }
  
  addMistake: (mistake) => 
    set((state) => {
      const newMistake = { ...mistake, id: mistake.id || generateId() };
      
      // We could trigger revision scheduling here if we want by calling get().addRevision(...)
      // but let's keep side-effects minimal or handle them in the component layer or an explicit thunk.
      
      return { mistakes: [...state.mistakes, newMistake] };
    }),
    
  updateMistake: (id, updates) => 
    set((state) => ({ 
      mistakes: state.mistakes.map(m => m.id === id ? { ...m, ...updates } : m) 
    })),
    
  deleteMistake: (id) => 
    set((state) => ({ 
      mistakes: state.mistakes.filter(m => m.id !== id) 
    })),
});
