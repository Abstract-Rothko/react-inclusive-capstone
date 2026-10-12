import { Link } from 'react-router-dom';

export default function ResultCard({ course }) {
    const headingId = `result-${course.id}`;

    return (
        <article className="card" aria-labelledby={headingId}>
            <h3 id={headingId}>
                <Link id={`result-link-${course.id}`} to={`/courses/${course.id}`}>{course.title}</Link>
            </h3>
            <p>{course.description}</p>
            <dl className="meta-list">
                <div><dt>Category</dt><dd>{course.category}</dd></div>
                <div><dt>Level</dt><dd>{course.level}</dd></div>
                <div><dt>Language</dt><dd>{course.language}</dd></div>
                <div><dt>Length</dt><dd>{course.durationMinutes} minutes in {course.lessonCount} lessons</dd></div>
            </dl>
        </article>
    );
}