import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
  name: "data",
  initialState: {
    coins: [],
  },
  reducers: {
    addCoins: (state, action) => {
      state.coins = action.payload;
    },
  },
});

export default DataSlice.reducer;
export const { addCoins } = DataSlice.actions;
