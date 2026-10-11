export default function RadioGroup({ name, legend, hint, options, value, error, required = false, onChange, onBlur }) {
    const hintId = hint ? `${name}-hint` : undefined;
    const errorId = `${name}-error`;
    const describedBy = [hintId, error ? errorId : undefined].filter(Boolean).join(' ') || undefined;

    return (
        <fieldset className={`field${error ? ' field--invalid' : ''}`} aria-describedby={describedBy}>
            <legend>
                {legend}
                {required && <span className="required" aria-hidden="true"> (required)</span>}
            </legend>
            {hint && <p id={hintId} className="hint">{hint}</p>}
            {options.map((option, index) => {
                const id = index === 0 ? name : `${name}-${index}`;
                return (
                    <div key={option.value} className="choice">
                        <input
                            type="radio"
                            id={id}
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            required={required}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        <label htmlFor={id}>{option.label}</label>
                    </div>
                );
            })}
            {error && (
                <p id={errorId} className="field__error">
                    <strong>Error:</strong> {error}
                </p>
            )}
        </fieldset>
    );
}
