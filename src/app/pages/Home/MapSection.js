import React from "react";
import { useSelector } from "react-redux";
import {
  BikewayGeoJSON,
  LoaderViewport,
  Map,
  PlaceControl,
} from "../../components";

export const MapSection = () => {
  const placeLoading = useSelector((state) => state.place.loading);
  const bikewayLoading = useSelector((state) => state.bikeway.loading);

  if (placeLoading || bikewayLoading)
    return <LoaderViewport title="Cargando Recursos..." />;

  return (
    <section className="h-screen">
      <Map>
        <PlaceControl />
        <BikewayGeoJSON />
      </Map>
    </section>
  );
};
