import { generateId } from '../../utils/helpers';

export const createMockSlice = (set, get) => ({
  mocks: [], // { id, date, score, accuracy, timeTaken, subjectAnalysis: {}, topicAnalysis: {}, linkedMistakes: [] }
  
  addMock: (mock) => 
    set((state) => ({ 
      mocks: [...state.mocks, { ...mock, id: mock.id || generateId() }] 
    })),
    
  updateMock: (id, updates) => 
    set((state) => ({ 
      mocks: state.mocks.map(m => m.id === id ? { ...m, ...updates } : m) 
    })),
    
  deleteMock: (id) => 
    set((state) => ({ 
      mocks: state.mocks.filter(m => m.id !== id) 
    })),
});
