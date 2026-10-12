import { useState } from "react";
import { useAccessibleForm } from "../../hooks/useAccessibleForm";
import { formatDate } from "../../lib/dates";
import FormField from "../forms/FormField";
import ErrorSummary from "../forms/ErrorSummary";
import ConfirmDialog from "../forms/ConfirmDialog";
import { MAX_SEATS, validateRegistration } from "./validate";

const seatOptions = Array.from({ length: MAX_SEATS }, (_, index) => index + 1);

export default function EventRegistrationForm({ event, headingRef }) {
    const [confirmed, setConfirmed] = useState(null);

    const form = useAccessibleForm({
        initialValues: { name: '', email: '', seats: '1', notes: '' },
        validate: validateRegistration,
        onValid: values => setConfirmed(values)
    });

    const { values, fieldError, handleChange, handleBlur, summaryRef } = form;

    const closeDialog = () => {
        setConfirmed(null);
        form.reset();
        headingRef.current?.focus();
    };

    return (
        <>
            {form.showSummary && <ErrorSummary ref={summaryRef} errors={form.errorList} subject="registration" />}

            <p>Fields marked <span className="required">(required)</span> must be completed.</p>

            <form noValidate onSubmit={form.handleSubmit}>
                <FormField
                    id="name" label="Full name" required autoComplete="name"
                    value={values.name} onChange={handleChange} onBlur={handleBlur} error={fieldError('name')}
                />
                <FormField
                    id="email" label="Email address" type="email" required autoComplete="email"
                    hint="We send your registration confirmation here. Example: name@example.com"
                    value={values.email} onChange={handleChange} onBlur={handleBlur} error={fieldError('email')}
                />
                <FormField
                    id="seats" label="Number of seats" as="select" required
                    hint={`You can register up to ${MAX_SEATS} people at once.`}
                    value={values.seats} onChange={handleChange} onBlur={handleBlur} error={fieldError('seats')}
                >
                    {seatOptions.map(count => (
                        <option key={count} value={count}>{count === 1 ? '1 seat' : `${count} seats`}</option>
                    ))}
                </FormField>
                <FormField
                    id="notes" label="Access requirements" as="textarea" optional rows={4}
                    hint="For example: a seat near the front, or a printed copy of the handout. Up to 300 characters."
                    value={values.notes} onChange={handleChange} onBlur={handleBlur} error={fieldError('notes')}
                />
                <div className="actions">
                    <button type="submit" className="button">Register for this event</button>
                </div>
            </form>

            <ConfirmDialog open={Boolean(confirmed)} title="Registration confirmed" onClose={closeDialog}>
                {confirmed && (
                    <p>
                        {confirmed.seats === '1' ? '1 seat' : `${confirmed.seats} seats`} reserved for {event.title} on {formatDate(event.date)},
                        {' '}{event.startTime} to {event.endTime}. A confirmation will be sent to {confirmed.email}.
                    </p>
                )}
            </ConfirmDialog>
        </>
    );
}
