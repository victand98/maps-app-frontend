import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBikeways } from "../../../features/bikeway/bikewaySlice";
import { getPlaces } from "../../../features/place/placeSlice";
import { getPlaceTypes } from "../../../features/placeType/placeTypeSlice";
import { DownloadSection } from "./DownloadSection";
import { MapSection } from "./MapSection";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaces());
    dispatch(getBikeways());
    dispatch(getPlaceTypes());
  }, [dispatch]);

  return (
    <main className="max-h-screen">
      <MapSection />
      <DownloadSection />
    </main>
  );
};
