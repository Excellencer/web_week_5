import "./styles.css";
import L from "leaflet";

var muPos = [];
var muNeg = [];
var x = 1;
/* From course video Leaflet & GeoJSON */
const fetchData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";

  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  fetch("https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f")
    .then((response) => response.json())
    .then((data2) => {
      fetch(
        "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e"
      )
        .then((response) => response.json())
        .then((data3) => {
          muPos = data2.dataset.value;
          muNeg = data3.dataset.value;
          console.log(data2);
          console.log(data3);
          //globalThis.data2 = data2
          initMap(data, data2, data3);
        });
    });
};
/* From course video Leaflet & GeoJSON */
const getFeature = (feature, layer) => {
  layer.bindPopup(
    `${muPos[x]}
    ${muNeg[x]}
    `
  );
  x++;
  layer.bindTooltip(feature.properties.nimi);
};
/* From course video Leaflet & GeoJSON */
const getStyle = (feature) => {
  return {};
};

/* From course video Leaflet & GeoJSON */
const initMap = (data, data2, data3) => {
  let map = L.map("map", {
    minZoom: -3,
  });
  let geoJson = L.geoJSON(data, {
    weight: 2,
    onEachFeature: getFeature,
    Style: getStyle,
  }).addTo(map);

  let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  map.fitBounds(geoJson.getBounds());
};

fetchData();
