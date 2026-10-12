import '@testing-library/jest-dom/vitest';
import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

document.documentElement.lang = 'en';

if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function showModal() {
        this.setAttribute('open', '');
    };
}

if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function close() {
        if (!this.hasAttribute('open')) return;
        this.removeAttribute('open');
        this.dispatchEvent(new Event('close'));
    };
}

Element.prototype.scrollIntoView = function scrollIntoView() {};

afterEach(() => {
    cleanup();
    document.title = '';
});