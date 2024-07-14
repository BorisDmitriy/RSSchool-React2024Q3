import getAllSpeciesAPI from '../api/getAllSpeciesAPI';
import { OneSpecie } from '../types/Types';

jest.mock('../api/getAllSpeciesAPI', () =>
  jest.fn(
    (): Promise<OneSpecie[]> =>
      Promise.resolve([
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
          language: 'various',
          people: [],
          films: [],
          created: '2023-01-01T00:00:00Z',
          edited: '2023-01-01T00:00:00Z',
          url: 'http://swapi.dev/api/species/1/',
        },
        {
          name: 'Human2',
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
          url: 'http://swapi.dev/api/species/2/',
        },
      ]),
  ),
);

describe('getAllSpeciesAPI', () => {
  it('fetches and returns all species data', async () => {
    const result = await getAllSpeciesAPI();

    const expectedResults: OneSpecie[] = [
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
        language: 'various',
        people: [],
        films: [],
        created: '2023-01-01T00:00:00Z',
        edited: '2023-01-01T00:00:00Z',
        url: 'http://swapi.dev/api/species/1/',
      },
      {
        name: 'Human2',
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
        url: 'http://swapi.dev/api/species/2/',
      },
    ];

    expect(result).toEqual(expectedResults);
    expect(getAllSpeciesAPI).toHaveBeenCalled();
  });
});
