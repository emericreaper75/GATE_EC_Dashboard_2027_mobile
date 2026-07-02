import { useCallback } from 'react';
import { useStore } from '../store';

/**
 * useDashboardStats — computes all derived stats shown on the Dashboard screen.
 * Keeps Dashboard.js clean by centralizing calculations here.
 */
export function useDashboardStats() {
  const { tasks, pyqLogs, errors, mastery, settings } = useStore();

  const today = new Date();
  const todayStr = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  // Countdown
  const gateDate = new Date('2027-02-14');
  const daysToGate = Math.max(
    0,
    Math.ceil((gateDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
  );

  // Phase progress
  const phase1End = new Date('2026-11-30');
  const phase1Start = new Date('2026-07-01');
  const isPhase1 = today <= phase1End;

  const phase1Total = 153;
  const phase1Elapsed = Math.min(
    phase1Total,
    Math.max(0, Math.ceil((today.getTime() - phase1Start.getTime()) / (1000 * 3600 * 24)))
  );
  const phase1Progress = Math.round((phase1Elapsed / phase1Total) * 100);

  const phase2Total = 75;
  const phase2Elapsed = Math.max(
    0,
    Math.ceil((today.getTime() - phase1End.getTime()) / (1000 * 3600 * 24))
  );
  const phase2Progress = Math.round((phase2Elapsed / phase2Total) * 100);

  const daysInCurrentPhase = isPhase1
    ? phase1Total - phase1Elapsed
    : Math.max(0, phase2Total - phase2Elapsed);

  // PYQ target
  const pyqsDone = pyqLogs.length;
  const pyqsPerDayTarget = Math.ceil(Math.max(0, 5000 - pyqsDone) / (daysToGate || 1));

  // Today's snapshot
  const todaysTasks = tasks.filter((t) => t.date === todayStr);
  const todaysCompletedTasks = todaysTasks.filter((t) => t.completed).length;
  const todaysPyqs = pyqLogs.filter((l) => l.date === todayStr);
  const subjectsStudiedToday = new Set(todaysPyqs.map((l) => l.subject)).size;
  const weakTopicsCount = mastery.filter((m) => m.mastery < 50).length;

  // This week's errors
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const startOfWeekStr = new Date(startOfWeek.getTime() - startOfWeek.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  const errorsThisWeek = errors.filter((e) => e.date >= startOfWeekStr).length;

  // Subject mastery averages
  const SUBJECTS = [
    'Networks', 'Signals & Systems', 'Engineering Mathematics',
    'Communications', 'Electromagnetics', 'Analog Circuits',
    'Digital Circuits', 'Electronic Devices', 'Control Systems', 'General Aptitude',
  ];
  const masteryAverages = SUBJECTS.map((sub) => {
    const topics = mastery.filter((m) => m.subject === sub);
    const avg = topics.length > 0
      ? Math.round(topics.reduce((acc, m) => acc + m.mastery, 0) / topics.length)
      : 0;
    return { subject: sub, average: avg };
  });

  // Recent activity
  const recentActivities = [
    ...pyqLogs.slice(-2).map((l) => ({ id: l.id, type: 'PYQ', text: `PYQ: ${l.subject}`, time: l.date })),
    ...tasks.filter((t) => t.completed).slice(-2).map((t) => ({ id: t.id, type: 'Task', text: `Done: ${t.title}`, time: t.date })),
    ...errors.slice(-1).map((e) => ({ id: e.id, type: 'Error', text: `Error: ${e.subject}`, time: e.date })),
  ]
    .sort((a, b) => b.time.localeCompare(a.time))
    .slice(0, 5);

  return {
    todayStr,
    daysToGate,
    isPhase1,
    phaseName: isPhase1 ? 'Phase 1: Vigorous Prep' : 'Phase 2: Ruthless Testing',
    daysInCurrentPhase,
    phase1Progress, phase1Elapsed, phase1Total,
    phase2Progress, phase2Elapsed, phase2Total,
    pyqsDone,
    pyqsPerDayTarget,
    todaysTasks,
    todaysCompletedTasks,
    subjectsStudiedToday,
    weakTopicsCount,
    errorsThisWeek,
    masteryAverages,
    recentActivities,
    dailyPYQTarget: settings.dailyPYQTarget || 20,
  };
}
