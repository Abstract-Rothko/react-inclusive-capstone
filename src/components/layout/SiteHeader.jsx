import { Link, NavLink } from "react-router-dom";
import { SITE } from '../../config/site';
import logo from '../../assets/transparent-logo.svg';

export default function SiteHeader() {
    return (
        <header className="site-header">
            <div className="container site-header__inner">
                <Link to="/" className="brand">
                    <img src={logo} width="48" height="48" alt="" />
                    <span>{SITE.name}</span>
                </Link>
                <nav aria-label="Main">
                    <ul className="nav-list" role="list">
                        <li><NavLink to="/" end>Home</NavLink></li>
                        <li><NavLink to="/search">Courses and archive</NavLink></li>
                        <li><NavLink to="/reserve">Reserve a room</NavLink></li>
                        <li><NavLink to="/events">Events</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}