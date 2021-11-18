import React from "react";
import * as Fa from "react-icons/fa";
import { Button, IconButton } from "..";

export const InformationCard = ({
  icon: Icon,
  name,
  description,
  onCloseClick,
  onConfirmClick,
}) => {
  return (
    <div>
      <div className="flex items-center">
        <Icon className="w-10 h-10 rounded-full mr-4" />

        <div className="text-sm">
          <p className="text-gray-900 leading-none">{name}</p>
          <p className="text-gray-600 text-xs">{description}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-1">
        <Button onClick={onCloseClick}>Cerrar</Button>
        <IconButton icon={Fa.FaDirections} onClick={onConfirmClick}>
          Indicaciones
        </IconButton>
      </div>
    </div>
  );
};
