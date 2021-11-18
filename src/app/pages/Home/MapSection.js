import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClose,
  setDestination,
} from "../../../features/routing/routingSlice";
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
} from "../../components";

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

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setClose());
  };

  const onConfirmClick = () => {
    onClose();
    console.log(`latlng`, latlng);
    dispatch(setDestination(latlng));
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
