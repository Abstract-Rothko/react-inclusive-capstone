export default function FormField({id, label, hint, error,  as: Control = 'input', children, ...rest}) {
    const hintId = hint ? `${id}-hint` : null;
    const errId = `${id}-error`;
    return (
        <div className="field">
            <label htmlFor={id}>{label}</label>
            {hint && <p id={hintId} className="filed__hint">{hint}</p>}
            <Control id={id} name={id} aria-invalid={error ? 'true' : 'false'} aria-describedby={[hintId, errId].filter(Boolean).join(' ')}
                {...rest}>
            </Control>
            <p id={errId} className="field__error" aria-live="polite">
                {error && (<><span className="visually-hidden">Error: </span>{error}</>)}
            </p>
        </div>
    );
}