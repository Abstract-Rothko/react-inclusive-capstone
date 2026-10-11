export function validate(v, today = new Date()) {
    const e = {};
    if(v.name.trim().length < 2) e.name = 'Enter your full name (at least 2 characters).';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.mail = 'Enter an email address like name@example.com';
    if(!v.room) e.room = 'Choose a room.';
    if(!v.date) e.date = 'Choose a date.';
    else if(new Date(v.date) < new Date(today.toDateString())) e.date = 'Choose today or your future date.';
    const n = Number(v.attendees);
    if(!Number.isInteger(n) || n < 1 || n > 12) e.attendees = 'Enter a whole number from 1 to 12';
    if(!v.timeSlot) e.timeSlot = 'Choose a time slot.';
    return e;
}