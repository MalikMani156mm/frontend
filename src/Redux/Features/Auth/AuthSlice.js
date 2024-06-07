import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    user:null,
    token:null
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
  },
  },
})

export const { setUserInfo , clearUserInfo } = AuthSlice.actions
export default AuthSlice.reducer