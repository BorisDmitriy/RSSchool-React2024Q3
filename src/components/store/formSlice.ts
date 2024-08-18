import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormEntry, FormState } from '../../types/types';

const initialState: FormState = {
  entries: [],
  lastAdded: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormEntry>) => {
      state.entries.push(action.payload);
      // eslint-disable-next-line no-param-reassign
      state.lastAdded = action.payload;
    },
  },
});

export const { addFormData } = formSlice.actions;

export default formSlice.reducer;
