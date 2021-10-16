import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import placeReducer from "../features/place/placeSlice";
import placeTypeReducer from "../features/placeType/placeTypeSlice";
import downloadReducer from "../features/download/downloadSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["download"],
};

const reducers = combineReducers({
  place: placeReducer,
  placeType: placeTypeReducer,
  download: downloadReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
