import { formatDate, getRelativeTime } from 'flexi-date-formatter';

console.log('--- Flexi Date Formatter Demo --- \n');

// 1. Test Date Formatting
const now = new Date();
console.log('Standard Format (YYYY-MM-DD):', formatDate(now));
console.log('Custom Format (DD/MM/YYYY hh:mm:ss):', formatDate(now, 'DD/MM/YYYY hh:mm:ss'));
console.log('Time Only (hh:mm):', formatDate(now, 'hh:mm'));

console.log('\n--------------------------------- \n');

// 2. Test Relative Time Lookups
const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
const futureInTwoHours = new Date(Date.now() + 2 * 60 * 60 * 1000);

console.log('10 minutes ago evaluates to:', getRelativeTime(tenMinutesAgo));
console.log('5 days ago evaluates to:', getRelativeTime(fiveDaysAgo));
console.log('In 2 hours evaluates to:', getRelativeTime(futureInTwoHours));
console.log('Right now evaluates to:', getRelativeTime(new Date()));