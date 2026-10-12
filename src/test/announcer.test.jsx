import { act, render, screen } from '@testing-library/react';
import { AnnouncerProvider } from '../context/AnnouncerProvider';
import { useAnnouncer } from '../hooks/useAnnouncer';
import { assertiveRegion, politeRegion } from './helpers';

function Trigger() {
    const announce = useAnnouncer();
    return (
        <>
            <button onClick={() => announce('Saved.')}>polite</button>
            <button onClick={() => announce('Connection lost.', 'assertive')}>assertive</button>
        </>
    );
}

describe('AnnouncerProvider', () => {
    beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
    afterEach(() => vi.useRealTimers());

    it('mounts both live regions empty on first render', () => {
        render(<AnnouncerProvider><Trigger /></AnnouncerProvider>);
        expect(politeRegion()).toBeEmptyDOMElement();
        expect(assertiveRegion()).toBeEmptyDOMElement();
        expect(politeRegion()).toHaveAttribute('aria-atomic', 'true');
    });

    it('writes to the polite and assertive regions independently', () => {
        render(<AnnouncerProvider><Trigger /></AnnouncerProvider>);
        act(() => {
            screen.getByText('polite').click();
            screen.getByText('assertive').click();
            vi.advanceTimersByTime(100);
        });
        expect(politeRegion()).toHaveTextContent('Saved.');
        expect(assertiveRegion()).toHaveTextContent('Connection lost.');
    });

    it('re-announces an identical message by clearing the region first', () => {
        render(<AnnouncerProvider><Trigger /></AnnouncerProvider>);
        act(() => { screen.getByText('polite').click(); vi.advanceTimersByTime(100); });
        act(() => { screen.getByText('polite').click(); });
        expect(politeRegion()).toBeEmptyDOMElement();
        act(() => { vi.advanceTimersByTime(100); });
        expect(politeRegion()).toHaveTextContent('Saved.');
    });
});