'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.tinyMap = tinyMap;
function tinyMap(container, options) {
    var getUrl = function getUrl(x, y) {
        return options.tileUrl.replace('{s}', options.subdomains ? options.subdomains[Math.abs(x + y) % options.subdomains.length] : '').replace('{x}', x).replace('{y}', y).replace('{z}', options.zoom);
    };
    var lngLatToPoint = function lngLatToPoint(lngLat, zoom) {
        var point = project(lngLat);
        var scale = 256 * Math.pow(2, zoom);
        var k = 0.5 / (Math.PI * R);
        point[0] = scale * (k * point[0] + 0.5);
        point[1] = scale * (-k * point[1] + 0.5);
        return point;
    };
    var project = function project(lngLat) {
        var d = Math.PI / 180;
        var lat = Math.max(Math.min(maxLat, lngLat[1]), -maxLat);
        var sin = Math.sin(lat * d);
        return [
            R * lngLat[0] * d,
            R * Math.log((1 + sin) / (1 - sin)) / 2
        ];
    };
    var tileSize = 256;
    var R = 6378137;
    var maxLat = 85.0511287798;
    var pixelCenter = lngLatToPoint(options.center, options.zoom);
    var size = options.size || [container.offsetWidth, container.offsetHeight];
    var halfSize = [size[0] / 2, size[1] / 2];
    var minTile = [
        (pixelCenter[0] - halfSize[0]) / tileSize | 0,
        (pixelCenter[1] - halfSize[1]) / tileSize | 0
    ];
    var maxTile = [
        (pixelCenter[0] + halfSize[0]) / tileSize + 1 | 0,
        (pixelCenter[1] + halfSize[1]) / tileSize + 1 | 0
    ];
    for(var y = minTile[1]; y < maxTile[1]; y++){
        for(var x = minTile[0]; x < maxTile[0]; x++){
            var tile = new Image();
            tile.style.cssText = 'position: absolute;' + 'left:' + (halfSize[0] + x * tileSize - pixelCenter[0] | 0) + 'px;' + 'top:' + (halfSize[1] + y * tileSize - pixelCenter[1] | 0) + 'px;' + 'width:' + tileSize + 'px;' + 'height:' + tileSize + 'px;';
            tile.src = getUrl(x, y);
            container.appendChild(tile);
        }
    }
}

