// Creating the map object
var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4.5,
});
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


var coffeeIcon = L.icon({
    iconUrl: 'static/cup_icon.png',
    iconSize:     [48, 48], // size of the icon
    iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [-4, -52] // point from which the popup should open relative to the iconAnchor
});
function onEachFeature(features, layer){
    
    // Adding a tool tip with earthquake epicenter location, magnitude, depth, and date of event.
    layer.bindPopup(`<h3>Coffee Shop: ${features.properties.Name}</h3><hr><p>Address: ${features.properties.Address}, <p>${features.properties.City}, ${features.properties.State}</p><hr><p>Rating: ${features.properties.Stars} stars</p>`)

}
// Get the data with d3.
d3.json("static/business_edit.geojson").then(function(response) {
  console.log(response)

  // Create a new marker cluster group.
  var markers = L.markerClusterGroup();

    L.geoJSON(response,{
    pointToLayer: function(features, coord){
      return L.marker(coord,{icon: coffeeIcon})
    },

    onEachFeature: onEachFeature
  }).addTo(markers)
 

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

});