import React, { useEffect, useState } from "react";
import L from "leaflet";
import * as Icon from "../../components/Icon";
import { GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import hash from "object-hash";

export const PlaceGeoJSON = ({ placeTypeSelect }) => {
  const [placesGeojson, setPlacesGeojson] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const place = useSelector((state) => state.place);

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

  return (
    <GeoJSON
      key={hash(placesGeojson) + hash(placeTypeSelect)}
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
  );
};
