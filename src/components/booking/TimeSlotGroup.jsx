const slots = ['09:00-11:00', '11:00-13:00', '14:00-16:00', '16:00-18:00'];

function TimeSlotGroup({value, group, onChange, onBlur}) {
    return (
        <fieldset aria-labelledby="timeSlot-hint timeSlot-error">
            <legend>Time slot</legend>
            <p id="timeSlot-hint" className="field__hint">Rooms are booked in two-hour blocks.</p>
            {slots.map((s, i) => (
                <div key={s} className="radio">
                    <input type="radio" id={i === 0 ? 'timeSlot' : `timeSlot-${i}`} name="timeSlot" value={s} checked={value === s} onChange={onChange} onBlur={onBlur} aria-invalid={error ? 'true' : 'false'} />
                    <label htmlFor={i === 0 ? 'timeSlot' : `timeSlot-${i}`}>{s}</label>
                </div>
            ))}
            <p id="timeSlot-error" className="field__error"  aria-live="polite">
                {error && (<>{error}</>)}
            </p>
        </fieldset>
    );
}

export default TimeSlotGroup;