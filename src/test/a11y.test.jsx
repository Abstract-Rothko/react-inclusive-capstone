import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";
import { AnnouncerProvider } from "../context/AnnouncerContext";
import SearchPage from "../pages/SearchPage";
import ReservePage from "../pages/ReservePage";

const wrap = ui => render(
    <MemoryRouter>
        <AnnouncerProvider>
            {ui}
        </AnnouncerProvider>
    </MemoryRouter>
);

test('search page has no axe violations', async () => {
    const {container} = wrap(<SearchPage />);
    expect(await axe(container)).toHaveNoViolations();
});

test('accordion toggles aria-expanded', async () => {
    wrap(<SearchPage />);
    const btn = screen.getByRole('button', {name: /category/i});
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    btn.focus(); await userEvent.keyboard('{Event}');
    expect(btn).toHaveAttribute('aria-expanded', 'true');
});

test('category toggle updates aria-pressed', async () => {
    wrap(<SearchPage />);
    const chip = screen.getByRole('button', {name: /courses/i});
    expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    expect(chip).toHaveAttribute('aria-pressed', 'true');
});

test('failed submit sets aria-invalid and focuses the error summary', async () => {
    wrap(<ReservePage />);
    await userEvent.click(screen.getByRole('button', {name:/reserve room/i}));
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('heading', {name: /problems with your booking/i}).parentElement).toHaveFocus();
});