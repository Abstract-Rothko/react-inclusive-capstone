import { Link, useParams } from 'react-router-dom';
import { coursesData } from '../data/resources';
import { usePageHeading } from '../hooks/usePageHeading';
import Breadcrumb from '../components/common/Breadcrumb';
import NotFoundPage from './NotFoundPage';

export default function CoursePage() {
    const { courseId } = useParams();
    const course = coursesData.find(item => String(item.id) === courseId);

    if (!course) return <NotFoundPage />;

    return <CourseContent course={course} />;
}

function CourseContent({ course }) {
    const headingRef = usePageHeading(course.title);

    return (
        <>
            <Breadcrumb items={[
                { label: 'Home', to: '/' },
                { label: 'Courses and archive', to: '/search' },
                { label: course.title }
            ]} />
            <h1 ref={headingRef} tabIndex={-1}>{course.title}</h1>
            <p>{course.description}</p>

            <dl className="meta-list">
                <div><dt>Category</dt><dd>{course.category}</dd></div>
                <div><dt>Level</dt><dd>{course.level}</dd></div>
                <div><dt>Language</dt><dd>{course.language}</dd></div>
                <div><dt>Provider</dt><dd>{course.provider}</dd></div>
                <div><dt>Length</dt><dd>{course.durationMinutes} minutes</dd></div>
            </dl>

            <section aria-labelledby="outcomes-title">
                <h2 id="outcomes-title">What you will learn</h2>
                <ul>
                    {course.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}
                </ul>
            </section>

            <section aria-labelledby="lessons-title">
                <h2 id="lessons-title">Lessons</h2>
                <ol>
                    {course.lessons.map(lesson => (
                        <li key={lesson.order}>{lesson.title} ({lesson.durationMinutes} minutes)</li>
                    ))}
                </ol>
            </section>

            <p>
                <Link to="/search">Back to courses and archive</Link>
            </p>
        </>
    );
}