import { Link, useParams } from 'react-router-dom';
import { findEvent } from '../data/eventsData';
import { formatDate } from '../lib/dates';
import { usePageHeading } from '../hooks/usePageHeading';
import Breadcrumb from '../components/common/Breadcrumb';
import EventRegistrationForm from '../components/events/EventRegistrationForm';
import NotFoundPage from './NotFoundPage';

export default function EventRegisterPage() {
    const { eventId } = useParams();
    const event = findEvent(eventId);

    if (!event) return <NotFoundPage />;

    return <EventRegisterContent event={event} />;
}

function EventRegisterContent({ event }) {
    const headingRef = usePageHeading(`Register for ${event.title}`);

    return (
        <>
            <Breadcrumb items={[
                { label: 'Home', to: '/' },
                { label: 'Events', to: '/events' },
                { label: event.title }
            ]} />
            <h1 ref={headingRef} tabIndex={-1}>Register for {event.title}</h1>
            <p>{event.description}</p>
            <p className="meta">
                <time dateTime={`${event.date}T${event.startTime}`}>{formatDate(event.date)}, {event.startTime}</time>
                {' to '}
                <time dateTime={`${event.date}T${event.endTime}`}>{event.endTime}</time>
            </p>
            <EventRegistrationForm event={event} headingRef={headingRef} />
            <p><Link to="/events">Cancel and go back to events</Link></p>
        </>
    );
}
