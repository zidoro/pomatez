export function parseTime(s: string) {
  const c = s.split(":");
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}
