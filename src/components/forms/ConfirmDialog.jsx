import { useEffect, useId, useRef } from 'react';

export default function ConfirmDialog({ open, title, onClose, children, closeLabel = 'Done' }) {
    const dialogRef = useRef(null);
    const titleId = useId();
    const bodyId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    return (
        <dialog ref={dialogRef} className="dialog" aria-labelledby={titleId} aria-describedby={bodyId} onClose={onClose}>
            <h2 id={titleId}>{title}</h2>
            <div id={bodyId}>{children}</div>
            <div className="dialog__actions">
                <button type="button" className="button" onClick={() => dialogRef.current?.close()}>
                    {closeLabel}
                </button>
            </div>
        </dialog>
    );
}
