# Kariega Public Library: Accessible Resource Hub

Prototype for Marlowe Digital ticket MD-2026-0143 (Local Public Library domain). React 19, Vite, React Router.

## Run it

    npm ci
    npm run dev          # development
    npm test             # component and accessibility tests
    npm run lint
    npm run build && npm run preview


## Architectural and accessibility decisions

### 1. Accessibility trade-offs

**Native `<dialog>` over a custom modal.** Booking and registration confirmations use `<dialog>` opened with `showModal()`. The browser makes the page behind it inert and closes it on Esc, so there is no hand-written focus trap to get wrong (WCAG 2.1.2). Tab can still reach the browser toolbar, which is what 2.1.2 asks for. The cost is less control over styling and initial focus. On close, `onClose` resets the form and returns focus to the page `<h1>` through a `useRef`.

**Native date and select controls over custom pickers.** `<input type="date">` and `<select>` give keyboard support for free, but screen reader output varies between browsers and `min`/`max` do not stop a Sunday booking. I kept the native controls, listed the date field as a known limitation on the accessibility page, and enforce the range and opening days in `validateBooking`.

**One shared announcer over per-field live regions.** Field errors are inline text linked by `aria-describedby`. A single polite region, mounted once, announces an error when focus leaves a field and announces the result count after typing settles (400 ms). This avoids competing live regions and per-keystroke speech, at the cost of a short delay. A failed submit moves focus to the error summary instead of also sounding an assertive alert, which would double the speech.

### 2. Assistive technology state architecture

State lives in hooks and is rendered into ARIA attributes in the same render, so the accessibility tree cannot drift from the UI. `useAccessibleForm` holds `values`, `touched` and `attempted` and derives `errors` with `useMemo`. `FormField` turns an error into `aria-invalid="true"` and appends the error id to `aria-describedby` beside the hint id. A failed submit increments a `focusRequest` counter and an effect calls `focus()` on the error summary's ref. `FilterAccordion` keeps one `open` boolean that drives both `aria-expanded` and the panel's `hidden`. `ToggleGroup` derives `aria-pressed` from the `selected` array, which comes from the URL. `SearchPage` sets `aria-busy` while the typed text and the settled text differ. `AnnouncerProvider` exposes `announce(message, priority)` through context. `usePageHeading` moves focus to the `<h1>` after every client-side route change.

### 3. Verification and testing audit

Automated checks were run on 12 October 2026 against the production build (`npm run build && npm run preview`) with Node 22.22.2, headless Chromium on Linux, Lighthouse 13.5.0 and axe-core 4.14.

| Check | Result |
| --- | --- |
| `npm test` (Vitest, Testing Library, jest-axe) | 7 files, 80 tests, all passed |
| `npm run lint` (oxlint with jsx-a11y rules) | 0 warnings, 0 errors on 50 files |
| axe-core in Chrome, 8 routes at 1280 px and 320 px, plus the error state and the open filter state | 0 violations. The colour-contrast rule ran (jsdom cannot run it). No horizontal scroll at 320 px |
| Lighthouse accessibility, 8 routes | **100 on every route**. Reports in `/docs/lighthouse/` |

Reproduce the Lighthouse run with `npm run audit:lighthouse`.

**Keyboard log.** Tab order recorded in Chrome with the mouse unused. There is no keyboard trap, the skip link is the first stop on every page, and Shift+Tab reverses the order.

- Home: Skip link, Brand, Home, Courses and archive, Reserve a room, Events, Search box, Search button, then the eight topic links.
- Reserve a room: the same header stops, Breadcrumb Home, Room, Date (four stops: day, month, year, picker button), Time slot (one stop, arrow keys move within the group), Number of people, three checkboxes, Full name, Email, Phone, Reserve room, Cancel link, then the phone and email links.
- Dialog: Enter on "Reserve room" opens it with focus on "Done". Esc or Done closes it, the form resets and focus returns to the page heading.
- Filters: Enter and Space both toggle `aria-expanded` on the accordion buttons and `aria-pressed` on the category chips. The polite region then announces "15 results found."

**Screen reader log.** Complete this table by hand before submitting. Do not leave expected text in the "Heard" column.

| Date | Screen reader and browser | Task | Expected | What was heard | Problems found |
| --- | --- | --- | --- | --- | --- |
| TO COMPLETE | NVDA + Firefox | Skip link, then headings list (H) | Skip to main content, one h1, landmarks listed with D | TO COMPLETE | TO COMPLETE |
| TO COMPLETE | NVDA + Firefox | Search "budget", toggle a category | One count announcement, "pressed" on the chip | TO COMPLETE | TO COMPLETE |
| TO COMPLETE | NVDA + Firefox | Reserve a room with empty fields | Focus on error summary, links read as errors | TO COMPLETE | TO COMPLETE |
| TO COMPLETE | NVDA + Firefox | Complete a booking | Dialog announced as "Booking confirmed", focus returns to heading | TO COMPLETE | TO COMPLETE |

### Deviations from the wireframes

- **Time slots.** The wireframe used a start time plus duration. The prototype uses four fixed two-hour blocks, which removes invalid combinations (a duration running past closing) and gives screen reader users one radio group instead of two dependent selects.
- **Filters and paging.** The wireframe filtered by format and accessibility and had numbered pagination and a sort control. The dataset has no format field, so the prototype filters by category and level and uses a "Show more" button that moves focus to the first new result.
- **Capacity.** Room capacities follow `src/data/rooms.js` (4, 6 and 12), which is the source of truth.
- **Topics.** The wireframe topic names were placeholders. The prototype uses the eight categories in the dataset.