import { useEffect, useRef } from "react";

function ConfirmDialog({open, onClose, children}) {
    const ref = useRef(null);

    useEffect(() => {
        const d = ref.current;
        if(open && !d.open) d.showModal();
        if(!open && d.open) d.close();
    }, [open]);

    return (
        <dialog ref={ref} aria-labelledby="dlg-title" onClose={onClose}>
            <h2 id="dlg-title">Booking Confirmed</h2>
            {children}
            <button type="button" autoFocus onClick={onClose}>Done</button>
        </dialog>
    );
}

export default ConfirmDialog;