import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { categories } from '../data/resources';
import { eventsData } from '../data/eventsData';
import { SITE } from '../config/site';
import { usePageHeading } from '../hooks/usePageHeading';
import EventCard from '../components/events/EventCard';

export default function HomePage() {
    const headingRef = usePageHeading('Search courses, reserve rooms, join events');
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        const trimmed = query.trim();
        navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
    };

    return (
        <>
            <section aria-labelledby="home-title">
                <h1 id="home-title" ref={headingRef} tabIndex={-1}>Educate yourself at {SITE.name}</h1>
                <p>Search our courses and digital archive, reserve a quiet study room, or sign up for a workshop.</p>

                <search aria-label="Search the library">
                    <form onSubmit={handleSubmit}>
                        <div className="search-row">
                            <div className="field">
                                <label htmlFor="home-search">Search courses and archive</label>
                                <p className="hint" id="home-search-hint">Try a subject, like bookkeeping or digital skills.</p>
                                <input
                                    id="home-search" type="search" value={query}
                                    onChange={event => setQuery(event.target.value)}
                                    aria-describedby="home-search-hint"
                                />
                            </div>
                            <button type="submit" className="button">Search</button>
                        </div>
                    </form>
                </search>
            </section>

            <section aria-labelledby="topics-title">
                <h2 id="topics-title">Browse by topic</h2>
                <ul className="grid" role="list">
                    {categories.map(topic => (
                        <li key={topic} className="card card--link">
                            <Link to={`/search?category=${encodeURIComponent(topic)}`}>{topic}</Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="events-title">
                <h2 id="events-title">Upcoming events</h2>
                <ul className="grid" role="list">
                    {eventsData.slice(0, 3).map(event => (
                        <li key={event.id}><EventCard event={event} /></li>
                    ))}
                </ul>
                <p><Link to="/events">See all events</Link></p>
            </section>

            <section aria-labelledby="reserve-title">
                <h2 id="reserve-title">Reserve a study room</h2>
                <p>Quiet rooms for one to twelve people. Book up to 28 days ahead.</p>
                <Link className="button" to="/reserve">Reserve a study room</Link>
            </section>

            <section className="panel" aria-labelledby="a11y-title">
                <h2 id="a11y-title">Accessibility at the library</h2>
                <ul>
                    <li>Step-free entrance and lift to every floor.</li>
                    <li>Hearing loop in every study room and the main hall.</li>
                    <li>Screen reader and magnifier software on all public computers.</li>
                </ul>
                <p>
                    Need something else? Read our <Link to="/accessibility">accessibility statement</Link> or
                    phone the front desk on <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>.
                </p>
            </section>
        </>
    );
}
