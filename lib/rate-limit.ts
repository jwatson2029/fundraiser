const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

const requestLog = new Map<string, number[]>();

export function allowRequest(key: string) {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const previous = requestLog.get(key) ?? [];
  const recent = previous.filter((t) => t > windowStart);

  if (recent.length >= MAX_REQUESTS) {
    requestLog.set(key, recent);
    return false;
  }

  recent.push(now);
  requestLog.set(key, recent);
  return true;
}
