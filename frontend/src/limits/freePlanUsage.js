const STORAGE_KEY = 'tonguebridge_free_plan_daily_usage';
const WINDOW_MS = 12 * 60 * 60 * 1000;

export const FREE_IMAGE_DAILY_LIMIT = 9;

function createTypeState(now) {
  return {
    count: 0,
    windowStartMs: now,
  };
}

function getDefaultState(now) {
  return {
    image: createTypeState(now),
  };
}

function readState(now) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState(now);

    const parsed = JSON.parse(raw);
    return {
      image: parsed?.image ?? createTypeState(now),
    };
  } catch {
    return getDefaultState(now);
  }
}

function writeState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage write failures.
  }
}

function normalizeTypeState(typeState, now) {
  if (!typeState || typeof typeState.count !== 'number' || typeof typeState.windowStartMs !== 'number') {
    return createTypeState(now);
  }

  if (now - typeState.windowStartMs >= WINDOW_MS) {
    return createTypeState(now);
  }

  return typeState;
}

function getTypeState(state, type, now) {
  const normalized = normalizeTypeState(state[type], now);
  state[type] = normalized;
  return normalized;
}

export function getDailyUsageStatus(type, limit) {
  const now = Date.now();
  const state = readState(now);
  const typeState = getTypeState(state, type, now);

  writeState(state);

  const used = Math.max(0, typeState.count);
  const remaining = Math.max(0, limit - used);
  const resetAtMs = typeState.windowStartMs + WINDOW_MS;

  return {
    allowed: used < limit,
    used,
    remaining,
    resetAtMs,
  };
}

export function incrementDailyUsage(type) {
  const now = Date.now();
  const state = readState(now);
  const typeState = getTypeState(state, type, now);

  state[type] = {
    ...typeState,
    count: typeState.count + 1,
  };

  writeState(state);
}

export function formatTimeUntilReset(resetAtMs) {
  const remainingMs = Math.max(0, resetAtMs - Date.now());
  const totalMinutes = Math.ceil(remainingMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}
