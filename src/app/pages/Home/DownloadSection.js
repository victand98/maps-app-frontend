import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Progress } from "../../components";

export const DownloadSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { downloading, total, progress } = useSelector(
    (state) => state.download
  );

  useEffect(() => {
    if (downloading) setIsOpen(true);
  }, [downloading]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Descarga de Recursos"
      cannotClose={downloading}
    >
      <Progress badgeText="Mapas Offline" advance={(progress * 100) / total} />
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-100 border border-transparent rounded-md hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
          onClick={() => {
            if (downloading) return;
            setIsOpen(false);
          }}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};
