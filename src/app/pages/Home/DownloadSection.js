import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Progress } from "../../components";

export const DownloadSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { downloading, total, progress } = useSelector(
    (state) => state.download
  );

  useEffect(() => {
    if (downloading) setIsOpen(true);
  }, [downloading]);

  const onClose = () => {
    if (downloading) return;
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Descarga de Recursos"
      cannotClose={downloading}
    >
      <Progress badgeText="Mapas Offline" advance={(progress * 100) / total} />
      <div className="mt-4">
        <Button onClick={onClose}>Cerrar</Button>
      </div>
    </Modal>
  );
};
