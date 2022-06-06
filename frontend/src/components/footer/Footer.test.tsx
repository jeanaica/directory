import { render, screen, waitFor } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('it renders', async () => {
    const year = new Date().getFullYear();

    render(<Footer />);

    const copyright = await waitFor(() =>
      screen.getByText(`Copyright © ${year} Jeanaica Suplido.`)
    );

    expect(copyright).toBeVisible();
  });
});
