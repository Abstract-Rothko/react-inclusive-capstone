import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">Kariega Public Library</Link>
                </div>

                <nav className="navigation">
                    <ul>
                        <li>
                            <NavLink to="/" end className={({isActive}) => isActive ? 'active': ''}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className={({isActive}) => isActive ? 'active': ''}>
                                Courses
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className={({isActive}) => isActive ? 'active': ''}>
                                Reserve a Room
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className={({isActive}) => isActive ? 'active': ''}>
                                Events
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;