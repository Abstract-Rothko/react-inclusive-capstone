import { createContext, useCallback, useContext, useRef, useState } from "react";

const AnnouncerContext = createContext(() => {});
export const useAnnouncer = () => useContext(AnnouncerContext);

export function AnnouncerProvider({children}) {
    const [polite, setPolite] = useState('');
    const [assertive, setAssertive] = useState('');
    const timer = useRef();

    const announce = useCallback((message, priority = 'polite') => {
        const set = priority === 'assertive' ? setAssertive : setPolite;
        set('');
        clearTimeout(timer.current);
        timer.current = setTimeout(() => set(message), 60);
    }, []);

    return (
        <AnnouncerContext.Provider value = {announce}>
            {children}
            <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">{polite}</div>
            <div className="visually-hidden" role="alert" aria-live="assertive" aria-atomic="true">{assertive}</div>
        </AnnouncerContext.Provider>
    )
}