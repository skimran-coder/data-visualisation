import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import dataSetReducer from "./dataSetSlice";
import redirectReducer from "./dataSetSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    dataSet: dataSetReducer,
    redirect: redirectReducer,
  },
});

export default appStore;
