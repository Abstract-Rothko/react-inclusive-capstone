import { Link } from "react-router-dom";
import { SITE } from "../../config/site";

export default function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="site-footer__grid">
                    <nav aria-label="Footer">
                        <h2 className="site-footer__heading">Explore</h2>
                        <ul role="list">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/search">Courses and archive</Link></li>
                            <li><Link to="/reserve">Reserve a room</Link></li>
                            <li><Link to="/events">Events</Link></li>
                            <li><Link to="/accessibility">Accessibility statement</Link></li>
                        </ul>
                    </nav>
                    <div>
                        <h2 className="site-footer__heading">Contact us</h2>
                        <address>
                            <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
                            <p>Phone: <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a></p>
                            <p>{SITE.address}</p>
                        </address>
                        <p className="meta">{SITE.hours}</p>
                    </div>
                </div>
                <p className="meta site-footer__legal">
                    &copy; 2026 {SITE.name}. We aim to meet {SITE.conformance}.
                </p>
            </div>
        </footer>
    );
}