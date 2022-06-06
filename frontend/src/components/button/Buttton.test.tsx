import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Button from './Button';

const handleButtonClick = jest.fn();

describe('Button component', () => {
  let sampleText: HTMLElement;

  beforeEach(async () => {
    render(
      <Button
        onClick={handleButtonClick}
        type='submit'>
        SAMPLE
      </Button>
    );

    sampleText = await waitFor(() => screen.getByText('SAMPLE'));
  });

  afterEach(cleanup);

  test('it renders', async () => {
    expect(sampleText).toBeVisible();
    expect(sampleText).toHaveAttribute('type', 'submit');
  });

  test('it should call onClick', async () => {
    fireEvent.click(sampleText);
    expect(handleButtonClick).toHaveBeenCalled();
  });
});
