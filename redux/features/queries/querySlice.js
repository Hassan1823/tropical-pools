import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queries: [],
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    // userRegistration: (state, action) => {
    //   state.token = action.payload.token;
    // },

    userQuires: (state, action) => {
      state.queries = action.payload.queries;
    },
  },
});

export const { userQuires } = querySlice.actions;

export default querySlice.reducer;
