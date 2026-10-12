import { eventsData } from '../data/eventsData';
import { usePageHeading } from '../hooks/usePageHeading';
import EventCard from '../components/events/EventCard';

export default function EventsPage() {
    const headingRef = usePageHeading('Events');

    return (
        <>
            <h1 ref={headingRef} tabIndex={-1}>Events and workshops</h1>
            <p>All events are free. Registration is required so we can plan seating and support.</p>
            <ul className="grid" role="list">
                {eventsData.map(event => (
                    <li key={event.id}><EventCard event={event} headingLevel="h2" /></li>
                ))}
            </ul>
        </>
    );
}
