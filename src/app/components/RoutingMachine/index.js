import L from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const point1 = {
  lat: -3.9945,
  lng: -79.2012,
};

const point2 = {
  lat: -3.9905,
  lng: -79.2001,
};

const createRoutingMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [L.latLng(point1), L.latLng(point2)],
    lineOptions: {
      styles: [{ color: "#ec6f88", weight: 4 }],
    },
    show: true,
    collapsible: true,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    language: "es",
    createMarker: () => false,
    ...props,
  });

  return instance;
};

export const RoutingMachine = createControlComponent(createRoutingMachineLayer);
