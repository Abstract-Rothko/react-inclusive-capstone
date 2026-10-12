import { mkdirSync, writeFileSync } from 'node:fs';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const BASE_URL = (process.env.BASE_URL ?? 'http://localhost:4173').replace(/\/$/, '');
const ROUTES = [
    '/', '/search', '/courses/1', '/events',
    '/events/staying-safe-online/register',
    '/reserve', '/accessibility', '/this-page-does-not-exist'
];
const slug = route => (route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-'));

mkdirSync('docs/lighthouse', { recursive: true });
const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
let failed = false;

try {
    for (const route of ROUTES) {
        const result = await lighthouse(`${BASE_URL}${route}`, {
            port: chrome.port, output: 'html',
            onlyCategories: ['accessibility'], logLevel: 'error'
        });
        const score = Math.round(result.lhr.categories.accessibility.score * 100);
        writeFileSync(`docs/lighthouse/${slug(route)}.html`, result.report);
        console.log(`${String(score).padStart(3)}  ${route}`);
        if (score < 100) failed = true;
    }
} finally {
    await chrome.kill();
}
if (failed) process.exitCode = 1;