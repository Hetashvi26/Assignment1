/**
 * Formats a Date object or date string into a specified layout.
 * @param {Date|string|number} date - The date to format.
 * @param {string} formatStr - The format pattern (YYYY, MM, DD, hh, mm, ss).
 * @returns {string} The formatted date string.
 */
export function formatDate(date, formatStr = 'YYYY-MM-DD') {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided to formatDate');
  }

  const pad = (num) => String(num).padStart(2, '0');

  const map = {
    YYYY: d.getFullYear(),
    MM: pad(d.getMonth() + 1),
    DD: pad(d.getDate()),
    hh: pad(d.getHours()),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
  };

  return formatStr.replace(/YYYY|MM|DD|hh|mm|ss/g, (matched) => map[matched]);
}

/**
 * Returns a human-readable relative time string (e.g., "5 minutes ago", "in 2 hours").
 * @param {Date|string|number} date - The date to compare against now.
 * @returns {string} Relative time string.
 */
export function getRelativeTime(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided to getRelativeTime');
  }

  const now = new Date();
  const diffInSeconds = Math.floor((d - now) / 1000);
  const absDiff = Math.abs(diffInSeconds);

  if (absDiff < 60) return 'just now';

  const minutes = Math.floor(absDiff / 60);
  if (minutes < 60) {
    return diffInSeconds < 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ago` : `in ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return diffInSeconds < 0 ? `${hours} hour${hours > 1 ? 's' : ''} ago` : `in ${hours} hour${hours > 1 ? 's' : ''}`;
  }

  const days = Math.floor(hours / 24);
  return diffInSeconds < 0 ? `${days} day${days > 1 ? 's' : ''} ago` : `in ${days} day${days > 1 ? 's' : ''}`;
}