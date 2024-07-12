import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SpecieItem from '../components/SpecieItem';

// Mock data based on the OneSpecie interface
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

// Mocking useLocation and NavLink using jest.mock if needed
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search: '?some=search-string',
  }),
  NavLink: jest
    .fn()
    .mockImplementation(({ children, ...props }) =>
      typeof children === 'function'
        ? children({ isActive: false, ...props })
        : children,
    ),
}));

describe('SpecieItem Component', () => {
  it('renders the relevant card which has the species details', () => {
    render(
      <MemoryRouter>
        <SpecieItem specieData={mockSpecieData} id="1" />
      </MemoryRouter>,
    );

    // Assertions to check if the text content is present
    expect(screen.getByText(/Name: Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Classification: Mammal/i)).toBeInTheDocument();
    expect(screen.getByText(/Designation: Sentient/i)).toBeInTheDocument();
  });
});
