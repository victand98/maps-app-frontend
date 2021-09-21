import L from "leaflet";
import ParkImg from "../../../assets/img/forest.svg";
import StreamImg from "../../../assets/img/lake.svg";
import ParkingImg from "../../../assets/img/placeholder.svg";
import MarkerShadow from "../../../assets/img/marker-shadow.png";

export const park = new L.Icon({
  iconUrl: ParkImg,
  iconSize: [26, 26],
  popupAnchor: [0, -15],
  shadowUrl: MarkerShadow,
  shadowAnchor: [13, 28],
});

export const stream = new L.Icon({
  iconUrl: StreamImg,
  iconSize: [26, 26],
  popupAnchor: [0, -15],
  shadowUrl: MarkerShadow,
  shadowAnchor: [13, 28],
});

export const parking = new L.Icon({
  iconUrl: ParkingImg,
  iconSize: [26, 26],
  popupAnchor: [0, -15],
  shadowUrl: MarkerShadow,
  shadowAnchor: [13, 28],
});
