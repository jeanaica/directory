import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header component', () => {
  test('it renders', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(container.firstChild).toHaveClass('bg-accent drop-shadow-md');
  });
});
