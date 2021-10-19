export const locationErrorMessage = (code) => {
  switch (code) {
    case 1:
      return "No se ha podido acceder a su ubicación. Se necesita permiso para acceder a su ubicación.";

    default:
      return;
  }
};
