# Persona: Onalerona Jacobs

---

## Persona Details

| Attribute      | Detail                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Name**       | Onalerona Jacobs                                                                           |
| **Age**        | 29                                                                                       |
| **Occupation** | Part-time call-centre agent; studying part-time for a bookkeeping certificate            |
| **Vision**     | Totally blind (no usable vision); has used screen readers since her teens                |
| **Residence**      | Kariega, Gqeberha. 25 minutes by bus from Kariega Public Library                         |
| **Library use**| Visits twice a month; uses the website 3 to 4 times a week, almost always at night       |
| **Tech confidence** | High with her own tools; low tolerance for sites that waste her time               |
| **Tags** | smart, creative, social, focused               |

## Quote

> "I don't need the website to be special. I need it to be *honest*. If it says it's a
> button, it should act like one. If it says there are twelve results, there should be
> twelve results."

**One-line summary:** *An experienced, fast, keyboard-driven screen reader user who does not want special treatment, just a site that works the same way for her as it does for everyone else.*

---

## Technical configuration

### Primary setup (home laptop)

| Layer                 | Configuration                                                                  |
| --------------------- | ------------------------------------------------------------------------------ |
| Operating system      | Windows 11                                                                     |
| Screen reader         | **NVDA**                                                                       |
| Browser               | **Firefox**, **Chrome**                                                        |
| Speech                | Synthesiser rate set high (she skims at roughly 2 to 3x normal speaking speed) |
| Braille               | 40-cell refreshable braille display, used to proofread form entries and email addresses |
| Pointing device       | None. The mouse is unplugged; she never uses it                                |
| Browsing mode         | NVDA **browse mode** for reading, automatic **focus mode** when entering form fields |
| Verbosity settings    | Reports landmarks, headings with level, links vs. visited links, and ARIA live regions all **on** |

### Secondary setup (phone, on the move)

| Layer          | Configuration                                                                       |
| -------------- | ----------------------------------------------------------------------------------- |
| Device         | Samsung Galaxy A17                                                                  |
| Screen reader  | **VoiceOver** with Chrome                                                           |
| Navigation     | Rotor set to *Headings* and *Landmarks*; swipe navigation; Braille screen input off |

### Input modalities

1. **Keyboard only** (desktop): `Tab` / `Shift+Tab`, `Enter`, `Space`, arrow keys inside widgets, `Esc` to dismiss.
2. **Screen reader quick-navigation keys** (NVDA browse mode):

   | Key                  | What she uses it for                                    |
   | -------------------- | ------------------------------------------------------- |
   | `D` / `Shift + D`      | Jump between **landmarks** (banner, nav, main, etc.)    |
   | `H`, `1` to `6`      | Jump between headings, or to a specific heading level   |
   | `F`                  | Jump to the next **form field**                         |
   | `T`                  | Jump to the next table                                  |
   | `K`                  | Jump to the next link                                   |
   | `NVDA + F7`            | Open the **Elements List** (all links, headings, landmarks) |
   | `Ctrl + Home`          | Return to top of page                                   |
   | `Ctrl + F`             | Find text on the page                                   |

3. **Touch + VoiceOver gestures** (phone): swipe to move by element, rotor to move by heading or landmark, double-tap to activate.

---

## How she actually reads a page

This is the behaviour the wireframe's structure is designed around:

1. **Page loads.** NVDA announces the `<title>`. If the title is generic ("Home"), she has no idea which page she is on.
2. **Skip link.** She usually presses `Tab` once. If the first thing announced is a skip link, she activates it and lands at `<main>`. If not, she presses `D` until she hears "main landmark."
3. **Heading scan.** She presses `1` to hear the `<h1>`, then `H` repeatedly to build a mental outline. She treats the heading list as a table of contents.
4. **Targeted jump.** She presses `F` to reach a search box, or `K` to scan links. She *never* reads a whole page top to bottom unless the content is short.
5. **Forms.** She tabs through, relying on the announced **label, role, state, and hint** for each field. She reads the field's description once, then moves on.

---

## Pain points with conventional web design

Each of these is something she encounters regularly, mapped to the wireframe decision
that addresses it.

| # | Pain point                                                                                                                 | Impact on Onalerona                                                                            | Wireframe response                                                    |
| - | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1 | **Placeholder-only inputs** (no visible or programmatic label)                                                             | NVDA announces "edit, blank." She doesn't know what to type                                 | Every input has a real `<label for>`; **no placeholders at all**      |
| 2 | **Links labelled "Click here" / "Read more"** repeated many times                                                          | The Elements List shows twelve identical links                                              | Link text is unique and self-describing, e.g. "Introduction to Bookkeeping" |
| 3 | **No landmarks**, everything is `<div>`                                                                                    | Cannot jump to main content; hears the entire header every page                             | `header`, `nav`, `main`, `aside`, `footer`, plus a **skip link**      |
| 4 | **Skipped or decorative heading levels** (an `<h4>` chosen because it "looks smaller")                                     | Her outline map is wrong and misleading                                                     | Strict `h1 > h2 > h3`; sizes controlled by CSS, not heading level     |
| 5 | **Silent results**: filtering a list updates the page but announces nothing                                                | She doesn't know if her filter worked                                                       | Result count is in its own element, ready to become an `aria-live` region in React |
| 6 | **Custom date pickers and dropdowns** built from `<div>`s                                                                  | Often completely unreachable by keyboard                                                    | Native `<input type="date">`, `<select>`, `<input type="checkbox">`   |
| 7 | **Focus stolen or lost** (a modal opens but focus stays behind it)                                                         | She is typing into a page she can't hear                                                    | Wireframes use no modals; the React phase manages focus with `useRef` |
| 8 | **Errors shown only in red text**                                                                                          | The colour is invisible to her; the message is never announced                              | Wireframe reserves an error summary pattern with text and a heading   |
| 9 | **Session timeouts** on booking forms                                                                                      | She reads slowly and types carefully, so she gets logged out                                | No timeout in the prototype; documented as a requirement (WCAG 2.2.1) |
| 10 | **PDF-only timetables or event lists**                                                                                    | Inaccessible or unreadable depending on the PDF                                             | All schedule information is real HTML text                            |

---

## Goals

### Primary goals

1. **Find a bookable, quiet study room** that has the features she needs
2. **Search the course catalog and learning archive** for bookkeeping and digital literacy material, filter by format (course, archive, workshop), and open a result.
3. **Register for a free evening workshop** and know, without ambiguity, that the registration succeeded.

### Secondary goals

- Check opening hours without calling the library.
- Find a human to contact when the online form can't help.

### Success looks like

- She completes a room reservation **without help and without a mouse** in under five
  minutes.
- She never has to ask "did that work?"
- She never has to re-enter information because of an inaccessible error.

---

## A typical scenario

> It is Tuesday evening. Onalerona has an assessment in nine days and her flat is noisy.
>
> She opens the library website in Firefox and her NVDA announces the page title: *"Riverside Community Library: Learn, borrow, and book."*
>
> She presses `Tab` once and hears **"Skip to main content, link."** She presses `Enter`.
>
> She hears the `<h1>`, then presses `K` to scan links and hears **"Reserve a study room."**
> She activates it.
> On the booking page she presses `1` and hears **"Reserve Study Room 2."**
> She presses `D` and hears the landmarks: *banner, navigation, main, complementary, content info.*
> She presses `F`. NVDA says **"Date, required, edit, date picker. Format: choose a date up to 28 days ahead."**
> She works down the form with `Tab`. When she misses the start time, the page tells her so in plain words, moves her to the first problem, and she corrects it.
> She submits and hears a confirmation heading with the booking reference.
> Total mouse clicks: zero.

---

## Design implications

### Structural (HTML)

- Use **all** structural landmarks, labelled where there is more than one of a kind (`<nav aria-label="Main">`, `<nav aria-label="Breadcrumb">`).
- One `<h1>` per page; headings nest without skipping levels.
- A **skip link** is the first focusable element on every page.
- Content order in the DOM *is* the reading order; CSS must not re-order it visually in
  a way that conflicts.
- Use **native controls** whenever one exists. They come with keyboard behaviour, roles,
  and states free of charge.

### Visual (CSS), covering the needs this persona can't speak for

These rules cover other users in the same population:
- **Magnifier users:** `rem` units, a fluid single-column layout that reflows at 320px wide, and generous line spacing.
- **Keyboard-only motor users:** a very visible `:focus-visible` ring and large (minimum 44 px) click and tap targets with spacing between them.
- **Low-vision users without a screen reader:** at least 4.5:1 contrast for text, at least 3:1 for UI borders and focus indicators, and **no meaning conveyed by colour alone**.

### Behavioural (React, later phases)

- Any state change that updates content **without a page load** (filtering, validation, booking confirmation) must be announced through a live region and must keep focus somewhere predictable.
- Errors must name the field, say what went wrong, and say how to fix it.