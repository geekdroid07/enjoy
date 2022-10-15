import { createSlice } from '@reduxjs/toolkit';

const user = {
  name: '',
  role: '',
  uid: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState: user,
  reducers: {
    setCoach: (state, action) => ({
      ...state,
      coach: action.payload
    }),
    modifyUser: (state, action) => ({
      ...state,
      ...action.payload
    }),
    resetUser: () => user
  }
});

export const { setCoach, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
