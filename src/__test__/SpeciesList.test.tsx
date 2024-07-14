import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SpeciesList from '../components/SpeciesList';
import { OneSpecie } from '../types/Types';

describe('SpeciesList Component', () => {
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
    render(
      <MemoryRouter>
        <SpeciesList species={mockSpecies} />
      </MemoryRouter>,
    );

    const cards = screen.getAllByRole('link');

    expect(cards).toHaveLength(mockSpecies.length + 1);
  });
});

it('displays an appropriate message if no cards are present', () => {
  render(
    <MemoryRouter>
      <SpeciesList species={[]} />
    </MemoryRouter>,
  );

  const message = screen.getByText(/data not found/i);

  expect(message).toBeInTheDocument();
});
