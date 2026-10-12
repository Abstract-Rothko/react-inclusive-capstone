import { Link } from 'react-router-dom';
import { rooms } from '../data/rooms';
import { SITE } from '../config/site';
import { usePageHeading } from '../hooks/usePageHeading';
import Breadcrumb from '../components/common/Breadcrumb';
import BookingForm from '../components/booking/BookingForm';

export default function ReservePage() {
    const headingRef = usePageHeading('Reserve a room');

    return (
        <>
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Reserve a room' }]} />
            <h1 ref={headingRef} tabIndex={-1}>Reserve a room</h1>
            <p>Book a quiet study room or the community hall. You will see a confirmation before you leave this page.</p>

            <div className="page-grid">
                <section aria-labelledby="reserve-form-title">
                    <h2 id="reserve-form-title">Your reservation</h2>
                    <BookingForm headingRef={headingRef} />
                    <p><Link to="/search">Cancel and go back to courses</Link></p>
                </section>

                <section className="panel" aria-labelledby="rooms-title">
                    <h2 id="rooms-title">Our rooms</h2>
                    <dl className="room-list">
                        {rooms.map(room => (
                            <div key={room.id}>
                                <dt>{room.name}</dt>
                                <dd>Seats up to {room.capacity}. {room.floor}. {room.features.join(', ')}.</dd>
                            </div>
                        ))}
                    </dl>
                    <h3>Prefer to book another way?</h3>
                    <ul>
                        <li>Phone the front desk on <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>.</li>
                        <li>Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</li>
                        <li>Ask at the front desk. Staff can book for you.</li>
                    </ul>
                </section>
            </div>
        </>
    );
}