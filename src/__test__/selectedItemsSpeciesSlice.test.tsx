import selectedItemsSpeciesSlice, {
  addSpecie,
  removeSpecie,
  clearSpecieList,
} from '../redux/selectedItemsSpeciesSlice';
import { OneSpecie } from '../types/Types';

type SpeciesState = {
  list: OneSpecie[];
};

const initialState: SpeciesState = {
  list: [],
};

const oneSpecieItem: OneSpecie = {
  name: 'test',
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
  url: '',
};

describe('selectedItemsSpeciesSlice tests', () => {
  it('init state', () => {
    const result = selectedItemsSpeciesSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should add new item', () => {
    const action = { type: addSpecie.type, payload: oneSpecieItem };

    const result = selectedItemsSpeciesSlice(initialState, action);

    expect(result.list[0].name).toEqual('test');
  });

  it('should remove one item', () => {
    const listWithOneSpecie = {
      list: [oneSpecieItem],
    };
    const action = { type: removeSpecie.type, payload: 'test' };

    const result = selectedItemsSpeciesSlice(listWithOneSpecie, action);

    expect(result).toEqual(initialState);
  });

  it('should clearSpecieList', () => {
    const listWithThreeSpecies = {
      list: [oneSpecieItem, oneSpecieItem, oneSpecieItem],
    };
    const action = { type: clearSpecieList.type };

    const result = selectedItemsSpeciesSlice(listWithThreeSpecies, action);

    expect(result).toEqual(initialState);
  });
});
