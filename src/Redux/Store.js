import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FIRApi } from "./Features/FIR/FIRApi";
import { AuthApi } from './Features/Auth/AuthApi';
import { CertificateApi } from './Features/Certificates/CertificateAPI';
import AuthSlice from './Features/Auth/AuthSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { VVApi } from './Features/VehicleVerification/VVApi';
import { PoliceStationApi } from './Features/PoliceStationInfo/PoliceStationApi';
import CartSlice from './Slices/CartSlice';
import { AdminApi } from './Features/Admin/adminApi';
import { CategoryApi } from './Features/Category/CategoryApi';
import { OffenceApi } from './Features/Offence/OffenceApi';
import { ContactMessageApi } from './Features/ContactMessage/ContactMessage.Api';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    auth:AuthSlice,
    cart:CartSlice,
    [FIRApi.reducerPath]: FIRApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [AdminApi.reducerPath]: AdminApi.reducer,
    [CertificateApi.reducerPath]: CertificateApi.reducer,
    [VVApi.reducerPath]: VVApi.reducer,
    [PoliceStationApi.reducerPath]: PoliceStationApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [OffenceApi.reducerPath]: OffenceApi.reducer,
    [ContactMessageApi.reducerPath]: ContactMessageApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }).concat([FIRApi.middleware , AuthApi.middleware, AdminApi.middleware, CertificateApi.middleware , VVApi.middleware, PoliceStationApi.middleware, OffenceApi.middleware, CategoryApi.middleware, ContactMessageApi.middleware]),
});

export const persistor = persistStore(store);
