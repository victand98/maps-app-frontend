import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setClose, setWaypoints } from "../../../features/routing/routingSlice";
import { locationErrorMessage } from "../../../helpers/utils";
import {
  BikewayGeoJSON,
  BikewayIcon,
  InformationCard,
  LoaderViewport,
  Map,
  Modal,
  ParkIcon,
  ParkingIcon,
  PlaceItem,
  RoutingMachine,
  StreamIcon,
  TourControl,
} from "../../components";
import steps from "./home.tour";

export const MapSection = () => {
  const placeLoading = useSelector((state) => state.place.loading);
  const bikewayLoading = useSelector((state) => state.bikeway.loading);

  if (placeLoading || bikewayLoading)
    return <LoaderViewport title="Cargando Recursos..." />;

  return (
    <section className="h-screen">
      <Map>
        <PlaceItem />
        <BikewayGeoJSON />
        <RoutingMachine position="bottomright" />
        <TourControl steps={steps} />
      </Map>

      <InformationDialog />
    </section>
  );
};

const icons = {
  park: ParkIcon,
  stream: StreamIcon,
  parking: ParkingIcon,
  bikeway: BikewayIcon,
};

const InformationDialog = () => {
  const { isOpen, icon, latlng, ...rest } = useSelector(
    (state) => state.routing.currentPoint
  );
  const currentLocation = useSelector((state) => state.routing.currentLocation);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setClose());
  };

  const onConfirmClick = () => {
    onClose();
    if (currentLocation.lat && currentLocation.lng) {
      const waypoints = {
        origin: currentLocation,
        destination: latlng,
      };
      dispatch(setWaypoints(waypoints));
    } else toast.error(locationErrorMessage(1));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Información del lugar">
      <InformationCard
        icon={icons[icon]}
        onConfirmClick={onConfirmClick}
        onCloseClick={onClose}
        {...rest}
      />
    </Modal>
  );
};
