
import authReducer from './modules/authSlice';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
// import {composeWithDevTools} from 'redux-devtools-extension';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer : {
    auth: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);