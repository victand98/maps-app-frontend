export const locationErrorMessage = (code) => {
  switch (code) {
    case 1:
      return "No se ha podido acceder a su ubicación, procure que los permisos para acceder a su ubicación esten activados.";

    default:
      return;
  }
};

export const confirmSaveTiles = async (control, layer) => {
  let this$1 = control;
  this$1._baseLayer.fire("savestart", this$1.status);
  await Promise.all(
    layer._tilesforSave.map(async (tile) => await loadTile(this$1, tile))
  );
  this$1._baseLayer.fire("savefinish", this$1.status);
};

const loadTile = async (control, jtile) => {
  try {
    let self = control;
    let tile = jtile;
    let blob = await downloadTile(tile.url);
    self.status.lengthLoaded += 1;
    self._saveTile(tile, blob);
    self._baseLayer.fire("loadtileend", self.status);
    if (self.status.lengthLoaded === self.status.lengthToBeSaved) {
      self._baseLayer.fire("loadend", self.status);
    }
  } catch (error) {
    console.log(`Error`, error);
  }
};

const downloadTile = async (tileUrl) => {
  let response = await fetch(tileUrl);
  if (!response.ok) {
    throw new Error("Request failed with status " + response.statusText);
  }
  return response.blob();
};
