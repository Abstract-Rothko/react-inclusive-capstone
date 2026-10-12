import { screen, waitFor, within } from '@testing-library/react';
import { politeRegion, renderApp } from './helpers';

const nextMonday = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    while (date.getDay() !== 1) date.setDate(date.getDate() + 1);
    const pad = value => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const submit = user => user.click(screen.getByRole('button', { name: /reserve room/i }));

describe('booking form', () => {
    it('renders the room options (regression: select had no children)', () => {
        renderApp('/reserve');
        const select = screen.getByRole('combobox', { name: /^room/i });
        expect(within(select).getAllByRole('option').length).toBeGreaterThan(1);
    });

    it('associates every control with a label and keeps hints in aria-describedby', () => {
        renderApp('/reserve');
        const date = screen.getByLabelText(/^date/i);
        expect(date).toHaveAccessibleDescription(/closed on sundays/i);
        expect(screen.getByLabelText(/full name/i)).toHaveAccessibleDescription(/library card/i);
        expect(screen.getByLabelText(/email address/i)).toHaveAttribute('autocomplete', 'email');
    });

    it('names the time slot radios by their fieldset legend', () => {
        renderApp('/reserve');
        const group = screen.getByRole('group', { name: /time slot/i });
        expect(within(group).getAllByRole('radio')).toHaveLength(4);
        expect(group).toHaveAccessibleDescription(/two-hour blocks/i);
    });

    it('sets aria-invalid, links error text and focuses the summary on a failed submit', async () => {
        const { user } = renderApp('/reserve');
        await submit(user);

        const summary = screen.getByRole('region', { name: /problems with your booking/i });
        expect(summary).toHaveFocus();

        const name = screen.getByLabelText(/full name/i);
        expect(name).toHaveAttribute('aria-invalid', 'true');
        expect(name).toHaveAccessibleDescription(/enter your full name/i);

        const email = screen.getByLabelText(/email address/i);
        expect(email).toHaveAccessibleDescription(/name@example.com/i);
        expect(within(summary).getAllByRole('link').length).toBeGreaterThanOrEqual(4);
    });

    it('moves focus to the field when a summary link is activated with the keyboard', async () => {
        const { user } = renderApp('/reserve');
        await submit(user);
        const link = within(screen.getByRole('region', { name: /problems/i })).getByRole('link', { name: /full name/i });
        link.focus();
        await user.keyboard('{Enter}');
        expect(screen.getByLabelText(/full name/i)).toHaveFocus();
    });

    it('shows the email error inline (regression: key mismatch hid it)', async () => {
        const { user } = renderApp('/reserve');
        await user.type(screen.getByLabelText(/email address/i), 'nope');
        await user.tab();
        expect(screen.getByLabelText(/email address/i)).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByText(/enter an email address like/i)).toBeInTheDocument();
    });

    it('announces a field error politely when focus leaves an invalid field', async () => {
        const { user } = renderApp('/reserve');
        await user.click(screen.getByLabelText(/full name/i));
        await user.tab();
        await waitFor(() => expect(politeRegion()).toHaveTextContent(/enter your full name/i));
    });

    it('clears the error as soon as the value becomes valid', async () => {
        const { user } = renderApp('/reserve');
        const name = screen.getByLabelText(/full name/i);
        await user.click(name);
        await user.tab();
        expect(name).toHaveAttribute('aria-invalid', 'true');
        await user.type(name, 'Ona Jacobs');
        expect(name).not.toHaveAttribute('aria-invalid');
    });

    it('rejects too many people for the chosen room with a fixable message', async () => {
        const { user } = renderApp('/reserve?room=study-room-1');
        await user.selectOptions(screen.getByLabelText(/number of people/i), '5');
        await user.tab();
        expect(screen.getByText(/study room 1 seats up to 4 people/i)).toBeInTheDocument();
    });

    it('prefills the room from the query string', () => {
        renderApp('/reserve?room=community-hall');
        expect(screen.getByRole('combobox', { name: /^room/i })).toHaveValue('community-hall');
    });

    it('completes a booking by keyboard and returns focus to the page heading', async () => {
        const { user } = renderApp('/reserve');

        await user.type(screen.getByLabelText(/full name/i), 'Onalerona Jacobs');
        await user.type(screen.getByLabelText(/email address/i), 'ona@example.com');
        await user.selectOptions(screen.getByLabelText(/^room/i), 'study-room-2');
        await user.type(screen.getByLabelText(/^date/i), nextMonday());
        await user.click(screen.getByLabelText('09:00 to 11:00'));

        const button = screen.getByRole('button', { name: /reserve room/i });
        button.focus();
        await user.keyboard('{Enter}');

        const dialog = await screen.findByRole('dialog', { name: /booking confirmed/i });
        expect(dialog).toHaveAccessibleDescription(/study room 2/i);

        const done = within(dialog).getByRole('button', { name: /done/i });
        done.focus();
        await user.keyboard(' ');

        await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: /reserve a room/i })).toHaveFocus());
        expect(screen.getByLabelText(/full name/i)).toHaveValue('');
    });
});