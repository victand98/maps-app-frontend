import React, { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet.offline";
import * as Io from "react-icons/io";
import { toast } from "react-toastify";
import { confirmSaveTiles, locationErrorMessage } from "../../../helpers/utils";
import {
  downloadFinish,
  incrementProgress,
  setTotal,
} from "../../../features/download/downloadSlice";
import { useDispatch } from "react-redux";

const center = { lat: -3.9945, lng: -79.2012 };

export const Map = (props) => {
  const [map, setMap] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (map) {
      const tileLayerOffline = L.tileLayer.offline(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          subdomains: "abc",
          minZoom: 13,
          maxZoom: 16,
        }
      );

      tileLayerOffline.addTo(map);

      const controlSaveTiles = L.control.savetiles(tileLayerOffline, {
        zoomlevels: [13, 14, 15, 16],
        position: "topright",
        confirm(layer, successcallback) {
          if (
            window.confirm(
              `¿Desea descargar ${layer._tilesforSave.length} recursos de Mapas Offline?`
            )
          ) {
            confirmSaveTiles(controlSaveTiles, layer);
          }
        },
        confirmRemoval(layer, successCallback) {
          if (
            window.confirm("¿Eliminar todos los recursos Offline descargados?")
          ) {
            successCallback();
          }
        },
        saveText:
          // '<i class="fas fa-download" aria-hidden="true" title="Save tiles"></i>',
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-full w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>',
        rmText:
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-full w-4 mx-auto" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>',
      });

      controlSaveTiles.addTo(map);

      let progress;
      tileLayerOffline.on("savestart", (e) => {
        progress = 0;
        dispatch(setTotal(e._tilesforSave.length));
      });
      tileLayerOffline.on("savetileend", () => {
        progress += 1;
        dispatch(incrementProgress(progress));
      });
      tileLayerOffline.on("savefinish", (e) => {
        dispatch(downloadFinish());
      });
    }
  }, [map, dispatch]);

  return (
    <MapContainer
      style={{ height: "100%", width: "100%", zIndex: 10 }}
      center={center}
      zoom={14}
      minZoom={13}
      maxZoom={16}
      whenCreated={setMap}
    >
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
      setPosition(e.latlng);
    },
    locationerror(error) {
      toast.error(locationErrorMessage(error.code));
    },
  });

  return !!map && position === null ? null : (
    <Marker position={position}>
      <Popup>Te encuentras aquí</Popup>
    </Marker>
  );
};

const ControlLocation = () => {
  const map = useMap();

  const findLocation = useCallback(() => {
    map.locate({ watch: true });
  }, [map]);

  useEffect(() => {
    findLocation();
  }, [findLocation]);

  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control">
        <button
          className="outline-none inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-gray-200 rounded-full focus:shadow-outline hover:bg-blue-300 mb-5"
          onClick={findLocation}
        >
          <Io.IoMdLocate className="fill-current w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
