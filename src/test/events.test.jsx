import { screen, waitFor, within } from '@testing-library/react';
import { renderApp } from './helpers';

describe('events and registration', () => {
    it('lists events in chronological order with machine-readable times', () => {
        renderApp('/events');
        const times = [...document.querySelectorAll('article time[datetime]')]
            .map(node => node.getAttribute('datetime'))
            .filter((_, index) => index % 2 === 0);
        expect([...times].sort()).toEqual(times);
    });

    it('gives every register link a unique, descriptive name', () => {
        renderApp('/events');
        const names = screen.getAllByRole('link', { name: /^register for/i }).map(link => link.textContent);
        expect(new Set(names).size).toBe(names.length);
    });

    it('validates the registration form and focuses the error summary', async () => {
        const { user } = renderApp('/events/staying-safe-online/register');
        await user.click(screen.getByRole('button', { name: /register for this event/i }));
        expect(screen.getByRole('region', { name: /problems with your registration/i })).toHaveFocus();
        expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    });

    it('reports an over-long access note with the count', async () => {
        const { user } = renderApp('/events/staying-safe-online/register');
        await user.click(screen.getByLabelText(/access requirements/i));
        await user.paste('x'.repeat(305));
        await user.tab();
        expect(screen.getByText(/you have used 305/i)).toBeInTheDocument();
    });

    it('confirms a valid registration in an accessible dialog', async () => {
        const { user } = renderApp('/events/staying-safe-online/register');
        await user.type(screen.getByLabelText(/full name/i), 'Ona Jacobs');
        await user.type(screen.getByLabelText(/email address/i), 'ona@example.com');
        await user.click(screen.getByRole('button', { name: /register for this event/i }));

        const dialog = await screen.findByRole('dialog', { name: /registration confirmed/i });
        expect(dialog).toHaveAccessibleDescription(/staying safe online/i);
        await user.click(within(dialog).getByRole('button', { name: /done/i }));
        await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveFocus());
    });

    it('shows the 404 page for an unknown event', () => {
        renderApp('/events/unknown/register');
        expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
    });
});