import { categories } from "../data/resources";
import { eventsData } from "../data/eventsData";

const HomePage = () => {
    return (
    <main>
        <section className="header-details">
            <h1>Educate Yourself at Kariega Public Library</h1>
            <p>Search our courses and digital archive, reserve a quiet study room, or sign up for a workshop.</p>
        </section>
        <section className="search-details">
            <h2>Search Courses and Archive</h2>
            <p>Try a subject, like bookkeeping or digital skills</p>
        </section>
        <section className="topics">
            <h2>Browse By Topic</h2>
            <section className="topics-container">
                {categories.map(topic => <p>{topic}</p>)}
            </section>
        </section>
        <section>
            <h2>Upcoming Events</h2>
            <section>
                {eventsData.map(event => {
                    return (
                        <section>
                            <h4>{event['title']}</h4>
                            <p>{event['date']}, <span>{event['startTime']}</span> to <span>{event['endTime']}</span></p>
                            <p>{event['description']}</p>
                            <p>Register</p>
                        </section>
                    );
                })}
            </section>
        </section>
        <section>
            <h2>Reserve Study Room</h2>
            <button>Reserve Study Room</button>
        </section>
        <aside>
            <div className="container">
                <div className="panel">
                    <h2 id="a11y-title">Accessibility at the library</h2>
                    <ul>
                        <li>Step-free entrance and lift to every floor.</li>
                        <li>Hearing loop in every study room and the main hall.</li>
                        <li>Screen reader and magnifier software on all public computers.</li>
                    </ul>
                    <p>Need something else? <a href="reserve.html">Read about room features</a> or phone the front desk on <a href="tel:+27000000000">000&nbsp;000&nbsp;0000</a>.</p>
                </div>
            </div>
	    </aside>
    </main>
    );
}

export default HomePage;