import { createSlice } from "@reduxjs/toolkit";

const dataSetSlice = createSlice({
  name: "dataSet",
  initialState: {
    data: [],
  },
  reducers: {
    addDataSet: (state, action) => {
      state.data = action.payload;
    },
    removeDataSet: (state) => {
      state.data = [];
    },
  },
});

export const { addDataSet, removeDataSet } = dataSetSlice.actions;
export default dataSetSlice.reducer;
