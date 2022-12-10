import { createSlice } from '@reduxjs/toolkit';


export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    address: 'not connected',
    balance: 'not connected',
    totalPrize: 'not connected',
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setTotalPrize: (state, action) => {
      state.totalPrize = action.payload;
    }
  }
});

export const { setAddress, setBalance, setTotalPrize } = accountSlice.actions;

export default accountSlice.reducer;
