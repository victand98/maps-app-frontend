import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { placeService } from "../../services";

export const getPlaces = createAsyncThunk("place/getPlaces", async () => {
  const res = await placeService.getPlaces();
  return res.data;
});

const initialState = {
  loading: false,
  error: null,
  entities: [],
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPlaces.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPlaces.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload.places;
    });
    builder.addCase(getPlaces.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default placeSlice.reducer;
