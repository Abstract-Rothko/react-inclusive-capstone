export default function SkipLink({ targetId = 'main-content', children = 'Skip to main content' }) {
    const handleClick = event => {
        const target = document.getElementById(targetId);
        if (!target) return;
        event.preventDefault();
        target.focus();
        target.scrollIntoView();
    };

    return (
        <a className="skip-link" href={`#${targetId}`} onClick={handleClick}>
            {children}
        </a>
    );
}