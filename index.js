/**
 * A tiny script for displaying a static map with tiles.
 * You can't interact with the map.
 * /

 /**
 * @typedef {Object} options
 * @property {number[]} center Geographical center of the map, contains two numbers: [longitude, latitude]
 * @property {number} zoom Zoom of the map
 * @property {string} tileUrl URL template for tiles, ex: `//tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}`
 * @property {string} subdomains Subdomains of the tile server, ex: `0123`
 * @property {?number} size Size of the map container. This is an optional parameter, set it if you don't want additional reflow.
 */

/**
 * @param {HTMLElement} container HTML Element that will contain the map
 * @param {options} options
 */
export function tinyMap(container, options) {
  let tileSize = 256;
  let R = 6378137;
  let maxLat = 85.0511287798;

  let pixelCenter = lngLatToPoint(options.center, options.zoom);

  let size = options.size || [container.offsetWidth, container.offsetHeight];
  let halfSize = [size[0] / 2, size[1] / 2];

  let minTile = [
    (pixelCenter[0] - halfSize[0]) / tileSize | 0,
    (pixelCenter[1] - halfSize[1]) / tileSize | 0
  ];

  let maxTile = [
    (pixelCenter[0] + halfSize[0]) / tileSize + 1 | 0,
    (pixelCenter[1] + halfSize[1]) / tileSize + 1 | 0
  ];

  for (let y = minTile[1]; y < maxTile[1]; y++) {
    for (let x = minTile[0]; x < maxTile[0]; x++) {
      let tile = new Image();
      tile.style.cssText = "position: absolute;" +
        "left:" + (halfSize[0] + x * tileSize - pixelCenter[0] | 0) + "px;" +
        "top:" + (halfSize[1] + y * tileSize - pixelCenter[1] | 0) + "px;" +
        "width:" + tileSize + "px;" +
        "height:" + tileSize + "px;";
      tile.src = getUrl(x, y);
      container.appendChild(tile);
    }
  }

  function getUrl(x, y) {
    return options.tileUrl
      .replace("{s}",
        options.subdomains ? options.subdomains[Math.abs(x + y) % options.subdomains.length] : ""
      )
      .replace("{x}", x)
      .replace("{y}", y)
      .replace("{z}", options.zoom);
  }

  function lngLatToPoint(lngLat, zoom) {
    let point = project(lngLat);
    let scale = 256 * Math.pow(2, zoom);
    let k = 0.5 / (Math.PI * R);
    point[0] = scale * (k * point[0] + 0.5);
    point[1] = scale * (-k * point[1] + 0.5);
    return point;
  }

  function project(lngLat) {
    let d = Math.PI / 180;
    let lat = Math.max(Math.min(maxLat, lngLat[1]), -maxLat);
    let sin = Math.sin(lat * d);

    return [
      R * lngLat[0] * d,
      R * Math.log((1 + sin) / (1 - sin)) / 2
    ];
  }
}
