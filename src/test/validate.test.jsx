import { validateBooking } from '../components/booking/validate';
import { validateRegistration } from '../components/events/validate';
import { addDays, formatDate, parseIsoDate, toIsoDate } from '../lib/dates';

const today = new Date(2026, 9, 12);

const valid = {
    name: 'Onalerona Jacobs',
    email: 'ona@example.com',
    phone: '',
    room: 'study-room-2',
    date: '2026-10-13',
    attendees: '4',
    timeSlot: '09:00-11:00',
    needs: []
};

describe('validateBooking', () => {
    it('accepts a complete valid booking', () => {
        expect(validateBooking(valid, today)).toEqual({});
    });

    it('reports an email problem under the key "email"', () => {
        const errors = validateBooking({ ...valid, email: 'not-an-email' }, today);
        expect(errors.email).toMatch(/name@example.com/);
        expect(errors).not.toHaveProperty('mail');
    });

    it('rejects past dates but accepts today in any timezone', () => {
        expect(validateBooking({ ...valid, date: '2026-10-11' }, today).date).toMatch(/today or a later date/i);
        expect(validateBooking({ ...valid, date: '2026-10-12' }, today)).toEqual({});
    });

    it('rejects Sundays and dates beyond the booking window', () => {
        expect(validateBooking({ ...valid, date: '2026-10-18' }, today).date).toMatch(/closed on Sundays/i);
        expect(validateBooking({ ...valid, date: '2026-12-01' }, today).date).toMatch(/within the next 28 days/i);
    });

    it('checks attendee count against the chosen room capacity', () => {
        const errors = validateBooking({ ...valid, room: 'study-room-1', attendees: '5' }, today);
        expect(errors.attendees).toBe('Study Room 1 seats up to 4 people. Choose 4 or fewer.');
    });

    it('requires room, date and time slot', () => {
        const errors = validateBooking({ ...valid, room: '', date: '', timeSlot: '' }, today);
        expect(Object.keys(errors).sort()).toEqual(['date', 'room', 'timeSlot']);
    });

    it('validates the optional phone number only when it is filled in', () => {
        expect(validateBooking({ ...valid, phone: 'abc' }, today).phone).toBeDefined();
        expect(validateBooking({ ...valid, phone: '+27 41 000 0000' }, today)).toEqual({});
    });
});

describe('validateRegistration', () => {
    const base = { name: 'Ona Jacobs', email: 'ona@example.com', seats: '2', notes: '' };

    it('accepts valid input', () => {
        expect(validateRegistration(base)).toEqual({});
    });

    it('limits seats and note length with fixable messages', () => {
        expect(validateRegistration({ ...base, seats: '9' }).seats).toMatch(/between 1 and 4/);
        expect(validateRegistration({ ...base, notes: 'x'.repeat(301) }).notes).toMatch(/300 characters/);
    });
});

describe('date helpers', () => {
    it('round-trips ISO dates in local time', () => {
        expect(toIsoDate(parseIsoDate('2026-10-31'))).toBe('2026-10-31');
    });

    it('rejects impossible dates', () => {
        expect(parseIsoDate('2026-02-30')).toBeNull();
        expect(parseIsoDate('garbage')).toBeNull();
    });

    it('adds days across month boundaries', () => {
        expect(toIsoDate(addDays(new Date(2026, 9, 30), 3))).toBe('2026-11-02');
    });

    it('formats a long date', () => {
        expect(formatDate('2026-10-20')).toMatch(/20 October 2026/);
    });
});