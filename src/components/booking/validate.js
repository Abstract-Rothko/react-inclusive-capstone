import { MAX_ADVANCE_DAYS,findRoom } from '../../data/rooms';
import { addDays, parseIsoDate, toIsoDate } from '../../lib/dates';
import { isValidEmail, isValidPhone } from '../../lib/validators';

export function validateBooking(values, today = new Date()) {
    const errors = {};

    if (values.name.trim().length < 2) {
        errors.name = 'Enter your full name, using at least 2 characters.';
    }

    if (!isValidEmail(values.email)) {
        errors.email = 'Enter an email address like name@example.com.';
    }

    if (values.phone.trim() && !isValidPhone(values.phone)) {
        errors.phone = 'Enter a phone number using digits, spaces and + only, or leave this blank.';
    }

    const room = findRoom(values.room);
    if (!room) {
        errors.room = 'Choose a room.';
    }

    if (!values.date) {
        errors.date = 'Choose a date.';
    } else {
        const date = parseIsoDate(values.date);
        const earliest = toIsoDate(today);
        const latest = toIsoDate(addDays(today, MAX_ADVANCE_DAYS));
        if (!date) errors.date = 'Enter a valid date.';
        else if (values.date < earliest) errors.date = 'Choose today or a later date.';
        else if (values.date > latest) errors.date = `Choose a date within the next ${MAX_ADVANCE_DAYS} days.`;
        else if (date.getDay() === 0) errors.date = 'The library is closed on Sundays. Choose another day.';
    }

    const people = Number(values.attendees);
    if (!values.attendees || !Number.isInteger(people) || people < 1) {
        errors.attendees = 'Choose the number of people.';
    } else if (room && people > room.capacity) {
        errors.attendees = `${room.name} seats up to ${room.capacity} people. Choose ${room.capacity} or fewer.`;
    }

    if (!values.timeSlot) {
        errors.timeSlot = 'Choose a time slot.';
    }

    return errors;
}