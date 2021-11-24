import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPoint: {
    icon: "",
    name: "",
    description: "",
    isOpen: false,
    latlng: { lat: null, lng: null },
  },
  waypoints: {
    origin: {
      lat: null,
      lng: null,
    },
    destination: {
      lat: null,
      lng: null,
    },
  },
  currentLocation: {
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
    setWaypoints: (state, action) => {
      state.waypoints = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
  },
});

export const { setCurrentPoint, setClose, setWaypoints, setCurrentLocation } =
  routingSlice.actions;

export default routingSlice.reducer;
