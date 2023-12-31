import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connect: (state, action) => {
      state.currentUser = action.payload;
    },
    disconnect: (state) => {
      state.currentUser = null;
    },
  },
});

export const { connect, disconnect } = userSlice.actions;
export default userSlice.reducer;
