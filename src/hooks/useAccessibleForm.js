import { useEffect, useMemo, useRef, useState } from 'react';
import { useAnnouncer } from './useAnnouncer';

export function useAccessibleForm({ initialValues, validate, onValid }) {
    const announce = useAnnouncer();
    const initialRef = useRef(initialValues);
    const summaryRef = useRef(null);
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [attempted, setAttempted] = useState(false);
    const [focusRequest, setFocusRequest] = useState(0);

    const errors = useMemo(() => validate(values), [validate, values]);
    const errorList = useMemo(
        () => Object.entries(errors).map(([field, message]) => ({ field, message })),
        [errors]
    );

    const fieldError = field => (touched[field] || attempted ? errors[field] : undefined);

    const handleChange = event => {
        const { name, value, type, checked } = event.target;
        setValues(current => {
            if (type !== 'checkbox') return { ...current, [name]: value };
            const existing = current[name];
            if (Array.isArray(existing)) {
                const next = checked ? [...existing, value] : existing.filter(item => item !== value);
                return { ...current, [name]: next };
            }
            return { ...current, [name]: checked };
        });
    };

    const handleBlur = event => {
        const { name } = event.target;
        setTouched(current => ({ ...current, [name]: true }));
        if (errors[name] && !attempted) announce(errors[name]);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setAttempted(true);
        if (errorList.length > 0) {
            setFocusRequest(count => count + 1);
            return;
        }
        onValid(values);
    };

    useEffect(() => {
        if (focusRequest > 0) summaryRef.current?.focus();
    }, [focusRequest]);

    const reset = () => {
        setValues(initialRef.current);
        setTouched({});
        setAttempted(false);
        setFocusRequest(0);
    };

    return {
        values,
        errorList,
        fieldError,
        showSummary: attempted && errorList.length > 0,
        summaryRef,
        handleChange,
        handleBlur,
        handleSubmit,
        reset
    };
}
