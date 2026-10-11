import { isValidEmail } from "../../lib/validators";

export const MAX_SEATS = 4;

export function validateRegistration(values) {
    const errors = {};

    if (values.name.trim().length < 2) {
        errors.name = 'Enter your full name, using at least 2 characters.';
    }

    if (!isValidEmail(values.email)) {
        errors.email = 'Enter an email address like name@example.com.';
    }

    const seats = Number(values.seats);
    if (!Number.isInteger(seats) || seats < 1 || seats > MAX_SEATS) {
        errors.seats = `Choose between 1 and ${MAX_SEATS} seats.`;
    }

    if (values.notes.length > 300) {
        errors.notes = `Shorten this to 300 characters or fewer. You have used ${values.notes.length}.`;
    }

    return errors;
}