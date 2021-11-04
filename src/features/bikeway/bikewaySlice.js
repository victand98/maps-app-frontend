import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bikewayService } from "../../services";

export const getBikeways = createAsyncThunk("bikeway/getBikeways", async () => {
  const res = await bikewayService.getBikeways();
  return res.data;
});

const initialState = {
  loading: true,
  error: null,
  entities: [],
};

const bikewaySlice = createSlice({
  name: "bikeway",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBikeways.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBikeways.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload.bikeways;
    });
    builder.addCase(getBikeways.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default bikewaySlice.reducer;
