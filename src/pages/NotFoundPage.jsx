import { Link } from 'react-router-dom';
import { usePageHeading } from '../hooks/usePageHeading';

export default function NotFoundPage() {
    const headingRef = usePageHeading('Page not found');

    return (
        <>
            <h1 ref={headingRef} tabIndex={-1}>Page not found</h1>
            <p>We could not find that page. It may have moved, or the address may be incorrect.</p>
            <ul>
                <li><Link to="/">Go to the home page</Link></li>
                <li><Link to="/search">Search courses and archive</Link></li>
                <li><Link to="/reserve">Reserve a room</Link></li>
            </ul>
        </>
    );
}
