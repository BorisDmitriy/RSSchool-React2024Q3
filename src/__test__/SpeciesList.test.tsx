import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SpeciesList from '../components/SpeciesList';
import { OneSpecie } from '../types/Types';

describe('SpeciesList Component', () => {
  // Mock data for our tests
  const mockSpecies: OneSpecie[] = [
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

  it('renders the specified number of cards', () => {
    // Render the SpeciesList component with mockSpecies as props
    render(
      <MemoryRouter>
        <SpeciesList species={mockSpecies} />
      </MemoryRouter>,
    );

    // Find all elements with role 'link' (since each card is wrapped in a Link component)
    const cards = screen.getAllByRole('link');

    // Assert that the number of rendered cards matches the number of mockSpecies
    expect(cards).toHaveLength(mockSpecies.length + 1);
  });

  // Additional tests can be added here
});

it('displays an appropriate message if no cards are present', () => {
  // Render the SpeciesList component with an empty array as props
  render(
    <MemoryRouter>
      <SpeciesList species={[]} />
    </MemoryRouter>,
  );

  // Find the element with the text 'data not found'
  const message = screen.getByText(/data not found/i);
  // Assert that the message is in the document
  expect(message).toBeInTheDocument();
});
