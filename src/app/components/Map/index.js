import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const center = { lat: -3.992889222222222, lng: -79.21129461111111 };

export const Map = (props) => {
  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      center={center}
      zoom={15}
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/victorandresrojas/cktq9rpnx1n5r17t3iee7xw2l/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidmljdG9yYW5kcmVzcm9qYXMiLCJhIjoiY2t0cTlveHZlMHU4cTJubXUydnI0bXZqYSJ9.wNYgkm1h62Ufb98u-XKNyQ"
      />
      {props.children}
    </MapContainer>
  );
};

export function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },

    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Tú estás aquí</Popup>
    </Marker>
  );
}
