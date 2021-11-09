import React, { useCallback, useEffect } from "react";
import reactDom from "react-dom";
import { createControlComponent } from "@react-leaflet/core";
import { useMap } from "react-leaflet";
import L from "leaflet";
import * as Io from "react-icons/io";

const LocateControlLayer = (props) => {
  const map = useMap();

  const findLocation = useCallback(() => {
    map.locate({ watch: true });
  }, [map]);

  useEffect(() => {
    findLocation();
  }, [findLocation]);

  const instance = L.control({
    position: "bottomright",
    ...props,
  });

  instance.onAdd = (map) => {
    let div = L.DomUtil.create("div", "");
    reactDom.render(<LocateButton findLocation={findLocation} />, div);
    return div;
  };

  return instance;
};

const LocateButton = ({ findLocation }) => {
  return (
    <button
      className="outline-none inline-flex items-center justify-center w-12 h-12 md:w-10 md:h-10 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200 border-gray-500 shadow-md"
      onClick={findLocation}
      title="Localizar mi ubicación"
    >
      <Io.IoMdLocate className="fill-current w-5 h-5" />
    </button>
  );
};

export const LocateControl = createControlComponent(
  (props) => new LocateControlLayer(props)
);
