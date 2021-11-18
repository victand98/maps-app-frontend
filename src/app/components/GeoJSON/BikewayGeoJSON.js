import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import hash from "object-hash";
import { setCurrentPoint } from "../../../features/routing/routingSlice";

let myStyle = {
  color: "#05A8AA",
  weight: 6,
};

export const BikewayGeoJSON = () => {
  const [bikewaysGeojson, setBikewaysGeojson] = useState({
    type: "FeatureCollection",
    features: [],
  });

  const bikeway = useSelector((state) => state.bikeway);

  const dispatch = useDispatch();

  useEffect(() => {
    if (bikeway.entities.length > 0) {
      setBikewaysGeojson((state) => ({
        ...state,
        features: bikeway.entities.map((bikeway) => {
          const { name, location } = bikeway;
          return {
            type: "Feature",
            properties: {
              name,
            },
            geometry: location,
          };
        }),
      }));
    }
  }, [bikeway.entities]);

  return (
    <GeoJSON
      key={hash(bikewaysGeojson)}
      data={bikewaysGeojson}
      onEachFeature={(feature, layer) => {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
        layer.on({
          click: (e) => {
            dispatch(
              setCurrentPoint({
                icon: "bikeway",
                name: feature.properties.name,
                description: "Ciclovía",
                isOpen: true,
                latlng: { lat: e.latlng.lat, lng: e.latlng.lng },
              })
            );
          },
        });
      }}
      style={myStyle}
    />
  );
};
