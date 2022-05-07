import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { reducer } from './reducer';
import { initialState } from './reducer';

const store = configureStore({
  reducer: {
    reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(thunk),
    preloadedState: initialState,
});

export default store;
