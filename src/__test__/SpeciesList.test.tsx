import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { OneSpecie } from '../types/Types';
import SpeciesList from '../components/SpeciesList';
import ThemeContext from '../components/contex/ThemeContext';
import currentPageSpeciesSlice, {
  addCurrentPageSpecies,
} from '../redux/currentPageSpeciesSlice';
import selectedItemsSpeciesSlice from '../redux/selectedItemsSpeciesSlice';

const store = configureStore({
  reducer: {
    currentPageSpecies: currentPageSpeciesSlice,
    selectedItemsSpecies: selectedItemsSpeciesSlice,
  },
});

const mockCurrentPageData: OneSpecie[] = [
  {
    name: 'Specie 1',
    url: 'http://example.com/species/1/',
    classification: '',
    designation: '',
    average_height: '',
    skin_colors: '',
    hair_colors: '',
    eye_colors: '',
    average_lifespan: '',
    homeworld: '',
    language: '',
    people: [],
    films: [],
    created: '',
    edited: '',
  },
  {
    name: 'Specie 2',
    url: 'http://example.com/species/2/',
    classification: '',
    designation: '',
    average_height: '',
    skin_colors: '',
    hair_colors: '',
    eye_colors: '',
    average_lifespan: '',
    homeworld: '',
    language: '',
    people: [],
    films: [],
    created: '',
    edited: '',
  },
  {
    name: 'Specie 3',
    url: 'http://example.com/species/3/',
    classification: '',
    designation: '',
    average_height: '',
    skin_colors: '',
    hair_colors: '',
    eye_colors: '',
    average_lifespan: '',
    homeworld: '',
    language: '',
    people: [],
    films: [],
    created: '',
    edited: '',
  },
];

store.dispatch(
  addCurrentPageSpecies({
    results: mockCurrentPageData,
    count: 10,
    next: 'next url',
    previous: null,
  }),
);

const renderWithProviders = (
  component: React.ReactElement,
  { darkTheme = false } = {},
) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeContext.Provider value={darkTheme}>
          {component}
        </ThemeContext.Provider>
      </MemoryRouter>
    </Provider>,
  );

describe('SpeciesList', () => {
  it('renders correctly with theme', () => {
    const { container } = renderWithProviders(<SpeciesList />, {
      darkTheme: true,
    });
    expect(container.firstChild).toHaveClass('dark-theme');
  });

  it('displays message when no data is found', () => {
    // Dispatch an action to clear the list
    store.dispatch(
      addCurrentPageSpecies({
        results: [],
        count: 0,
        next: null,
        previous: null,
      }),
    );
    const { getByText } = renderWithProviders(<SpeciesList />);
    expect(getByText(/data not found/i)).toBeInTheDocument();
  });

  it('renders SpecieItem components for each specie in the data', () => {
    // Reset the preloaded state to have the mock data
    store.dispatch(
      addCurrentPageSpecies({
        results: mockCurrentPageData,
        count: 10,
        next: null,
        previous: null,
      }),
    );
    const { getAllByTestId } = renderWithProviders(<SpeciesList />);
    const specieItems = getAllByTestId('item-link');
    expect(specieItems.length).toBe(mockCurrentPageData.length);
  });
});
