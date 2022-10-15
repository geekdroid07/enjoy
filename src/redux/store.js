import { configureStore } from '@reduxjs/toolkit';
// reducers
import userReducer from './slices/user';

export default configureStore({
  reducer: {
    user: userReducer
  }
});
