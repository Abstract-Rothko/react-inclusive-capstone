const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;

export const isValidEmail = value => EMAIL_PATTERN.test(value.trim());
export const isValidPhone = value => PHONE_PATTERN.test(value.trim());