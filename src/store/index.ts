import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/slices/authSlice';
import { authenticationApi } from '@services/authentication.service.ts';
import { srtApi } from '@services/base/srtApi.service.ts';

const rootReducer = combineReducers({
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [srtApi.reducerPath]: srtApi.reducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authenticationApi.middleware,
      srtApi.middleware
    ),
  devTools: true,
});

// Typings para hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
