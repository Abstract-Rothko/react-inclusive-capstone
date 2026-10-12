import { findRoom, MAX_ADVANCE_DAYS } from '../../data/rooms';
import { addDays, parseIsoDate } from '../../lib/dates';
import { isValidEmail, isValidPhone } from '../../lib/validators';

const startOfDay = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export function validateBooking(values, now = new Date()) {
    const errors = {};
    const room = findRoom(values.room);

    if (values.name.trim().length < 2) {
        errors.name = 'Enter your full name, using at least 2 characters.';
    }

    if (!isValidEmail(values.email)) {
        errors.email = 'Enter an email address like name@example.com.';
    }

    if (values.phone.trim() !== '' && !isValidPhone(values.phone)) {
        errors.phone = 'Enter a phone number like 041 000 0000, or leave this blank.';
    }

    if (!room) {
        errors.room = 'Choose a room.';
    }

    if (!values.date) {
        errors.date = 'Choose a date.';
    } else {
        const date = parseIsoDate(values.date);
        const today = startOfDay(now);
        if (!date) {
            errors.date = 'Enter a real date, like 2026-10-20.';
        } else if (date < today) {
            errors.date = 'Choose today or a later date.';
        } else if (date > addDays(today, MAX_ADVANCE_DAYS)) {
            errors.date = `Choose a date within the next ${MAX_ADVANCE_DAYS} days.`;
        } else if (date.getDay() === 0) {
            errors.date = 'The library is closed on Sundays. Choose a day from Monday to Saturday.';
        }
    }

    if (!values.timeSlot) {
        errors.timeSlot = 'Choose a time slot.';
    }

    const attendees = Number(values.attendees);
    if (!Number.isInteger(attendees) || attendees < 1) {
        errors.attendees = 'Choose how many people are coming.';
    } else if (room && attendees > room.capacity) {
        errors.attendees = `${room.name} seats up to ${room.capacity} people. Choose ${room.capacity} or fewer.`;
    }

    return errors;
}