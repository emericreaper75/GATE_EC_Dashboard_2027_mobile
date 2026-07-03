import { generateId } from '../../utils/helpers';

export const createTopicSlice = (set, get) => ({
  topics: [], // Array of topic entities: { id, subjectId, name, weightage, mastery, notes }
  
  addTopic: (topic) => 
    set((state) => ({ 
      topics: [...state.topics, { ...topic, id: topic.id || generateId() }] 
    })),
    
  updateTopic: (id, updates) => 
    set((state) => ({ 
      topics: state.topics.map(t => t.id === id ? { ...t, ...updates } : t) 
    })),
    
  deleteTopic: (id) => 
    set((state) => ({ 
      topics: state.topics.filter(t => t.id !== id) 
    })),
});
