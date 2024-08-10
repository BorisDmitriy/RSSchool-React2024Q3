import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ThemeContext from '../components/contex/ThemeContext';
import SpeciesList from '../components/SpeciesList';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => '/test-path'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe('SpeciesList', () => {
  const mockDataSpecies = {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
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
      },
    ],
  };

  it('renders a list of SpecieItem components', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={false}>
          <SpeciesList dataSpecies={mockDataSpecies} />
        </ThemeContext.Provider>
      </Provider>,
    );

    expect(getAllByTestId('specie-item').length).toBe(
      mockDataSpecies.results.length,
    );
  });

  it('should display "data not found" when results array is empty', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={false}>
          <SpeciesList dataSpecies={{ ...mockDataSpecies, results: [] }} />
        </ThemeContext.Provider>
      </Provider>,
    );

    expect(getByText('data not found')).toBeInTheDocument();
  });
});
