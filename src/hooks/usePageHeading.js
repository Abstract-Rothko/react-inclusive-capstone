import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../config/site';

export function usePageHeading(title) {
    const ref = useRef(null);
    const { key } = useLocation();

    useEffect(() => {
        document.title = `${title}: ${SITE.name}`;
    }, [title]);

    useEffect(() => {
        if (key !== 'default') ref.current?.focus();
    }, [key]);

    return ref;
}
