import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    user:null,
    token:null,
    isPasswordConfirmed: false,
 }

 const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    setUserInfo(state,action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUserInfo(state) {
      state.user = null;
      state.token = null;
      state.isPasswordConfirmed = false;
  },
  setPasswordConfirmed(state, action) {
      state.isPasswordConfirmed = action.payload;
  },
  },
})

export const { setUserInfo , clearUserInfo, setPasswordConfirmed } = AuthSlice.actions
export default AuthSlice.reducer 