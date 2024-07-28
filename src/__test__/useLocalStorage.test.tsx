import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import useLocalStorage from '../components/useLocalStorage';

type TestComponentProps = {
  storageKey: string;
  initialValue: string;
};

function TestComponent({ storageKey, initialValue }: TestComponentProps) {
  const [value, setValue] = useLocalStorage(storageKey, initialValue);
  return (
    <div>
      <span data-testid="value">{value}</span>
      <button type="button" onClick={() => setValue('newValue')}>
        Set Value
      </button>
    </div>
  );
}

describe('useLocalStorage', () => {
  const storageKey = 'testKey';
  const initialValue = 'initialValue';

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('retrieves an existing value from localStorage', () => {
    window.localStorage.setItem(storageKey, JSON.stringify('existingValue'));
    const { getByTestId } = render(
      <TestComponent storageKey={storageKey} initialValue={initialValue} />,
    );
    expect(getByTestId('value').textContent).toBe('existingValue');
  });

  it('sets a new value in localStorage', () => {
    const { getByTestId, getByRole } = render(
      <TestComponent storageKey={storageKey} initialValue={initialValue} />,
    );
    fireEvent.click(getByRole('button'));
    expect(getByTestId('value').textContent).toBe('newValue');
    expect(window.localStorage.getItem(storageKey)).toBe(
      JSON.stringify('newValue'),
    );
  });

  it('uses initialValue if there is no value in localStorage', () => {
    const { getByTestId } = render(
      <TestComponent storageKey={storageKey} initialValue={initialValue} />,
    );
    expect(getByTestId('value').textContent).toBe(initialValue);
  });
});
