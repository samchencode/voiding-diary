export function checkDateStale(d: Date) {
  const now = new Date();
  return d < now;
}
