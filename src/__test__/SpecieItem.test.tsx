import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import * as reduxHooks from '../redux/hooks';
import ThemeContext from '../components/contex/ThemeContext';
import SpecieItem from '../components/SpecieItem';

// Mocking Next.js router functions
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
  }),
}));

// Mocking Redux hooks
jest.mock('../redux/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('SpecieItem', () => {
  const specieData = {
    name: 'Human',
    classification: 'Mammal',
    designation: 'Sentient',
    average_height: '180',
    skin_colors: 'caucasian, black, asian, hispanic',
    hair_colors: 'blonde, brown, black, red',
    eye_colors: 'brown, blue, green, hazel',
    average_lifespan: '120',
    homeworld: 'Earth',
    language: 'English',
    people: ['/people/1', '/people/2'],
    films: ['/films/1', '/films/2'],
    created: '2014-12-10T16:44:31.486000Z',
    edited: '2014-12-20T21:36:42.142000Z',
    url: '/species/1',
  };
  const id = '1';

  // Mock implementations for Redux hooks
  const mockDispatch = jest.fn();
  (reduxHooks.useAppDispatch as jest.Mock).mockImplementation(
    () => mockDispatch,
  );
  (reduxHooks.useAppSelector as jest.Mock).mockImplementation(() => [
    { name: 'Human' },
  ]);

  it('should display specie data', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={false}>
        <SpecieItem specieData={specieData} id={id} />
      </ThemeContext.Provider>,
    );

    expect(getByText(`Name: ${specieData.name}`)).toBeInTheDocument();
    expect(
      getByText(`Classification: ${specieData.classification}`),
    ).toBeInTheDocument();
    expect(
      getByText(`Designation: ${specieData.designation}`),
    ).toBeInTheDocument();
  });

  it('should apply dark theme class when context is true', () => {
    const { container } = render(
      <ThemeContext.Provider value>
        <SpecieItem specieData={specieData} id={id} />
      </ThemeContext.Provider>,
    );

    expect(container.firstChild).toHaveClass('dark-theme');
  });
});
