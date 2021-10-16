import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  downloading: false,
  total: 1,
  progress: 0,
};

const downloadSlice = createSlice({
  name: "download",
  initialState,
  reducers: {
    setTotal: (state, action) => {
      state.downloading = true;
      state.total = action.payload;
      state.progress = 0;
    },
    incrementProgress: (state, action) => {
      state.progress = action.payload;
    },
    downloadFinish: (state, action) => {
      state.downloading = false;
    },
  },
});

export const { setTotal, incrementProgress, downloadFinish } =
  downloadSlice.actions;

export default downloadSlice.reducer;
