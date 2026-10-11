import { usePageHeading } from "../hooks/usePageHeading";
import BookingForm from "../components/booking/BookingForm";

const ReservePage = () => {
    const headingRef = usePageHeading('Reserve a room');
    return (
        <div className="page">
            <h1 ref={headingRef} tabIndex={-1}>Reserve a room</h1>
            <p>Fields marked required must be completed.</p>
            <BookingForm headingRef={headingRef} />
        </div>
    );
}

export default ReservePage;