import { generateId } from '../../utils/helpers';

export const createNoteSlice = (set, get) => ({
  notes: [], // { id, subjectId, topicId, title, content, tags, linkedFormulas, linkedPyqs, linkedMistakes }
  
  addNote: (note) => 
    set((state) => ({ 
      notes: [...state.notes, { ...note, id: note.id || generateId() }] 
    })),
    
  updateNote: (id, updates) => 
    set((state) => ({ 
      notes: state.notes.map(n => n.id === id ? { ...n, ...updates } : n) 
    })),
    
  deleteNote: (id) => 
    set((state) => ({ 
      notes: state.notes.filter(n => n.id !== id) 
    })),
});
