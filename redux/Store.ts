import { configureStore } from '@reduxjs/toolkit';
import viewConfigurationReducer from './ViewConfiguration';

const store = configureStore({
  reducer: {
    viewConfig: viewConfigurationReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
