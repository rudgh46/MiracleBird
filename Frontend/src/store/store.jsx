import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import areaReducer from "./area";
import landmarkReducer from "./landmark";

const store = configureStore({
  reducer: {
    area: areaReducer,
    landmark: landmarkReducer,
    user: userReducer,
  },
});
//redux store
export default store;
