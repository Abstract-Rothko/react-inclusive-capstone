export default function CheckboxGroup({ name, legend, hint, options, values, onChange }) {
    const hintId = hint ? `${name}-hint` : undefined;

    return (
        <fieldset className="field" aria-describedby={hintId}>
            <legend>
                {legend}
                <span className="optional"> (optional)</span>
            </legend>
            {hint && <p id={hintId} className="hint">{hint}</p>}
            {options.map(option => {
                const id = `${name}-${option.value}`;
                return (
                    <div key={option.value} className="choice">
                        <input
                            type="checkbox"
                            id={id}
                            name={name}
                            value={option.value}
                            checked={values.includes(option.value)}
                            onChange={onChange}
                        />
                        <label htmlFor={id}>{option.label}</label>
                    </div>
                );
            })}
        </fieldset>
    );
}
