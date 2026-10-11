import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { validate } from "./validate";
import FormField from "./FormField";
import TimeSlotGroup from "./TimeSlotGroup";
import ErrorSummary from "./ErrorSummary";
import ConfirmDialog from "./ConfirmDialog";

const empty = {
    name: '',
    email: '',
    room: '',
    date: '',
    attendees: '1',
    timeSlot: ''
};

function BookingForm({headingRef}) {
    const [params] = useSearchParams();
    const [values, setValues] = useState({...empty, room: params.get('room') ?? ''});
    const [touched, setTouched] = useState({});
    const [attempt, setAttempt] = useState(0);
    const [confirmed, setConfirmed] = useState(null);
    const summaryRef = useRef(null);

    const errors = useMemo(() => validate(values), [values]);
    const errorList = Object.entries(errors).map(([field, message]) => ({field, message}));
    const show = f => (touched[f] || attempt > 0) ? errors[f] : undefined;

    const onChange = (e) => setValues(v => ({...v, [e.target.name]: e.target.value}));
    const onBlur = (e) => setTouched(t => ({...t, [e.target.name]: true}));

    const onSubmit = e => {
        e.preventDefault();
        setAttempt(a => a + 1);
        if (errorList.length === 0) setConfirmed(values);
    };

    useEffect(() => {
        if(attempt > 0 && errorList.length > 0) summaryRef.current?.focus();
    }, [attempt]);

    const closeDialog = () => {
        setConfirmed(null); 
        setValues(empty);
        setTouched({});
        setAttempt(0);
        headingRef.current?.focus();
    };

    return (
        <>
        {attempt > 0 && errorList.length > 0 && <ErrorSummary ref={summaryRef} errors={errorList} />}
        <form noValidate onSubmit={onSubmit}>
            <FormField 
                id="name" label="Full name" required autoComplete="name" 
                hint="As it appears on your library card."
                value={values.name} onChange={onChange} onBlur={onBlur} error={show('name')} 
            />
            <FormField 
                id="email" label="Email" type="email" required autoComplete="email"
                hint="We'll send your confirmation here."
                value={values.email} onChange={onChange} onBlur={onBlur} error={show('email')} 
            />
            <FormField 
            id="room" label="Room" as="select" required
            value={values.room} onChange={onChange} onBlur={onBlur} error={show('room')}>
                <option value="">Select a room</option>
                <option>Study Room A</option>
                <option>Study Room B</option>
                <option>Community Hall</option>
            </FormField>
            <FormField 
                id="date" label="Date" type="date" required
                hint="Choose today or a future date."
                value={values.date} onChange={onChange} onBlur={onBlur} error={show('date')} 
            />
            <FormField 
                id="attendees" label="Number of people" type="number" min="1" max="12" required
                hint="betweenn 1 and 12."
                value={values.attendees} onChange={onChange} onBlur={onBlur} error={show('attendees')} 
            />
            <TimeSlotGroup 
                value={values.timeSlot} error={show('timeSlot')} onChange={onChange} onBlur={onBlur} 
            />
            <button type="submit">Reserve room</button>
        </form>

        <ConfirmDialog open={!!confirmed} onClose={closeDialog}>
            {confirmed && 
            <p>{confirmed.room} on {confirmed.date}, {confirmed.timeSlot}, for {confirmed.attendees} A confirmation will go to {confirmed.email}</p>
            }
        </ConfirmDialog>
        </>
    )
}

export default BookingForm;