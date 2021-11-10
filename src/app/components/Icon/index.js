import L from "leaflet";
import ParkImg from "../../../assets/img/park.svg";
import StreamImg from "../../../assets/img/lake.svg";
import ParkingImg from "../../../assets/img/parking.svg";
import MarkerShadow from "../../../assets/img/marker-shadow.png";
import "./Icon.style.css";

export const park = new L.divIcon({
  className: "custom-div-icon",
  html: `<div style='background-color:#26c30b;' class='marker-pin'></div><img src="${ParkImg}" alt="park" />`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -25],
  shadowUrl: MarkerShadow,
  shadowAnchor: [13, 28],
});

export const stream = new L.divIcon({
  className: "custom-div-icon",
  html: `<div style='background-color:#0b42c3;' class='marker-pin'></div><img src="${StreamImg}" alt="stream" />`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -25],
  shadowUrl: MarkerShadow,
  shadowAnchor: [13, 28],
});

export const parking = new L.divIcon({
  className: "custom-div-icon",
  html: `<div style='background-color:#c30b26;' class='marker-pin'></div><img src="${ParkingImg}" alt="parking" />`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -25],
  shadowUrl: MarkerShadow,
  shadowAnchor: [13, 28],
});
