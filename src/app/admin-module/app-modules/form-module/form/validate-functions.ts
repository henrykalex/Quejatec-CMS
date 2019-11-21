export const TIME_REGEX = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/g);
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// REF: http://emailregex.com
export function arraysEqual(a, b) {
  if (a === b) { return true; }
  if (a == null || b == null) { return false; }
  if (a.length !== b.length) { return false; }
  for (let i = 0; i < a.length; ++i) {
    if (typeof a[i] === 'object') {
      if (!objectsEqual(a[i], b[i])) { return false; }
    } else {
      if (a[i] !== b[i]) { return false; }
    }
  }
  return true;
}
export function datesEqual(a, b) {
  if (a === b) { return true; }
  if (a == null || b == null) { return false; }
  const aDate = new Date(a);
  const bDate = new Date(b);
  return aDate.getTime() === bDate.getTime();
}

export function objectsEqual(a, b) {
  if (Array.isArray(a) || Array.isArray(b)) {
    return (Array.isArray(a) && Array.isArray(b)) ? arraysEqual(a, b) : false;
  }
  if (
    a instanceof Date || b instanceof Date ||
    TIME_REGEX.test(a) || TIME_REGEX.test(b)
  ) { return datesEqual(a, b); }
  if (a === b) { return true; }
  if (a == null || b == null) { return false; }
  if (Object.keys(a).length !== Object.keys(b).length) { return false; }
  for (const p in a) {
    if (typeof a[p] === 'object') {
      if (!objectsEqual(a[p], b[p])) { return false; }
    } else {
      if (a[p] !== b[p]) { return false; }
    }
  }
  return true;
}