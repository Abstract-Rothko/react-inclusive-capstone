export default function CategoryToggles({categories, selected, onToggle}) {
    return (
        <div role="group" aria-labelledby="cat-label">
            <p id="cat-label" className="group-label">Category</p>
            <div className="chip-row">
                {categories.map(c => {
                    const pressed = selected.includes(c);
                    return (
                        <button key={c} type="button" className="chip" aria-pressed={pressed} onClick={() => onToggle(c)}>
                            <span aria-hidden="true">{pressed ? '✓ ' : ''}</span>{c}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}