import { screen } from '@testing-library/react';
import { auditPage, renderApp } from './helpers';

const routes = [
    ['/', 'Home'],
    ['/search', 'Courses and archive'],
    ['/courses/1', 'Budgeting Basics'],
    ['/events', 'Events'],
    ['/events/staying-safe-online/register', 'Register for Staying Safe Online'],
    ['/reserve', 'Reserve a room'],
    ['/accessibility', 'Accessibility statement'],
    ['/this-page-does-not-exist', 'Page not found']
];

describe.each(routes)('page %s', (route, titlePart) => {
    it('has no axe violations', async () => {
        renderApp(route);
        expect(await auditPage()).toHaveNoViolations();
    });

    it('exposes exactly one banner, main and contentinfo landmark', () => {
        renderApp(route);
        expect(screen.getAllByRole('banner')).toHaveLength(1);
        expect(screen.getAllByRole('main')).toHaveLength(1);
        expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
    });

    it('has one h1 and a unique document title', () => {
        renderApp(route);
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
        expect(document.title).toContain(titlePart);
        expect(document.title).toContain('Kariega Public Library');
    });

    it('never skips a heading level', () => {
        renderApp(route);
        const levels = screen.getAllByRole('heading').map(heading => Number(heading.tagName[1]));
        levels.forEach((level, index) => {
            if (index > 0) expect(level - levels[index - 1]).toBeLessThanOrEqual(1);
        });
    });
});