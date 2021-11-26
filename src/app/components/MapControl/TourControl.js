import React from "react";
import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import reactDom from "react-dom";
import { Tour } from "..";
import * as Bi from "react-icons/bi";

const TourControlLayer = ({ position, ...rest }) => {
  const instance = L.control({ position: position || "bottomright" });

  instance.onAdd = () => {
    let div = L.DomUtil.create("div", "");
    reactDom.render(<TourMapButton {...rest} />, div);
    return div;
  };

  return instance;
};

const TourMapButton = ({ steps }) => {
  return (
    <Tour steps={steps} continuous={true}>
      <button
        className="tour-control outline-none inline-flex items-center justify-center w-12 h-12 md:w-10 md:h-10 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200 border-gray-500 shadow-md"
        title="Guía de uso"
      >
        <Bi.BiHelpCircle className="fill-current w-5 h-5" />
      </button>
    </Tour>
  );
};

export const TourControl = createControlComponent(
  (props) => new TourControlLayer(props)
);
