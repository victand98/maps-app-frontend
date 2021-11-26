import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useLeafletContext } from "@react-leaflet/core";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useSelector } from "react-redux";

export const RoutingMachine = (props) => {
  const context = useLeafletContext();
  const waypoints = useSelector((state) => state.routing.waypoints);

  const instance = L.Routing.control({
    router: L.routing.osrmv1({
      serviceUrl: "https://router.project-osrm.org/route/v1",
      profile: "cycling",
      language: "es",
    }),
    waypoints: [L.latLng(waypoints.origin), L.latLng(waypoints.destination)],
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
    collapseBtnClass: "leaflet-routing-collapse-btn cursor-pointer",
    ...props,
  });

  instance.on("routingstart", (e) => {
    console.log(`routingstart`, e);
    instance.show();
  });

  instance.on("routesfound", (e) => {
    console.log(`routesfound`, e);
  });

  instance.on("routingerror", (e) => {
    console.log(`routingerror`, e);
  });

  useEffect(() => {
    const container = context.layerContainer || context.map;
    container.addControl(instance);
    return () => {
      container.removeControl(instance);
    };
  }, [context.layerContainer, context.map, instance]);

  useEffect(() => {
    if (waypoints.origin.lat && waypoints.destination.lat) instance.route();
  }, [waypoints, instance]);

  return null;
};
