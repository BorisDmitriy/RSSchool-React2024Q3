import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlyoutElement from '../components/FlyoutElement';
import ThemeContext from '../components/contex/ThemeContext';
import * as reduxHooks from '../redux/hooks';
import * as selectedItemsSpeciesActions from '../redux/selectedItemsSpeciesSlice';

jest.mock('../redux/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;

describe('FlyoutElement', () => {
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;
  const mockDispatch = jest.fn();
  const mockSelectedItemsData = [
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

  beforeEach(() => {
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue(
      mockSelectedItemsData,
    );
    (reduxHooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();

    global.URL.createObjectURL = jest.fn(() => 'http://example.com/mockUrl');
    global.URL.revokeObjectURL = jest.fn();
  });

  it('renders with dark theme', () => {
    const { container } = render(
      <ThemeContext.Provider value>
        <FlyoutElement />
      </ThemeContext.Provider>,
    );
    expect(container.firstChild).toHaveClass('dark-theme');
  });

  it('renders with visible class when items are selected', () => {
    const { container } = render(<FlyoutElement />);
    expect(container.firstChild).toHaveClass('visible');
  });

  it('renders with hidden class when no items are selected', () => {
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue([]);
    const { container } = render(<FlyoutElement />);
    expect(container.firstChild).toHaveClass('hidden');
  });

  it('dispatches clearSpecieList action on clear button click', () => {
    const { getByText } = render(<FlyoutElement />);
    const clearButton = getByText(/Unselect all/i);
    fireEvent.click(clearButton);
    expect(mockDispatch).toHaveBeenCalledWith(
      selectedItemsSpeciesActions.clearSpecieList(),
    );
  });

  it('creates a CSV data URL when items are selected', () => {
    const { getByText } = render(<FlyoutElement />);
    const downloadLink = getByText(/Download/i);
    expect(downloadLink.getAttribute('href')).toBeTruthy();
    expect(downloadLink.getAttribute('download')).toContain('_species.csv');
  });

  afterAll(() => {
    global.URL.createObjectURL = originalCreateObjectURL;
    global.URL.revokeObjectURL = originalRevokeObjectURL;
  });
});
