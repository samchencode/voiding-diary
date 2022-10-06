export function dateAddMs(d: Date, ms: number) {
  const totalMs = d.getTime() + ms;
  return new Date(totalMs);
}

export function nowAddMs(ms: number) {
  return dateAddMs(new Date(), ms);
}
