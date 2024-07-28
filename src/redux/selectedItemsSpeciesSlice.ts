import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OneSpecie } from '../types/Types';

type SpeciesState = {
  list: OneSpecie[];
};
const initialState: SpeciesState = {
  list: [],
};

const selectedItemsSpeciesSlice = createSlice({
  name: 'selectedItemsSpecies',
  initialState,
  reducers: {
    addSpecie(state, action: PayloadAction<OneSpecie>) {
      // add element in list
      state.list.push(action.payload);
    },
    removeSpecie(state, action: PayloadAction<string>) {
      // find element and then remove hin from list
      const index = state.list.findIndex(
        (item) => item.name === action.payload,
      );
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
    clearSpecieList(state) {
      // Clear the list
      state.list.splice(0, state.list.length);
    },
  },
});
export const { addSpecie, removeSpecie, clearSpecieList } =
  selectedItemsSpeciesSlice.actions;

export default selectedItemsSpeciesSlice.reducer;
