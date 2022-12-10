import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import roundReducer from './roundSlice';


export default configureStore({
  reducer: {
    account: accountReducer,
    round: roundReducer,
  },
});
