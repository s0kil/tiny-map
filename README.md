# TinyMap

A tiny script for displaying a static map with tiles.

![npm (scoped)](https://img.shields.io/npm/v/@s0kil/tiny-map?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/min/@s0kil/tiny-map?style=for-the-badge)

## Install
`npm i -D @s0kil/tiny-map`

## Usage
```javascript
tinyMap(document.getElementById("map"), {
    center: [82.897440725094, 54.980156831455],
    zoom: 17,
    tileUrl: "https://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1&size=64",
    subdomains: "0123"
});
```
