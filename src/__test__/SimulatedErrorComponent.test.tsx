import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import SimulatedErrorComponent from '../components/SimulatedErrorComponent';
import ThemeContext from '../components/contex/ThemeContext';

describe('SimulatedErrorComponent', () => {
  it('throws an error when the button is clicked', () => {
    const { getByRole } = render(
      <ThemeContext.Provider value={false}>
        <SimulatedErrorComponent />
      </ThemeContext.Provider>,
    );

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      fireEvent.click(getByRole('button'));
    }).toThrow('Simulated error for testing Error Boundaries');

    consoleSpy.mockRestore();
  });

  it('applies dark theme class when darkTheme is true', () => {
    const { getByRole } = render(
      <ThemeContext.Provider value>
        <SimulatedErrorComponent />
      </ThemeContext.Provider>,
    );

    expect(getByRole('button')).toHaveClass('dark-theme');
  });

  it('does not apply dark theme class when darkTheme is false', () => {
    const { getByRole } = render(
      <ThemeContext.Provider value={false}>
        <SimulatedErrorComponent />
      </ThemeContext.Provider>,
    );

    expect(getByRole('button')).not.toHaveClass('dark-theme');
  });
});
