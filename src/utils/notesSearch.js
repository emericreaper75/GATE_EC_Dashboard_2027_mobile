export function searchNotes(dataArray, query) {
  if (!query || !query.trim()) return dataArray;
  
  const lowerQuery = query.toLowerCase();
  return dataArray.filter(item => {
    const notes = (item.notes || '').toLowerCase();
    const name = (item.name || item.topic || '').toLowerCase();
    const thought = (item.thought || '').toLowerCase();
    const correctAnswer = (item.correctAnswer || '').toLowerCase();
    return notes.includes(lowerQuery) || name.includes(lowerQuery) || thought.includes(lowerQuery) || correctAnswer.includes(lowerQuery);
  });
}
