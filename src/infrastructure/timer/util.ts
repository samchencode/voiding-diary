export function toMsFromNow(d: Date) {
  const now = new Date();
  return d.getTime() - now.getTime();
}
