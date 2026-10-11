import { Link, NavLink } from "react-router-dom";

export default function SiteHeader() {
    return (
        <header className="site-header">
            <Link to="/" className="brand">
                <img src="" width="160" height="160" alt="Kariega Public Library, home" />
            </Link>
            <nav aria-label="Primary">
                <ul className="nav-list">
                    <li>
                        <NavLink to="/" end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">Find resources</NavLink>
                    </li>
                    <li>
                        <NavLink to="/reserve">Reserve a room</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}