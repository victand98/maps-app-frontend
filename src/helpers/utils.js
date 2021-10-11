export const locationErrorMessage = (code) => {
  switch (code) {
    case 1:
      return "No se ha podido acceder a su ubicación, procure que los permisos para acceder a su ubicación esten activados.";

    default:
      return;
  }
};
