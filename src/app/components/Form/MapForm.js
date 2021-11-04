import React from "react";
import { useSelector } from "react-redux";
import { Select } from "..";
import { POSITION_CLASSES } from "../../../helpers/constants";

export const MapForm = ({ placeTypeSelect, setPlaceTypeSelect, position }) => {
  const placeType = useSelector((state) => state.placeType);
  const placeTypeOptions = placeType.entities.map((item) => ({
    value: item._id,
    label: item.name,
    description: item.description,
  }));

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

  return (
    <div className={positionClass}>
      <div className="leaflet-control">
        <div className="w-36 md:w-72">
          <Select
            name="place-type-select"
            options={[{ value: "TODOS", label: "Todos" }, ...placeTypeOptions]}
            onChange={setPlaceTypeSelect}
            value={placeTypeSelect}
            disabled={placeType.loading}
          />
        </div>
      </div>
    </div>
  );
};
