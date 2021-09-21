import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "../features/place/placeSlice";
import placeTypeReducer from "../features/placeType/placeTypeSlice";

export const store = configureStore({
  reducer: {
    place: placeReducer,
    placeType: placeTypeReducer,
  },
});
