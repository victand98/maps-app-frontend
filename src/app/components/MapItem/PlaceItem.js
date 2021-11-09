import React, { Fragment, useState } from "react";
import { PlaceControl, PlaceGeoJSON } from "..";

export const PlaceItem = () => {
  const [placeTypeSelect, setPlaceTypeSelect] = useState({
    value: "TODOS",
    label: "Todos",
  });

  return (
    <Fragment>
      <PlaceControl
        position="topright"
        placeTypeSelect={placeTypeSelect}
        setPlaceTypeSelect={setPlaceTypeSelect}
      />
      <PlaceGeoJSON placeTypeSelect={placeTypeSelect} />
    </Fragment>
  );
};
