import { createSlice } from "@reduxjs/toolkit";

export const landmarkSlice = createSlice({
  name: "landmark",
  initialState: { value: { index: "", name: "", desc: "" } },
  reducers: {
    selectLandmark: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { selectLandmark } = landmarkSlice.actions;
export default landmarkSlice.reducer;
