import { screen, within } from '@testing-library/react';
import { renderApp } from './helpers';

describe('layout and navigation', () => {
    it('makes the skip link the first tab stop', async () => {
        const { user } = renderApp('/search');
        await user.tab();
        expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveFocus();
    });

    it('moves focus to main when the skip link is activated with Enter', async () => {
        const { user } = renderApp('/search');
        await user.tab();
        await user.keyboard('{Enter}');
        expect(screen.getByRole('main')).toHaveFocus();
    });

    it('labels every navigation landmark uniquely', () => {
        renderApp('/reserve');
        const names = screen.getAllByRole('navigation').map(nav => nav.getAttribute('aria-label'));
        expect(names.every(Boolean)).toBe(true);
        expect(new Set(names).size).toBe(names.length);
    });

    it('marks the current page in the main navigation', () => {
        renderApp('/events');
        const nav = screen.getByRole('navigation', { name: 'Main' });
        expect(nav.querySelector('[aria-current="page"]')).toHaveTextContent('Events');
    });

    it('moves focus to the new page heading after a client-side navigation', async () => {
        const { user } = renderApp('/');
        const nav = screen.getByRole('navigation', { name: 'Main' })
        await user.click(within(nav).getByRole('link', { name: 'Reserve a room' }));
        expect(screen.getByRole('heading', { level: 1, name: 'Reserve a room' })).toHaveFocus();
    });

    it('shows a helpful 404 with recovery links', () => {
        renderApp('/nope');
        expect(screen.getByRole('link', { name: /go to the home page/i })).toBeInTheDocument();
    });
});
