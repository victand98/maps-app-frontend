import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { placeTypeService } from "../../services";

export const getPlaceTypes = createAsyncThunk(
  "placeType/getPlaceTypes",
  async () => {
    const res = await placeTypeService.getPlaceTypes();
    return res.data;
  }
);

const initialState = {
  loading: false,
  error: null,
  entities: [],
};

const placeTypeSlice = createSlice({
  name: "placeType",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPlaceTypes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPlaceTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload.placeTypes;
    });
    builder.addCase(getPlaceTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default placeTypeSlice.reducer;
