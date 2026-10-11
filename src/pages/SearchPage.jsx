import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { categories, coursesData } from "../data/resources";
import { usePageHeading } from "../hooks/usePageHeading";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useAnnouncer } from "../context/AnnouncerContext";
import FilterAccordion from "../components/search/FilterAccordion";
import CategoryToggles from "../components/search/CategoryToggles";

export default function SearchPage() {
    const headingRef = usePageHeading('Find Resources');
    const announce = useAnnouncer();
    const searchRef = useRef(null);

    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const debouncedQuery = useDebouncedValue(query, 400);
    const isPending = query !== debouncedQuery;

    const results = useMemo(() => {
        const q = debouncedQuery.trim().toLowerCase();
        return coursesData.filter(r => 
        (selected.length === 0 || selected.includes(r.category)) && (!q || `${r.title} ${r.description}`.toLowerCase().includes(q))
        );
    }, [debouncedQuery, selected]);

    const first = useRef(true);
    useEffect(() => {
        if(first.current) { first.current = false; return; }
        announce(results.length === 0 ? 'No results found.' : `${results.length} ${results.length === 1 ? 'result' : 'results'} found.`);
    }, [debouncedQuery, selected, results.length, announce]);

    const toggle = c => setSelected(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
    const clearAll = () => {setQuery(''); setSelected([]); searchRef.current?.focus();}

    const hasFilters = query || selected.length > 0;

    return (
        <div className="page">
            <h1 ref={headingRef} tabIndex={-1}>Find library resources</h1>

            <form role="search" onSubmit={e => e.preventDefault()}>
                <label htmlFor="resource-search">Search courses, events, rooms and archives</label>
                <input id="resource-search" ref={searchRef} type="search" value={query} onChange={e => setQuery(e.target.value)} aria-describedby="search-hint" />
                <p id="search-hint" className="field__hint">Results update as you type</p>
            </form>

            <aside aria-labelledby="filters-heading">
                <h2 id="filters-heading">Filters</h2>
                <FilterAccordion title="Category" defaultOpen>
                    <CategoryToggles categories={categories} selected={selected} onToggle={toggle} />
                </FilterAccordion>
                {hasFilters && <button type="button" onClick={clearAll}>Clear all filters</button>}
            </aside>

            <section aria-labelledby="results-heading" aria-busy={isPending}>
                <h2 id="results-heading">Results</h2>
                <p>{results.length} {results.length === 1 ? 'resource' : 'resources'} shown</p>
                {results.length === 0 ? (
                    <p>No resources match. Try a different word or clear the filters.</p>
                ) : (
                    <ul className="card-list">
                        {results.map(r => (
                            <li key={r.id}>
                                <article aria-labelledby={`res-${r.id}`} className="card">
                                    <h3 id={`res-${r.id}`}>{r.title}</h3>
                                    <p className="meta">{r.category}</p>
                                    <p>{r.description}</p>
                                    {r.category === 'Rooms' && (
                                        <Link to={`/reserve?room=${encodeURIComponent(r.title)}`}>
                                            Reserve<span className="visually-hidden">: {r.title}</span>
                                        </Link>
                                    )}
                                </article>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}