import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import App from '../App';

export function renderApp(route = '/') {
    const user = userEvent.setup();
    const utils = render(
        <MemoryRouter initialEntries={[route]}>
            <App />
        </MemoryRouter>
    );
    return { user, ...utils };
}

export const auditPage = () => axe(document.documentElement);

export const politeRegion = () => document.querySelector('output[aria-live="polite"]');
export const assertiveRegion = () => document.querySelector('[role="alert"][aria-live="assertive"]');
