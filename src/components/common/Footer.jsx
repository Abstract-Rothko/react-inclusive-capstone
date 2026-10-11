import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <nav className="site-links">
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Reserve a Room
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Events
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="contact-details">
                    <ul>
                        <li>Email: </li>
                        <li>Tel: </li>
                        <li>Location: </li>
                        <li>Countact Us</li>
                    </ul>
                </div>

                <div className="additional-info">
                    <ul>
                        <li>
                            <Link to="/">
                                Copyright & Disclaimer
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Events
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-copyright">
                <p>Accessibility: WCAG 2.2 AA</p>
                <p>2026 Kariega Public Library</p>
            </div>
        </footer>
    );
}

export default Footer;