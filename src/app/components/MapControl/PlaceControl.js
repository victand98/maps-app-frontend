import React, { useMemo } from "react";
import reactDom from "react-dom";
import { useSelector } from "react-redux";
import L from "leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import { Select } from "..";

export const PlaceControl = ({
  placeTypeSelect,
  setPlaceTypeSelect,
  ...rest
}) => {
  const context = useLeafletContext();
  const placeType = useSelector((state) => state.placeType);

  const placeTypeOptions = useMemo(
    () => [
      { value: "TODOS", label: "Todos" },
      ...placeType.entities.map((item) => ({
        value: item._id,
        label: item.name,
        description: item.description,
      })),
    ],
    [placeType.entities]
  );

  const jsx = (
    <div className="w-36 md:w-72">
      <Select
        className="place-select"
        options={placeTypeOptions}
        onChange={setPlaceTypeSelect}
        value={placeTypeSelect}
        disabled={placeType.loading}
      />
    </div>
  );

  const control = L.control({ position: "topleft", ...rest });

  control.onAdd = function (map) {
    let div = L.DomUtil.create("div", "");
    reactDom.render(jsx, div);
    return div;
  };

  React.useEffect(() => {
    const container = context.layerContainer || context.map;
    container.addControl(control);

    return () => {
      container.removeControl(control);
    };
  });

  return null;
};
