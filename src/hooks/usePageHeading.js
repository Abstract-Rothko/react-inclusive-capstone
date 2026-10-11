import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function usePageHeading(title) {
    const ref = useRef(null);
    const {key} = useLocation();

    useEffect(() => {
        document.title = `${title} | Kariega Public Library`;
        if(key !== 'default') ref.current?.focus();
    }, [title, key]);

    return ref;
}