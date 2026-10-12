import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, coursesData } from '../data/resources';
import { filterCourses, describeCount } from '../lib/search';
import { usePageHeading } from '../hooks/usePageHeading';
import { useAnnouncer } from '../hooks/useAnnouncer';
import FilterAccordion from '../components/search/FilterAccordion';
import ToggleGroup from '../components/search/ToggleGroup';
import ResultCard from '../components/search/ResultCard';

const PAGE_SIZE = 12;
const levels = ['Beginner', 'Intermediate'];

// const toggleItem = (list, item) => (list.includes(item) ? list.filter(entry => entry !== item) : [...list, item]);

export default function SearchPage() {
    const headingRef = usePageHeading('Courses and archive');
    const announce = useAnnouncer();
    const [params, setParams] = useSearchParams();
    const searchRef = useRef(null);
    const resultsHeadingRef = useRef(null);
    const pendingFocus = useRef(null);
    const writeTimer = useRef(null);

    // The URL is the source of truth, so Back, Forward and shared links all work.
    const urlQuery = params.get('q') ?? '';
    const selectedCategories = useMemo(
        () => params.getAll('category').filter(category => categories.includes(category)),
        [params]
    );
    const selectedLevels = useMemo(
        () => params.getAll('level').filter(level => levels.includes(level)),
        [params]
    );

    const [query, setQuery] = useState(urlQuery);
    const [syncedQuery, setSyncedQuery] = useState(urlQuery);
    const [pageState, setPageState] = useState({ key: '', size: PAGE_SIZE });

    // The URL changed from outside this page (Back button, a nav link): adopt it.
    if (urlQuery !== syncedQuery) {
        setSyncedQuery(urlQuery);
        setQuery(urlQuery);
    }

    useEffect(() => () => clearTimeout(writeTimer.current), []);

    // Typing has settled: write it to the URL (replace, so Back does not step through keystrokes).
    const handleQueryChange = event => {
        const value = event.target.value;
        setQuery(value);
        clearTimeout(writeTimer.current);
        writeTimer.current = setTimeout(() => {
            setSyncedQuery(value);
            setParams(previous => {
                const next = new URLSearchParams(previous);
                if (value) next.set('q', value);
                else next.delete('q');
                return next;
            }, { replace: true });
        }, 400);
    };

    const toggleParam = (name, value) => {
        setParams(previous => {
            const next = new URLSearchParams(previous);
            const current = next.getAll(name);
            next.delete(name);
            const updated = current.includes(value) ? current.filter(item => item !== value) : [...current, value];
            updated.forEach(item => next.append(name, item));
            return next;
        }, { replace: true });
    };

    const isPending = query !== urlQuery;

    const results = useMemo(
        () => filterCourses(coursesData, { query: urlQuery, categories: selectedCategories, levels: selectedLevels }),
        [urlQuery, selectedCategories, selectedLevels]
    );

    const filterKey = `${urlQuery}|${selectedCategories.join(',')}|${selectedLevels.join(',')}`;
    const size = pageState.key === filterKey ? pageState.size : PAGE_SIZE;
    const visible = useMemo(() => results.slice(0, size), [results, size]);
    const hasMore = results.length > visible.length;
    const hasFilters = query !== '' || selectedCategories.length > 0 || selectedLevels.length > 0;

    const lastAnnounced = useRef(`${filterKey}|${results.length}`);
    useEffect(() => {
        const signature = `${filterKey}|${results.length}`;
        if (lastAnnounced.current === signature) return;
        lastAnnounced.current = signature;
        announce(results.length === 0 ? 'No results found.' : `${results.length} ${results.length === 1 ? 'result' : 'results'} found.`);
    }, [filterKey, results.length, announce]);

    useEffect(() => {
        if (pendingFocus.current === null) return;
        const target = visible[pendingFocus.current];
        pendingFocus.current = null;
        if (target) document.getElementById(`result-link-${target.id}`)?.focus();
    }, [visible]);

    const showMore = () => {
        pendingFocus.current = visible.length;
        const nextSize = size + PAGE_SIZE;
        setPageState({ key: filterKey, size: nextSize });
        announce(`Showing ${Math.min(nextSize, results.length)} of ${results.length} resources.`);
    };

    const clearAll = () => {
        clearTimeout(writeTimer.current);
        setQuery('');
        setSyncedQuery('');
        setParams(new URLSearchParams(), {replace: true});
        searchRef.current?.focus();
    };

    const skipToResults = () => resultsHeadingRef.current?.focus();

    return (
        <>
            <h1 ref={headingRef} tabIndex={-1}>Courses and digital archive</h1>

            <div className="search-layout">
                <search aria-label="Courses and archive" className="search-panel">
                    <form onSubmit={event => event.preventDefault()}>
                        <div className="field">
                            <label htmlFor="resource-search">Search courses and archive</label>
                            <p id="search-hint" className="hint">Searches titles, descriptions and topics. Results update as you type.</p>
                            <input
                                id="resource-search" ref={searchRef} type="search" value={query}
                                onChange={handleQueryChange}
                                aria-describedby="search-hint"
                            />
                        </div>

                        <button type="button" className="link-button" onClick={skipToResults}>
                            Skip filters and go to results
                        </button>

                        <h2 className="filters-title">Filters</h2>
                        <FilterAccordion title="Category" defaultOpen>
                            <ToggleGroup
                                legend="Category" options={categories}
                                selected={selectedCategories}
                                onToggle={category => toggleParam('category', category)}
                            />
                        </FilterAccordion>
                        <FilterAccordion title="Level">
                            <ToggleGroup
                                legend="Level" options={levels}
                                selected={selectedLevels}
                                onToggle={level => toggleParam('level', level)}
                            />
                        </FilterAccordion>

                        {hasFilters && (
                            <button type="button" className="button button--secondary" onClick={clearAll}>
                                Clear all filters
                            </button>
                        )}
                    </form>
                </search>

                <section aria-labelledby="results-heading" aria-busy={isPending}>
                    <h2 id="results-heading" ref={resultsHeadingRef} tabIndex={-1}>Search results</h2>
                    <p className="results-count">{describeCount(visible.length, results.length)}</p>

                    {results.length === 0 ? (
                        <p>Try a different word, or clear the filters to see everything.</p>
                    ) : (
                        <ul className="results" role="list">
                            {visible.map(course => (
                                <li key={course.id}><ResultCard course={course} /></li>
                            ))}
                        </ul>
                    )}

                    {hasMore && (
                        <button type="button" className="button" onClick={showMore}>
                            Show {Math.min(PAGE_SIZE, results.length - visible.length)} more resources
                        </button>
                    )}
                </section>
            </div>
        </>
    );
}