import { createSlice } from "@reduxjs/toolkit";

const dataSetSlice = createSlice({
  name: "dataSet",
  initialState: null,
  reducers: {
    addDataSet: (state, action) => {
      return action.payload;
    },
    removeDataSet: (state, action) => {
      return null;
    },
  },
});

export const { addDataSet, removeDataSet } = dataSetSlice.actions;
export default dataSetSlice.reducer;
