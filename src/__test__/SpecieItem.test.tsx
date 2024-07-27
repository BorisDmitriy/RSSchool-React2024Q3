import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import selectedItemsSpeciesSlice from '../redux/selectedItemsSpeciesSlice';
import SpecieItem from '../components/SpecieItem';
import ThemeContext from '../components/contex/ThemeContext';

const store = configureStore({
  reducer: {
    selectedItemsSpecies: selectedItemsSpeciesSlice,
  },
});

const mockSpecieData = {
  name: 'Human',
  classification: 'Mammal',
  designation: 'Sentient',
  average_height: '180',
  skin_colors: 'caucasian, black, asian, hispanic',
  hair_colors: 'blonde, brown, black, red',
  eye_colors: 'brown, blue, green, hazel',
  average_lifespan: '120',
  homeworld: 'Earth',
  language: 'various',
  people: [],
  films: [],
  created: '2023-01-01T00:00:00Z',
  edited: '2023-01-01T00:00:00Z',
  url: 'http://swapi.dev/api/species/1/',
};

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

describe('SpecieItem', () => {
  it('renders correctly without dark theme', () => {
    const { getByText } = renderWithProviders(
      <SpecieItem specieData={mockSpecieData} id="1" />,
    );
    expect(getByText(/Human/i).parentNode).not.toHaveClass('dark-theme');
  });

  it('navigates to correct path on click', () => {
    const { getByTestId } = renderWithProviders(
      <SpecieItem specieData={mockSpecieData} id="1" />,
    );
    const linkElement = getByTestId('item-link');
    expect(linkElement.getAttribute('href')).toBe('/specie/1');
  });

  it('checkbox toggles selection status', () => {
    const { getByLabelText } = renderWithProviders(
      <SpecieItem specieData={mockSpecieData} id="1" />,
    );
    const checkbox = getByLabelText(/select/i) as HTMLInputElement;

    expect(checkbox.checked).toEqual(false);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toEqual(true);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toEqual(false);
  });
});
