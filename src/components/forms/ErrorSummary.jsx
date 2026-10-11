import { forwardRef, useId } from 'react';

const ErrorSummary = forwardRef(function ErrorSummary({ errors, subject }, ref) {
    const titleId = useId();
    const count = errors.length;

    const focusField = (event, field) => {
        event.preventDefault();
        document.getElementById(field)?.focus();
    };

    return (
        <section ref={ref} tabIndex={-1} className="error-summary" aria-labelledby={titleId}>
            <h2 id={titleId}>
                {count === 1 ? 'There is 1 problem' : `There are ${count} problems`} with your {subject}
            </h2>
            <ul>
                {errors.map(({ field, message }) => (
                    <li key={field}>
                        <a href={`#${field}`} onClick={event => focusField(event, field)}>{message}</a>
                    </li>
                ))}
            </ul>
        </section>
    );
});

export default ErrorSummary;
