import { useCallback, useEffect, useRef, useState } from "react";
import { AnnouncerContext } from "./AnnouncerContext";

const SETTLE_DELAY = 60;

export function AnnouncerProvider({children}) {
    const [politeMessage, setPoliteMessage] = useState('');
    const [assertiveMessage, setAssertiveMessage] = useState('');
    const timers = useRef({});

    const announce = useCallback((message, priority = 'polite') => {
        const write = priority === 'assertive' ? setAssertiveMessage : setPoliteMessage;
        clearTimeout(timers.current[priority]);
        write('');
        timers.current[priority] = setTimeout(() => write(message), SETTLE_DELAY);
    }, []);

    useEffect(() => {
        const pending = timers.current;
        return () => Object.values(pending).forEach(clearTimeout);
    }, []);

    return (
        <AnnouncerContext.Provider value={announce}>
            {children}
            <output className="visually-hidden" aria-live="polite" aria-atomic="true">{politeMessage}</output>
            <div className="visually-hidden" role="alert" aria-live="assertive" aria-atomic="true">{assertiveMessage}</div>
        </AnnouncerContext.Provider>
    );
}