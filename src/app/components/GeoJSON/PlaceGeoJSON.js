import React, { Fragment, useEffect, useState } from "react";
import L from "leaflet";
import * as Icon from "../../components/Icon";
import { GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import hash from "object-hash";
import { Button, IconButton, Modal } from "..";
import * as Fa from "react-icons/fa";
import ParkImg from "../../../assets/img/park.svg";
import StreamImg from "../../../assets/img/lake.svg";
import ParkingImg from "../../../assets/img/parking.svg";

const icons = {
  park: ParkImg,
  stream: StreamImg,
  parking: ParkingImg,
};

export const PlaceGeoJSON = ({ placeTypeSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [placesGeojson, setPlacesGeojson] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const place = useSelector((state) => state.place);

  useEffect(() => {
    if (place.entities.length > 0) {
      setPlacesGeojson((state) => ({
        ...state,
        features: place.entities.map((place) => {
          const { name, location, placeType } = place;
          return {
            type: "Feature",
            properties: {
              name,
              placeType: placeType,
              icon: placeType.icon,
            },
            geometry: location,
          };
        }),
      }));
    }
  }, [place.entities]);

  return (
    <Fragment>
      <GeoJSON
        key={hash(placesGeojson) + hash(placeTypeSelect)}
        data={placesGeojson}
        onEachFeature={(feature, layer) => {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
          }
          layer.on({
            click: (e) => {
              console.log(feature);
              setIsOpen(true);
              setCurrentPlace(feature);
            },
          });
        }}
        pointToLayer={(feature, latlng) => {
          return L.marker(latlng, {
            icon: Icon[feature.properties.icon],
          });
        }}
        filter={(feature) => {
          if (placeTypeSelect.value !== "TODOS")
            return feature.properties.placeType._id === placeTypeSelect.value;
          else return true;
        }}
      />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Información del lugar"
      >
        <div className="">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={icons[currentPlace?.properties?.icon]}
              alt={currentPlace?.properties?.icon}
            />

            <div className="text-sm">
              <p className="text-gray-900 leading-none">
                {currentPlace?.properties?.name}
              </p>
              <p className="text-gray-600 text-xs">
                {currentPlace?.properties?.placeType?.name}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-1">
          <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
          <IconButton icon={Fa.FaDirections}>Indicaciones</IconButton>
        </div>
      </Modal>
    </Fragment>
  );
};
