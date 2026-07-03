import { generateId } from '../../utils/helpers';

export const createSubjectSlice = (set, get) => ({
  subjects: [], // Array of subject entities: { id, name, weightage, studyHours }
  
  addSubject: (subject) => 
    set((state) => ({ 
      subjects: [...state.subjects, { ...subject, id: subject.id || generateId() }] 
    })),
    
  updateSubject: (id, updates) => 
    set((state) => ({ 
      subjects: state.subjects.map(s => s.id === id ? { ...s, ...updates } : s) 
    })),
    
  deleteSubject: (id) => 
    set((state) => ({ 
      subjects: state.subjects.filter(s => s.id !== id) 
    })),
});
