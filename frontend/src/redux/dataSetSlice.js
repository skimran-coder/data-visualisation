import { createSlice } from "@reduxjs/toolkit";

const dataSetSlice = createSlice({
  name: "dataSet",
  initialState: null,
  reducers: {
    addDataSet: (state, action) => {
      state = action.payload;
    },
    removeDataSet: () => {
      return null;
    },
  },
});

export const { addDataSet, removeDataSet } = dataSetSlice.actions;
export default dataSetSlice.reducer;
