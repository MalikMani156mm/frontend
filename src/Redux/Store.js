import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FIRApi } from "./Features/FIR/FIRApi";
import { AuthApi } from './Features/Auth/AuthApi';
import AuthSlice from './Features/Auth/AuthSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    auth:AuthSlice,
    [FIRApi.reducerPath]: FIRApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([FIRApi.middleware , AuthApi.middleware]),
});

export const persistor = persistStore(store);
