import {AnyAction, configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import logger from 'redux-logger';
import appReducer from './slices';
import storage from 'redux-persist/lib/storage';
import {api, } from "@mpr/services";
import { clearPredictionMiddleware } from './slices/prediction';

const persistConfig = {
  key: 'matchPredictor',
  storage,
  whitelist: ['prediction'],
};

export const persistedReducer = persistReducer(persistConfig, appReducer);


const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, PAUSE, REHYDRATE, PERSIST, PURGE, REGISTER],
        },
      }).concat([api.middleware, logger, clearPredictionMiddleware]),
    ...options,
  });
export const store = createStore();
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//wrapper for next
export type AppStore = ReturnType<typeof createStore>;
