import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { accessFeatures, findRoom, rooms, timeSlotLabel, timeSlots, MAX_ADVANCE_DAYS } from "../../data/rooms";
import { addDays, formatDate, toIsoDate } from "../../lib/dates";
import { useAccessibleForm } from "../../hooks/useAccessibleForm";
import FormField from "../forms/FormField";
import RadioGroup from "../forms/RadioGroup";
import CheckboxGroup from "../forms/CheckboxGroup";
import ErrorSummary from "../forms/ErrorSummary";
import ConfirmDialog from "../forms/ConfirmDialog";
import { validateRegistration } from "../events/validate";

const peopleOptions = Array.from({ length: 12 }, (_, index) => index + 1);

export default function BookingForm({ headingRef }) {
    const [params] = useSearchParams();
    const [confirmed, setConfirmed] = useState(null);
    const today = new Date();

    const form = useAccessibleForm({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            room: findRoom(params.get('room')) ? params.get('room') : '',
            date: '',
            attendees: '1',
            timeSlot: '',
            needs: [],
            notes: ''
        },
        validate: validateRegistration,
        onValid: values => setConfirmed(values)
    });

    const { values, fieldError, handleChange, handleBlur } = form;
    const selectedRoom = findRoom(values.room);
    const capacityHint = selectedRoom
        ? `${selectedRoom.name} seats up to ${selectedRoom.capacity} people.`
        : 'Choose a room first to see how many people it seats.';

    const closeDialog = () => {
        setConfirmed(null);
        form.reset();
        headingRef.current?.focus();
    };

    const confirmedRoom = confirmed ? findRoom(confirmed.room) : null;

    return (
        <>
            {form.showSummary && <ErrorSummary ref={form.summaryRef} errors={form.errorList} subject="booking" />}

            <p>Fields marked <span className="required">(required)</span> must be completed.</p>

            <form noValidate onSubmit={form.handleSubmit}>
                <fieldset>
                    <legend>Reservation details</legend>

                    <FormField
                        id="room" label="Room" as="select" required
                        value={values.room} onChange={handleChange} onBlur={handleBlur} error={fieldError('room')}
                    >
                        <option value="">Choose a room</option>
                        {rooms.map(room => <option key={room.id} value={room.id}>{room.name}</option>)}
                    </FormField>

                    <FormField
                        id="date" label="Date" type="date" required
                        hint={`Choose a day from today up to ${MAX_ADVANCE_DAYS} days ahead. The library is closed on Sundays.`}
                        min={toIsoDate(today)} max={toIsoDate(addDays(today, MAX_ADVANCE_DAYS))}
                        value={values.date} onChange={handleChange} onBlur={handleBlur} error={fieldError('date')}
                    />

                    <RadioGroup
                        name="timeSlot" legend="Time slot" required
                        hint="Rooms are booked in two-hour blocks."
                        options={timeSlots} value={values.timeSlot}
                        onChange={handleChange} onBlur={handleBlur} error={fieldError('timeSlot')}
                    />

                    <FormField
                        id="attendees" label="Number of people" as="select" required
                        hint={capacityHint}
                        value={values.attendees} onChange={handleChange} onBlur={handleBlur} error={fieldError('attendees')}
                    >
                        {peopleOptions.map(count => (
                            <option key={count} value={count}>{count === 1 ? '1 person' : `${count} people`}</option>
                        ))}
                    </FormField>
                </fieldset>

                <CheckboxGroup
                    name="needs" legend="Features you need"
                    hint="Tick anything that applies. You do not need to explain why."
                    options={accessFeatures} values={values.needs} onChange={handleChange}
                />

                <fieldset>
                    <legend>Your details</legend>

                    <FormField
                        id="name" label="Full name" required autoComplete="name"
                        hint="As it appears on your library card."
                        value={values.name} onChange={handleChange} onBlur={handleBlur} error={fieldError('name')}
                    />

                    <FormField
                        id="email" label="Email address" type="email" required autoComplete="email"
                        hint="We send your booking confirmation here. Example: name@example.com"
                        value={values.email} onChange={handleChange} onBlur={handleBlur} error={fieldError('email')}
                    />

                    <FormField
                        id="phone" label="Phone number" type="tel" optional autoComplete="tel"
                        hint="Only used if we need to change your booking."
                        value={values.phone} onChange={handleChange} onBlur={handleBlur} error={fieldError('phone')}
                    />
                </fieldset>

                <div className="actions">
                    <button type="submit" className="button">Reserve room</button>
                </div>
            </form>

            <ConfirmDialog open={Boolean(confirmed)} title="Booking confirmed" onClose={closeDialog}>
                {confirmed && (
                    <p>
                        {confirmedRoom?.name} on {formatDate(confirmed.date)}, {timeSlotLabel(confirmed.timeSlot)},
                        for {confirmed.attendees === '1' ? '1 person' : `${confirmed.attendees} people`}.
                        A confirmation will be sent to {confirmed.email}.
                    </p>
                )}
            </ConfirmDialog>
        </>
    );
}