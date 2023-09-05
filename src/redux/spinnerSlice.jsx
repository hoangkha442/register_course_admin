import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
}

const spinnerSlice = createSlice({
  name: 'spinnerSlice',
  initialState,
  reducers: {
    batLoading: (state, action) => { 
        state.isLoading = true;
     },
     tatLoading: (state, action) => { 
        state.isLoading = false;
      }
  }
});

export const {batLoading, tatLoading} = spinnerSlice.actions

export default spinnerSlice.reducer