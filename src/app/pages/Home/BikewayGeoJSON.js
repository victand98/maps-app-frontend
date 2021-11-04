import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";

export const BikewayGeoJSON = () => {
  const [bikewaysGeojson, setBikewaysGeojson] = useState({
    type: "FeatureCollection",
    features: [],
  });

  const bikeway = useSelector((state) => state.bikeway);

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

  if (bikeway.loading) return <div>Loading</div>;

  return (
    <GeoJSON
      key={bikeway.loading ? "l" : "ss"}
      data={bikewaysGeojson}
      onEachFeature={(feature, layer) => {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      }}
    />
  );
};
