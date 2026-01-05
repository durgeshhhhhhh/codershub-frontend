import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    // removeRequests: (state) => {
    //   return null;
    // },
  },
});

export const { addRequests  } = requestSlice.actions;
export default requestSlice.reducer;
