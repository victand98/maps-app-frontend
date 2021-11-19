import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent, useLeafletContext } from "@react-leaflet/core";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useSelector } from "react-redux";

export const RoutingMachine = (props) => {
  const context = useLeafletContext();
  const destination = useSelector((state) => state.routing.destination);
  const origin = useSelector((state) => state.routing.origin);

  const instance = L.Routing.control({
    router: L.routing.osrmv1({
      serviceUrl: "https://router.project-osrm.org/route/v1",
      profile: "cycling",
      language: "es",
    }),
    waypoints: [L.latLng(origin), L.latLng(destination)],
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

  instance.on("routingstart", (e) => {
    console.log(`routingstart`, e);
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
    if (destination.lat && destination.lng) {
      instance.route();
    }
  }, [destination, instance]);

  return null;
};

export const CreateRoutingMachineLayer = (props) => {
  const context = useLeafletContext();
  const { origin, destination } = useSelector((state) => state.routing);

  const instance = L.Routing.control({
    router: L.routing.osrmv1({
      serviceUrl: "https://router.project-osrm.org/route/v1",
      profile: "cycling",
      language: "es",
    }),
    waypoints: [L.latLng(origin), L.latLng(destination)],
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

  instance.on("routingstart", (e) => {
    console.log(`routingstart`, e);
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

  // useEffect(() => {
  //   if (origin.lat && destination.lat) {
  //     instance.spliceWaypoints(0, 1, L.latLng(origin));
  //     instance.spliceWaypoints(1, 1, L.latLng(destination));
  //     instance.route();
  //   }
  // }, [origin, destination, instance]);
  // map.on("locationfound", (e) => {
  //   console.log(`E.LATLNG`, e.latlng);
  //   instance.spliceWaypoints(0, 1, e.latlng);
  // });

  useEffect(() => {
    console.log(`destination`, destination);
    if (destination.lat && destination.lng) {
      instance.spliceWaypoints(1, 1, L.latLng(destination));
      instance.route();
    }
  }, [destination, instance]);

  return instance.getPlan();
};

export const RoutingMachine1 = createControlComponent(
  CreateRoutingMachineLayer
);
