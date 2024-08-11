import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import SpecieCard from '../components/SpecieCard';
import ThemeContext from '../components/contex/ThemeContext';

// Mock the useRouter hook from Next.js
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      query: { id: '', search: '', page: '1' },
    };
  },
}));

describe('SpecieCard', () => {
  const idData = {
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

  it('should display data when idData is provided', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={false}>
        <SpecieCard idData={idData} />
      </ThemeContext.Provider>,
    );

    expect(getByText(`Name: ${idData.name}`)).toBeInTheDocument();
    expect(
      getByText(`Classification: ${idData.classification}`),
    ).toBeInTheDocument();
    expect(getByText(`Designation: ${idData.designation}`)).toBeInTheDocument();
    expect(
      getByText(`Average height: ${idData.average_height}`),
    ).toBeInTheDocument();
  });

  it('should display "Data not found" when idData is not provided', () => {
    const idDataNotFound = {
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
      detail: 'Data not found',
    };

    const { getByText } = render(
      <ThemeContext.Provider value={false}>
        <SpecieCard idData={idDataNotFound} />
      </ThemeContext.Provider>,
    );

    expect(getByText('Data not found')).toBeInTheDocument();
  });

  it('should apply dark theme class when context is true', () => {
    const { container } = render(
      <ThemeContext.Provider value>
        <SpecieCard idData={idData} />
      </ThemeContext.Provider>,
    );

    expect(container.firstChild).toHaveClass('dark-theme');
  });
});
