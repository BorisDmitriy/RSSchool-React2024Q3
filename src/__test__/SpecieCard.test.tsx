import React from 'react';
import { render } from '@testing-library/react';
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useGetOneSpecieQuery } from '../redux';
import SpecieCard from '../components/SpecieCard';
import ThemeContext from '../components/contex/ThemeContext';
import currentPageSpeciesSlice from '../redux/currentPageSpeciesSlice';
import selectedItemsSpeciesSlice from '../redux/selectedItemsSpeciesSlice';

// Mock the hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));
jest.mock('../redux', () => ({
  useGetOneSpecieQuery: jest.fn(),
}));

const store = configureStore({
  reducer: {
    currentPageSpecies: currentPageSpeciesSlice,
    selectedItemsSpecies: selectedItemsSpeciesSlice,
  },
});

const renderWithProviders = (
  component: React.ReactElement,
  { darkTheme = false, initialEntries = ['/specie/1'] } = {},
) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeContext.Provider value={darkTheme}>
          <Routes>
            <Route path="/specie/:id" element={component} />
          </Routes>
        </ThemeContext.Provider>
      </MemoryRouter>
    </Provider>,
  );

describe('SpecieCard', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useLocation as jest.Mock).mockReturnValue({
      search: '?query=example',
    });
  });

  it('renders loader when data is loading', () => {
    (useGetOneSpecieQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isFetching: false,
      isError: false,
      data: undefined,
    });
    const { getByTestId } = renderWithProviders(<SpecieCard />);
    expect(getByTestId('card-loader')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    (useGetOneSpecieQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: true,
      data: undefined,
    });
    const { getByText } = renderWithProviders(<SpecieCard />);
    expect(getByText(/Data not found/i)).toBeInTheDocument();
  });

  it('renders specie information when data is available', () => {
    const mockData = {
      name: 'Human',
      classification: 'Mammal',
      designation: 'Sentient',
      average_height: '180',
      skin_colors: 'caucasian, black, asian, hispanic',
      hair_colors: 'blonde, brown, black, red',
      eye_colors: 'brown, blue, green, hazel',
      average_lifespan: '120',
      homeworld: 'Earth',
      language: 'Galactic Basic',
      people: [],
      films: [],
      created: '',
      edited: '',
      url: 'http://swapi.dev/api/species/1/',
    };

    (useGetOneSpecieQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      data: mockData,
    });

    const { getByText } = renderWithProviders(<SpecieCard />);
    expect(getByText(/Name: Human/i)).toBeInTheDocument();
    expect(getByText(/Classification: Mammal/i)).toBeInTheDocument();
  });
});
