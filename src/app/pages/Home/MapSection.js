import React, { useEffect, useState } from "react";
import L from "leaflet";
import { GeoJSON } from "react-leaflet";
import { Map, Select } from "../../components";
import { useSelector } from "react-redux";
import * as Icon from "../../components/Icon";

export const MapSection = () => {
  const [placesGeojson, setPlacesGeojson] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [placeTypeSelect, setPlaceTypeSelect] = useState("TODOS");

  const place = useSelector((state) => state.place);
  const placeTypeOptions = useSelector((state) =>
    state.placeType.entities.map((item) => ({
      value: item._id,
      label: `${item.name} - ${item.description}`,
    }))
  );

  useEffect(() => {
    if (place.entities.length > 0) {
      setPlacesGeojson((state) => ({
        ...state,
        features: place.entities.map((place) => {
          const { name, location, placeType } = place;
          return {
            type: "Feature",
            properties: {
              name,
              placeType: placeType._id,
              icon: placeType.icon,
            },
            geometry: location,
          };
        }),
      }));
    }
  }, [place.entities]);

  const onChange = (e) => {
    const { value } = e.target;
    setPlaceTypeSelect(value);
  };

  if (place.loading) return <div>Cargando...</div>;

  return (
    <section className="flex flex-col items-center gap-3 py-4">
      <Select
        name="place-type-select"
        label="Filtrar por"
        options={[{ value: "TODOS", label: "Todos" }, ...placeTypeOptions]}
        onChange={onChange}
      />

      <Map>
        <GeoJSON
          key={placeTypeSelect}
          data={placesGeojson}
          onEachFeature={(feature, layer) => {
            if (feature.properties && feature.properties.name) {
              layer.bindPopup(feature.properties.name);
            }
          }}
          pointToLayer={(feature, latlng) => {
            return L.marker(latlng, {
              icon: Icon[feature.properties.icon],
            });
          }}
          filter={(feature) => {
            if (placeTypeSelect !== "TODOS")
              return feature.properties.placeType === placeTypeSelect;
            else return true;
          }}
        />
      </Map>
    </section>
  );
};
