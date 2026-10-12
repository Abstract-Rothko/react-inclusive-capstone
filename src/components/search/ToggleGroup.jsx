export default function ToggleGroup({ legend, options, selected, onToggle }) {
    return (
        <fieldset className="toggle-group">
            <legend className="visually-hidden">{legend}</legend>
            <ul className="chip-row" role="list">
                {options.map(option => {
                    const pressed = selected.includes(option);
                    return (
                        <li key={option}>
                            <button
                                type="button"
                                className="chip"
                                aria-pressed={pressed}
                                onClick={() => onToggle(option)}
                            >
                                {option}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </fieldset>
    );
}