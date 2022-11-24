import { createSlice } from "@reduxjs/toolkit";

export const areaSlice = createSlice({
  name: "area",
  initialState: { value: { name: "korea", SIG_CD: "" } },
  reducers: {
    selectArea: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { selectArea } = areaSlice.actions;
export default areaSlice.reducer;
