import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import useBodyClass from '../components/useBodyClass';

type TestComponentProps = {
  className: string;
  condition: boolean;
};

function TestComponent({ className, condition }: TestComponentProps) {
  useBodyClass(className, condition);
  return <div />;
}

describe('useBodyClass', () => {
  const classNameTest = 'test-class';

  afterEach(() => {
    document.body.classList.remove(classNameTest);
    cleanup();
  });

  it('adds the class to the body when condition is true', () => {
    render(<TestComponent className={classNameTest} condition />);
    expect(document.body.classList.contains(classNameTest)).toBe(true);
  });

  it('removes the class from the body when condition is false', () => {
    render(<TestComponent className={classNameTest} condition={false} />);
    expect(document.body.classList.contains(classNameTest)).toBe(false);
  });

  it('cleans up by removing the class when the component using the hook unmounts', () => {
    const { unmount } = render(
      <TestComponent className={classNameTest} condition />,
    );
    expect(document.body.classList.contains(classNameTest)).toBe(true);

    unmount();
    expect(document.body.classList.contains(classNameTest)).toBe(false);
  });
});
