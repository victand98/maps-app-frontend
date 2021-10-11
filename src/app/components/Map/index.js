import React, { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import * as Io from "react-icons/io";
import { toast } from "react-toastify";
import { locationErrorMessage } from "../../../helpers/utils";
const center = { lat: -3.992889222222222, lng: -79.21129461111111 };

export const Map = (props) => {
  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={center}
      zoom={15}
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/victorandresrojas/cktq9rpnx1n5r17t3iee7xw2l/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidmljdG9yYW5kcmVzcm9qYXMiLCJhIjoiY2t0cTlveHZlMHU4cTJubXUydnI0bXZqYSJ9.wNYgkm1h62Ufb98u-XKNyQ"
      />
      {props.children}
      <LocationMarker />
      <ControlLocation />
    </MapContainer>
  );
};

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    locationfound(e) {
      console.log(`e`, e);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationerror(error) {
      console.log(`error`, error);
      toast.error(locationErrorMessage(error.code));
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Te encuentras aquí</Popup>
    </Marker>
  );
};

const ControlLocation = () => {
  const map = useMap();

  const findLocation = useCallback(() => {
    map.locate({ watch: true, setView: true });
  }, [map]);

  useEffect(() => {
    findLocation();
  }, [findLocation]);

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control">
        <button
          className="outline-none inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-gray-200 rounded-full focus:shadow-outline hover:bg-blue-300"
          onClick={findLocation}
        >
          <Io.IoMdLocate className="fill-current w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
