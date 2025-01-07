import { createSlice } from "@reduxjs/toolkit";

const redirectSlice = createSlice({
  name: "redirect",
  initialState: {
    link: "",
  },
  reducers: {
    addLink: (state, action) => (state.link = action.payload),
  },
});

export const { addLink } = redirectSlice.actions;
export default redirectSlice.reducer;
