import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    firstName: '',
    lastName: '',
    emailVerified: false,
    isLogged: false,
  },
  reducers: {
    setUserInfoAction(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.emailVerified = action.payload.mailVerified;
    },
    logOnOrOffAction(state, action) {
      state.isLogged = action.payload;
    },
    verifyEmail(state, action) {
      state.emailVerified = action.payload;
    },
  },
});

export const { setUserInfoAction, logOnOrOffAction, verifyEmail } =
  userSlice.actions;

export default userSlice.reducer;
