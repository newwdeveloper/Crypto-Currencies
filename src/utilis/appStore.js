import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "../utilis/DataSlice";

const dataStore = configureStore({
  reducer: {
    data: DataReducer,
  },
});

export default dataStore;
