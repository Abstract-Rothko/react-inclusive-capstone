import { useId, useState } from "react";

export default function FilterAccordion({title, defaultOpen = false, children}) {
    const [open, setOpen] = useState(defaultOpen);
    const uid = useId();
    const btnId = `${uid}-btn`, panelId = `${uid}-panel`;

    return (
        <div className="accordion">
            <h3 className="accordion__heading">
                <button type="button" id={btnId} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(o => !o)}>
                    {title} <span aria-hidden="true">{open ? '-' : '+'}</span>
                </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!open}>
                {children}
            </div>
        </div>
    );
}