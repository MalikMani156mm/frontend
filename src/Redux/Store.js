import { configureStore } from '@reduxjs/toolkit'
import { FIRApi } from "./Features/FIR/FIRApi";

export const store = configureStore({
  reducer: {
    [FIRApi.reducerPath]: FIRApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(FIRApi.middleware),
})

