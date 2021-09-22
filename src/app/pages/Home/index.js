import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPlaces } from "../../../features/place/placeSlice";
import { getPlaceTypes } from "../../../features/placeType/placeTypeSlice";
import { MapSection } from "./MapSection";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaces());
    dispatch(getPlaceTypes());
  }, [dispatch]);

  return (
    <main className="max-h-screen">
      <MapSection />
    </main>
  );
};
