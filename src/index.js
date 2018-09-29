//consider splitting this into different files as appropriate
//import styles
import './scss/styles.scss'
//import mapbox libraries
import mapboxgl from 'mapbox-gl'
import area from '@turf/area' //this is used to calculate the area of the polygon
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

//the Mapbox api token is intended to be public so no need to store it in an environmental variable nor prevent it from being uploaded to github.
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxleGFuZHJhbGVhaCIsImEiOiJjam1sYmY1encwNmsxM2txdG5tMXg0OWt3In0.dbHRfo-b-M_fPlTcazMi5g'

//setting up the map

//creates the Map box map and attaches it to the div with id 'map'
const map = new mapboxgl.Map({
  container: 'map',
  center: [-71.1111, 42.3243],
  zoom: 19, // starting zoom
  style: 'mapbox://styles/mapbox/satellite-streets-v9' // chose the satellite street style to allow users to view the roofs while also seeing street names for context
})

//adds navigation tools to the map
map.addControl(new mapboxgl.NavigationControl())

//Mapbox tools for the panel

//geocoder
//Mapbox geocoder enables search
//documentation and example at https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/
let geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  zoom: 19 //defines zoom after search is complete
})

//attach the geocoder to the element with id 'geocoder' inside the panel
document.getElementById('geocoder').appendChild(geocoder.onAdd(map))

// use geocoder promximity to bias results to where the maps is currently focused
//based on mapbox documentation at https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder-proximity-bias/
map.on('load', updateGeocoderProximity) // set proximity on map load
map.on('moveend', updateGeocoderProximity) // and then update proximity each time the map moves

function updateGeocoderProximity() {
  // proximity is designed for local scale, if the user is looking at the whole world,
  // it doesn't make sense to factor in the arbitrary centre of the map
  if (map.getZoom() > 9) {
    var center = map.getCenter().wrap() // ensures the longitude falls within -180 to 180 as the Geocoding API doesn't accept values outside this range
    geocoder.setProximity({longitude: center.lng, latitude: center.lat})
  } else {
    geocoder.setProximity(null)
  }
}

//draw polygon and calculate area and nominal power

//Mapbox draw tools

//Mapbox draw create a simple user interface to draw polygons (in this case) on the map.
//tutorial here https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-draw/
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true
  }
})

//appends the draw tool to the element with id 'draw' in the panel
document.getElementById('draw').appendChild(draw.onAdd(map))

//get elements from DOM
let clearButton = document.getElementById('clearBtn')
let resetBtn = document.getElementById('resetBtn')
let panelOne = document.getElementById('panelOne')
let panelTwo = document.getElementById('panelTwo')

//deletes all polygons when user selects clear button on panel one
clearButton.addEventListener('click', function() {
  draw.deleteAll()
})

//hides panel two, displays panel one, and deletes all polygons when user clicks reset button
function reset() {
  panelTwo.style.display = 'none'
  panelOne.style.display = 'block'
  draw.deleteAll()
}

//attaches reset function to reset button as event listener
resetBtn.addEventListener('click', reset)

//updates area and nominal power on draw, delete and update
map.on('draw.create', updateArea)
map.on('draw.delete', updateArea)
map.on('draw.update', updateArea)

//According to pickmysolar.com the average efficiency of solar panels falls between the 15% to 18% efficiency range. This calculator uses a 15% efficiency rate to generate a conservative estimate
//A solar panel with a 15% efficiency rate would produce 150 watts per square meter under standard test conditions (nominal power)

//calculates and displays nominal power
//consider breaking this up into multiple functions to make it more functional
function updateArea(e) {
  let data = draw.getAll() //gets all the data points from the drawing
  //calculates only if the length is greater than  zero
  if (data.features.length > 0) {
    let caclualatedArea = Math.round(area(data)) //uses turf area to calculate area of the polygon and round to nearest meter
    //calculate the nominal power assuming 150 Watts per meter, round to the nearest watt and convert to kW
    let nominalPower = Math.round(caclualatedArea * 150) / 1000

    //hides the toolbar panel
    panelOne.style.display = 'none'
    //displays the stats panel
    panelTwo.style.display = 'block'

    //displays the statistics in the panel
    let stats = document.getElementById('stats')
    stats.innerHTML =
      '<p><span id="power">Nominal power: &nbsp;' +
      nominalPower +
      ' kW </span>Area Selected: &nbsp;' +
      caclualatedArea +
      ' square meters </p>'
  }
}

//Rounding to the nearest square meter because typical residential solar panels roughly 1.6 square meters
