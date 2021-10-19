import * as TileManager from "leaflet.offline/src/TileManager";

export const confirmSaveTiles = async (control, layer) => {
  let this$1 = control;
  this$1._baseLayer.fire("savestart", this$1.status);
  await Promise.all(
    layer._tilesforSave.map(async (tile) => await loadTile(this$1, tile))
  );
};

const loadTile = async (control, jtile) => {
  try {
    let self = control;
    let tile = jtile;
    let blob = await downloadTile(tile.url);
    self.status.lengthLoaded += 1;
    saveTile(control, tile, blob);
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

const saveTile = (control, tileInfo, blob) => {
  let self = control;
  TileManager.saveTile(tileInfo, blob)
    .then(() => {
      self.status.lengthSaved += 1;
      self._baseLayer.fire("savetileend", self.status);
      if (
        self.status.lengthSaved === self.status.lengthToBeSaved ||
        self.status.lengthSaved === self.status.lengthLoaded
      ) {
        self._baseLayer.fire("saveend", self.status);
        self.setStorageSize();
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};
