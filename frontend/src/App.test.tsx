import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const releases = ['Blue Hour', 'Soft Signals', 'Night Bloom'];

afterEach(() => cleanup());

describe('Music Corner storefront', () => {
  it('identifies the store and presents the welcome message and collection link', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /music corner home/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Welcome to Music Corner.' })).toBeInTheDocument();
    expect(screen.getByText('A small collection of records for the songs that stay with you.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore cds/i })).toHaveAttribute('href', '#collection');
  });

  it('shows exactly three illustrative releases with each title, artist, and price', () => {
    render(<App />);
    const collection = screen.getByRole('region', { name: 'Three to start with.' });
    const cards = within(collection).getAllByRole('article');

    expect(cards).toHaveLength(3);
    for (const title of releases) {
      expect(within(collection).getByRole('heading', { name: title })).toBeInTheDocument();
    }
    expect(within(collection).getByText('Mira Vale')).toBeInTheDocument();
    expect(within(collection).getByText('The Paper Satellites')).toBeInTheDocument();
    expect(within(collection).getByText('June Arcade')).toBeInTheDocument();
    expect(within(collection).getByText('$18.00')).toBeInTheDocument();
    expect(within(collection).getByText('$21.00')).toBeInTheDocument();
    expect(within(collection).getByText('$16.00')).toBeInTheDocument();
    expect(within(collection).getByText(/fictional examples/i)).toBeInTheDocument();
  });

  it('displays fictional contact details and explanatory demo status', () => {
    render(<App />);

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText(/14 Sample Street/)).toBeInTheDocument();
    expect(within(footer).getByText(/Monday - Saturday/)).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: 'hello@musiccorner.example' })).toHaveAttribute('href', 'mailto:hello@musiccorner.example');
    expect(within(footer).getByText(/Fictional demo store details/)).toBeInTheDocument();
  });

  it('provides a labeled email field that accepts text without a submission action', async () => {
    const user = userEvent.setup();
    render(<App />);

    const email = screen.getByRole('textbox', { name: 'Your email address' });
    await user.type(email, 'listener@example.com');

    expect(email).toHaveValue('listener@example.com');
    expect(email).toHaveAttribute('type', 'email');
    expect(screen.getByText(/does not subscribe or send anything/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /subscribe|sign up|send/i })).not.toBeInTheDocument();
  });

  it('keeps the collection destination present for keyboard and direct navigation', () => {
    render(<App />);

    const link = screen.getByRole('link', { name: /explore cds/i });
    link.focus();
    expect(link).toHaveFocus();
    expect(document.querySelector('#collection')).toBeInTheDocument();
  });
});
