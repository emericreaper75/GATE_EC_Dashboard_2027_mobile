export const selectPendingRevisions = (state) => {
  const today = new Date().toISOString().split('T')[0];
  return state.revisions.filter(r => r.nextReview && r.nextReview.split('T')[0] <= today);
};

export const selectSubjectStats = (state, subjectName) => {
  const topics = state.topics.filter(t => t.subject === subjectName);
  
  // Progress = average mastery of topics
  const totalMastery = topics.reduce((sum, t) => sum + (t.mastery || 0), 0);
  const progress = topics.length ? Math.round(totalMastery / topics.length) : 0;
  
  // Accuracy = Correct PYQs / Solved PYQs for this subject
  const pyqs = state.pyqs.filter(p => p.subject === subjectName && p.solved);
  const correctPyqs = pyqs.filter(p => p.correct);
  const accuracy = pyqs.length ? Math.round((correctPyqs.length / pyqs.length) * 100) : 0;
  
  return { progress, accuracy };
};

export const selectTopicStats = (state, topicName) => {
  const pyqs = state.pyqs.filter(p => p.topic === topicName && p.solved);
  const correctPyqs = pyqs.filter(p => p.correct);
  const accuracy = pyqs.length ? Math.round((correctPyqs.length / pyqs.length) * 100) : 0;
  
  return { accuracy };
};

export const selectWeakestSubjects = (state) => {
  // Compute progress for each subject
  const subjectsWithStats = state.subjects.map(s => {
    const stats = selectSubjectStats(state, s.name);
    return { ...s, progress: stats.progress, accuracy: stats.accuracy };
  });
  
  // Sort by lowest progress
  return subjectsWithStats.sort((a, b) => a.progress - b.progress);
};

export const selectDashboardSummary = (state) => {
  // Aggregate stats
  const totalPyqsSolved = state.pyqs.filter(p => p.solved).length;
  
  const pendingMistakes = state.mistakes.filter(m => !m.resolved).length;
  
  const dueRevisions = selectPendingRevisions(state).length;
  
  const allTopics = state.topics;
  const totalMastery = allTopics.reduce((sum, t) => sum + (t.mastery || 0), 0);
  const overallMastery = allTopics.length ? Math.round(totalMastery / allTopics.length) : 0;
  
  const totalMocks = state.mocks.length;
  const avgMockScore = totalMocks ? Math.round(state.mocks.reduce((sum, m) => sum + (m.score || 0), 0) / totalMocks) : 0;

  return {
    totalPyqsSolved,
    pendingMistakes,
    dueRevisions,
    overallMastery,
    totalMocks,
    avgMockScore
  };
};
