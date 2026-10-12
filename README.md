# Kariega Public Library: Accessible Resource Hub

Prototype for Marlowe Digital ticket MD-2026-0143 (Local Public Library domain). React 19, Vite, React Router.

## Run it

    npm ci
    npm run dev          # development
    npm test             # component and accessibility tests
    npm run lint
    npm run build && npm run preview

## Repository map

- `/wireframes`: Part A. Three static HTML pages, `main.css`, `persona.md`, `wcag-matrix.md`.
- `/src`: Part B. The React application and `/src/test` component tests.
- This file: Part C.

## Part C: Architectural and accessibility decisions

### 1. Accessibility trade-offs

**Native `<dialog>` over a custom modal.** Booking and registration confirmations use `<dialog>` opened with `showModal()`. The browser makes the page behind it inert, contains Tab focus and closes on Esc, so there is no hand-written focus trap to get wrong (WCAG 2.1.2). The cost is less control over styling and initial focus. On close, `onClose` resets the form and returns focus to the page `<h1>` through a `useRef`.

**Native date and select controls over custom pickers.** `<input type="date">` and `<select>` give keyboard support for free, but screen-reader output varies between browsers and `min`/`max` do not stop a Sunday booking. I kept the native controls, listed the date field as a known limitation on the accessibility page, and enforce the range and opening days in `validateBooking`.

**One shared announcer over per-field live regions.** Field errors are inline text linked by `aria-describedby`. A single polite region, mounted once, announces an error when focus leaves a field and announces the result count after typing settles (400 ms). This avoids many competing live regions and per-keystroke speech. The cost is a short delay. A failed submit moves focus to the error summary instead of also sounding an assertive alert, which would double the speech.

### 2. Assistive technology state architecture

State lives in hooks and is rendered into ARIA attributes in the same render, so the accessibility tree cannot drift from the UI. `useAccessibleForm` holds `values`, `touched` and `attempted` and derives `errors` with `useMemo`. `FormField` turns an error into `aria-invalid="true"` and appends the error id to `aria-describedby` beside the hint id. A failed submit increments a `focusRequest` counter and an effect calls `focus()` on the error summary's ref. `FilterAccordion` keeps one `open` boolean that drives both `aria-expanded` and the panel's `hidden`. `ToggleGroup` derives `aria-pressed` from the `selected` array. `SearchPage` sets `aria-busy` while the typed text and the settled text differ. `AnnouncerProvider` exposes `announce(message, priority)` through context. `usePageHeading` moves focus to the `<h1>` after every client-side route change.

### 3. Verification and testing audit

Run on the production build (`npm run build && npm run preview`).

| Check | Result |
| --- | --- |
| `npm test` (Vitest, Testing Library, jest-axe) | <your result> |
| `npm run lint` (oxlint with jsx-a11y rules) | <your result> |
| axe-core, 7 routes, 1280 px and 320 px | <your result> |
| Lighthouse accessibility, 7 routes | <your scores>. Reports in `/docs/lighthouse/` |

    npx lighthouse http://localhost:4173/reserve --only-categories=accessibility \
      --output=html --output-path=docs/lighthouse/reserve.html --chrome-flags="--headless=new"

**Manual keyboard log.** For each page, record the Tab order you observed, e.g. `Skip link, Home, Courses and archive, ..., Reserve room`. Note that there is no keyboard trap and that Esc closes the dialog.

**Screen reader log.**

| Date | Screen reader and browser | Task | What was announced | Problems found |
| --- | --- | --- | --- | --- |
| <date> | <e.g. NVDA 20xx + Firefox> | Reserve a room | <what you heard> | <none, or list> |

### Deviations from the wireframes

<Room capacity, booking length and filter set differ from the wireframes. See "Wireframe drift" in the audit.>