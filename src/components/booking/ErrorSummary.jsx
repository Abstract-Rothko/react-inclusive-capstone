import { forwardRef } from "react";

const ErrorSummary = forwardRef(function ErrorASummary({errors}, ref) {
    return (
        <div ref={ref} tabIndex={-1} className="error-summary" aria-labelledby="error-summary-title">
            <h2 id="error-summary-title">
                There {errors.length === 1 ? 'is 1 problem' : `are ${errors.length} problems`} with your booking
            </h2>
            <ul>
                {errors.map(({field, message}) => (
                    <li key={field}>
                        <a href={`#${field}`} onClick={e => {e.preventDefault(); document.getElementById(field)?.focus();}}>
                            {message}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default ErrorSummary;