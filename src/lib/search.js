export function filterCourses(courses, { query, categories, levels }) {
    const needle = query.trim().toLowerCase();
    return courses.filter(course => {
        if (categories.length > 0 && !categories.includes(course.category)) return false;
        if (levels.length > 0 && !levels.includes(course.level)) return false;
        if (!needle) return true;
        const haystack = `${course.title} ${course.description} ${course.tags.join(' ')}`.toLowerCase();
        return haystack.includes(needle);
    });
}

export function describeCount(shown, total) {
    if (total === 0) return 'No resources found.';
    const noun = total === 1 ? 'resource' : 'resources';
    return shown < total ? `Showing ${shown} of ${total} ${noun}.` : `Showing all ${total} ${noun}.`;
}