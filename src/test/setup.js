import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

// jsdom doesn't implement <dialog>
HTMLDialogElement.prototype.showModal ||= function () {this.setAttribute('open', ''); };
HTMLDialogElement.prototype.close ||= function () {this.removeAttribute('open'); this.dispatchEvent(new Event('close')); };