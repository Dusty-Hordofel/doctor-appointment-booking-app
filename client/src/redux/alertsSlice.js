import { createSlice } from "@reduxjs/toolkit";

//createSlice is used to create a slice
export const alertsSlice = createSlice({
  name: "alerts", //name of the slice
  initialState: {
    loading: false,
  }, //initial state of the slice
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  }, //reducers
});

export const { showLoading, hideLoading } = alertsSlice.actions;
