export default function FormField({
    id,
    label,
    hint,
    error,
    required = false,
    optional = false,
    as: Control = 'input',
    children,
    ...rest
}) {
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = `${id}-error`;
    const describedBy = [hintId, error ? errorId : undefined].filter(Boolean).join(' ') || undefined;

    return (
        <div className={`field${error ? ' field--invalid' : ''}`}>
            <label htmlFor={id}>
                {label}
                {required && <span className="required" aria-hidden="true"> (required)</span>}
                {optional && <span className="optional"> (optional)</span>}
            </label>
            {hint && <p id={hintId} className="hint">{hint}</p>}
            <Control
                id={id}
                name={id}
                required={required}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={describedBy}
                {...rest}
            >
                {children}
            </Control>
            {error && (
                <p id={errorId} className="field__error">
                    <strong>Error:</strong> {error}
                </p>
            )}
        </div>
    );
}
