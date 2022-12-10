import { createSlice } from '@reduxjs/toolkit';


export const roundSlice = createSlice({
  name: 'round',
  initialState: {
    needRefresh: true,
  },
  reducers: {
    setNeedRefresh: (state, action) => {
      state.needRefresh = action.payload;
    },
  }
});

export const { setNeedRefresh } = roundSlice.actions;

export default roundSlice.reducer;
