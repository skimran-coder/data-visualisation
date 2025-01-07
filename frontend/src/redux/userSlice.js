import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
    removeUser: (state, action) => {
      (state.user = null), (state.token = null);
    },
  },
});

export const { addUser, removeUser, addToken } = userSlice.actions;
export default userSlice.reducer;
