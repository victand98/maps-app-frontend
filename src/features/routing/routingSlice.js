import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPoint: {
    icon: "",
    name: "",
    description: "",
    isOpen: false,
    latlng: { lat: null, lng: null },
  },
  origin: {
    lat: null,
    lng: null,
  },
  destination: {
    lat: null,
    lng: null,
  },
};

const routingSlice = createSlice({
  name: "routing",
  initialState,
  reducers: {
    setCurrentPoint: (state, action) => {
      state.currentPoint = action.payload;
    },
    setClose: (state, action) => {
      state.currentPoint.isOpen = false;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
  },
});

export const { setCurrentPoint, setClose, setDestination, setOrigin } =
  routingSlice.actions;

export default routingSlice.reducer;
