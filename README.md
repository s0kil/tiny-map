# TinyMap

A tiny script for displaying a static map with tiles.

## Usage
```javascript
tinyMap(document.getElementById("map"), {
    center: [82.897440725094, 54.980156831455],
    zoom: 17,
    tileUrl: "https://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1&size=64",
    subdomains: "0123"
});
```
