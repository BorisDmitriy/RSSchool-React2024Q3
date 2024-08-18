import { configureStore, Store } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import countriesReducer from './countriesSlice';

const store: Store = configureStore({
  reducer: {
    form: formReducer,
    countries: countriesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
