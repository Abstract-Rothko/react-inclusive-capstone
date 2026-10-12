import { SITE } from '../config/site';
import { usePageHeading } from '../hooks/usePageHeading';

export default function AccessibilityPage() {
    const headingRef = usePageHeading('Accessibility statement');

    return (
        <>
            <h1 ref={headingRef} tabIndex={-1}>Accessibility statement</h1>
            <p>
                {SITE.name} wants everyone to be able to use this website. We aim to meet {SITE.conformance}.
                This is a prototype, so some content and features are still being tested.
            </p>

            <h2>What we have done</h2>
            <ul>
                <li>Every page can be used with a keyboard alone.</li>
                <li>Pages are structured with headings and landmarks for screen reader users.</li>
                <li>Forms have visible labels, instructions and clear error messages.</li>
                <li>Text and controls meet colour contrast requirements.</li>
            </ul>

            <h2>Known limitations</h2>
            <ul>
                <li>Course lesson videos are not yet available in this prototype. They will include captions and a transcript.</li>
                <li>The date field uses your browser&rsquo;s built-in date picker, which looks and sounds different between browsers.</li>
            </ul>

            <h2>Tell us about a problem</h2>
            <p>
                Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or phone <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>.
                We aim to reply within five working days.
            </p>
        </>
    );
}
