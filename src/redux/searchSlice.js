import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
    list: [],
  },
  reducers: {
    searchString: (state, action) => {
      state.value = action.payload;
    },
    nameList: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchString, nameList } = searchSlice.actions;

export default searchSlice.reducer;
