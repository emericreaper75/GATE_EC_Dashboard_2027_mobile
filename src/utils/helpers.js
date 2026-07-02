// Unique ID generator (no crypto polyfill needed)
export function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// Get today's date string "YYYY-MM-DD"
export function getTodayStr() {
  const today = new Date();
  return new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
}

// Format date "YYYY-MM-DD" → "Jul 2, 2026"
export function formatDate(dateStr) {
  if (!dateStr) return 'Never';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

// Format time from "08:00" → "8:00 AM"
export function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

// Days remaining to a date string
export function daysUntil(dateStr) {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 3600 * 24)));
}

// Mastery color (matches web app logic)
export function masteryColor(value) {
  if (value >= 75) return '#22C55E'; // success
  if (value >= 50) return '#F59E0B'; // warning
  return '#EF4444'; // danger
}

// Mastery label
export function masteryLabel(value) {
  if (value >= 75) return 'Strong';
  if (value >= 50) return 'Learning';
  if (value > 0) return 'Weak';
  return 'Not Started';
}

// Percentage string
export function pct(value, decimals = 0) {
  return `${Number(value || 0).toFixed(decimals)}%`;
}

// Clamp number between min and max
export function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

// Get week start (Monday) for a given date
export function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
}

// Truncate string
export function truncate(str, len = 40) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '…' : str;
}

// Get phase info based on current date
export function getPhaseInfo() {
  const now = new Date();
  const phase1End = new Date('2026-11-30');
  const gateDate = new Date('2027-02-14');
  const phase1Start = new Date('2026-07-01');

  const isPhase1 = now <= phase1End;
  const daysToGate = daysUntil('2027-02-14');

  const phase1Total = 153;
  const phase1Elapsed = Math.min(
    phase1Total,
    Math.max(0, Math.ceil((now.getTime() - phase1Start.getTime()) / (1000 * 3600 * 24)))
  );
  const phase1Progress = Math.round((phase1Elapsed / phase1Total) * 100);

  const phase2Total = 75;
  const phase2Elapsed = Math.max(
    0,
    Math.ceil((now.getTime() - phase1End.getTime()) / (1000 * 3600 * 24))
  );
  const phase2Progress = Math.round((phase2Elapsed / phase2Total) * 100);

  const daysInPhase = isPhase1
    ? phase1Total - phase1Elapsed
    : Math.max(0, phase2Total - phase2Elapsed);

  return {
    isPhase1,
    phaseName: isPhase1 ? 'Phase 1: Vigorous Prep' : 'Phase 2: Ruthless Testing',
    daysToGate,
    phase1Progress,
    phase1Elapsed,
    phase1Total,
    phase2Progress,
    phase2Elapsed,
    phase2Total,
    daysInPhase,
  };
}
