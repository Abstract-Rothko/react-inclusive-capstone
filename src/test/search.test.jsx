import { screen, waitFor, within } from '@testing-library/react';
import { politeRegion, renderApp } from './helpers';

describe('filterable resource listing', () => {
    it('exposes the accordion state with aria-expanded and toggles by click, Enter and Space', async () => {
        const { user } = renderApp('/search');
        const level = screen.getByRole('button', { name: 'Level' });
        const category = screen.getByRole('button', { name: 'Category' });

        expect(category).toHaveAttribute('aria-expanded', 'true');
        expect(level).toHaveAttribute('aria-expanded', 'false');
        expect(document.getElementById(level.getAttribute('aria-controls'))).not.toBeVisible();

        await user.click(level);
        expect(level).toHaveAttribute('aria-expanded', 'true');
        expect(document.getElementById(level.getAttribute('aria-controls'))).toBeVisible();

        level.focus();
        await user.keyboard('{Enter}');
        expect(level).toHaveAttribute('aria-expanded', 'false');

        await user.keyboard(' ');
        expect(level).toHaveAttribute('aria-expanded', 'true');
    });

    it('updates aria-pressed on category toggles and filters the list', async () => {
        const { user } = renderApp('/search');
        const chip = screen.getByRole('button', { name: 'Finance Skills' });
        expect(chip).toHaveAttribute('aria-pressed', 'false');

        await user.click(chip);
        expect(chip).toHaveAttribute('aria-pressed', 'true');
        await waitFor(() => expect(screen.getByText(/showing 12 of 15 resources/i)).toBeInTheDocument());

        chip.focus();
        await user.keyboard(' ');
        expect(chip).toHaveAttribute('aria-pressed', 'false');
    });

    it('announces the result count politely once the typing settles', async () => {
        const { user } = renderApp('/search');
        const input = screen.getByRole('searchbox', { name: /search courses/i });
        await user.type(input, 'bookkeeping');

        expect(screen.getByRole('region', { name: /search results/i })).toHaveAttribute('aria-busy', 'true');
        await waitFor(() => expect(politeRegion()).toHaveTextContent(/\d+ results? found/i), { timeout: 2000 });
        expect(screen.getByRole('region', { name: /search results/i })).toHaveAttribute('aria-busy', 'false');
    });

    it('announces and explains an empty result set', async () => {
        const { user } = renderApp('/search');
        await user.type(screen.getByRole('searchbox'), 'zzzzqqqq');
        await waitFor(() => expect(politeRegion()).toHaveTextContent('No results found.'), { timeout: 2000 });
        expect(screen.getByText(/try a different word/i)).toBeInTheDocument();
    });

    it('returns focus to the search box when all filters are cleared', async () => {
        const { user } = renderApp('/search');
        await user.click(screen.getByRole('button', { name: 'Digital Skills' }));
        await user.click(screen.getByRole('button', { name: /clear all filters/i }));
        expect(screen.getByRole('searchbox')).toHaveFocus();
        expect(screen.queryByRole('button', { name: /clear all filters/i })).not.toBeInTheDocument();
    });

    it('moves focus to the first newly revealed result after "Show more"', async () => {
        const { user } = renderApp('/search');
        const list = screen.getByRole('list', { name: '' , hidden: false });
        const before = within(list).getAllByRole('listitem').length;
        expect(before).toBe(12);

        await user.click(screen.getByRole('button', { name: /show 12 more resources/i }));
        const links = within(screen.getByRole('region', { name: /search results/i })).getAllByRole('link');
        expect(links).toHaveLength(24);
        expect(links[12]).toHaveFocus();
    });

    it('starts from the topic chosen on the home page', () => {
        renderApp('/search?category=Local%20History');
        expect(screen.getByRole('button', { name: 'Local History' })).toHaveAttribute('aria-pressed', 'true');
    });

    it('lets keyboard users skip the filters', async () => {
        const { user } = renderApp('/search');
        await user.click(screen.getByRole('button', { name: /skip filters/i }));
        expect(screen.getByRole('heading', { name: /search results/i })).toHaveFocus();
    });

    it('opens a course detail page with a breadcrumb', async () => {
        const { user } = renderApp('/search');
        await user.click(screen.getAllByRole('link', { name: /budgeting basics/i })[0]);
        expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1, name: /budgeting basics/i })).toHaveFocus();
    });
});