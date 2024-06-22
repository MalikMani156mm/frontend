import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FIRApi } from "./Features/FIR/FIRApi";
import { AuthApi } from './Features/Auth/AuthApi';
import { CertificateApi } from './Features/Certificates/CertificateAPI';
import AuthSlice from './Features/Auth/AuthSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { VVApi } from './Features/VehicleVerification/VVApi';
import { PoliceStationApi } from './Features/PoliceStationInfo/PoliceStationApi';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    auth:AuthSlice,
    [FIRApi.reducerPath]: FIRApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [CertificateApi.reducerPath]: CertificateApi.reducer,
    [VVApi.reducerPath]: VVApi.reducer,
    [PoliceStationApi.reducerPath]: PoliceStationApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([FIRApi.middleware , AuthApi.middleware, CertificateApi.middleware , VVApi.middleware, PoliceStationApi.middleware]),
});

export const persistor = persistStore(store);
