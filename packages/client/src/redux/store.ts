import { configureStore } from '@reduxjs/toolkit';
import { flowerApi, projectApi } from '../api';
import { appReducer } from './appReducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [flowerApi.reducerPath]: flowerApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([flowerApi.middleware, projectApi.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;