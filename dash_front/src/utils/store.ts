import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from 'store/auth.slice';
import userReducer from 'store/user.slice';

import { api } from 'services/api';

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: [],
};

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,

  auth: authReducer,
  user: persistReducer(userPersistConfig, userReducer),
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(api.middleware),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
