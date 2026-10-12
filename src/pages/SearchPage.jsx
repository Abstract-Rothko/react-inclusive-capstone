import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, coursesData } from '../data/resources';
import { filterCourses, describeCount } from '../lib/search';
import { usePageHeading } from '../hooks/usePageHeading';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useAnnouncer } from '../hooks/useAnnouncer';
import FilterAccordion from '../components/search/FilterAccordion';
import ToggleGroup from '../components/search/ToggleGroup';
import ResultCard from '../components/search/ResultCard';

const PAGE_SIZE = 12;
const levels = ['Beginner', 'Intermediate'];

const toggleItem = (list, item) => (list.includes(item) ? list.filter(entry => entry !== item) : [...list, item]);

export default function SearchPage() {
    const headingRef = usePageHeading('Courses and archive');
    const announce = useAnnouncer();
    const [params] = useSearchParams();
    const searchRef = useRef(null);
    const resultsHeadingRef = useRef(null);
    const pendingFocus = useRef(null);

    const [query, setQuery] = useState(params.get('q') ?? '');
    const [selectedCategories, setSelectedCategories] = useState(
        params.getAll('category').filter(category => categories.includes(category))
    );
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [pageState, setPageState] = useState({ key: '', size: PAGE_SIZE });

    const debouncedQuery = useDebouncedValue(query, 400);
    const isPending = query !== debouncedQuery;

    const results = useMemo(
        () => filterCourses(coursesData, { query: debouncedQuery, categories: selectedCategories, levels: selectedLevels }),
        [debouncedQuery, selectedCategories, selectedLevels]
    );

    const filterKey = `${debouncedQuery}|${selectedCategories.join(',')}|${selectedLevels.join(',')}`;
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
        setQuery('');
        setSelectedCategories([]);
        setSelectedLevels([]);
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
                                onChange={event => setQuery(event.target.value)}
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
                                onToggle={category => setSelectedCategories(current => toggleItem(current, category))}
                            />
                        </FilterAccordion>
                        <FilterAccordion title="Level">
                            <ToggleGroup
                                legend="Level" options={levels}
                                selected={selectedLevels}
                                onToggle={level => setSelectedLevels(current => toggleItem(current, level))}
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