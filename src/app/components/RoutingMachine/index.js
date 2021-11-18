import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useSelector } from "react-redux";

const point1 = {
  lat: -3.9945,
  lng: -79.2012,
};

const point2 = {
  lat: -3.9905,
  lng: -79.2001,
};

const CreateRoutingMachineLayer = (props) => {
  const { origin, destination } = useSelector((state) => state.routing);

  const instance = L.Routing.control({
    router: L.routing.osrmv1({
      serviceUrl: "https://router.project-osrm.org/route/v1",
      profile: "cycling",
      language: "es",
    }),
    waypoints: [L.latLng(point1), L.latLng(point2)],
    autoRoute: false,
    lineOptions: {
      styles: [{ color: "#ec6f88", weight: 4 }],
    },
    show: false,
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

  useEffect(() => {
    console.log(`origin`, origin);
    console.log(`destination`, destination);
    if (origin.lat && destination.lat) {
      instance.setWaypoints([origin, destination]);
      instance.route();
      instance.show();
    }
  }, [origin, destination, instance]);

  return instance;
};

export const RoutingMachine = createControlComponent(CreateRoutingMachineLayer);
