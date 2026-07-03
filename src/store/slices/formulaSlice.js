import { generateId } from '../../utils/helpers';

export const createFormulaSlice = (set, get) => ({
  formulas: [], // { id, topicId, title, expression, explanation, difficulty, confidence, linkedMistakes }
  
  addFormula: (formula) => 
    set((state) => {
      const newFormula = { ...formula, id: formula.id || generateId() };
      return { formulas: [...state.formulas, newFormula] };
    }),
    
  updateFormula: (id, updates) => 
    set((state) => {
      return {
        formulas: state.formulas.map(f => {
          if (f.id !== id) return f;
          const updated = { ...f, ...updates };
          // If confidence changed, we might want to schedule a revision
          // but spaced repetition is now better handled by revisionSlice
          // For now, keep it simple.
          return updated;
        })
      };
    }),
    
  deleteFormula: (id) => 
    set((state) => ({ 
      formulas: state.formulas.filter(f => f.id !== id) 
    })),
});
