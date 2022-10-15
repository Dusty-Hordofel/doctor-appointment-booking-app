import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user", //slice name
  initialState: {
    user: null,
  }, //state
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  }, //reducers
});

export const { setUser, reloadUserData } = userSlice.actions;
