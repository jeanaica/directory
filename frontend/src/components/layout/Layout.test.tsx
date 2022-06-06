import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout component', () => {
  test('it renders Header', () => {
    const { container } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(container.firstChild?.firstChild).toHaveClass('bg-accent');
  });

  test('it renders Content', () => {
    const { container } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(container.firstChild?.childNodes[1]).toHaveClass('overflow-y-auto');
  });

  test('it renders Footer', () => {
    const { container } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(container.firstChild?.lastChild).toHaveClass('bg-accent-500 p-4');
  });
});
