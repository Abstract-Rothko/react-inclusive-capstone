import { mkdirSync, writeFileSync } from 'node:fs';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const BASE_URL = (process.env.BASE_URL ?? 'http://localhost:4173').replace(/\/$/, '');
const ROUTES = [
    '/',
    '/search',
    '/courses/1',
    '/events',
    '/events/staying-safe-online/register',
    '/reserve',
    '/accessibility',
    '/this-page-does-not-exist'
];

const slug = route => (route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-'));

async function getChrome() {
    if (process.env.CHROME_PORT) {
        return { port: Number(process.env.CHROME_PORT), kill: async () => {} };
    }
    const chromeFlags = ['--no-sandbox'];
    if (process.env.CHROME_HEADLESS !== 'false') chromeFlags.unshift('--headless=new');
    try {
        // logLevel "error" makes chrome-launcher print Chrome's own error log if startup fails.
        return await launch({ chromeFlags, logLevel: 'error' });
    } catch (error) {
        console.error('\nCould not start Chrome:', error.message);
        console.error('Try, in order:');
        console.error('  1. CHROME_HEADLESS=false  (PowerShell: $env:CHROME_HEADLESS="false")');
        console.error('  2. CHROME_PATH=<full path to chrome.exe>');
        console.error('  3. Start Chrome yourself and set CHROME_PORT=9222 (see README)');
        console.error('  4. Use the Lighthouse tab in Chrome DevTools instead.');
        process.exit(1);
    }
}

mkdirSync('docs/lighthouse', { recursive: true });
const chrome = await getChrome();
let failed = false;

try {
    for (const route of ROUTES) {
        const result = await lighthouse(`${BASE_URL}${route}`, {
            port: chrome.port,
            output: 'html',
            onlyCategories: ['accessibility'],
            logLevel: 'error'
        });
        const score = Math.round(result.lhr.categories.accessibility.score * 100);
        writeFileSync(`docs/lighthouse/${slug(route)}.html`, result.report);
        console.log(`${String(score).padStart(3)}  ${route}`);
        if (score < 100) failed = true;
    }
} finally {
    await chrome.kill();
}

if (failed) {
    console.error('\nAt least one route scored below 100. Open its report in docs/lighthouse/.');
    process.exitCode = 1;
}
