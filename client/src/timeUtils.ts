export function numOfDaysInMonth(month: number) {
  var now = new Date();
  return new Date(now.getFullYear(), month + 1, 0).getDate();
}

export function getFirstDayInMonth(month: number) {
  return new Date(new Date().getFullYear(), month, 1).getDay();
}

export function formatDate(date: Date) {
  console.log(date.getFullYear(), getFirstDayInMonth(date.getMonth()), date.getMonth());
  return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()].substr(0, 3)}. ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatHour(hour: number) {
  let meridiam = hour >= 12 && hour !== 24 ? 'pm' : 'am';
  if (hour > 12) {
    hour -= 12;
  }

  return hour + ' ' + meridiam;
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];