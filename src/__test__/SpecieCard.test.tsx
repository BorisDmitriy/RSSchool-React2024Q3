import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { debug } from 'jest-preview';
import SpecieCard from '../components/SpeciesList';
import { OneSpecie } from '../types/Types';

describe('SpecieCard Component', () => {
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
  ];

  it('displays an appropriate message if no data', () => {
    render(
      <MemoryRouter>
        <SpecieCard species={[]} />
      </MemoryRouter>,
    );
    debug();

    const message = screen.getByText(/data not found/i);

    expect(message).toBeInTheDocument();
  });

  it('correct data displayed', () => {
    render(
      <MemoryRouter>
        <SpecieCard species={mockSpecies} />
      </MemoryRouter>,
    );
    debug();

    const message = screen.getByText(/Name: Specie 1/i);
    expect(message).toBeInTheDocument();
  });
});
