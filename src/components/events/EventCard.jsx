import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/dates';

export default function EventCard({ event, headingLevel: Heading = 'h3' }) {
    const headingId = `event-${event.id}`;

    return (
        <article className="card card--event" aria-labelledby={headingId}>
            <Heading id={headingId}>{event.title}</Heading>
            <p className="meta">
                <time dateTime={`${event.date}T${event.startTime}`}>{formatDate(event.date)}, {event.startTime}</time>
                {' to '}
                <time dateTime={`${event.date}T${event.endTime}`}>{event.endTime}</time>
            </p>
            <p>{event.description}</p>
            <p>
                <Link to={`/events/${event.id}/register`}>Register for {event.title}</Link>
            </p>
        </article>
    );
}