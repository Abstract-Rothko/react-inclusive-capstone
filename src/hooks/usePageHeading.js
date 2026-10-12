import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../config/site';

export function usePageHeading(title) {
    const ref = useRef(null);
    const { key, pathname } = useLocation();
    const lastPath = useRef(null);

    useEffect(() => {
        document.title = `${title}: ${SITE.name}`;
    }, [title]);

    useEffect(() => {
        const isFirstRun = lastPath.current === null;
        const pathChanged = lastPath.current !== pathname;
        lastPath.current = pathname;

        // Query-string-only changes (live search and filters) must never move focus.
        if (!pathChanged) return;
        // The very first page load has no navigation to announce.
        if (isFirstRun && key === 'default') return;
        ref.current?.focus();
    }, [key, pathname]);

    return ref;
}