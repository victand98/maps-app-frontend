import React, { useEffect, useState } from "react";
import L from "leaflet";
import { GeoJSON } from "react-leaflet";
import { LoaderViewport, Map, Select } from "../../components";
import { useSelector } from "react-redux";
import * as Icon from "../../components/Icon";

export const MapSection = () => {
  const [placesGeojson, setPlacesGeojson] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [placeTypeSelect, setPlaceTypeSelect] = useState({
    value: "TODOS",
    label: "Todos",
  });

  const place = useSelector((state) => state.place);
  const placeType = useSelector((state) => state.placeType);
  const placeTypeOptions = placeType.entities.map((item) => ({
    value: item._id,
    label: `${item.name} - ${item.description}`,
  }));

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

  if (place.loading || placeType.loading)
    return <LoaderViewport title="Cargando Recursos..." />;

  return (
    <section className="h-screen flex flex-col gap-2 items-center">
      <div className="px-4 pt-2 md:px-0">
        <div className="w-72">
          <Select
            name="place-type-select"
            options={[{ value: "TODOS", label: "Todos" }, ...placeTypeOptions]}
            onChange={setPlaceTypeSelect}
            value={placeTypeSelect}
          />
        </div>
      </div>

      <Map>
        <GeoJSON
          key={placeTypeSelect.value}
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
            if (placeTypeSelect.value !== "TODOS")
              return feature.properties.placeType === placeTypeSelect.value;
            else return true;
          }}
        />
      </Map>
    </section>
  );
};
