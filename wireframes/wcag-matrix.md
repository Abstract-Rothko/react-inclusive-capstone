# WCAG 2.1 AA Mapping Matrix

**Project:** Kariega Public Library: Adaptive Learning & Resource Portal (Ticket MD-2026-0143)
**Target conformance:** WCAG 2.1 Level AA (all Level A and Level AA success criteria that apply to this product)
**Primary persona:** Onalerona Jacobs, totally blind, NVDA + Firefox/Chrome, keyboard only (see `persona.md`)

## How to read this document

Each row maps one success criterion to the interface component it governs, the concrete technical implementation, and how that implementation is verified.

- **Wireframe** refers to the static files in `/wireframes` (`index.html`, `search.html`, `reserve.html`, `main.css`).
- **React** refers to the Part B prototype in `/src`. Component names match the files in `src/components`.
- Every colour ratio below was computed with the WCAG relative-luminance formula, not estimated. The same values appear in the comments of `main.css`.

## Tools used for verification

| Short name | Tool |
| --- | --- |
| **axe** | axe DevTools browser extension; `jest-axe` in component tests (note: jsdom cannot evaluate colour contrast, so contrast is checked in the browser) |
| **LH** | Lighthouse accessibility audit run against the production build (`npm run build && npm run preview`) |
| **CCA** | TPGi Colour Contrast Analyser |
| **NVDA** | NVDA (exact version recorded in the README log) with Firefox and Chrome |
| **KB** | Manual keyboard-only pass, mouse unplugged: Tab, Shift+Tab, Enter, Space, arrow keys, Esc |
| **Validator** | W3C Nu HTML Checker |
| **RTL** | React Testing Library with `@testing-library/user-event` |

---

## Matrix

| (a) Criterion ID & Name | (b) Target Interface Component | (c) Technical Implementation Detail | (d) Verification Strategy |
| --- | --- | --- | --- |
| **1.1.1 Non-text Content** (A) | Header logo; decorative glyphs (check mark, warning icon, +/- accordion symbol) | **Wireframe:** no informational images; all course, event and room data is real text.<br>**React:** the logo `<img>` sits beside the visible text "Kariega Public Library", so it has `alt=""` (avoids the name being read twice). Any logo used without adjacent text gets `alt="Kariega Public Library"`. Decorative glyphs (...) are CSS generated content with an empty alternative, for example content: "\2713" / "", so they are not announced | axe rule `image-alt`. NVDA Elements List (NVDA+F7) shows no unnamed or duplicated images. oxlint `jsx-a11y/alt-text`. |
| **1.3.1 Info and Relationships** (A) | Page structure on all three screens: landmarks, headings, form groups, result metadata, event times | **Wireframe:** `<header>`, `<nav>` (distinct `aria-label`: Main, Footer, Breadcrumb, Search results pages), `<main>`, `<aside aria-labelledby>`, `<footer>`. Strict h1 > h2 > h3 order. Every input has `<label for>`. Related controls grouped in `<fieldset><legend>`. Room facts and result metadata use `<dl>`. Event times use `<time datetime>`. Results are `<ul>` of `<article>`. Pagination is an `<ol>`.<br>**React:** the same landmarks, headings and form structure, except that the aside content is a <section class="panel"> inside <main>. Ids for the accordion, dialog and error summary come from useId(); form field ids are fixed strings, unique within each page... | NVDA walkthrough: `D` (landmarks), `H`/`1`-`6` (headings), `F` (form fields), NVDA+F7 lists. axe rules `landmark-*`, `heading-order`, `label`. Validator for duplicate ids and nesting. Firefox Accessibility Inspector tree. |
| **1.3.5 Identify Input Purpose** (AA) | `#name`, `#email`, `#phone` on the reservation form | `autocomplete="name"`, `autocomplete="email"`, `autocomplete="tel"` on the three inputs. React `FormField` forwards the `autoComplete` prop. | axe rule `autocomplete-valid`. Browser autofill test fills all three. Validator. |
| **1.4.1 Use of Colour** (A) | Required markers, current-page nav link, in-page links, selected filter buttons, form errors | **Wireframe:** "(required)" is literal text, not just red. Current page in nav uses `aria-current="page"` plus bold and a thicker underline. Links are always underlined. **React:** a pressed category button (`aria-pressed="true"`) adds a check mark, inverted colours and bold text. Invalid fields get a thick left bar, a 3 px border and the visible word "Error:" before the message. | Chrome DevTools > Rendering > emulate "achromatopsia" and re-check each state. Windows High Contrast / forced-colors pass. NVDA reads state words. |
| **1.4.3 Contrast (Minimum)** (AA) | All body text, hint text, link text, button text, header and footer text | Colour tokens in `:root` with the ratio recorded in a comment beside each pair (also tabulated below). Lowest text ratio in the system: **6.09:1** (`--ink-muted` on `--surface`). Body text is 12.87:1. All large text (h1 2.25rem, h2 1.75rem) far exceeds the 3:1 large-text minimum. Hint and meta text is 0.875rem and still meets 4.5:1. | CCA spot-check of every token pair. Lighthouse and axe rule `color-contrast` in a real browser. Ratios recomputed independently with the WCAG formula. |
| **1.4.4 Resize Text** (AA) | Entire UI | Every font size, spacing value and target size is in `rem` (`--text-*`, `--space-*`, `--target-min`). No `px` font sizes. Viewport meta has no `user-scalable=no` or `maximum-scale`. Controls use `min-height`, never fixed `height`. | Browser zoom to 200% and Firefox "Zoom text only" at 200%: no clipped, overlapping or lost content. Lighthouse audit `meta-viewport`. |
| **1.4.10 Reflow** (AA) | Page layout, card grids, header/nav, forms, pagination, metadata lists | Single column with no horizontal scroll at 320 CSS px. `.grid` uses `repeat(auto-fit, minmax(min(100%, 16rem), 1fr))`; `.page-grid` uses `min(100%, 22rem)`; `.meta-list` uses `min(100%, 9rem)`; header and nav use `flex-wrap`; `img, svg { max-width: 100% }`. `time` elements are allowed to wrap on narrow screens. | DevTools device mode at 320 px wide. Browser zoom 400% at a 1280 px window. Confirm no horizontal scrollbar on all three pages. |
| **1.4.11 Non-text Contrast** (AA) | Input and select borders, button borders, checkbox/radio controls, filter buttons, pagination, focus rings | `--border` `#6B7F80` is 4.22:1 on white and 3.44:1 on the beige surface (need 3:1). Focus ring `#2B6CB0` is 5.42:1 on white and 4.41:1 on beige. On the teal footer the ring switches to `#FFD166` at 7.03:1 (the blue ring would be only 1.87:1 on teal). | CCA on border and ring colours against each adjacent background. Keyboard pass checking the ring is visible on white, beige panel and teal footer surfaces. |
| **1.4.12 Text Spacing** (AA) | All text containers | Body `line-height: 1.5`; paragraph spacing 1rem. No fixed-height text containers and no `overflow: hidden` on text. | Apply the Text Spacing bookmarklet (line height 1.5, paragraph 2x, letter 0.12em, word 0.16em): nothing is clipped or overlaps. |
| **2.1.1 Keyboard** (A) | Every interactive control: links, buttons, inputs, selects, checkboxes, `<details>`, accordion, filter buttons, dialog | **Wireframe:** native elements only. **React:** `<button type="button">` for all toggles (Enter and Space are built in). No `div`/`span` with `onClick`. | Full task completion by keyboard for persona goals 1-3 (reserve a room, search and open a result, register). oxlint jsx-a11y rules `click-events-have-key-events` and `no-static-element-interactions`. RTL tests with `userEvent.keyboard('{Enter}')` and `' '`. |
| **2.1.2 No Keyboard Trap** (A) | Confirmation dialog; filter panel | The dialog is the native `<dialog>` opened with `showModal()`: the browser contains focus, makes the background inert, and Esc closes it. No custom focus-trap code to get wrong. The filter panel never captures focus. | Tab and Shift+Tab loop test inside the dialog, then Esc. NVDA test of dialog entry and exit. RTL test that the dialog closes and focus is restored. |
| **2.4.1 Bypass Blocks** (A) | Skip link; landmark regions; filter skip link | First focusable element on every page: `<a class="skip-link" href="#main-content">`. `<main id="main-content">` is the target (`tabIndex={-1}` in React so focus actually moves). `search.html` adds "Skip filters and go to results". Landmarks give NVDA `D` navigation. | Press Tab once on every page and activate the link. axe rules `bypass` and `skip-link`. NVDA `D` lists banner, navigation, main, complementary, contentinfo. |
| **2.4.2 Page Titled** (A) | `<title>` on each page and React route | Unique descriptive titles in the pattern "Page name: Kariega Public Library"; `search.html` includes the query. React: `usePageHeading(title)` sets `document.title` on every route change. | Read the tab title on each route. NVDA announces the title on load. axe rule `document-title`. |
| **2.4.3 Focus Order** (A) | All pages; error summary; confirmation dialog | DOM order equals visual and reading order; no positive `tabindex`; no CSS `order` reordering. Hint text precedes its input; submit is the last control. React moves focus deliberately: route change to the `<h1>`; failed submit to the error summary; dialog close back to the page heading. | Recorded Tab-sequence log for each page in the README. axe rule `tabindex`. |
| **2.4.4 Link Purpose (In Context)** (A) | Result titles, event "Register" links, breadcrumb, footer links, pagination | Link text is unique and self-describing ("Register for Introduction to Spreadsheets", "Introduction to Bookkeeping"). Every link's destination matches its text: Accessibility statement goes to the accessibility page, Contact goes to contact details, breadcrumb "Study rooms" goes to the study-rooms section. React `ResultCard` makes the course title the link, and EventCard uses "Register for {event title}". | NVDA Links List (NVDA+F7) scanned for duplicate or vague names. Manual click-through of every link in each wireframe and in the React app. |
| **2.4.5 Multiple Ways** (AA) | Site navigation | Three independent routes to any resource: primary navigation, site search (home and search pages), and browse-by-topic cards on the home page. | KB and NVDA: locate the same course via each route. |
| **2.4.6 Headings and Labels** (AA) | Page headings; every form label and legend | One descriptive `<h1>` per page; labels state exactly what to enter ("Full name", "Start time"); legends name each group ("Reservation details", "Features you need (optional)"). | NVDA headings list (`H`) and form-field walk (`F`). Manual review for vague labels. |
| **2.4.7 Focus Visible** (AA) | Every focusable element | Global `:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }`. `.region-dark :focus-visible` switches to `--focus-on-dark`. No `outline: none` anywhere in the CSS. | `Select-String -Path main.css -Pattern 'outline:\s*(none\|0)'` returns nothing. Tab through every page on each background type; record what you see in the README keyboard log. |
| **2.5.3 Label in Name** (A) | Pagination links, "Reserve" links, submit buttons | The accessible name always contains the visible text. `aria-label="Page 2"` on a link showing "2"; "Reserve: Study Room 2" on a link showing "Reserve"; the submit button's visible text "Reserve Study Room 2" is its name with no `aria-label` override. | axe rule `label-content-name-mismatch`. Voice-control test (Windows Voice Access): say "click Page 2". |
| **3.1.1 Language of Page** (A) | `<html>` element | `<html lang="en">` on all three wireframes and in the React `index.html`. | axe rules `html-has-lang` and `html-lang-valid`. Validator. |
| **3.2.2 On Input** (A) | Filter checkboxes and radios, sort select, search box | Changing a control never submits a form or navigates. **Wireframe:** results change only on the explicit "Apply search and filters" button. **React:** results update in place without moving focus, and the update is announced. | KB test: change every control and confirm focus and URL stay put. |
| **3.3.1 Error Identification** (A) | Reservation form | **React:** failed submit renders an `ErrorSummary` (heading plus links) and moves focus to it. Each failing field gets `aria-invalid="true"` and `aria-describedby="{id}-hint {id}-error"`, with a text message ("Error: ...") beside the field. Errors are never conveyed by colour alone. | RTL test: empty submit sets `aria-invalid` and focuses the summary. NVDA: error text is heard on arrival and on re-entering the field. |
| **3.3.2 Labels or Instructions** (A) | Reservation form | The "(required)" convention is stated in plain text before the form; every field has a visible label and a hint (format, limits, closing days). Optional groups are labelled "(optional)". No placeholder-only inputs. | NVDA `F` walk confirms label, state and hint on every field. Manual review. |
| **3.3.3 Error Suggestion** (AA) | Validation messages | Each message says how to fix the problem: "Enter an email address like name@example.com", "Choose a time slot.", "Study Room 1 seats up to 4 people. Choose 4 or fewer." | RTL assertions on message text. Manual review of every message. |
| **3.3.4 Error Prevention (Legal, Financial, Data)** (AA) | Room reservation submission | Bookings create or change stored data, so they are reversible and confirmed: the prototype shows a confirmation dialog... The confirmation email and 24-hour cancellation described in the wireframe aside are production features and are not built in the prototype. | Manual walkthrough of submit, confirm and cancel. |
| **4.1.1 Parsing** (A) | All HTML and JSX output | Valid, nested markup with unique ids; React ids from `useId()`; no duplicate attributes. | Validator on each wireframe and on the built `dist/index.html`. axe rule `duplicate-id`. |
| **4.1.2 Name, Role, Value** (A) | Filter accordion, category buttons, confirmation dialog, all native controls | **Wireframe:** native `<details>`/`<summary>` (state is implicit). **React:** accordion header is `<button aria-expanded={open} aria-controls="panel-id">`; category buttons carry `aria-pressed={selected}` and keep a constant label; the dialog is native `<dialog>` with `aria-labelledby`. Both attributes update in the same render as the state change. | RTL tests assert `aria-expanded` and `aria-pressed` before and after click and after Enter/Space. NVDA announces "expanded", "collapsed", "pressed". axe rules `aria-allowed-attr`, `aria-valid-attr-value`. |
| **4.1.3 Status Messages** (AA) | Results count; field validation; booking confirmation | It now describes the real AnnouncerProvider (the polite <output> plus the assertive role="alert" region), the 400 ms debounce, and the real test files. | NVDA with speech viewer: type in search, confirm exactly one count announcement. Blur an invalid email, confirm the error is spoken once. RTL: region exists on first render with `role="status"`. |

---

## Colour contrast reference

All ratios computed with the WCAG 2.1 relative-luminance formula. Required: 4.5:1 for normal text, 3:1 for large text and for UI components (1.4.11).

| Token pair | Foreground | Background | Ratio | Requirement | Result |
| --- | --- | --- | --- | --- | --- |
| `--ink` on `--paper` (body text) | `#1B3638` | `#FFFFFF` | 12.87:1 | 4.5:1 | Pass |
| `--ink` on `--surface` (panels) | `#1B3638` | `#E9E8E2` | 10.49:1 | 4.5:1 | Pass |
| `--ink-muted` on `--paper` (hints, meta) | `#475859` | `#FFFFFF` | 7.48:1 | 4.5:1 | Pass |
| `--ink-muted` on `--surface` | `#475859` | `#E9E8E2` | 6.09:1 | 4.5:1 | Pass |
| `--accent` on `--paper` (links) | `#1F5C60` | `#FFFFFF` | 7.61:1 | 4.5:1 | Pass |
| `--accent` on `--surface` (links in panels) | `#1F5C60` | `#E9E8E2` | 6.20:1 | 4.5:1 | Pass |
| `--on-dark` on `--accent` (button text) | `#FFFFFF` | `#1F5C60` | 7.61:1 | 4.5:1 | Pass |
| `--on-dark` on `--ink` (button hover, current page) | `#FFFFFF` | `#1B3638` | 12.87:1 | 4.5:1 | Pass |
| `--danger` on `--paper` ("(required)", errors) | `#9B2C2C` | `#FFFFFF` | 7.53:1 | 4.5:1 | Pass |
| `--danger` on `--surface` | `#9B2C2C` | `#E9E8E2` | 6.13:1 | 4.5:1 | Pass |
| `--on-footer` on `--bg-color` (footer text) | `#E9E8E2` | `#244749` | 8.25:1 | 4.5:1 | Pass |
| `--on-footer-soft` on `--bg-color` (footer meta) | `#D5DAD6` | `#244749` | 7.15:1 | 4.5:1 | Pass |
| `--border` on `--paper` (input borders) | `#6B7F80` | `#FFFFFF` | 4.22:1 | 3:1 (1.4.11) | Pass |
| `--border` on `--surface` | `#6B7F80` | `#E9E8E2` | 3.44:1 | 3:1 (1.4.11) | Pass |
| `--focus` on `--paper` (focus ring) | `#2B6CB0` | `#FFFFFF` | 5.42:1 | 3:1 (1.4.11) | Pass |
| `--focus` on `--surface` | `#2B6CB0` | `#E9E8E2` | 4.41:1 | 3:1 (1.4.11) | Pass |
| `--focus-on-dark` on `--bg-color` (footer ring) | `#FFD166` | `#244749` | 7.03:1 | 3:1 (1.4.11) | Pass |
| *Rejected:* `--focus` on `--bg-color` | `#2B6CB0` | `#244749` | 1.87:1 | 3:1 (1.4.11) | **Fail**: this is why dark regions use the yellow ring |

---

## Notes beyond the 2.1 AA scope

- **2.2.1 Timing Adjustable (A):** the prototype has no session timeout. Production would need either no timeout or a warning with an extension option, because the persona reads and types slowly.
- **Target size:** every control has `min-height: 2.75rem` (44 px), which satisfies the AAA target-size criterion (2.5.5) and the WCAG 2.2 AA criterion (2.5.8) as a bonus.
- **Automated tools are not enough.** Lighthouse and axe detect only a fraction of WCAG failures. Criteria such as 2.4.3, 2.4.4, 3.3.3 and 4.1.3 are verified manually; those results are logged in the README.