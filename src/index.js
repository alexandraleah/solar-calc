//consider splitting this into different files as appropriate

import mapboxgl from 'mapbox-gl'
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder')
const MapboxDraw = require('@mapbox/mapbox-gl-draw')

//the Mapbox api token is intended to be public so no need to store it in an environmental variable nor prevent it from being uploaded to github.
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxleGFuZHJhbGVhaCIsImEiOiJjam1sYmY1encwNmsxM2txdG5tMXg0OWt3In0.dbHRfo-b-M_fPlTcazMi5g'

const map = new mapboxgl.Map({
  container: 'map',
  center: [-71.08, 42.381],
  zoom: 15, // starting zoom
  style: 'mapbox://styles/mapbox/satellite-streets-v9' // chose the satellite street style to allow users to view the roofs while also seeing street names for context
})

//when it searches need to have a way to zoom in closer in on the address and maybe highlight which one it is
//uses Mapbox geocoder to add a search bar and search for an address
//documentation and example here https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  })
)

//Mapbox draw create a simple user interface to draw polygons (in this case) on the map.
//tutorial here https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-draw/
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  }
})

map.addControl(draw)

map.on('draw.create', updateArea)
map.on('draw.delete', updateArea)
map.on('draw.update', updateArea)
