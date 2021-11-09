import React from "react";
import { useSelector } from "react-redux";
import {
  BikewayGeoJSON,
  LoaderViewport,
  Map,
  PlaceItem,
  RoutingMachine,
} from "../../components";

export const MapSection = () => {
  const placeLoading = useSelector((state) => state.place.loading);
  const bikewayLoading = useSelector((state) => state.bikeway.loading);

  if (placeLoading || bikewayLoading)
    return <LoaderViewport title="Cargando Recursos..." />;

  return (
    <section className="h-screen">
      <Map>
        <PlaceItem />
        <BikewayGeoJSON />
        <RoutingMachine position="bottomright" />
      </Map>
    </section>
  );
};
