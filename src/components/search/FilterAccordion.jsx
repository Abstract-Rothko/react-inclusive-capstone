import { useId, useState } from 'react';

export default function FilterAccordion({ title, defaultOpen = false, children }) {
    const [open, setOpen] = useState(defaultOpen);
    const uid = useId();
    const buttonId = `${uid}-button`;
    const panelId = `${uid}-panel`;

    return (
        <div className="accordion">
            <h3 className="accordion__heading">
                <button
                    type="button"
                    id={buttonId}
                    className="accordion__button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpen(current => !current)}
                >
                    {title}
                </button>
            </h3>
            <div id={panelId} className="accordion__panel" hidden={!open}>
                {children}
            </div>
        </div>
    );
}