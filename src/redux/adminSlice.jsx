import { createSlice } from '@reduxjs/toolkit'
import { userLocalStorage } from '../services/LocalService';

const initialState = {
    adminInfo: userLocalStorage.get(),
}

const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    setlogin: (state, action) => { 
        state.adminInfo = action.payload
     }
  }
});

export const {setlogin} = adminSlice.actions

export default adminSlice.reducer