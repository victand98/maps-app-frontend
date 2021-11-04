import React, { Fragment, useState } from "react";
import { MapForm, PlaceGeoJSON } from "..";

export const PlaceControl = () => {
  const [placeTypeSelect, setPlaceTypeSelect] = useState({
    value: "TODOS",
    label: "Todos",
  });

  return (
    <Fragment>
      <MapForm
        position="topright"
        placeTypeSelect={placeTypeSelect}
        setPlaceTypeSelect={setPlaceTypeSelect}
      />
      <PlaceGeoJSON placeTypeSelect={placeTypeSelect} />
    </Fragment>
  );
};
